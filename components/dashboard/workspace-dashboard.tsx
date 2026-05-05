"use client";

import * as React from "react";
import { Activity, BriefcaseBusiness, CheckCircle2, Clock3, ListTodo, Loader2, Sparkles, TriangleAlert, UsersRound } from "lucide-react";
import type { AuthUser } from "@/lib/auth";
import type { WorkspaceOverviewPayload } from "@/lib/workspace-dashboard";
import { PipelineBoard } from "@/components/shared/pipeline-board";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function getTaskTone(priority: string): "danger" | "warning" | "primary" {
  if (priority === "High") {
    return "danger";
  }

  if (priority === "Medium") {
    return "warning";
  }

  return "primary";
}

export function WorkspaceDashboard({ user }: { user: AuthUser | null }) {
  const [data, setData] = React.useState<WorkspaceOverviewPayload | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const userFirstName = user?.firstName || user?.fullName || "there";

  const iconMap = {
    jobs: BriefcaseBusiness,
    candidates: UsersRound,
    attention: Clock3,
  } as const;

  const loadOverview = React.useCallback(async (background = false) => {
    if (background) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const sessionResponse = await fetch("/api/auth/session", { cache: "no-store" });
      const sessionData = (await sessionResponse.json().catch(() => null)) as
        | { authenticated?: boolean; message?: string }
        | null;

      if (!sessionResponse.ok || !sessionData?.authenticated) {
        setError(sessionData?.message ?? "You need an active session to view workspace analytics.");
        setData(null);
        return;
      }

      const response = await fetch("/api/dashboard/overview", { cache: "no-store" });
      const overview = (await response.json().catch(() => null)) as (WorkspaceOverviewPayload & { message?: string }) | null;

      if (!response.ok || !overview) {
        setError(overview?.message ?? "Failed to load the workspace overview.");
        setData(null);
        return;
      }

      setData(overview);
    } catch {
      setError("Could not load the workspace overview right now.");
      setData(null);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

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

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="surface-card rounded-[32px] p-8">
          <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading live workspace overview…
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Card className="rounded-[32px] p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/60 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300">
            <TriangleAlert className="h-4 w-4" />
            Workspace overview unavailable
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">We couldn’t load your live dashboard.</h1>
          <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
            {error ?? "The dashboard could not reach the latest recruiting analytics right now."}
          </p>
          <div className="mt-6">
            <Button type="button" onClick={() => void loadOverview()}>
              Try again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
            <Sparkles className="h-4 w-4" />
            Workspace overview
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {userFirstName}.</h1>
          <p className="mt-2 max-w-3xl text-[var(--color-muted)]">
            This dashboard is your real-time overview for hiring momentum, pending actions, and the work that needs attention next.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Activity className="h-4 w-4" />
            {data.health.label}
          </div>
          <Button type="button" variant="outline" onClick={() => void loadOverview(true)} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Refresh live data
          </Button>
        </div>
      </section>

      {error ? <div className="rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}
      {data.warnings?.length ? (
        <div className="rounded-[22px] border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {data.warnings[0]}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} delta={metric.delta} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Pending tasks & next actions</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">A practical to-do queue for the recruiting team.</p>
            </div>
            <Badge tone="warning">{data.tasks.length} open</Badge>
          </div>
          <div className="space-y-4">
            {data.tasks.map((task) => (
              <div key={task.title} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[var(--color-fg)]">{task.title}</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{task.detail}</p>
                  </div>
                  <Badge tone={getTaskTone(task.priority)}>{task.priority}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Overview at a glance</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Real-time signals from the hiring pipeline.</p>
            </div>
            <Badge tone={data.health.tone}>{data.health.label}</Badge>
          </div>
          <div className="space-y-4">
            {data.overview.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.label} className="flex items-start gap-4 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-muted)]">{item.label}</div>
                    <div className="mt-1 text-2xl font-semibold tracking-tight">{item.value}</div>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Pipeline snapshot</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Track candidate movement across every active hiring stage.</p>
          </div>
          <Badge tone="primary">Updated continuously</Badge>
        </div>
        <PipelineBoard columns={data.pipeline} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Recent hiring activity</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">The latest updates from your live recruiting workflow.</p>
            </div>
            <Badge tone="primary">{data.recentActivity.length} updates</Badge>
          </div>
          <div className="space-y-4">
            {data.recentActivity.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-[var(--color-fg)]">{item.label}</div>
                  <div className="mt-1 text-sm text-[var(--color-muted)]">{formatRelativeDate(item.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Insights & recommendations</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Helpful signals to guide today’s recruiting decisions.</p>
            </div>
            <Badge tone="primary">{data.insights.length} insights</Badge>
          </div>
          <div className="space-y-4">
            {data.insights.map((insight) => (
              <div key={insight} className="flex items-start gap-3 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <ListTodo className="h-4 w-4" />
                </div>
                <p className="text-sm leading-6 text-[var(--color-muted)]">{insight}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
