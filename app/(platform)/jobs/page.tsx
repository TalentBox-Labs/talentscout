import Link from "next/link";
import { BriefcaseBusiness, PlusCircle } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { SearchBar } from "@/components/shared/search-bar";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { jobs } from "@/lib/mock-data";

const jobStats = [
  { label: "Published roles", value: "12", delta: "+3 this week" },
  { label: "Avg fit score", value: "87%", delta: "Strong sourcing quality" },
  { label: "Applications", value: "343", delta: "+29 since Monday" },
  { label: "Draft roles", value: "4", delta: "Needs approval" },
];

export default function JobsPage() {
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

      <DataTable
        title="All job postings"
        rows={jobs.map((job) => ({
          id: job.id,
          primary: job.title,
          secondary: `${job.department} · ${job.summary}`,
          meta: `${job.location} · ${job.schedule}`,
          metric: `${job.applicants} applicants`,
          status: job.status,
          href: `/jobs/${job.id}`,
        }))}
      />
    </div>
  );
}
