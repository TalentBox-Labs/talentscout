import { NextResponse } from "next/server";
import { extractErrorMessage } from "@/lib/auth";
import { adminBackendFetch, applyBackendAuth } from "@/lib/admin-server";

type ApprovalRequest = {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  requested_role: string;
  organization_name: string | null;
  justification: string | null;
  created_at: string;
  updated_at?: string | null;
  status: string;
  review_notes?: string | null;
};

type AdminUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_verified: boolean;
  is_super_admin: boolean;
  approval_status?: string | null;
  last_login?: string | null;
  created_at: string;
};

type Organization = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string | null;
  total_members?: number;
  active_members?: number;
  verified_members?: number;
  recent_logins_30d?: number;
  latest_member_login?: string | null;
};

type PlatformStats = {
  total_users: number;
  total_organizations: number;
  total_jobs: number;
  total_candidates: number;
  total_applications: number;
};

type ExecutiveAnalytics = {
  growth7d: Array<{ label: string; users: number; organizations: number; approvals: number }>;
  growth30d: Array<{ label: string; users: number; organizations: number; approvals: number }>;
  activation14d: Array<{ label: string; activeUsers: number }>;
  approvalBacklog30d: Array<{ label: string; created: number; resolved: number; backlog: number }>;
  onboarding8w: Array<{ label: string; newOrganizations: number; reviewFlags: number; activatedOrganizations: number }>;
  jobsVsApplications8w: Array<{ label: string; jobs: number; applications: number }>;
};

function daysSince(dateString: string) {
  const createdAt = new Date(dateString).getTime();
  const now = Date.now();
  return Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
}

function isWithinDays(dateString: string | null | undefined, days: number) {
  if (!dateString) {
    return false;
  }

  const timestamp = new Date(dateString).getTime();
  if (Number.isNaN(timestamp)) {
    return false;
  }

  return Date.now() - timestamp <= days * 24 * 60 * 60 * 1000;
}

