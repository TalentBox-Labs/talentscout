import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { applyBackendAuth, backendFetch } from "@/lib/admin-server";
import type { PipelineCard, PipelineColumn, WorkspaceOverviewPayload, WorkspaceTask } from "@/lib/workspace-dashboard";

type BackendJob = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  status?: string | null;
  created_at: string;
  applications_count?: number;
};

type BackendCandidate = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  current_position?: string | null;
  current_company?: string | null;
  location?: string | null;
  years_of_experience?: number | null;
  created_at: string;
};

type BackendApplication = {
  id: string;
  status?: string | null;
  ai_match_score?: number | null;
  created_at: string;
  candidate?: {
    first_name?: string | null;
    last_name?: string | null;
    full_name?: string | null;
    current_position?: string | null;
  } | null;
  job?: {
    title?: string | null;
  } | null;
  current_stage_obj?: {
    name?: string | null;
    order?: number | null;
  } | null;
};

type BackendAnalytics = {
  totalApplications?: number;
  totalJobs?: number;
  avgTimeToHire?: number;
  conversionRate?: number;
  applicationsByStage?: Array<{ name?: string; value?: number }>;
};

const DISPLAY_STAGE_ORDER = ["Applied", "Screening", "Interview", "Offer"] as const;

function titleCase(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function getCandidateName(candidate: BackendApplication["candidate"]) {
  const fullName = candidate?.full_name?.trim();
  if (fullName) {
    return fullName;
  }

  const joined = [candidate?.first_name, candidate?.last_name].filter(Boolean).join(" ").trim();
  return joined || "Candidate";
}

function getStageName(application: BackendApplication) {
  const rawStage = application.current_stage_obj?.name?.trim();
  if (!rawStage) {
    return "Applied";
  }

  return titleCase(rawStage);
}

function getJobStatus(status?: string | null) {
  switch ((status || "").toLowerCase()) {
    case "open":
      return "Active";
    case "draft":
      return "Draft";
    case "on_hold":
    case "paused":
      return "Paused";
    default:
      return "Closed";
  }
}

function getStageCount(applications: BackendApplication[], stageName: string) {
  return applications.filter((application) => getStageName(application) === stageName).length;
}

function buildPipelineColumns(applications: BackendApplication[]): PipelineColumn[] {
  return DISPLAY_STAGE_ORDER.map((stageName) => {
    const stageApplications = applications.filter((application) => getStageName(application) === stageName);
    const cards: PipelineCard[] = [...stageApplications]
      .sort((left, right) => Number(right.ai_match_score ?? -1) - Number(left.ai_match_score ?? -1))
      .slice(0, 3)
      .map((application) => ({
        name: getCandidateName(application.candidate),
        role: application.job?.title?.trim() || application.candidate?.current_position?.trim() || "Candidate",
        fitScore:
          typeof application.ai_match_score === "number" && Number.isFinite(application.ai_match_score)
            ? `${Math.round(application.ai_match_score)}%`
            : "Pending",
      }));

    return {
      name: stageName,
      count: stageApplications.length,
      cards,
    };
  });
}

function buildTasks(params: {
  draftJobs: BackendJob[];
  pausedJobs: BackendJob[];
  appliedCount: number;
  screeningCount: number;
  interviewCount: number;
  offerCount: number;
}) {
  const tasks: WorkspaceTask[] = [];

  if (params.draftJobs.length > 0) {
    tasks.push({
      title: "Publish draft roles",
      detail: `${params.draftJobs[0]?.title ?? "A draft role"} is still waiting to go live, and ${params.draftJobs.length} draft requisition${params.draftJobs.length === 1 ? " is" : "s are"} slowing pipeline growth.`,
      priority: "High",
    });
  }

  if (params.pausedJobs.length > 0) {
    tasks.push({
      title: "Review paused searches",
      detail: `${params.pausedJobs.length} role${params.pausedJobs.length === 1 ? " is" : "s are"} currently on hold and need a decision so sourcing momentum does not fade out.`,
      priority: "Medium",
    });
  }

  if (params.interviewCount > 0) {
    tasks.push({
      title: "Move interviews to decision",
      detail: `${params.interviewCount} candidate${params.interviewCount === 1 ? " is" : "s are"} already in interviews and need timely feedback before they stall.`,
      priority: "High",
    });
  }

  if (params.screeningCount > 0) {
    tasks.push({
      title: "Clear the screening queue",
      detail: `${params.screeningCount} profile${params.screeningCount === 1 ? " is" : "s are"} sitting in screening and need shortlist or rejection updates.`,
      priority: "Medium",
    });
  }

  if (params.appliedCount > 0) {
    tasks.push({
      title: "Triage new applicants",
      detail: `${params.appliedCount} newly applied candidate${params.appliedCount === 1 ? " is" : "s are"} waiting for first review and outreach prioritization.`,
      priority: "Low",
    });
  }

  if (tasks.length === 0) {
    tasks.push({
      title: "Pipeline is in good shape",
      detail: "There are no urgent blockers right now. This is a good time to tighten scorecards or refresh role briefs.",
      priority: "Low",
    });
  }

  if (params.offerCount > 0 && tasks.length < 4) {
    tasks.push({
      title: "Close offer-stage candidates",
      detail: `${params.offerCount} candidate${params.offerCount === 1 ? " is" : "s are"} at offer stage and worth executive attention this week.`,
      priority: "Medium",
    });
  }

  return tasks.slice(0, 4);
}

export async function GET() {
  const [jobsResult, candidatesResult, applicationsResult, analyticsResult] = await Promise.all([
    backendFetch("/api/v1/jobs"),
    backendFetch("/api/v1/candidates"),
    backendFetch("/api/v1/applications"),
    backendFetch("/api/v1/analytics"),
  ]);

  const { response: jobsResponse, auth } = jobsResult;
  const { response: candidatesResponse } = candidatesResult;
  const { response: applicationsResponse } = applicationsResult;
  const { response: analyticsResponse } = analyticsResult;

  const requiredResponses = [jobsResponse, candidatesResponse, applicationsResponse];
  if (requiredResponses.some((response) => response === null)) {
    const missingAuth = [jobsResult, candidatesResult, applicationsResult, analyticsResult].find(
      (result) => result.response === null,
    )?.auth;

    return applyBackendAuth(
      NextResponse.json({ message: missingAuth?.errorMessage ?? "No active session." }, { status: 401 }),
      missingAuth ?? auth,
    );
  }

  const [jobsData, candidatesData, applicationsData, analyticsData] = await Promise.all(
    [jobsResponse, candidatesResponse, applicationsResponse, analyticsResponse].map((response) => response?.json().catch(() => null)),
  );

  if (!jobsResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(jobsData, "Failed to load jobs for the workspace overview.") },
      { status: jobsResponse?.status || 500 },
    );
  }

  if (!candidatesResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(candidatesData, "Failed to load candidates for the workspace overview.") },
      { status: candidatesResponse?.status || 500 },
    );
  }

  if (!applicationsResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(applicationsData, "Failed to load applications for the workspace overview.") },
      { status: applicationsResponse?.status || 500 },
    );
  }

  const jobs = (Array.isArray(jobsData) ? jobsData : []) as BackendJob[];
  const candidates = (Array.isArray(candidatesData) ? candidatesData : []) as BackendCandidate[];
  const applications = (Array.isArray(applicationsData) ? applicationsData : []) as BackendApplication[];
  const analytics = analyticsResponse?.ok ? (((analyticsData ?? {}) as BackendAnalytics) ?? {}) : null;
  const warnings: string[] = [];

  if (!analyticsResponse?.ok) {
    warnings.push(extractErrorMessage(analyticsData, "Live analytics is temporarily unavailable, so this overview is using core pipeline data instead."));
  }

  const openJobs = jobs.filter((job) => getJobStatus(job.status) === "Active");
  const draftJobs = jobs.filter((job) => getJobStatus(job.status) === "Draft");
  const pausedJobs = jobs.filter((job) => getJobStatus(job.status) === "Paused");

  const appliedCount = getStageCount(applications, "Applied");
  const screeningCount = getStageCount(applications, "Screening");
  const interviewCount = getStageCount(applications, "Interview");
  const offerCount = getStageCount(applications, "Offer");
  const hiredCount = applications.filter((application) => (application.status || "").toLowerCase() === "hired").length;

  const totalApplications = Number(analytics?.totalApplications ?? applications.length);
  const totalJobs = Number(analytics?.totalJobs ?? jobs.length);
  const avgTimeToHire = Number(analytics?.avgTimeToHire ?? 0);
  const conversionRate = Number(
    analytics?.conversionRate ?? (applications.length > 0 ? (hiredCount / applications.length) * 100 : 0),
  );
  const topJob = [...jobs].sort((left, right) => (right.applications_count ?? 0) - (left.applications_count ?? 0))[0];

  const metrics = [
    {
      label: "Open requisitions",
      value: String(openJobs.length),
      delta: `${draftJobs.length} draft · ${pausedJobs.length} on hold`,
    },
    {
      label: "Candidates tracked",
      value: String(candidates.length),
      delta: `${totalApplications} applications across the workspace`,
    },
    {
      label: "Time to hire",
      value: `${avgTimeToHire.toFixed(1)} days`,
      delta: `${offerCount} offer-stage candidate${offerCount === 1 ? "" : "s"} in motion`,
    },
    {
      label: "Conversion to hire",
      value: `${Math.round(conversionRate)}%`,
      delta: `${hiredCount} hired application${hiredCount === 1 ? "" : "s"} so far`,
    },
  ];

  const pendingAttentionCount = draftJobs.length + pausedJobs.length + screeningCount;
  const overview = [
    {
      icon: "jobs" as const,
      label: "Active roles",
      value: String(openJobs.length),
      detail: `${totalApplications} applications are currently spread across live hiring plans.`,
    },
    {
      icon: "candidates" as const,
      label: "Interviewing now",
      value: String(interviewCount),
      detail: `${offerCount} candidate${offerCount === 1 ? " is" : "s are"} already at offer stage.`,
    },
    {
      icon: "attention" as const,
      label: "Needs attention",
      value: String(pendingAttentionCount),
      detail: `${draftJobs.length} drafts, ${pausedJobs.length} paused roles, and ${screeningCount} screening item${screeningCount === 1 ? "" : "s"} need follow-through.`,
    },
  ];

  const pipeline = buildPipelineColumns(applications);
  const tasks = buildTasks({
    draftJobs,
    pausedJobs,
    appliedCount,
    screeningCount,
    interviewCount,
    offerCount,
  });

  const recentActivity = [...applications]
    .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
    .slice(0, 6)
    .map((application) => {
      const candidateName = getCandidateName(application.candidate);
      const jobTitle = application.job?.title?.trim() || "an open role";
      const stageName = getStageName(application);

      return {
        id: application.id,
        label:
          stageName === "Applied"
            ? `New application from ${candidateName} for ${jobTitle}`
            : `${candidateName} is currently in ${stageName} for ${jobTitle}`,
        timestamp: application.created_at,
      };
    });

  const insights = [
    appliedCount > 0
      ? `${appliedCount} new applicant${appliedCount === 1 ? " is" : "s are"} sitting in the applied queue and need quick triage before they cool off.`
      : "The applied queue is clear right now, so the team can focus on deeper-stage candidates.",
    topJob
      ? `${topJob.title} is driving the strongest inbound interest right now with ${topJob.applications_count ?? 0} application${topJob.applications_count === 1 ? "" : "s"}.`
      : "No role has started generating candidate demand yet, so publishing and promotion should come first.",
    offerCount > 0
      ? `${offerCount} offer-stage candidate${offerCount === 1 ? " is" : "s are"} close to close, which makes response speed especially important this week.`
      : conversionRate > 0
        ? `Current conversion to hire is ${Math.round(conversionRate)}%, giving you a live read on how efficiently the funnel is moving.`
        : "Once hires start landing, this overview will surface real conversion signals automatically.",
  ];

  let health: WorkspaceOverviewPayload["health"] = { label: "Healthy", tone: "success" };
  if (pendingAttentionCount >= 10 || conversionRate < 10) {
    health = { label: "Needs attention", tone: "danger" };
  } else if (pendingAttentionCount >= 4 || conversionRate < 25) {
    health = { label: "Watchlist", tone: "warning" };
  }

  const payload: WorkspaceOverviewPayload = {
    summary: {
      totalJobs,
      openJobs: openJobs.length,
      draftJobs: draftJobs.length,
      pausedJobs: pausedJobs.length,
      totalCandidates: candidates.length,
      totalApplications,
      appliedCount,
      screeningCount,
      interviewCount,
      offerCount,
      hiredCount,
      avgTimeToHire,
      conversionRate,
    },
    metrics,
    tasks,
    overview,
    pipeline,
    recentActivity,
    insights,
    health,
    warnings,
  };

  return applyBackendAuth(NextResponse.json(payload), auth);
}