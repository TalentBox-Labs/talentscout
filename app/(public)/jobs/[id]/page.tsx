import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, Clock3, MapPin, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getJobById } from "@/lib/mock-data";

export default async function PublicJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <header className="border-b border-[var(--color-border)] bg-white/70 px-6 py-5 backdrop-blur dark:bg-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold">TalentScout Jobs</div>
            <div className="text-sm text-[var(--color-muted)]">Public job board experience</div>
          </div>
          <Link href="/dashboard" className="text-sm font-medium text-[var(--color-primary)]">Back to dashboard</Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <section className="hero-gradient surface-card rounded-[36px] p-8 sm:p-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{job.title}</h1>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--color-muted)] sm:text-base">
              <span className="inline-flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4" /> {job.department}</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {job.schedule}</span>
              <span className="inline-flex items-center gap-2"><WalletCards className="h-4 w-4" /> {job.compensation}</span>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">{job.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>
                Apply now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline">Share job</Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[32px] p-8">
            <h2 className="text-2xl font-semibold">About the role</h2>
            <p className="mt-4 leading-8 text-[var(--color-muted)]">We are hiring for a high-impact role inside the TalentScout product team. You will help ship recruiter workflows, candidate experiences, and reusable interfaces that balance clarity, speed, and production readiness.</p>
            <ul className="mt-6 space-y-3 text-[var(--color-muted)]">
              <li>Lead product quality across recruiter-facing experiences.</li>
              <li>Collaborate with design, data, and hiring operations stakeholders.</li>
              <li>Build and maintain scalable systems with strong UX discipline.</li>
              <li>Contribute to documentation and production deployment readiness.</li>
            </ul>
          </Card>
          <Card className="rounded-[32px] p-8">
            <h2 className="text-2xl font-semibold">Role snapshot</h2>
            <div className="mt-6 space-y-4 text-sm text-[var(--color-muted)]">
              <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">Applicants in pipeline: {job.applicants}</div>
              <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">Average AI fit score: {job.fitRate}%</div>
              <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">Published: {job.postedOn}</div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
