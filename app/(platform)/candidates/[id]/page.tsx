import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { backendFetch } from "@/lib/admin-server";

type CandidateDetail = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  resume_url?: string | null;
  current_position?: string | null;
  current_company?: string | null;
  years_of_experience?: number | null;
  summary?: string | null;
  skills?: Array<{ id?: string; name: string }> | null;
  source_details?: {
    source?: string;
    ingestion_channel?: string;
    owner_user_name?: string;
    owner_user_id?: string;
    parsing_warning?: string;
    change_history?: Array<{
      event_type?: string;
      timestamp?: string;
      actor_user_name?: string;
      source?: string;
      filename?: string;
      changed_fields?: Record<string, { from?: unknown; to?: unknown }>;
    }>;
  } | null;
};

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response } = await backendFetch(`/api/v1/candidates/${id}`);

  if (!response?.ok) {
    notFound();
  }

  const candidate = (await response.json().catch(() => null)) as CandidateDetail | null;

  if (!candidate) {
    notFound();
  }

  const fullName = `${candidate.first_name} ${candidate.last_name}`.trim();
  const skillList = candidate.skills ?? [];
  const sourceDetails = candidate.source_details ?? null;
  const recentHistory = [...(sourceDetails?.change_history ?? [])].reverse().slice(0, 5);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="surface-card hero-gradient grid gap-8 rounded-[32px] p-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Badge tone="primary">Candidate profile</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{fullName}</h1>
          <p className="mt-2 text-lg text-[var(--color-muted)]">{candidate.current_position || "Candidate"}{candidate.current_company ? ` · ${candidate.current_company}` : ""}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
            <span>{candidate.location || "Location not set"}</span>
            {candidate.years_of_experience !== undefined && candidate.years_of_experience !== null ? (
              <>
                <span>•</span>
                <span>{candidate.years_of_experience} years experience</span>
              </>
            ) : null}
            <span>•</span>
            <span>{candidate.email}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {skillList.length ? (
              skillList.map((skill) => (
                <span key={skill.id ?? skill.name} className="rounded-full border border-[var(--color-border)] bg-white/60 px-3 py-1.5 text-sm dark:bg-white/5">
                  {skill.name}
                </span>
              ))
            ) : (
              <span className="rounded-full border border-[var(--color-border)] bg-white/60 px-3 py-1.5 text-sm text-[var(--color-muted)] dark:bg-white/5">
                Skills not added yet
              </span>
            )}
          </div>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <a href={`mailto:${candidate.email}`}>Message candidate</a>
            </Button>
            {candidate.resume_url ? (
              <Button variant="outline" asChild>
                <a href={candidate.resume_url} target="_blank" rel="noreferrer">Open resume</a>
              </Button>
            ) : (
              <Button variant="outline" disabled>No resume uploaded</Button>
            )}
          </div>
        </div>
        <Card className="rounded-[30px] p-6">
          <div className="text-sm text-[var(--color-muted)]">Profile completeness</div>
          <div className="mt-3 text-6xl font-black text-[var(--color-primary)]">{Math.min(100, 40 + (skillList.length > 0 ? 20 : 0) + (candidate.resume_url ? 20 : 0) + (candidate.current_position ? 20 : 0))}</div>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Higher completeness means this candidate is easier to match, review, and move through the funnel.</p>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">AI summary</h2>
          <p className="mt-4 leading-7 text-[var(--color-muted)]">
            {candidate.summary?.trim() || `${fullName} has a live candidate profile in HireStack. Uploading a resume and enriching skills or experience details will make matching and recruiter review even stronger.`}
          </p>
        </Card>
        <Card className="rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">Profile details</h2>
          <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <div>Phone: {candidate.phone || "Not provided"}</div>
            <div>LinkedIn: {candidate.linkedin_url || "Not provided"}</div>
            <div>GitHub: {candidate.github_url || "Not provided"}</div>
            <div>Portfolio: {candidate.portfolio_url || "Not provided"}</div>
            <div>Source: {sourceDetails?.source || "Not tracked yet"}</div>
            <div>Recruiter owner: {sourceDetails?.owner_user_name || "Not assigned"}</div>
            <div>Ingestion channel: {sourceDetails?.ingestion_channel || "Not tracked yet"}</div>
          </div>
          {sourceDetails?.parsing_warning ? <p className="mt-4 text-sm text-amber-700">{sourceDetails.parsing_warning}</p> : null}
        </Card>
      </section>

      <section>
        <Card className="rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">Profile activity</h2>
          {recentHistory.length ? (
            <div className="mt-4 space-y-4">
              {recentHistory.map((entry, index) => {
                const changedFieldCount = Object.keys(entry.changed_fields ?? {}).length;
                return (
                  <div key={`${entry.timestamp ?? index}-${entry.event_type ?? "event"}`} className="rounded-[22px] border border-[var(--color-border)] p-4 text-sm">
                    <div className="font-medium text-[var(--color-fg)]">
                      {(entry.event_type || "updated").replaceAll("_", " ")} · {entry.actor_user_name || "System"}
                    </div>
                    <div className="mt-1 text-[var(--color-muted)]">
                      {entry.timestamp ? new Date(entry.timestamp).toLocaleString() : "Time not recorded"}
                    </div>
                    {entry.source ? <div className="mt-2 text-[var(--color-muted)]">Source: {entry.source}</div> : null}
                    {entry.filename ? <div className="mt-2 text-[var(--color-muted)]">File: {entry.filename}</div> : null}
                    {changedFieldCount ? <div className="mt-2 text-[var(--color-muted)]">Fields changed: {changedFieldCount}</div> : null}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--color-muted)]">No change history has been recorded for this profile yet.</p>
          )}
        </Card>
      </section>
    </div>
  );
}
