"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, Building2, LineChart, Loader2, ShieldCheck, TrendingUp, TriangleAlert, UsersRound } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ApprovalRequest = {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  requested_role: string;
  organization_name: string | null;
  justification: string | null;
  created_at: string;
  status: string;
};

type OrganizationState = {
  id: string;
  name: string;
  status: "Active" | "Onboarding" | "Needs review" | "Inactive";
  isActive: boolean;
  pendingApprovals: number;
  createdAt: string;
  note: string;
  totalMembers: number;
  activeMembers: number;
  verifiedMembers: number;
  recentLogins30d: number;
  latestMemberLogin?: string | null;
};

type UserRecord = {
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

type RecentActivity = {
  id: string;
  label: string;
  timestamp: string;
  kind: string;
};

type OverviewPayload = {
  summary: {
    pendingApprovals: number;
    onboardingOrganizations: number;
    activeUsers: number;
    inactiveUsers: number;
    verifiedUsers: number;
    superAdmins: number;
    totalUsers: number;
    totalOrganizations: number;
    totalJobs: number;
    totalCandidates: number;
    totalApplications: number;
  };
  executiveMetrics: {
    growth: {
      users7d: number;
      users30d: number;
      organizations7d: number;
      organizations30d: number;
      approvals7d: number;
      approvals30d: number;
    };
    activation: {
      recentLogins7d: number;
      recentLogins30d: number;
      activationRate: number;
      verificationRate: number;
    };
    approvals: {
      avgTurnaroundHours30d: number;
      avgQueueAgeHours: number;
      processedCount30d: number;
    };
    organizationRisk: {
      orgsWithZeroActiveUsers: number;
      dormantOrganizations: number;
      healthyOrganizations: number;
    };
    conversion: {
      applicationsPerJob: number;
      candidatesPerJob: number;
      health: string;
    };
  };
  executiveSeries?: {
    growth7d: Array<{ label: string; users: number; organizations: number; approvals: number }>;
    growth30d: Array<{ label: string; users: number; organizations: number; approvals: number }>;
    activation14d: Array<{ label: string; activeUsers: number }>;
    approvalBacklog30d: Array<{ label: string; created: number; resolved: number; backlog: number }>;
    onboarding8w: Array<{ label: string; newOrganizations: number; reviewFlags: number; activatedOrganizations: number }>;
    jobsVsApplications8w: Array<{ label: string; jobs: number; applications: number }>;
  };
  approvalRequests: ApprovalRequest[];
  organizationStates: OrganizationState[];
  users: UserRecord[];
  recentActivity: RecentActivity[];
};

type SessionPayload = {
  authenticated: boolean;
  user?: {
    isSuperAdmin?: boolean;
    fullName?: string;
  };
  message?: string;
};

function toneFromPriority(priority: string) {
  if (priority === "High") return "danger" as const;
  if (priority === "Medium") return "warning" as const;
  return "primary" as const;
}

function toneFromStatus(status: string) {
  if (status === "Needs review" || status === "Inactive") return "danger" as const;
  if (status === "Onboarding") return "warning" as const;
  return "success" as const;
}

function formatRelativeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) {
    return "0%";
  }

  return `${Math.round(value)}%`;
}

function formatHours(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0h";
  }

  if (value >= 24) {
    return `${(value / 24).toFixed(1)}d`;
  }

  return `${value.toFixed(1)}h`;
}

type ChartSeries<T> = {
  key: keyof T;
  label: string;
  color: string;
};

