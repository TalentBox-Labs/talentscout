"use client";

import * as React from "react";
import { Loader2, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PublicJobApplicationFormProps = {
  publicUrl: string;
  jobTitle: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  currentPosition: string;
  currentCompany: string;
  yearsOfExperience: string;
  linkedinUrl: string;
  portfolioUrl: string;
  coverLetter: string;
};

type ApplicationResponse = {
  application_id?: string;
  message?: string;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  currentPosition: "",
  currentCompany: "",
  yearsOfExperience: "",
  linkedinUrl: "",
  portfolioUrl: "",
  coverLetter: "",
};

function parseOptionalInteger(value: string) {
  const normalized = value.trim();
  if (!normalized) {
    return undefined;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function PublicJobApplicationForm({ publicUrl, jobTitle }: PublicJobApplicationFormProps) {
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/public/jobs/${encodeURIComponent(publicUrl)}/apply`, {
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
          current_position: form.currentPosition.trim() || undefined,
          current_company: form.currentCompany.trim() || undefined,
          years_of_experience: parseOptionalInteger(form.yearsOfExperience),
          linkedin_url: form.linkedinUrl.trim() || undefined,
          portfolio_url: form.portfolioUrl.trim() || undefined,
          cover_letter: form.coverLetter.trim() || undefined,
        }),
      });

      const data = (await response.json().catch(() => null)) as ApplicationResponse | { message?: string } | null;
      const applicationId = data && "application_id" in data ? data.application_id : undefined;

      if (!response.ok || !applicationId) {
        setError((data as { message?: string } | null)?.message ?? "Could not submit your application right now.");
        return;
      }

      setMessage((data && "message" in data ? data.message : undefined) ?? `Your application for ${jobTitle} has been submitted.`);
      setForm(emptyForm);
    } catch {
      setError("Could not submit your application right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {message ? <div className="rounded-[22px] border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div> : null}
      {error ? <div className="rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">First name</span>
          <Input value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} placeholder="Alex" required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Last name</span>
          <Input value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} placeholder="Rivera" required />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Email</span>
          <Input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="alex@example.com" required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Phone</span>
          <Input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+91 98765 43210" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Location</span>
          <Input value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Surat, Gujarat" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Years of experience</span>
          <Input type="number" min="0" value={form.yearsOfExperience} onChange={(event) => updateField("yearsOfExperience", event.target.value)} placeholder="3" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Current position</span>
          <Input value={form.currentPosition} onChange={(event) => updateField("currentPosition", event.target.value)} placeholder="Full Stack Engineer" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Current company</span>
          <Input value={form.currentCompany} onChange={(event) => updateField("currentCompany", event.target.value)} placeholder="VideoSDK" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">LinkedIn profile</span>
          <Input value={form.linkedinUrl} onChange={(event) => updateField("linkedinUrl", event.target.value)} placeholder="https://linkedin.com/in/your-profile" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Portfolio / website</span>
          <Input value={form.portfolioUrl} onChange={(event) => updateField("portfolioUrl", event.target.value)} placeholder="https://yourportfolio.com" />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium">Cover letter / note</span>
        <textarea
          value={form.coverLetter}
          onChange={(event) => updateField("coverLetter", event.target.value)}
          placeholder="Tell the hiring team why you're a strong fit for this role."
          className="min-h-32 w-full rounded-[24px] border border-[var(--color-border)] bg-white/80 px-4 py-4 text-sm outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-dashed border-[var(--color-border)] px-4 py-4 text-sm text-[var(--color-muted)]">
        <p>Submitting here creates a candidate application directly against this public role.</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
          Apply now
        </Button>
      </div>
    </form>
  );
}
