"use client";

import * as React from "react";
import Link from "next/link";
import { BriefcaseBusiness, Loader2, PlusCircle } from "lucide-react";
import { ShareDestinations } from "@/components/jobs/share-destinations";
import { DataTable } from "@/components/shared/data-table";
import { SearchBar } from "@/components/shared/search-bar";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type JobListItem = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  status?: string | null;
  is_public?: boolean;
  public_url?: string | null;
  applications_count?: number;
  created_at?: string | null;
};

function formatStatus(status?: string | null) {
  const normalized = (status ?? "draft").toLowerCase();
  if (normalized === "open") return "Active";
  if (normalized === "on_hold") return "Paused";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
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

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<JobListItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;

    async function loadJobs() {
      setError(null);

      try {
        const response = await fetch("/api/jobs", { cache: "no-store" });
        const data = (await response.json().catch(() => null)) as JobListItem[] | { message?: string } | null;

        if (!response.ok || !Array.isArray(data)) {
          if (active) {
            setError((data as { message?: string } | null)?.message ?? "Failed to load jobs.");
          }
          return;
        }

        if (active) {
          setJobs(data);
        }
      } catch {
        if (active) {
          setError("Could not load job postings right now.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadJobs();

    return () => {
      active = false;
    };
  }, []);

  const publishedRoles = jobs.filter((job) => (job.status ?? "").toLowerCase() === "open").length;
  const totalApplications = jobs.reduce((sum, job) => sum + (job.applications_count ?? 0), 0);
  const publicJobs = jobs.filter((job) => Boolean(job.is_public && job.public_url && (job.status ?? "").toLowerCase() === "open"));

  const jobStats = [
    { label: "Published roles", value: String(publishedRoles), delta: publishedRoles ? "Open roles ready for hiring" : "No published roles yet" },
    { label: "Share-ready roles", value: String(publicJobs.length), delta: publicJobs.length ? "Career-site links are ready" : "No public links shared yet" },
    { label: "Applications", value: String(totalApplications), delta: totalApplications ? "Applications linked to live requisitions" : "No applications yet" },
    { label: "Total roles", value: String(jobs.length), delta: jobs.length ? "Single live source of truth" : "Create your first role" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
            <BriefcaseBusiness className="h-4 w-4" />
            Job portfolio
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Requisitions and job posting management</h1>
          <p className="mt-2 text-[var(--color-muted)]">Consolidated job management with a single active source of truth.</p>
        </div>
        <Button asChild>
          <Link href="/jobs/new">
            <PlusCircle className="h-4 w-4" />
            Create job
          </Link>
        </Button>
      </section>

      <SearchBar placeholder="Search jobs by title, department, or location" actionLabel="Apply filters" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {jobStats.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      {error ? <div className="rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}

      {isLoading ? (
        <div className="flex items-center gap-3 rounded-[28px] border border-[var(--color-border)] px-6 py-5 text-sm text-[var(--color-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading job postings…
        </div>
      ) : (
        <DataTable
          title="All job postings"
          rows={jobs.map((job) => ({
            id: job.id,
            primary: job.title,
            secondary: `${job.department || "General"} · ${formatExperienceLevel(job.experience_level)}`,
            meta: `${job.location || "Location not specified"} · ${formatEmploymentType(job.employment_type)}`,
            metric: `${job.applications_count ?? 0} applicants`,
            status: formatStatus(job.status),
            href: job.is_public && job.public_url ? `/jobs/${job.public_url}` : undefined,
          }))}
        />
      )}

      {publicJobs.length ? (
        <section className="grid gap-4">
          <div>
            <h2 className="text-xl font-semibold">Career-site links ready to share</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              These public URLs are social-share ready. When shared on LinkedIn or other platforms, they route candidates to the full job page and application form.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {publicJobs.map((job) => {
              const publicPath = `/jobs/${job.public_url}`;

              return (
                <Card key={job.id} className="rounded-[28px] p-6">
                  <div className="flex h-full flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        {job.department || "General"} · {job.location || "Public career page"}
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-muted)]">
                      {publicPath}
                    </div>

                    <div className="mt-auto">
                      <ShareDestinations path={publicPath} title={job.title} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