function buildLinePath(values: number[], width: number, height: number, padding: number) {
  if (!values.length) {
    return "";
  }

  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const stepX = values.length === 1 ? 0 : (width - padding * 2) / (values.length - 1);

  return values
    .map((value, index) => {
      const x = padding + index * stepX;
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function TrendLegend({ items }: { items: Array<{ label: string; color: string }> }) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
      {items.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

function MiniTrendChart<T extends Record<string, string | number>>({
  data,
  series,
  height = 140,
}: {
  data: T[];
  series: Array<ChartSeries<T>>;
  height?: number;
}) {
  const width = 420;
  const padding = 18;
  const labels = data.map((point) => String(point.label ?? ""));

  return (
    <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-36 w-full overflow-visible">
        <path d={`M${padding},${height - padding} L${width - padding},${height - padding}`} stroke="rgba(148,163,184,0.18)" strokeWidth="1" fill="none" />
        {series.map((item) => {
          const values = data.map((point) => Number(point[item.key] ?? 0));
          const path = buildLinePath(values, width, height, padding);
          return <path key={String(item.key)} d={path} fill="none" stroke={item.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />;
        })}
      </svg>
      <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-muted)]">
        <span>{labels[0] ?? "Start"}</span>
        <span>{labels[labels.length - 1] ?? "Now"}</span>
      </div>
      <TrendLegend items={series.map((item) => ({ label: item.label, color: item.color }))} />
    </div>
  );
}

export function SuperAdminDashboard() {
  const [data, setData] = React.useState<OverviewPayload | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [notes, setNotes] = React.useState<Record<string, string>>({});
  const [busyActionId, setBusyActionId] = React.useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean | null>(null);

  const loadOverview = React.useCallback(async (background = false) => {
    if (background) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const sessionResponse = await fetch("/api/auth/session", { cache: "no-store" });
      const sessionData = (await sessionResponse.json().catch(() => null)) as SessionPayload | null;

      if (!sessionResponse.ok || !sessionData?.authenticated) {
        setIsSuperAdmin(false);
        setError(sessionData?.message ?? "You need an active session to view admin data.");
        setData(null);
        return;
      }

      const superAdmin = Boolean(sessionData.user?.isSuperAdmin);
      setIsSuperAdmin(superAdmin);

      if (!superAdmin) {
        setError("This view is reserved for super admins.");
        setData(null);
        return;
      }

      const response = await fetch("/api/admin/overview", { cache: "no-store" });
      const overview = (await response.json().catch(() => null)) as OverviewPayload & { message?: string } | null;

      if (!response.ok || !overview) {
        setError(overview?.message ?? "Failed to load admin overview.");
        setData(null);
        return;
      }

      setData(overview);
    } catch {
      setError("Could not load the admin overview right now.");
      setData(null);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  async function handleDecision(requestId: string, action: "approve" | "reject") {
    setNotice(null);
    setError(null);

    const reviewNotes = notes[requestId]?.trim() ?? "";
    if (action === "reject" && !reviewNotes) {
      setError("Add review notes before rejecting a request.");
      return;
    }

    setBusyActionId(`${action}:${requestId}`);

    try {
      const response = await fetch(`/api/admin/approval-requests/${requestId}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewNotes: reviewNotes || undefined }),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setError(result?.message ?? `Failed to ${action} request.`);
        return;
      }

      setNotice(result?.message ?? `Request ${action}d successfully.`);
      setNotes((current) => {
        const next = { ...current };
        delete next[requestId];
        return next;
      });
      await loadOverview(true);
    } catch {
      setError(`Could not ${action} the request right now.`);
    } finally {
      setBusyActionId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="surface-card rounded-[32px] p-8">
          <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading live super-admin overview…
          </div>
        </div>
      </div>
    );
  }

  if (isSuperAdmin === false) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Card className="rounded-[32px] p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
            <ShieldCheck className="h-4 w-4" />
            Restricted view
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">This dashboard is reserved for super admins.</h1>
          <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
            Sign in with a super-admin account to review approval requests, monitor onboarding state, and manage platform-level access.
          </p>
        </Card>
      </div>
    );
  }

  const summaryMetrics = data
    ? [
        { label: "Organizations", value: String(data.summary.totalOrganizations), delta: `${data.summary.onboardingOrganizations} need onboarding or review attention` },
        { label: "Users", value: String(data.summary.totalUsers), delta: `${data.summary.activeUsers} active · ${data.summary.inactiveUsers} inactive` },
        { label: "Open jobs", value: String(data.summary.totalJobs), delta: `${data.summary.totalCandidates} candidates tracked across the site` },
        { label: "Applications", value: String(data.summary.totalApplications), delta: `${data.summary.pendingApprovals} approval request${data.summary.pendingApprovals === 1 ? "" : "s"} currently waiting` },
      ]
    : [];

  const usersPreview = data?.users.slice(0, 8) ?? [];
  const organizationsPreview = data?.organizationStates.slice(0, 6) ?? [];
  const executiveSeries = data?.executiveSeries;
  const overviewSignals = [
    {
      title: "Growth trend · 7 days",
      value: `${data?.executiveMetrics?.growth.users7d ?? 0} users`,
      description: `${data?.executiveMetrics?.growth.organizations7d ?? 0} organization${data?.executiveMetrics?.growth.organizations7d === 1 ? "" : "s"} and ${data?.executiveMetrics?.growth.approvals7d ?? 0} approval request${data?.executiveMetrics?.growth.approvals7d === 1 ? "" : "s"} created in the last week.`,
      tone: ((data?.executiveMetrics?.growth.users7d ?? 0) > 0 || (data?.executiveMetrics?.growth.organizations7d ?? 0) > 0) ? "success" as const : "warning" as const,
    },
    {
      title: "Growth trend · 30 days",
      value: `${data?.executiveMetrics?.growth.users30d ?? 0} users`,
      description: `${data?.executiveMetrics?.growth.organizations30d ?? 0} organization${data?.executiveMetrics?.growth.organizations30d === 1 ? "" : "s"} and ${data?.executiveMetrics?.growth.approvals30d ?? 0} approval request${data?.executiveMetrics?.growth.approvals30d === 1 ? "" : "s"} entered the platform over the last month.`,
      tone: ((data?.executiveMetrics?.growth.users30d ?? 0) > 0 || (data?.executiveMetrics?.growth.organizations30d ?? 0) > 0) ? "success" as const : "warning" as const,
    },
    {
      title: "User activation trend",
      value: formatPercent((data?.executiveMetrics?.activation.activationRate ?? 0) * 100),
      description: `${data?.executiveMetrics?.activation.recentLogins7d ?? 0} user${data?.executiveMetrics?.activation.recentLogins7d === 1 ? "" : "s"} logged in during the last 7 days and ${data?.executiveMetrics?.activation.recentLogins30d ?? 0} in the last 30 days.`,
      tone: (data?.executiveMetrics?.activation.activationRate ?? 0) >= 0.7 ? "success" as const : (data?.executiveMetrics?.activation.activationRate ?? 0) >= 0.4 ? "warning" as const : "danger" as const,
    },
    {
      title: "Approval turnaround",
      value: formatHours(data?.executiveMetrics?.approvals.avgTurnaroundHours30d ?? 0),
      description:
        (data?.executiveMetrics?.approvals.processedCount30d ?? 0) > 0
          ? `Average turnaround for ${data?.executiveMetrics?.approvals.processedCount30d ?? 0} processed request${data?.executiveMetrics?.approvals.processedCount30d === 1 ? "" : "s"} over the last 30 days.`
          : `No recently processed approvals yet; current queue age averages ${formatHours(data?.executiveMetrics?.approvals.avgQueueAgeHours ?? 0)}.`,
      tone: (data?.executiveMetrics?.approvals.avgTurnaroundHours30d ?? 0) > 72 ? "danger" as const : (data?.executiveMetrics?.approvals.avgTurnaroundHours30d ?? 0) > 24 ? "warning" as const : "success" as const,
    },
  ];
  const operationalWatchlist: Array<{ title: string; description: string; tone: "success" | "warning" | "danger" }> = [
    {
      title: "Approval backlog",
      description:
        data?.summary.pendingApprovals
          ? `${data.summary.pendingApprovals} approval request${data.summary.pendingApprovals === 1 ? " is" : "s are"} waiting for super-admin review.`
          : "No access backlog is building right now.",
      tone: (data?.summary.pendingApprovals ?? 0) > 0 ? "warning" as const : "success" as const,
    },
    {
      title: "Orgs with zero active users",
      description:
        (data?.executiveMetrics.organizationRisk.orgsWithZeroActiveUsers ?? 0) > 0
          ? `${data?.executiveMetrics?.organizationRisk.orgsWithZeroActiveUsers ?? 0} organization${data?.executiveMetrics?.organizationRisk.orgsWithZeroActiveUsers === 1 ? " has" : "s have"} no active users and may be stalled in onboarding.`
          : "Every organization currently has at least one active user.",
      tone: (data?.executiveMetrics?.organizationRisk.orgsWithZeroActiveUsers ?? 0) > 0 ? "danger" as const : "success" as const,
    },
    {
      title: "Dormant organizations",
      description:
        (data?.executiveMetrics?.organizationRisk.dormantOrganizations ?? 0) > 0
          ? `${data?.executiveMetrics?.organizationRisk.dormantOrganizations ?? 0} organization${data?.executiveMetrics?.organizationRisk.dormantOrganizations === 1 ? " shows" : "s show"} no member login activity in the last 30 days.`
          : "No dormant organizations are currently detected.",
      tone: (data?.executiveMetrics?.organizationRisk.dormantOrganizations ?? 0) > 0 ? "warning" as const : "success" as const,
    },
    {
      title: "Jobs / applications conversion health",
      description: `${data?.summary.totalJobs ?? 0} jobs are generating ${(data?.executiveMetrics?.conversion.applicationsPerJob ?? 0).toFixed(1)} applications per job and ${(data?.executiveMetrics?.conversion.candidatesPerJob ?? 0).toFixed(1)} candidates per job.`,
      tone:
        data?.executiveMetrics?.conversion.health === "Healthy demand"
          ? "success"
          : data?.executiveMetrics?.conversion.health === "Moderate demand"
            ? "warning"
            : "danger",
    },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => void loadOverview(true)} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Refresh admin data
          </Button>
          <Button variant="outline" asChild>
            <Link href="/analytics">Open analytics</Link>
          </Button>
        </div>

        <div className="flex-1 lg:max-w-xl">
          {notice ? <div className="rounded-[22px] border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div> : null}
          {error ? <div className="rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section>
        <Card className="rounded-[28px] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Recent platform activity</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Latest signals from approvals, onboarding, and account activity.</p>
            </div>
            <Activity className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(data?.recentActivity ?? []).map((item) => (
              <div key={item.id} className="surface-subtle rounded-3xl p-4">
                <p className="font-medium">{item.label}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{formatRelativeDate(item.timestamp)}</p>
              </div>
            ))}
            {!data?.recentActivity.length ? (
              <div className="surface-subtle rounded-3xl p-4 text-sm text-[var(--color-muted)] md:col-span-2 xl:col-span-4">No recent platform activity to show.</div>
            ) : null}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-[28px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Growth visuals</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Mini charts for 7/30-day user, organization, and approval growth.</p>
            </div>
            <LineChart className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <div>
              <div className="mb-3 text-sm font-semibold">Last 7 days</div>
              <MiniTrendChart
                data={executiveSeries?.growth7d ?? []}
                series={[
                  { key: "users", label: "Users", color: "#2563eb" },
                  { key: "organizations", label: "Organizations", color: "#14b8a6" },
                  { key: "approvals", label: "Approvals", color: "#f59e0b" },
                ]}
              />
            </div>
            <div>
              <div className="mb-3 text-sm font-semibold">Last 30 days</div>
              <MiniTrendChart
                data={executiveSeries?.growth30d ?? []}
                series={[
                  { key: "users", label: "Users", color: "#2563eb" },
                  { key: "organizations", label: "Organizations", color: "#14b8a6" },
                  { key: "approvals", label: "Approvals", color: "#f59e0b" },
                ]}
              />
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Activation and backlog</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Sparklines for user activation and the approval backlog trend over time.</p>
            </div>
            <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <div>
              <div className="mb-3 text-sm font-semibold">Activation trend · 14 days</div>
              <MiniTrendChart
                data={executiveSeries?.activation14d ?? []}
                series={[{ key: "activeUsers", label: "Active logins", color: "#2563eb" }]}
              />
            </div>
            <div>
              <div className="mb-3 text-sm font-semibold">Approval backlog · 30 days</div>
              <MiniTrendChart
                data={executiveSeries?.approvalBacklog30d ?? []}
                series={[
                  { key: "backlog", label: "Backlog", color: "#e11d48" },
                  { key: "created", label: "Created", color: "#f59e0b" },
                  { key: "resolved", label: "Resolved", color: "#10b981" },
                ]}
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-[28px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Org onboarding flow</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Weekly view of new organizations, review pressure, and activated workspaces.</p>
            </div>
            <Building2 className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <MiniTrendChart
            data={executiveSeries?.onboarding8w ?? []}
            series={[
              { key: "newOrganizations", label: "New orgs", color: "#2563eb" },
              { key: "reviewFlags", label: "Needs review", color: "#f59e0b" },
              { key: "activatedOrganizations", label: "Activated", color: "#10b981" },
            ]}
          />
        </Card>

        <Card className="rounded-[28px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Jobs vs applications</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Trend line for hiring demand compared with application volume across recent weeks.</p>
            </div>
            <UsersRound className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <MiniTrendChart
            data={executiveSeries?.jobsVsApplications8w ?? []}
            series={[
              { key: "jobs", label: "Jobs", color: "#2563eb" },
              { key: "applications", label: "Applications", color: "#8b5cf6" },
            ]}
          />
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[28px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Site overview signals</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Trend cards for 7/30-day growth, activation, and approval responsiveness.</p>
            </div>
            <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {overviewSignals.map((signal) => (
              <div key={signal.title} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{signal.title}</h3>
                  <Badge tone={signal.tone}>{signal.value}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{signal.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Operational watchlist</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Risk buckets that call out inactive orgs, dormant workspaces, and conversion pressure.</p>
            </div>
            <TriangleAlert className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <div className="space-y-4">
            {operationalWatchlist.map((item) => (
              <div key={item.title} className="surface-subtle rounded-[24px] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge tone={item.tone}>{item.tone === "success" ? "Stable" : item.tone === "warning" ? "Watch" : "Critical"}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[28px] p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Approval queue needing action</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Approval requests still matter, but they now sit inside the broader platform picture instead of defining the whole dashboard.
              </p>
            </div>
            <Badge tone="warning">{data?.approvalRequests.length ?? 0} open</Badge>
          </div>

          <div className="space-y-4">
            {(data?.approvalRequests ?? []).map((request) => {
              const actionBusy = busyActionId?.endsWith(request.id);
              const reviewNotes = notes[request.id] ?? "";
              const priority = request.requested_role === "recruiter" ? "High" : "Medium";

              return (
                <div key={request.id} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{request.user_name}</div>
                      <div className="mt-1 text-sm text-[var(--color-muted)]">{request.user_email} · {request.organization_name ?? "No organization supplied"}</div>
                    </div>
                    <Badge tone={toneFromPriority(priority)}>{priority}</Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--color-muted)]">
                    <span>Requested role: {request.requested_role.replace(/_/g, " ")}</span>
                    <span>•</span>
                    <span>Submitted {formatRelativeDate(request.created_at)}</span>
                  </div>

                  <div className="mt-4 rounded-[18px] border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm text-[var(--color-muted)] dark:bg-white/5">
                    {request.justification?.trim() || "No justification was provided with this request."}
                  </div>

                  <textarea
                    value={reviewNotes}
                    onChange={(event) => setNotes((current) => ({ ...current, [request.id]: event.target.value }))}
                    placeholder="Optional approval note or required rejection reason"
                    className="mt-4 min-h-24 w-full rounded-[20px] border border-[var(--color-border)] bg-white/80 px-4 py-3 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
                  />

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button type="button" disabled={actionBusy} onClick={() => void handleDecision(request.id, "approve")}>
                      {busyActionId === `approve:${request.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Approve request
                    </Button>
                    <Button type="button" variant="outline" disabled={actionBusy} onClick={() => void handleDecision(request.id, "reject")}>
                      {busyActionId === `reject:${request.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Reject request
                    </Button>
                  </div>
                </div>
              );
            })}

            {!data?.approvalRequests.length ? (
              <div className="surface-subtle rounded-[24px] p-5 text-sm text-[var(--color-muted)]">
                No pending approval requests right now. The onboarding queue is clear.
              </div>
            ) : null}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[28px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Organization health and onboarding</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">A live view of which organizations are healthy, onboarding, or blocked by review pressure.</p>
              </div>
              <Building2 className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div className="space-y-3">
              {organizationsPreview.map((organization) => (
                <div key={organization.id} className="surface-subtle rounded-[22px] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{organization.name}</div>
                      <div className="mt-1 text-sm text-[var(--color-muted)]">Created {formatRelativeDate(organization.createdAt)}</div>
                    </div>
                    <Badge tone={toneFromStatus(organization.status)}>{organization.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{organization.note}</p>
                  <div className="mt-3 text-sm text-[var(--color-primary)]">{organization.pendingApprovals} pending approval{organization.pendingApprovals === 1 ? "" : "s"}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[28px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">User adoption and account status</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">Use this to understand platform adoption, dormant accounts, and admin coverage.</p>
              </div>
              <UsersRound className="h-5 w-5 text-[var(--color-primary)]" />
            </div>

            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
                <div className="text-[var(--color-muted)]">Active</div>
                <div className="mt-2 text-2xl font-bold">{data?.summary.activeUsers ?? 0}</div>
              </div>
              <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
                <div className="text-[var(--color-muted)]">Inactive</div>
                <div className="mt-2 text-2xl font-bold">{data?.summary.inactiveUsers ?? 0}</div>
              </div>
              <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
                <div className="text-[var(--color-muted)]">Verified</div>
                <div className="mt-2 text-2xl font-bold">{data?.summary.verifiedUsers ?? 0}</div>
              </div>
            </div>

            <div className="space-y-3">
              {usersPreview.map((user) => (
                <div key={user.id} className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{user.first_name} {user.last_name}</div>
                      <div className="mt-1 text-sm text-[var(--color-muted)]">{user.email}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone={user.is_active ? "success" : "danger"}>{user.is_active ? "Active" : "Inactive"}</Badge>
                      {user.is_super_admin ? <Badge tone="primary">Super admin</Badge> : null}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-[var(--color-muted)]">
                    <span>Created {formatRelativeDate(user.created_at)}</span>
                    <span>•</span>
                    <span>{user.last_login ? `Last login ${formatRelativeDate(user.last_login)}` : "No login recorded"}</span>
                    {user.approval_status ? (
                      <>
                        <span>•</span>
                        <span>Approval: {user.approval_status}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
