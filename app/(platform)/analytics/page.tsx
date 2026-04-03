import { analyticsMetrics, funnelData } from "@/lib/mock-data";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hiring analytics</h1>
        <p className="mt-2 text-[var(--color-muted)]">Track funnel efficiency, sourcing quality, and recruiter throughput in one place.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analyticsMetrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} delta={metric.trend} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[32px] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Funnel conversion</h2>
            <span className="text-sm text-[var(--color-muted)]">Last 30 days</span>
          </div>
          <div className="space-y-5">
            {funnelData.map((item) => (
              <div key={item.stage}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{item.stage}</span>
                  <span className="text-[var(--color-muted)]">{item.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-900/5 dark:bg-white/5">
                  <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${Math.max(12, Math.min(item.value / 4, 100))}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="rounded-[32px] p-6">
          <h2 className="text-xl font-semibold">Operational notes</h2>
          <div className="mt-5 space-y-4 text-sm text-[var(--color-muted)]">
            <div className="rounded-[24px] border border-[var(--color-border)] p-4">AI-sourced candidates outperform manual sourcing by <strong className="text-[var(--color-fg)]">15%</strong> on first-round pass rates.</div>
            <div className="rounded-[24px] border border-[var(--color-border)] p-4">Interviewer load remains healthy, but engineering loops spike on Wednesdays.</div>
            <div className="rounded-[24px] border border-[var(--color-border)] p-4">Recommendation: move screening slots earlier in the week to smooth offer conversion.</div>
          </div>
        </Card>
      </section>
    </div>
  );
}