function average(values: number[]) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export async function GET() {
  const [statsResult, approvalsResult, usersResult, organizationsResult, analyticsResult] = await Promise.all([
    adminBackendFetch("/api/v1/admin/stats"),
    adminBackendFetch("/api/v1/admin/approval-requests"),
    adminBackendFetch("/api/v1/admin/users"),
    adminBackendFetch("/api/v1/admin/organizations"),
    adminBackendFetch("/api/v1/admin/executive-analytics"),
  ]);

  const { response: statsResponse, auth } = statsResult;
  const { response: approvalsResponse } = approvalsResult;
  const { response: usersResponse } = usersResult;
  const { response: organizationsResponse } = organizationsResult;
  const { response: analyticsResponse } = analyticsResult;

  const responses = [statsResponse, approvalsResponse, usersResponse, organizationsResponse, analyticsResponse];
  if (responses.some((response) => response === null)) {
    const missingAuth = [statsResult, approvalsResult, usersResult, organizationsResult, analyticsResult].find(
      (result) => result.response === null,
    )?.auth;

    return applyBackendAuth(
      NextResponse.json({ message: missingAuth?.errorMessage ?? "No active admin session." }, { status: 401 }),
      missingAuth ?? auth,
    );
  }

  const [statsData, approvalsData, usersData, organizationsData, analyticsData] = await Promise.all(
    responses.map((response) => response?.json().catch(() => null)),
  );

  if (!statsResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(statsData, "Failed to load platform stats.") },
      { status: statsResponse?.status || 500 },
    );
  }

  if (!approvalsResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(approvalsData, "Failed to load approval requests.") },
      { status: approvalsResponse?.status || 500 },
    );
  }

  if (!usersResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(usersData, "Failed to load users.") },
      { status: usersResponse?.status || 500 },
    );
  }

  if (!organizationsResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(organizationsData, "Failed to load organizations.") },
      { status: organizationsResponse?.status || 500 },
    );
  }

  if (!analyticsResponse?.ok) {
    return NextResponse.json(
      { message: extractErrorMessage(analyticsData, "Failed to load executive analytics.") },
      { status: analyticsResponse?.status || 500 },
    );
  }

  const stats = (statsData ?? {}) as PlatformStats;
  const executiveAnalytics = (analyticsData ?? {
    growth7d: [],
    growth30d: [],
    activation14d: [],
    approvalBacklog30d: [],
    onboarding8w: [],
    jobsVsApplications8w: [],
  }) as ExecutiveAnalytics;
  const allApprovalRequests = ((approvalsData ?? []) as ApprovalRequest[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  const approvalRequests = allApprovalRequests.filter((request) => request.status === "pending");
  const users = ((usersData ?? []) as AdminUser[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  const organizations = ((organizationsData ?? []) as Organization[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const activeUsers = users.filter((user) => user.is_active).length;
  const inactiveUsers = users.filter((user) => !user.is_active).length;
  const verifiedUsers = users.filter((user) => user.is_verified).length;
  const superAdmins = users.filter((user) => user.is_super_admin).length;
  const recentLogins7d = users.filter((user) => isWithinDays(user.last_login, 7)).length;
  const recentLogins30d = users.filter((user) => isWithinDays(user.last_login, 30)).length;
  const newUsers7d = users.filter((user) => isWithinDays(user.created_at, 7)).length;
  const newUsers30d = users.filter((user) => isWithinDays(user.created_at, 30)).length;
  const newOrganizations7d = organizations.filter((organization) => isWithinDays(organization.created_at, 7)).length;
  const newOrganizations30d = organizations.filter((organization) => isWithinDays(organization.created_at, 30)).length;
  const approvalRequests7d = allApprovalRequests.filter((request) => isWithinDays(request.created_at, 7)).length;
  const approvalRequests30d = allApprovalRequests.filter((request) => isWithinDays(request.created_at, 30)).length;
  const processedApprovalDurationsHours = allApprovalRequests
    .filter((request) => request.status !== "pending" && request.updated_at && isWithinDays(request.updated_at, 30))
    .map((request) => (new Date(request.updated_at as string).getTime() - new Date(request.created_at).getTime()) / (1000 * 60 * 60))
    .filter((hours) => Number.isFinite(hours) && hours >= 0);
  const approvalTurnaroundHours = average(processedApprovalDurationsHours);
  const approvalQueueAverageAgeHours = average(
    approvalRequests
      .map((request) => (Date.now() - new Date(request.created_at).getTime()) / (1000 * 60 * 60))
      .filter((hours) => Number.isFinite(hours) && hours >= 0),
  );

  const organizationStates = organizations.map((organization) => {
    const pendingApprovals = approvalRequests.filter((request) => request.organization_name === organization.name).length;
    const ageInDays = daysSince(organization.created_at);
    const activeMembers = organization.active_members ?? 0;
    const recentLogins = organization.recent_logins_30d ?? 0;

    let status: "Active" | "Onboarding" | "Needs review" | "Inactive" = "Active";
    let note = "Organization is active with no onboarding blockers.";

    if (!organization.is_active) {
      status = "Inactive";
      note = "Organization is currently inactive and may require reactivation or review.";
    } else if (pendingApprovals > 0) {
      status = "Needs review";
      note = `${pendingApprovals} pending approval request${pendingApprovals === 1 ? "" : "s"} need attention for this organization.`;
    } else if (activeMembers === 0) {
      status = "Needs review";
      note = "Organization has no active members, so onboarding or activation likely needs intervention.";
    } else if (ageInDays > 30 && recentLogins === 0) {
      status = "Needs review";
      note = "Organization appears dormant with no recent member login activity in the last 30 days.";
    } else if (ageInDays <= 14) {
      status = "Onboarding";
      note = "Recently created organization that is still within the onboarding window.";
    }

    return {
      id: organization.id,
      name: organization.name,
      status,
      isActive: organization.is_active,
      pendingApprovals,
      createdAt: organization.created_at,
      note,
      totalMembers: organization.total_members ?? 0,
      activeMembers,
      verifiedMembers: organization.verified_members ?? 0,
      recentLogins30d: recentLogins,
      latestMemberLogin: organization.latest_member_login ?? null,
    };
  });

  const onboardingOrganizations = organizationStates.filter((organization) => organization.status !== "Active").length;
  const orgsWithZeroActiveUsers = organizationStates.filter((organization) => organization.activeMembers === 0).length;
  const dormantOrganizations = organizationStates.filter(
    (organization) => daysSince(organization.createdAt) > 30 && organization.recentLogins30d === 0,
  ).length;
  const applicationsPerJob = stats.total_jobs ? (stats.total_applications ?? 0) / stats.total_jobs : 0;
  const candidatesPerJob = stats.total_jobs ? (stats.total_candidates ?? 0) / stats.total_jobs : 0;
  const jobsConversionHealth =
    stats.total_jobs === 0
      ? "No open job activity yet"
      : applicationsPerJob >= 3
        ? "Healthy demand"
        : applicationsPerJob >= 1
          ? "Moderate demand"
          : "Low demand";

  const recentActivity = [
    ...approvalRequests.slice(0, 4).map((request) => ({
      id: `approval-${request.id}`,
      label: `${request.user_name} requested ${request.requested_role.replace(/_/g, " ")} access for ${request.organization_name ?? "an organization"}`,
      timestamp: request.created_at,
      kind: "approval",
    })),
    ...organizations.slice(0, 2).map((organization) => ({
      id: `organization-${organization.id}`,
      label: `${organization.name} ${daysSince(organization.created_at) <= 14 ? "entered onboarding" : "remains active on the platform"}`,
      timestamp: organization.created_at,
      kind: "organization",
    })),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  return applyBackendAuth(NextResponse.json({
    summary: {
      pendingApprovals: approvalRequests.length,
      onboardingOrganizations,
      activeUsers,
      inactiveUsers,
      verifiedUsers,
      superAdmins,
      totalUsers: stats.total_users ?? users.length,
      totalOrganizations: stats.total_organizations ?? organizations.length,
      totalJobs: stats.total_jobs ?? 0,
      totalCandidates: stats.total_candidates ?? 0,
      totalApplications: stats.total_applications ?? 0,
    },
    executiveMetrics: {
      growth: {
        users7d: newUsers7d,
        users30d: newUsers30d,
        organizations7d: newOrganizations7d,
        organizations30d: newOrganizations30d,
        approvals7d: approvalRequests7d,
        approvals30d: approvalRequests30d,
      },
      activation: {
        recentLogins7d,
        recentLogins30d,
        activationRate: users.length ? activeUsers / users.length : 0,
        verificationRate: users.length ? verifiedUsers / users.length : 0,
      },
      approvals: {
        avgTurnaroundHours30d: approvalTurnaroundHours,
        avgQueueAgeHours: approvalQueueAverageAgeHours,
        processedCount30d: processedApprovalDurationsHours.length,
      },
      organizationRisk: {
        orgsWithZeroActiveUsers,
        dormantOrganizations,
        healthyOrganizations: organizationStates.filter((organization) => organization.status === "Active").length,
      },
      conversion: {
        applicationsPerJob,
        candidatesPerJob,
        health: jobsConversionHealth,
      },
    },
    executiveSeries: executiveAnalytics,
    approvalRequests,
    allApprovalRequests,
    organizationStates,
    users,
    recentActivity,
  }), auth);
}
