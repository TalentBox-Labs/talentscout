import { DataTable } from "@/components/shared/data-table";
import { SearchBar } from "@/components/shared/search-bar";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";
import { candidates } from "@/lib/mock-data";

const candidateStats = [
  { label: "AI-qualified", value: "286", delta: "+22 this week" },
  { label: "Interview-ready", value: "28", delta: "Prioritized for outreach" },
  { label: "Offer stage", value: "6", delta: "High confidence talent" },
  { label: "Fresh referrals", value: "13", delta: "Last 7 days" },
];

export default function CandidatesPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Candidate pipeline</h1>
        <p className="mt-2 text-[var(--color-muted)]">Search, review, and progress candidates from a single reusable workspace.</p>
      </section>

      <SearchBar placeholder="Search candidates by role, company, skill, or location" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {candidateStats.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <DataTable
          title="Candidate directory"
          rows={candidates.map((candidate) => ({
            id: candidate.id,
            primary: candidate.name,
            secondary: `${candidate.role} · ${candidate.company}`,
            meta: `${candidate.location} · ${candidate.experience}`,
            metric: `${candidate.fitScore} fit score`,
            status: candidate.stage,
            href: `/candidates/${candidate.id}`,
          }))}
        />
        <Card className="rounded-[28px] p-6">
          <h2 className="text-lg font-semibold">Top skills trending</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Next.js", "Systems Design", "Accessibility", "Prompting", "Recruiting Ops", "Figma"].map((skill) => (
              <span key={skill} className="rounded-full border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-muted)]">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
            Notes, tags, and scorecards can plug into this surface without changing the page layout.
          </div>
        </Card>
      </section>
    </div>
  );
}
