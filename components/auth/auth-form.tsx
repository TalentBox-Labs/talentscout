"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  mode: "login" | "signup";
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
  justification: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  organizationName: "",
  justification: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const banner = useMemo(() => {
    if (mode !== "login") {
      return null;
    }

    if (searchParams.get("registered") === "pending") {
      return "Your registration was submitted. An administrator needs to approve the account before you can log in.";
    }

    if (searchParams.get("logged_out") === "1") {
      return "You’ve been logged out successfully.";
    }

    return null;
  }, [mode, searchParams]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    if (!isValidEmail(form.email.trim())) {
      return "Enter a valid work email address.";
    }

    if (form.password.trim().length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (mode === "signup") {
      if (!form.firstName.trim()) {
        return "First name is required.";
      }

      if (!form.lastName.trim()) {
        return "Last name is required.";
      }
    }

    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          organizationName: form.organizationName.trim(),
          justification: form.justification.trim(),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        pendingApproval?: boolean;
      };

      if (!response.ok) {
        setError(result.message ?? "Authentication request failed.");
        return;
      }

      if (mode === "signup" && result.pendingApproval) {
        router.replace("/login?registered=pending");
        router.refresh();
        return;
      }

      setSuccess(result.message ?? (mode === "login" ? "Logged in successfully." : "Account created successfully."));

      const nextPath = searchParams.get("next") || "/dashboard";
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Could not reach the authentication service. Make sure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {banner ? <div className="rounded-[22px] border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{banner}</div> : null}
      {error ? <div className="rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}
      {success ? <div className="rounded-[22px] border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</div> : null}

      {mode === "signup" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} name="firstName" type="text" placeholder="First name" autoComplete="given-name" />
          <Input value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} name="lastName" type="text" placeholder="Last name" autoComplete="family-name" />
        </div>
      ) : null}

      <Input value={form.email} onChange={(event) => updateField("email", event.target.value)} name="email" type="email" placeholder="Work email" autoComplete="email" />
      <Input value={form.password} onChange={(event) => updateField("password", event.target.value)} name="password" type="password" placeholder="Password" autoComplete={mode === "signup" ? "new-password" : "current-password"} />

      {mode === "signup" ? (
        <>
          <Input value={form.organizationName} onChange={(event) => updateField("organizationName", event.target.value)} name="organizationName" type="text" placeholder="Organization name" autoComplete="organization" />
          <textarea
            value={form.justification}
            onChange={(event) => updateField("justification", event.target.value)}
            name="justification"
            placeholder="Why do you need access to HireStack (TalentOS)?"
            className="min-h-28 w-full rounded-[24px] border border-[var(--color-border)] bg-white/80 px-4 py-3 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
          />
        </>
      ) : null}

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {mode === "login" ? "Log in" : "Create account"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}