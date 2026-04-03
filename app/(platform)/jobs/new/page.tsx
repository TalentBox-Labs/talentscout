import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function NewJobPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <section>
        <Badge tone="primary">Job posting builder</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Create a production-ready job posting</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted)]">This page replaces the broken `/dashboard/jobs/new` link and keeps creation inside the cleaned route structure.</p>
      </section>

      <Card className="grid gap-6 rounded-[32px] p-8 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Job title</span>
          <Input placeholder="Senior Frontend Engineer" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Department</span>
          <Input placeholder="Engineering" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Location</span>
          <Input placeholder="Remote (US)" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Compensation</span>
          <Input placeholder="$145k – $180k" />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium">Role summary</span>
          <textarea className="min-h-36 w-full rounded-[24px] border border-[var(--color-border)] bg-white/80 px-4 py-4 text-sm outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5" placeholder="Brief summary for the hiring team and public job board." />
        </label>
        <div className="md:col-span-2 flex flex-wrap justify-between gap-4 rounded-[28px] border border-dashed border-[var(--color-border)] p-5">
          <div>
            <CardTitle>Publishing checks</CardTitle>
            <CardDescription className="mt-1">Required fields, compensation, and screening workflow are ready for review.</CardDescription>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Save draft</Button>
            <Button>Publish job</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
