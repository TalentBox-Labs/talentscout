import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, Clock3, Globe, MapPin, Sparkles, WalletCards } from "lucide-react";
import { CopyLinkButton } from "@/components/jobs/copy-link-button";
import { PublicJobApplicationForm } from "@/components/jobs/public-job-application-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getApiUrl } from "@/lib/auth";

type PublicJob = {
  id: string;
  title: string;
  description: string;
  requirements?: string | null;
  responsibilities?: string | null;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  skills_required?: string[];
  organization_name?: string | null;
  organization_website?: string | null;
  created_at?: string | null;
  settings?: {
    salary_visible?: boolean;
    experience_range?: {
      min_years?: number | null;
      max_years?: number | null;
    };
  } | null;
  public_url?: string | null;
};

function getSiteBaseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

async function fetchPublicJob(publicUrl: string) {
  const response = await fetch(getApiUrl(`/api/v1/jobs/public/${publicUrl}`), {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json().catch(() => null)) as PublicJob | null;
  return data;
}

function formatEmploymentType(value?: string | null) {
  return (value ?? "full_time")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatExperienceLevel(value?: string | null) {
  const normalized = (value ?? "mid").toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function formatPublishedDate(value?: string | null) {
  if (!value) {
    return "Recently published";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Recently published";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCompensation(job: PublicJob) {
  if (job.salary_min == null && job.salary_max == null) {
    return "Compensation shared during screening";
  }

  const currency = job.salary_currency ?? "USD";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  if (job.salary_min != null && job.salary_max != null) {
    return `${formatter.format(job.salary_min)} – ${formatter.format(job.salary_max)}`;
  }

  if (job.salary_min != null) {
    return `${formatter.format(job.salary_min)}+`;
  }

  return `Up to ${formatter.format(job.salary_max ?? 0)}`;
}

function formatExperienceRange(job: PublicJob) {
  const range = job.settings?.experience_range;
  const min = range?.min_years;
  const max = range?.max_years;

  if (min == null && max == null) {
    return `${formatExperienceLevel(job.experience_level)} level`;
  }

  if (min != null && max != null) {
    return `${min}–${max} years`;
  }

  if (min != null) {
    return `${min}+ years`;
  }

  return `Up to ${max} years`;
}

function buildSynopsis(job: PublicJob) {
  const parts = [
    job.organization_name,
    job.location,
    formatEmploymentType(job.employment_type),
    formatExperienceRange(job),
    job.salary_min != null || job.salary_max != null ? formatCompensation(job) : null,
  ].filter(Boolean);

  const description = job.description?.replace(/\s+/g, " ").trim() ?? "";
  const summary = description.length > 180 ? `${description.slice(0, 177)}…` : description;

  return [parts.join(" • "), summary].filter(Boolean).join(" — ");
}

function splitRichText(content?: string | null) {
  return (content ?? "")
    .split(/\n+/)
    .map((item) => item.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchPublicJob(id);

  if (!job) {
    return {
      title: "Job not found",
    };
  }

  const title = `${job.title} at ${job.organization_name ?? "TalentScout"}`;
  const description = buildSynopsis(job);
  const publicPath = `/jobs/${job.public_url ?? id}`;
  const absoluteUrl = `${getSiteBaseUrl()}${publicPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PublicJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await fetchPublicJob(id);

  if (!job) {
    notFound();
  }

  const publicPath = `/jobs/${job.public_url ?? id}`;
  const publicLink = `${getSiteBaseUrl()}${publicPath}`;
  const responsibilities = splitRichText(job.responsibilities);
  const requirements = splitRichText(job.requirements);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <header className="border-b border-[var(--color-border)] bg-white/70 px-6 py-5 backdrop-blur dark:bg-white/5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold">TalentScout Jobs</div>
            <div className="text-sm text-[var(--color-muted)]">Shareable public career page</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {job.organization_website ? (
              <Link href={job.organization_website} target="_blank" rel="noreferrer" className="text-sm font-medium text-[var(--color-primary)]">
                Visit company website
              </Link>
            ) : null}
            <CopyLinkButton value={publicLink} label="Copy job link" />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <section className="hero-gradient surface-card rounded-[36px] p-8 sm:p-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="primary">Career site ready</Badge>
              <Badge tone="success">Social-share synopsis enabled</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">{job.title}</h1>
            <p className="mt-3 text-lg font-medium text-[var(--color-fg)]/80">{job.organization_name ?? "TalentScout customer"}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--color-muted)] sm:text-base">
              <span className="inline-flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4" /> {job.department || "Hiring"}</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location || "Location shared during screening"}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {formatEmploymentType(job.employment_type)}</span>
              <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> {formatExperienceRange(job)}</span>
              <span className="inline-flex items-center gap-2"><WalletCards className="h-4 w-4" /> {formatCompensation(job)}</span>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{job.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#apply">
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <CopyLinkButton value={publicLink} label="Copy share link" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[32px] p-8">
            <h2 className="text-2xl font-semibold">About the role</h2>
            <p className="mt-4 leading-8 text-[var(--color-muted)]">{job.description}</p>

            {responsibilities.length ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Key responsibilities</h3>
                <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {requirements.length ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Requirements</h3>
                <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
                  {requirements.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {job.skills_required?.length ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Skills in focus</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills_required.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[32px] p-8">
              <h2 className="text-2xl font-semibold">Synopsis for social sharing</h2>
              <p className="mt-4 leading-7 text-[var(--color-muted)]">{buildSynopsis(job)}</p>
              <div className="mt-6 rounded-[24px] border border-[var(--color-border)] px-4 py-4 text-sm text-[var(--color-muted)]">
                Share the public job URL on LinkedIn, X, WhatsApp, email, or your career site. Platforms will pull this page metadata as the preview synopsis.
              </div>
            </Card>

            <Card className="rounded-[32px] p-8">
              <h2 className="text-2xl font-semibold">Role snapshot</h2>
              <div className="mt-6 space-y-4 text-sm text-[var(--color-muted)]">
                <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">Published: {formatPublishedDate(job.created_at)}</div>
                <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">Experience: {formatExperienceRange(job)}</div>
                <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">Compensation: {formatCompensation(job)}</div>
                <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">Public path: {publicPath}</div>
                {job.organization_website ? (
                  <div className="rounded-3xl border border-[var(--color-border)] px-4 py-4">
                    <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" /> {job.organization_website}</span>
                  </div>
                ) : null}
              </div>
            </Card>
          </div>
        </section>

        <section id="apply" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[32px] p-8">
            <h2 className="text-2xl font-semibold">Apply to this role</h2>
            <p className="mt-4 leading-7 text-[var(--color-muted)]">
              Submit your profile directly from this career page. Your application is attached to {job.title} inside the hiring pipeline automatically.
            </p>
            <div className="mt-6 rounded-[24px] border border-dashed border-[var(--color-border)] px-4 py-4 text-sm text-[var(--color-muted)]">
              Tip: include your current role, location, and LinkedIn URL so the hiring team gets a crisp snapshot without extra back-and-forth.
            </div>
          </Card>

          <Card className="rounded-[32px] p-8">
            <PublicJobApplicationForm publicUrl={job.public_url ?? id} jobTitle={job.title} />
          </Card>
        </section>
      </main>
    </div>
  );
}
