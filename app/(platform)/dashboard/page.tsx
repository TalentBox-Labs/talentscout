import Link from "next/link";
import { Activity, ArrowRight, Sparkles } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { PipelineBoard } from "@/components/shared/pipeline-board";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { candidates, dashboardMetrics, hiringActivity, jobs } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section className="surface-card hero-gradient relative overflow-hidden rounded-[32px] p-8 sm:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
              <Sparkles className="h-4 w-4" />
              AI engine active
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">A cleaner, faster ATS workspace for recruiters and hiring managers.</h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
              Review pipeline health, post new roles, and prioritize candidates using a shared interface built for daily operations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/jobs/new">Post a new role</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/candidates">Review candidates</Link>
              </Button>
            </div>
          </div>
          <Card className="rounded-[30px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent hiring activity</h2>
              <Activity className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div className="space-y-4">
              {hiringActivity.map((item) => (
                <div key={item.label} className="surface-subtle rounded-3xl p-4">
                  <p className="font-medium">{item.label}</p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{item.timestamp}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Candidate pipeline</h2>
            <p className="text-sm text-[var(--color-muted)]">A reusable Kanban-style view for the highest-priority candidates.</p>
          </div>
          <Link href="/analytics" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]">
            View analytics <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PipelineBoard />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <DataTable
          title="Active jobs"
          rows={jobs.map((job) => ({
            id: job.id,
            primary: job.title,
            secondary: `${job.department} · ${job.location}`,
            meta: job.postedOn,
            metric: `${job.fitRate}% fit rate`,
            status: job.status,
          }))}
        />
        <DataTable
          title="Priority candidates"
          rows={candidates.map((candidate) => ({
            id: candidate.id,
            primary: candidate.name,
            secondary: `${candidate.role} · ${candidate.company}`,
            meta: candidate.location,
            metric: `${candidate.fitScore} fit score`,
            status: candidate.stage,
            href: `/candidates/${candidate.id}`,
          }))}
        />
      </section>
    </div>
  );
}
