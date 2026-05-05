"use client";

import * as React from "react";
import Link from "next/link";
import { FileUp, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type JobOption = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  status?: string | null;
};

type CandidateCreateForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  currentPosition: string;
  currentCompany: string;
};

type ResumeParseResponse = {
  parsed_data?: {
    name?: string;
    first_name?: string;
    last_name?: string;
    headline?: string;
    current_position?: string;
    current_company?: string;
    contact?: {
      email?: string;
      phone?: string;
      location?: string;
      portfolio?: string;
    };
    experience?: Array<{
      company?: string;
      title?: string;
      is_current?: boolean;
    }>;
    summary?: string;
    skills?: string[];
  };
};

const emptyCandidateForm: CandidateCreateForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  currentPosition: "",
  currentCompany: "",
};

function splitParsedName(parsed: ResumeParseResponse["parsed_data"]) {
  const firstName = parsed?.first_name?.trim();
  const lastName = parsed?.last_name?.trim();

  if (firstName || lastName) {
    return { firstName: firstName ?? "", lastName: lastName ?? "" };
  }

  const combinedName = parsed?.name?.trim();
  if (!combinedName) {
    return { firstName: "", lastName: "" };
  }

  const parts = combinedName.split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

function normalizeText(value?: string | null) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function looksLikePersonName(value: string) {
  const words = normalizeText(value).split(" ").filter(Boolean);
  return words.length >= 2 && words.length <= 4 && words.every((word) => /^[A-Z][a-zA-Z'`.-]+$/.test(word));
}

function sanitizeLocation(value?: string | null) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return "";
  }

  const hasGeoSignal = normalized.includes(",") || /\b(remote|hybrid|onsite|india|usa|united states|uk|canada|texas|california|new york|karnataka|maharashtra|delhi|singapore)\b/i.test(normalized);
  const looksSuspicious = /@|linkedin|github|http|www\./i.test(normalized) || /\b(?:19|20)\d{2}\b/.test(normalized) || looksLikePersonName(normalized);

  if (!hasGeoSignal || looksSuspicious) {
    return "";
  }

  return normalized;
}

function sanitizeCompany(value?: string | null, fullName?: string) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return "";
  }

  const normalizedName = normalizeText(fullName).toLowerCase();
  const looksSuspicious =
    /@|linkedin|github|http|www\./i.test(normalized) ||
    /\b(?:19|20)\d{2}\b|\b(?:present|current|now)\b/i.test(normalized) ||
    looksLikePersonName(normalized) ||
    normalized.toLowerCase() === normalizedName;

  return looksSuspicious ? "" : normalized;
}

function sanitizeField(value?: string | null) {
  return normalizeText(value);
}

