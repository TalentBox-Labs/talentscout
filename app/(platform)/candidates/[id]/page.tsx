import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCandidateById } from "@/lib/mock-data";

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="surface-card hero-gradient grid gap-8 rounded-[32px] p-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Badge tone="primary">Candidate profile</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{candidate.name}</h1>
          <p className="mt-2 text-lg text-[var(--color-muted)]">{candidate.role} · {candidate.company}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
            <span>{candidate.location}</span>
            <span>•</span>
            <span>{candidate.experience} experience</span>
            <span>•</span>
            <span>{candidate.email}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <span key={skill} className="rounded-full border border-[var(--color-border)] bg-white/60 px-3 py-1.5 text-sm dark:bg-white/5">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Button>Message candidate</Button>
            <Button variant="outline">Move to next stage</Button>
          </div>
        </div>
        <Card className="rounded-[30px] p-6">
          <div className="text-sm text-[var(--color-muted)]">AI fit score</div>
          <div className="mt-3 text-6xl font-black text-[var(--color-primary)]">{candidate.fitScore}</div>
          <p className="mt-3 text-sm text-[var(--color-muted)]">This profile aligns strongly with the active ATS product and frontend requisitions.</p>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">AI summary</h2>
          <p className="mt-4 leading-7 text-[var(--color-muted)]">
            {candidate.name} brings solid experience in modern product delivery and cross-functional collaboration. Their profile suggests strong alignment for structured interview loops, ownership of quality, and contribution to a reusable design system.
          </p>
        </Card>
        <Card className="rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">Current stage</h2>
          <div className="mt-4 inline-flex rounded-full bg-[var(--color-primary)]/10 px-4 py-2 font-medium text-[var(--color-primary)]">{candidate.stage}</div>
          <p className="mt-4 text-sm text-[var(--color-muted)]">Ready for interviewer prep, scorecard capture, and recruiter notes.</p>
        </Card>
      </section>
    </div>
  );
}
