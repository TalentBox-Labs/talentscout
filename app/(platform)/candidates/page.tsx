"use client";

import * as React from "react";
import { FileUp, Loader2, PlusCircle, Sparkles, UserRound } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CandidateListItem = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  current_position?: string | null;
  current_company?: string | null;
  location?: string | null;
  years_of_experience?: number | null;
  created_at: string;
};

type ParsedResumeData = {
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
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary?: string;
  skills?: string[];
  total_experience_years?: number;
  experience?: Array<{
    company?: string;
    title?: string;
    location?: string;
    is_current?: boolean;
  }>;
};

type ResumeParseResponse = {
  parsed_data?: ParsedResumeData;
};

type BulkUploadResult = {
  filename: string;
  status: "created" | "skipped" | "failed";
  reason?: string;
  candidate_id?: string;
  name?: string;
  email?: string;
};

type BulkUploadResponse = {
  message: string;
  total_files: number;
  created_count: number;
  skipped_count: number;
  failed_count: number;
  results: BulkUploadResult[];
};

type CandidateForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  currentPosition: string;
  currentCompany: string;
  yearsOfExperience: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
};

const emptyForm: CandidateForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  currentPosition: "",
  currentCompany: "",
  yearsOfExperience: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
};

function splitParsedName(parsed: ParsedResumeData | undefined) {
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

  return hasGeoSignal && !looksSuspicious ? normalized : "";
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

export default function CandidatesPage() {
  const [candidates, setCandidates] = React.useState<CandidateListItem[]>([]);
  const [search, setSearch] = React.useState("");
  const [form, setForm] = React.useState<CandidateForm>(emptyForm);
  const [resumeInsights, setResumeInsights] = React.useState<{ summary?: string; skills?: string[] } | null>(null);
  const [selectedResumeFile, setSelectedResumeFile] = React.useState<File | null>(null);
  const [selectedResumeName, setSelectedResumeName] = React.useState<string | null>(null);
  const [selectedBulkFiles, setSelectedBulkFiles] = React.useState<File[]>([]);
  const [bulkUploadResult, setBulkUploadResult] = React.useState<BulkUploadResponse | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isParsingResume, setIsParsingResume] = React.useState(false);
  const [isBulkUploading, setIsBulkUploading] = React.useState(false);

  const loadCandidates = React.useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/candidates", { cache: "no-store" });
      const data = (await response.json().catch(() => null)) as (CandidateListItem[] & { message?: string }) | null;

      if (!response.ok || !Array.isArray(data)) {
        setError((data as { message?: string } | null)?.message ?? "Failed to load candidates.");
        setCandidates([]);
        return;
      }

      setCandidates(data);
    } catch {
      setError("Could not load candidate profiles right now.");
      setCandidates([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadCandidates();
  }, [loadCandidates]);

  const filteredCandidates = candidates.filter((candidate) => {
    const haystack = [
      `${candidate.first_name} ${candidate.last_name}`,
      candidate.email,
      candidate.current_position,
      candidate.current_company,
      candidate.location,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(search.trim().toLowerCase());
  });

  const addedLast7Days = candidates.filter((candidate) => Date.now() - new Date(candidate.created_at).getTime() <= 7 * 24 * 60 * 60 * 1000).length;
  const withKnownRole = candidates.filter((candidate) => Boolean(candidate.current_position)).length;
  const withKnownLocation = candidates.filter((candidate) => Boolean(candidate.location)).length;
  const avgExperience = candidates.length
    ? Math.round(
        candidates.reduce((sum, candidate) => sum + Number(candidate.years_of_experience ?? 0), 0) /
          Math.max(candidates.filter((candidate) => Number.isFinite(Number(candidate.years_of_experience ?? 0))).length, 1),
      )
    : 0;

  const candidateStats = [
    { label: "Profiles created", value: String(candidates.length), delta: `${addedLast7Days} added in the last 7 days` },
    { label: "Role-ready profiles", value: String(withKnownRole), delta: "Current position captured" },
    { label: "Location captured", value: String(withKnownLocation), delta: "Useful for search and filtering" },
    { label: "Avg. experience", value: `${avgExperience} yrs`, delta: "Based on candidate profiles with experience data" },
  ];

  function updateForm(field: keyof CandidateForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleResumeParse(event: React.ChangeEvent<HTMLInputElement>) {
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

      setForm((current) => ({
        ...current,
        firstName: parsedName.firstName || current.firstName,
        lastName: parsedName.lastName || current.lastName,
        email: sanitizeField(parsed.contact?.email) || current.email,
        phone: sanitizeField(parsed.contact?.phone) || current.phone,
        location: sanitizeLocation(parsed.contact?.location) || current.location,
        currentPosition: sanitizeField(parsed.current_position) || current.currentPosition,
        currentCompany: sanitizeCompany(parsed.current_company, fullName) || current.currentCompany,
        yearsOfExperience:
          parsed.total_experience_years !== undefined && parsed.total_experience_years !== null
            ? String(parsed.total_experience_years)
            : current.yearsOfExperience,
        linkedinUrl: parsed.contact?.linkedin ?? current.linkedinUrl,
        githubUrl: parsed.contact?.github ?? current.githubUrl,
        portfolioUrl: parsed.contact?.portfolio ?? current.portfolioUrl,
      }));

      setResumeInsights({
        summary: parsed.summary,
        skills: parsed.skills,
      });
      setMessage("Resume parsed successfully. Review the auto-filled profile, then save it.");
    } catch {
      setError("Could not reach the resume parsing service.");
    } finally {
      setIsParsingResume(false);
      event.target.value = "";
    }
  }

  function handleBulkFileSelection(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);

    if (!files.length) {
      setSelectedBulkFiles([]);
      return;
    }

    if (files.length > 25) {
      setError("Please select up to 25 resume files per batch upload.");
      return;
    }

    setError(null);
    setBulkUploadResult(null);
    setSelectedBulkFiles(files);
  }

  async function handleBulkUpload() {
    if (!selectedBulkFiles.length) {
      setError("Choose one or more resumes before starting a bulk upload.");
      return;
    }

    setIsBulkUploading(true);
    setError(null);
    setMessage(null);
    setBulkUploadResult(null);

    try {
      const payload = new FormData();
      selectedBulkFiles.forEach((file) => payload.append("files", file));

      const response = await fetch("/api/candidates/bulk-resumes", {
        method: "POST",
        body: payload,
      });

      const data = (await response.json().catch(() => null)) as (BulkUploadResponse & { message?: string; detail?: string }) | null;

      if (!response.ok || !data) {
        setError(data?.message ?? data?.detail ?? "Bulk profile upload failed.");
        return;
      }

      setBulkUploadResult(data);
      setSelectedBulkFiles([]);
      setMessage(`Bulk upload complete: ${data.created_count} created, ${data.skipped_count} skipped, ${data.failed_count} failed.`);
      await loadCandidates();
    } catch {
      setError("Could not upload multiple candidate profiles right now.");
    } finally {
      setIsBulkUploading(false);
    }
  }

  async function handleCreateCandidate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsCreating(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || undefined,
          location: form.location.trim() || undefined,
          linkedin_url: form.linkedinUrl.trim() || undefined,
          github_url: form.githubUrl.trim() || undefined,
          portfolio_url: form.portfolioUrl.trim() || undefined,
          current_position: form.currentPosition.trim() || undefined,
          current_company: form.currentCompany.trim() || undefined,
          years_of_experience: form.yearsOfExperience ? Number(form.yearsOfExperience) : undefined,
        }),
      });

      const data = (await response.json().catch(() => null)) as { id?: string; message?: string; first_name?: string; last_name?: string } | null;

      if (!response.ok) {
        setError(data?.message ?? "Failed to create candidate profile.");
        return;
      }

      if (selectedResumeFile && data?.id) {
        const resumePayload = new FormData();
        resumePayload.append("file", selectedResumeFile);

        const uploadResponse = await fetch(`/api/candidates/${data.id}/resume`, {
          method: "POST",
          body: resumePayload,
        });

        const uploadData = (await uploadResponse.json().catch(() => null)) as { message?: string } | null;

        if (!uploadResponse.ok) {
          setError(uploadData?.message ?? "Candidate profile was created, but resume upload failed.");
          await loadCandidates();
          return;
        }
      }

      setForm(emptyForm);
      setResumeInsights(null);
      setSelectedResumeFile(null);
      setSelectedResumeName(null);
      setMessage(`${`Candidate profile created for ${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim()}${selectedResumeFile ? " and resume uploaded." : "."}`);
      await loadCandidates();
    } catch {
      setError("Could not save the candidate profile right now.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Candidate pipeline</h1>
        <p className="mt-2 text-[var(--color-muted)]">Create candidate profiles manually, upload a resume to auto-fill data, and manage the live directory from one workspace.</p>
      </section>

      <section className="surface-card grid gap-4 rounded-[28px] p-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search candidates by name, company, role, or location"
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap items-center justify-start gap-3 lg:justify-end">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
            <UserRound className="h-4 w-4" />
            Live candidate workspace
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-sm font-semibold text-[var(--color-fg)] transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
            {isParsingResume ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
            Upload resume to auto-fill
            <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleResumeParse} disabled={isParsingResume} />
          </label>
        </div>
      </section>

      {message ? <div className="rounded-[22px] border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div> : null}
      {error ? <div className="rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {candidateStats.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <DataTable
          title="Candidate directory"
          rows={filteredCandidates.map((candidate) => ({
            id: candidate.id,
            primary: `${candidate.first_name} ${candidate.last_name}`.trim(),
            secondary: `${candidate.current_position || "Candidate profile"}${candidate.current_company ? ` · ${candidate.current_company}` : ""}`,
            meta: `${candidate.location || "Location not set"} · ${candidate.years_of_experience ?? 0} yrs exp`,
            metric: candidate.email,
            status: candidate.current_position ? "Profile ready" : "New",
            href: `/candidates/${candidate.id}`,
          }))}
        />
        <Card className="rounded-[28px] p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Create candidate profile</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Manual entry is supported, and resume upload can auto-fill the form first.</p>
            </div>
            <Badge tone="primary">New</Badge>
          </div>
          <form className="mt-5 space-y-4" onSubmit={handleCreateCandidate}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={form.firstName} onChange={(event) => updateForm("firstName", event.target.value)} placeholder="First name" required />
              <Input value={form.lastName} onChange={(event) => updateForm("lastName", event.target.value)} placeholder="Last name" required />
            </div>
            <Input type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} placeholder="Email" required />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="Phone" />
              <Input value={form.location} onChange={(event) => updateForm("location", event.target.value)} placeholder="Location" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={form.currentPosition} onChange={(event) => updateForm("currentPosition", event.target.value)} placeholder="Current position" />
              <Input value={form.currentCompany} onChange={(event) => updateForm("currentCompany", event.target.value)} placeholder="Current company" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input type="number" min="0" value={form.yearsOfExperience} onChange={(event) => updateForm("yearsOfExperience", event.target.value)} placeholder="Years of experience" />
              <Input value={form.portfolioUrl} onChange={(event) => updateForm("portfolioUrl", event.target.value)} placeholder="Portfolio URL" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={form.linkedinUrl} onChange={(event) => updateForm("linkedinUrl", event.target.value)} placeholder="LinkedIn URL" />
              <Input value={form.githubUrl} onChange={(event) => updateForm("githubUrl", event.target.value)} placeholder="GitHub URL" />
            </div>
            <div className="rounded-[24px] border border-dashed border-[var(--color-border)] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-fg)]">
                <FileUp className="h-4 w-4 text-[var(--color-primary)]" />
                Attach resume (PDF, Word .docx, or TXT)
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                This file will be uploaded to the candidate profile after you save it. You can also use it for auto-fill above.
              </p>
              <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-sm font-semibold text-[var(--color-fg)] transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
                <FileUp className="h-4 w-4" />
                {selectedResumeName ? "Change attached resume" : "Choose resume file"}
                <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleResumeParse} disabled={isCreating || isParsingResume} />
              </label>
              {selectedResumeName ? <p className="mt-3 text-sm font-medium text-[var(--color-fg)]">Attached: {selectedResumeName}</p> : null}
            </div>
            <Button type="submit" disabled={isCreating || isParsingResume} className="w-full justify-center">
              {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
              Save candidate profile
            </Button>
          </form>

          <div className="mt-6 rounded-[24px] border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
            <div className="flex items-center gap-2 font-medium text-[var(--color-fg)]">
              <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
              Resume auto-fill
            </div>
            <p className="mt-2">Upload a resume and the form will auto-fill first name, last name, email, phone, location, latest role, company, portfolio links, and experience whenever the resume contains them.</p>
            {selectedResumeName ? <p className="mt-3 font-medium text-[var(--color-fg)]">Selected file: {selectedResumeName}</p> : null}
            {resumeInsights?.summary ? <p className="mt-3 leading-6">{resumeInsights.summary}</p> : null}
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
        </Card>
      </section>

      <Card className="rounded-[28px] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Bulk candidate upload</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Upload up to 25 resumes in one batch to create multiple candidate profiles automatically.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-sm font-semibold text-[var(--color-fg)] transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
              <FileUp className="h-4 w-4" />
              Choose multiple resumes
              <input type="file" multiple accept=".pdf,.docx,.txt" className="hidden" onChange={(event) => handleBulkFileSelection(event.target.files)} disabled={isBulkUploading} />
            </label>
            <Button type="button" variant="outline" onClick={handleBulkUpload} disabled={!selectedBulkFiles.length || isBulkUploading}>
              {isBulkUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
              Upload multiple profiles
            </Button>
          </div>
        </div>

        <div className="mt-4 rounded-[24px] border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
          <p>
            Selected files: <span className="font-semibold text-[var(--color-fg)]">{selectedBulkFiles.length}</span>
          </p>
          {selectedBulkFiles.length ? (
            <ul className="mt-3 space-y-2 text-[var(--color-fg)]">
              {selectedBulkFiles.slice(0, 8).map((file) => (
                <li key={`${file.name}-${file.lastModified}`}>• {file.name}</li>
              ))}
              {selectedBulkFiles.length > 8 ? <li>• +{selectedBulkFiles.length - 8} more files selected</li> : null}
            </ul>
          ) : (
            <p className="mt-2">Choose PDF, DOCX, or TXT resumes to create candidate profiles in bulk.</p>
          )}
        </div>

        {bulkUploadResult ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[24px] border border-[var(--color-border)] p-4">
              <h3 className="text-sm font-semibold text-[var(--color-fg)]">Latest batch summary</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Created</p>
                  <p className="text-2xl font-semibold text-[var(--color-fg)]">{bulkUploadResult.created_count}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Skipped</p>
                  <p className="text-2xl font-semibold text-[var(--color-fg)]">{bulkUploadResult.skipped_count}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Failed</p>
                  <p className="text-2xl font-semibold text-[var(--color-fg)]">{bulkUploadResult.failed_count}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[var(--color-border)] p-4">
              <h3 className="text-sm font-semibold text-[var(--color-fg)]">Per-file results</h3>
              <div className="mt-3 space-y-3">
                {bulkUploadResult.results.slice(0, 8).map((result) => (
                  <div key={`${result.filename}-${result.candidate_id ?? result.status}`} className="rounded-[20px] border border-[var(--color-border)] px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-[var(--color-fg)]">{result.filename}</p>
                      <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">{result.status}</span>
                    </div>
                    {result.name || result.email ? <p className="mt-2 text-sm text-[var(--color-muted)]">{[result.name, result.email].filter(Boolean).join(" · ")}</p> : null}
                    {result.reason ? <p className="mt-2 text-sm text-[var(--color-muted)]">{result.reason}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Card>

      {isLoading ? <div className="text-sm text-[var(--color-muted)]">Loading live candidates…</div> : null}
    </div>
  );
}