export default function NewApplicationPage() {
  const [jobs, setJobs] = React.useState<JobOption[]>([]);
  const [jobId, setJobId] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [candidateForm, setCandidateForm] = React.useState<CandidateCreateForm>(emptyCandidateForm);
  const [resumeInsights, setResumeInsights] = React.useState<{ summary?: string; skills?: string[] } | null>(null);
  const [selectedResumeFile, setSelectedResumeFile] = React.useState<File | null>(null);
  const [selectedResumeName, setSelectedResumeName] = React.useState<string | null>(null);
  const [selectedApplicationDocumentFile, setSelectedApplicationDocumentFile] = React.useState<File | null>(null);
  const [selectedApplicationDocumentName, setSelectedApplicationDocumentName] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isParsingResume, setIsParsingResume] = React.useState(false);

  const loadFormData = React.useCallback(async () => {
    setError(null);

    try {
      const jobsResponse = await fetch("/api/jobs", { cache: "no-store" });
      const jobsData = await jobsResponse.json().catch(() => null);

      if (!jobsResponse.ok || !Array.isArray(jobsData)) {
        setError((jobsData as { message?: string } | null)?.message ?? "Failed to load jobs for optional application linking.");
        return;
      }

      const openJobs = (jobsData as JobOption[]).filter((job) => (job.status || "").toLowerCase() === "open");
      setJobs(openJobs);
    } catch {
      setError("Could not load open jobs right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadFormData();
  }, [loadFormData]);

  function updateCandidateForm(field: keyof CandidateCreateForm, value: string) {
    setCandidateForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setCandidateForm(emptyCandidateForm);
    setResumeInsights(null);
    setSelectedResumeFile(null);
    setSelectedResumeName(null);
    setSelectedApplicationDocumentFile(null);
    setSelectedApplicationDocumentName(null);
    setJobId("");
  }

  async function handleCandidateResumeParse(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedResumeFile(file);
    setSelectedResumeName(file.name);
    setIsParsingResume(true);
    setError(null);
    setMessage(null);

    try {
      const payload = new FormData();
      payload.append("file", file);

      const response = await fetch("/api/candidates/parse-resume", {
        method: "POST",
        body: payload,
      });

      const data = (await response.json().catch(() => null)) as (ResumeParseResponse & { message?: string; detail?: string }) | null;

      if (!response.ok || !data) {
        setError(data?.message ?? data?.detail ?? "Could not parse the resume for auto-fill.");
        return;
      }

      const parsed = data.parsed_data ?? {};
      const parsedName = splitParsedName(parsed);
      const fullName = [parsedName.firstName, parsedName.lastName].filter(Boolean).join(" ");

      setCandidateForm((current) => ({
        ...current,
        firstName: parsedName.firstName || current.firstName,
        lastName: parsedName.lastName || current.lastName,
        email: sanitizeField(parsed.contact?.email) || current.email,
        phone: sanitizeField(parsed.contact?.phone) || current.phone,
        location: sanitizeLocation(parsed.contact?.location) || current.location,
        currentPosition: sanitizeField(parsed.current_position) || current.currentPosition,
        currentCompany: sanitizeCompany(parsed.current_company, fullName) || current.currentCompany,
      }));

      setResumeInsights({
        summary: parsed.summary,
        skills: parsed.skills,
      });
      setMessage("Resume parsed successfully. Review the profile fields before saving the profile.");
    } catch {
      setError("Could not reach the resume parsing service.");
    } finally {
      setIsParsingResume(false);
      event.target.value = "";
    }
  }

  async function createInlineCandidateProfile() {
    const response = await fetch("/api/candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: candidateForm.firstName.trim(),
        last_name: candidateForm.lastName.trim(),
        email: candidateForm.email.trim().toLowerCase(),
        phone: candidateForm.phone.trim() || undefined,
        location: candidateForm.location.trim() || undefined,
        current_position: candidateForm.currentPosition.trim() || undefined,
        current_company: candidateForm.currentCompany.trim() || undefined,
        source: "manual",
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      id?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      current_position?: string | null;
      message?: string;
    } | null;

    if (!response.ok || !data?.id) {
      throw new Error(data?.message ?? "Failed to create candidate profile.");
    }

    let uploadWarning: string | null = null;
    if (selectedResumeFile) {
      const resumePayload = new FormData();
      resumePayload.append("file", selectedResumeFile);

      const uploadResponse = await fetch(`/api/candidates/${data.id}/resume`, {
        method: "POST",
        body: resumePayload,
      });

      const uploadData = (await uploadResponse.json().catch(() => null)) as { message?: string } | null;

      if (!uploadResponse.ok) {
        throw new Error(uploadData?.message ?? "Candidate profile was created, but resume upload failed.");
      }

      if (uploadData?.message?.includes("background parsing is unavailable")) {
        uploadWarning = uploadData.message;
      }
    }

    const newCandidate = {
      id: data.id,
      first_name: data.first_name ?? candidateForm.firstName.trim(),
      last_name: data.last_name ?? candidateForm.lastName.trim(),
      email: data.email ?? candidateForm.email.trim().toLowerCase(),
      current_position: data.current_position ?? (candidateForm.currentPosition.trim() || null),
    };

    return { candidate: newCandidate, uploadWarning };
  }

  function handleApplicationDocumentSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSelectedApplicationDocumentFile(file);
    setSelectedApplicationDocumentName(file?.name ?? null);
  }

  async function uploadApplicationDocument(applicationId: string) {
    if (!selectedApplicationDocumentFile) {
      return null;
    }

    const payload = new FormData();
    payload.append("file", selectedApplicationDocumentFile);

    const response = await fetch(`/api/applications/${applicationId}/document`, {
      method: "POST",
      body: payload,
    });

    const data = (await response.json().catch(() => null)) as { message?: string; filename?: string } | null;
    if (!response.ok) {
      throw new Error(data?.message ?? "Profile and application were created, but the optional application document could not be uploaded.");
    }

    return data?.filename ?? selectedApplicationDocumentFile.name;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      if (!candidateForm.firstName.trim() || !candidateForm.lastName.trim() || !candidateForm.email.trim()) {
        setError("First name, last name, and email are required to create a new profile.");
        return;
      }

      let uploadWarning: string | null = null;
      const { candidate, uploadWarning: candidateUploadWarning } = await createInlineCandidateProfile();
      uploadWarning = candidateUploadWarning;

      if (!jobId) {
        setMessage(
          `Profile created for ${candidate.first_name} ${candidate.last_name}.${selectedApplicationDocumentFile ? " The optional application document was not uploaded because no job was selected yet." : ""}${uploadWarning ? ` ${uploadWarning}` : ""} You can attach the candidate to a job later from the pipeline.`,
        );
        resetForm();
        return;
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_id: candidate.id,
          job_id: jobId,
          source: "manual",
        }),
      });

      const data = (await response.json().catch(() => null)) as { id?: string; message?: string } | null;

      if (!response.ok || !data?.id) {
        setError(data?.message ?? "Profile was created, but the application could not be created.");
        return;
      }

      const selectedJob = jobs.find((job) => job.id === jobId);
      const uploadedDocumentName = await uploadApplicationDocument(data.id);

      setMessage(
        `Profile created for ${candidate.first_name} ${candidate.last_name} and attached to ${selectedJob?.title ?? "the selected role"}.${uploadedDocumentName ? ` Uploaded application document: ${uploadedDocumentName}.` : ""}${uploadWarning ? ` ${uploadWarning}` : ""}`,
      );
      resetForm();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Could not complete the application workflow right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="rounded-[32px] p-8">
        <h1 className="text-3xl font-bold tracking-tight">Create candidate profile</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Save the candidate profile first. Linking to an open job is optional and can be done now or later.
        </p>

        {message ? <div className="mt-6 rounded-[22px] border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div> : null}
        {error ? <div className="mt-6 rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}

        {isLoading ? (
          <div className="mt-8 flex items-center gap-3 text-sm text-[var(--color-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading optional job links…
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Card className="rounded-[28px] border border-[var(--color-border)] p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Profile details</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    This page now creates a profile directly. No profile dropdown, no mandatory job selection, and source defaults to manual behind the scenes.
                  </p>
                </div>
                <div className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                  Simplified UX
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input value={candidateForm.firstName} onChange={(event) => updateCandidateForm("firstName", event.target.value)} placeholder="First name" required />
                  <Input value={candidateForm.lastName} onChange={(event) => updateCandidateForm("lastName", event.target.value)} placeholder="Last name" required />
                </div>
                <Input type="email" value={candidateForm.email} onChange={(event) => updateCandidateForm("email", event.target.value)} placeholder="Email" required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input value={candidateForm.phone} onChange={(event) => updateCandidateForm("phone", event.target.value)} placeholder="Phone" />
                  <Input value={candidateForm.location} onChange={(event) => updateCandidateForm("location", event.target.value)} placeholder="Location" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input value={candidateForm.currentPosition} onChange={(event) => updateCandidateForm("currentPosition", event.target.value)} placeholder="Current position" />
                  <Input value={candidateForm.currentCompany} onChange={(event) => updateCandidateForm("currentCompany", event.target.value)} placeholder="Current company" />
                </div>

                <div className="rounded-[24px] border border-dashed border-[var(--color-border)] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-fg)]">
                    {isParsingResume ? <Loader2 className="h-4 w-4 animate-spin text-[var(--color-primary)]" /> : <FileUp className="h-4 w-4 text-[var(--color-primary)]" />}
                    Attach resume (PDF, Word .docx, or TXT)
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    We only auto-fill fields when the resume clearly contains them. If company or location is unclear, those fields stay blank for manual review.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-sm font-semibold text-[var(--color-fg)] transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
                      <FileUp className="h-4 w-4" />
                      {selectedResumeName ? "Change attached resume" : "Choose resume file"}
                      <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleCandidateResumeParse} disabled={isSubmitting || isParsingResume} />
                    </label>
                  </div>
                  {selectedResumeName ? <p className="mt-3 text-sm font-medium text-[var(--color-fg)]">Attached: {selectedResumeName}</p> : null}
                  {resumeInsights?.summary ? <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{resumeInsights.summary}</p> : null}
                  {resumeInsights?.skills?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {resumeInsights.skills.slice(0, 8).map((skill) => (
                        <span key={skill} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-muted)]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>

            <Card className="rounded-[28px] border border-[var(--color-border)] p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Optional: attach to an open job now</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Skip this if you only want to create the profile. Application source defaults to manual and can be edited later.
                  </p>
                </div>
                <div className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                  Optional
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium">Open job</span>
                  <select
                    value={jobId}
                    onChange={(event) => setJobId(event.target.value)}
                    className="h-11 w-full rounded-full border border-[var(--color-border)] bg-white/80 px-4 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
                  >
                    <option value="">Do not attach to a job right now</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} · {job.department || job.location || "Open role"}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="rounded-[24px] border border-dashed border-[var(--color-border)] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-fg)]">
                    <FileUp className="h-4 w-4 text-[var(--color-primary)]" />
                    Optional application document
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    Upload a cover letter or supporting file only if you are also attaching the profile to a job now.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-sm font-semibold text-[var(--color-fg)] transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
                      <FileUp className="h-4 w-4" />
                      {selectedApplicationDocumentName ? "Change application document" : "Choose application document"}
                      <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleApplicationDocumentSelection} disabled={isSubmitting} />
                    </label>
                  </div>
                  {selectedApplicationDocumentName ? <p className="mt-3 text-sm font-medium text-[var(--color-fg)]">Attached: {selectedApplicationDocumentName}</p> : null}
                </div>

                <div className="rounded-[24px] border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
                  <div className="flex items-center gap-2 font-medium text-[var(--color-fg)]">
                    <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
                    What happens on submit
                  </div>
                  <ul className="mt-3 space-y-2 leading-6">
                    <li>• The candidate profile is always created first.</li>
                    <li>• If you selected a job, the application is created with source set to manual.</li>
                    <li>• If you also selected a supporting document, it is uploaded to that application.</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="mt-2 flex justify-end gap-3">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {jobId ? "Create profile and application" : "Create profile"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
