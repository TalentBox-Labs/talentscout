"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ShareDestinations } from "@/components/jobs/share-destinations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CurrencyCode =
  | "AED"
  | "AUD"
  | "BDT"
  | "BRL"
  | "CAD"
  | "CHF"
  | "EUR"
  | "GBP"
  | "HKD"
  | "IDR"
  | "INR"
  | "JPY"
  | "LKR"
  | "MXN"
  | "MYR"
  | "NOK"
  | "NZD"
  | "PHP"
  | "PKR"
  | "SAR"
  | "SEK"
  | "SGD"
  | "THB"
  | "USD"
  | "VND"
  | "ZAR";

type ExperienceLevel = "entry" | "junior" | "mid" | "senior" | "lead" | "principal";
type EmploymentType = "full_time" | "part_time" | "contract" | "temporary" | "internship";

type JobFormState = {
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  responsibilities: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  experienceMinYears: string;
  experienceMaxYears: string;
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: CurrencyCode;
  showSalary: boolean;
  skills: string;
};

type JobCreateResponse = {
  id?: string;
  title?: string;
  status?: string;
  public_url?: string | null;
  message?: string;
};

const currencyOptions: Array<{ value: CurrencyCode; label: string }> = [
  { value: "USD", label: "USD ($)" },
  { value: "INR", label: "INR (₹)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "CAD", label: "CAD (C$)" },
  { value: "AUD", label: "AUD (A$)" },
  { value: "SGD", label: "SGD (S$)" },
  { value: "AED", label: "AED (د.إ)" },
  { value: "SAR", label: "SAR (﷼)" },
  { value: "JPY", label: "JPY (¥)" },
  { value: "CHF", label: "CHF" },
  { value: "ZAR", label: "ZAR (R)" },
  { value: "MXN", label: "MXN ($)" },
  { value: "BRL", label: "BRL (R$)" },
  { value: "SEK", label: "SEK (kr)" },
  { value: "NOK", label: "NOK (kr)" },
  { value: "NZD", label: "NZD (NZ$)" },
  { value: "HKD", label: "HKD (HK$)" },
  { value: "MYR", label: "MYR (RM)" },
  { value: "THB", label: "THB (฿)" },
  { value: "IDR", label: "IDR (Rp)" },
  { value: "PHP", label: "PHP (₱)" },
  { value: "VND", label: "VND (₫)" },
  { value: "PKR", label: "PKR (₨)" },
  { value: "BDT", label: "BDT (৳)" },
  { value: "LKR", label: "LKR (Rs)" },
];

const emptyJobForm: JobFormState = {
  title: "",
  department: "",
  location: "",
  description: "",
  requirements: "",
  responsibilities: "",
  employmentType: "full_time",
  experienceLevel: "mid",
  experienceMinYears: "",
  experienceMaxYears: "",
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: "USD",
  showSalary: true,
  skills: "",
};

function inferCurrencyFromLocation(location: string): CurrencyCode {
  const normalized = location.toLowerCase();

  const rules: Array<{ pattern: RegExp; currency: CurrencyCode }> = [
    { pattern: /\b(india|delhi|mumbai|bengaluru|bangalore|hyderabad|pune|chennai|gurgaon|gurugram|noida|kolkata)\b/, currency: "INR" },
    { pattern: /\b(united kingdom|uk|london|manchester|birmingham|edinburgh)\b/, currency: "GBP" },
    { pattern: /\b(germany|france|spain|italy|netherlands|ireland|portugal|europe|berlin|paris|madrid|amsterdam|dublin|rome)\b/, currency: "EUR" },
    { pattern: /\b(canada|toronto|vancouver|montreal|ottawa|calgary)\b/, currency: "CAD" },
    { pattern: /\b(australia|sydney|melbourne|brisbane|perth)\b/, currency: "AUD" },
    { pattern: /\b(singapore)\b/, currency: "SGD" },
    { pattern: /\b(uae|dubai|abu dhabi|united arab emirates)\b/, currency: "AED" },
    { pattern: /\b(saudi arabia|riyadh|jeddah|dammam)\b/, currency: "SAR" },
    { pattern: /\b(japan|tokyo|osaka)\b/, currency: "JPY" },
    { pattern: /\b(switzerland|zurich|geneva)\b/, currency: "CHF" },
    { pattern: /\b(south africa|johannesburg|cape town)\b/, currency: "ZAR" },
    { pattern: /\b(mexico|mexico city|guadalajara|monterrey)\b/, currency: "MXN" },
    { pattern: /\b(brazil|sao paulo|rio de janeiro)\b/, currency: "BRL" },
    { pattern: /\b(sweden|stockholm)\b/, currency: "SEK" },
    { pattern: /\b(norway|oslo)\b/, currency: "NOK" },
    { pattern: /\b(new zealand|auckland|wellington)\b/, currency: "NZD" },
    { pattern: /\b(hong kong)\b/, currency: "HKD" },
    { pattern: /\b(malaysia|kuala lumpur)\b/, currency: "MYR" },
    { pattern: /\b(thailand|bangkok)\b/, currency: "THB" },
    { pattern: /\b(indonesia|jakarta|bali)\b/, currency: "IDR" },
    { pattern: /\b(philippines|manila)\b/, currency: "PHP" },
    { pattern: /\b(vietnam|ho chi minh|hanoi)\b/, currency: "VND" },
    { pattern: /\b(pakistan|karachi|lahore|islamabad)\b/, currency: "PKR" },
    { pattern: /\b(bangladesh|dhaka)\b/, currency: "BDT" },
    { pattern: /\b(sri lanka|colombo)\b/, currency: "LKR" },
    { pattern: /\b(united states|usa|us|new york|california|texas|austin|seattle|chicago|san francisco|remote\s*\(us\)|remote us)\b/, currency: "USD" },
  ];

  return rules.find((rule) => rule.pattern.test(normalized))?.currency ?? "USD";
}

function parseInteger(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number.parseInt(trimmed, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

const commonSkillMatchers: Array<{ skill: string; pattern: RegExp }> = [
  { skill: "React", pattern: /\breact(?:\.js|js)?\b/i },
  { skill: "Next.js", pattern: /\bnext(?:\.js|js)?\b/i },
  { skill: "TypeScript", pattern: /\btypescript\b/i },
  { skill: "JavaScript", pattern: /\bjavascript\b/i },
  { skill: "Node.js", pattern: /\bnode(?:\.js|js)?\b/i },
  { skill: "Python", pattern: /\bpython\b/i },
  { skill: "FastAPI", pattern: /\bfastapi\b/i },
  { skill: "Java", pattern: /\bjava\b/i },
  { skill: "Spring Boot", pattern: /\bspring boot\b/i },
  { skill: ".NET", pattern: /\b\.net\b|\bdotnet\b/i },
  { skill: "C#", pattern: /\bc#\b/i },
  { skill: "Go", pattern: /\bgolang\b|\bgo\b/i },
  { skill: "SQL", pattern: /\bsql\b/i },
  { skill: "PostgreSQL", pattern: /\bpostgres(?:ql)?\b/i },
  { skill: "MongoDB", pattern: /\bmongodb\b/i },
  { skill: "Redis", pattern: /\bredis\b/i },
  { skill: "REST APIs", pattern: /\brest(?:ful)?\b|\bapi(?:s)?\b/i },
  { skill: "GraphQL", pattern: /\bgraphql\b/i },
  { skill: "AWS", pattern: /\baws\b|\bamazon web services\b/i },
  { skill: "Docker", pattern: /\bdocker\b/i },
  { skill: "Kubernetes", pattern: /\bkubernetes\b|\bk8s\b/i },
  { skill: "Tailwind CSS", pattern: /\btailwind\b/i },
  { skill: "Figma", pattern: /\bfigma\b/i },
  { skill: "Git", pattern: /\bgit\b/i },
  { skill: "CI/CD", pattern: /\bci\/cd\b|\bcontinuous integration\b|\bcontinuous deployment\b/i },
  { skill: "Machine Learning", pattern: /\bmachine learning\b|\bml\b/i },
  { skill: "TensorFlow", pattern: /\btensorflow\b/i },
  { skill: "PyTorch", pattern: /\bpytorch\b/i },
  { skill: "Pandas", pattern: /\bpandas\b/i },
  { skill: "NumPy", pattern: /\bnumpy\b/i },
];

const genericSkillWords = new Set([
  "and",
  "with",
  "using",
  "plus",
  "other",
  "tools",
  "tooling",
  "experience",
  "knowledge",
  "proficiency",
  "skills",
  "skill",
  "strong",
  "good",
  "nice",
  "have",
  "preferred",
  "required",
  "ability",
  "team",
  "communication",
]);

function normalizeSkillLabel(value: string) {
  const collapsed = value.replace(/\s+/g, " ").trim();
  if (!collapsed) {
    return "";
  }

  return collapsed
    .split(" ")
    .map((part) => {
      if (/^[A-Z0-9.+#/-]+$/.test(part)) {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");
}

function extractSkillsFromJd(...sections: Array<string>) {
  const text = sections.join("\n").trim();
  if (!text) {
    return [] as string[];
  }

  const matchedSkills = new Map<string, number>();

  for (const matcher of commonSkillMatchers) {
    if (matcher.pattern.test(text)) {
      matchedSkills.set(matcher.skill, 100 - matchedSkills.size);
    }
  }

  const contextualPatterns = [
    /(experience with|experienced in|expertise in|proficient in|hands-on with|knowledge of|familiarity with|working knowledge of|must have|should know|tech stack includes)\s+([^.;\n]+)/gi,
    /(skills|required skills|tools|technologies)\s*[:\-]\s*([^\n]+)/gi,
  ];

  for (const pattern of contextualPatterns) {
    for (const match of text.matchAll(pattern)) {
      const candidateBlock = (match[2] ?? "").replace(/[()]/g, " ");
      const tokens = candidateBlock
        .split(/,|\/|\||\band\b/gi)
        .map((token) => token.replace(/^[^a-zA-Z0-9+#.]+|[^a-zA-Z0-9+#.]+$/g, "").trim())
        .filter(Boolean);

      for (const token of tokens) {
        if (token.length < 2 || token.length > 30) {
          continue;
        }

        if (genericSkillWords.has(token.toLowerCase())) {
          continue;
        }

        const normalized = normalizeSkillLabel(token);
        if (!normalized || genericSkillWords.has(normalized.toLowerCase())) {
          continue;
        }

        if (!matchedSkills.has(normalized)) {
          matchedSkills.set(normalized, 50 - matchedSkills.size);
        }
      }
    }
  }

  return Array.from(matchedSkills.entries())
    .sort((left, right) => right[1] - left[1])
    .map(([skill]) => skill)
    .slice(0, 5);
}

export default function NewJobPage() {
  const [form, setForm] = React.useState<JobFormState>(emptyJobForm);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [createdJobTitle, setCreatedJobTitle] = React.useState<string | null>(null);
  const [createdPublicPath, setCreatedPublicPath] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCurrencyManuallySet, setIsCurrencyManuallySet] = React.useState(false);
  const [lastAutoGeneratedSkills, setLastAutoGeneratedSkills] = React.useState("");

  const suggestedSkills = React.useMemo(
    () => extractSkillsFromJd(form.description, form.requirements, form.responsibilities),
    [form.description, form.requirements, form.responsibilities],
  );

  function updateForm<K extends keyof JobFormState>(field: K, value: JobFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(emptyJobForm);
    setIsCurrencyManuallySet(false);
    setLastAutoGeneratedSkills("");
  }

  function handleLocationChange(value: string) {
    setForm((current) => ({
      ...current,
      location: value,
      salaryCurrency: isCurrencyManuallySet ? current.salaryCurrency : inferCurrencyFromLocation(value),
    }));
  }

  const applySuggestedSkills = React.useCallback(
    (force = false) => {
      const nextSkills = suggestedSkills.join(", ");
      if (!nextSkills) {
        return;
      }

      setForm((current) => {
        const currentSkills = current.skills.trim();
        const canReplace = force || !currentSkills || currentSkills === lastAutoGeneratedSkills;

        if (!canReplace || currentSkills === nextSkills) {
          return current;
        }

        return {
          ...current,
          skills: nextSkills,
        };
      });
      setLastAutoGeneratedSkills(nextSkills);
    },
    [lastAutoGeneratedSkills, suggestedSkills],
  );

  React.useEffect(() => {
    applySuggestedSkills();
  }, [applySuggestedSkills]);

  async function handleSubmit() {
    setError(null);
    setMessage(null);
    setCreatedJobTitle(null);
    setCreatedPublicPath(null);
    setIsSubmitting(true);

    try {
      if (!form.title.trim() || !form.description.trim() || !form.location.trim()) {
        setError("Job title, location, and role summary are required.");
        return;
      }

      const experienceMin = parseInteger(form.experienceMinYears);
      const experienceMax = parseInteger(form.experienceMaxYears);
      const salaryMin = parseInteger(form.salaryMin);
      const salaryMax = parseInteger(form.salaryMax);

      if (experienceMin !== null && experienceMin < 0) {
        setError("Minimum experience must be zero or more years.");
        return;
      }

      if (experienceMax !== null && experienceMax < 0) {
        setError("Maximum experience must be zero or more years.");
        return;
      }

      if (experienceMin !== null && experienceMax !== null && experienceMin > experienceMax) {
        setError("Experience range is invalid. Minimum experience cannot be higher than maximum experience.");
        return;
      }

      if (salaryMin !== null && salaryMin < 0) {
        setError("Minimum salary must be zero or greater.");
        return;
      }

      if (salaryMax !== null && salaryMax < 0) {
        setError("Maximum salary must be zero or greater.");
        return;
      }

      if (salaryMin !== null && salaryMax !== null && salaryMin > salaryMax) {
        setError("Compensation range is invalid. Minimum salary cannot be higher than maximum salary.");
        return;
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        requirements: form.requirements.trim() || undefined,
        responsibilities: form.responsibilities.trim() || undefined,
        department: form.department.trim() || undefined,
        location: form.location.trim(),
        employment_type: form.employmentType,
        experience_level: form.experienceLevel,
        salary_min: salaryMin,
        salary_max: salaryMax,
        salary_currency: form.salaryCurrency,
        skills_required: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        settings: {
          salary_visible: form.showSalary,
          experience_range: {
            min_years: experienceMin,
            max_years: experienceMax,
          },
        },
        publish_immediately: true,
      };

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as JobCreateResponse | null;

      if (!response.ok || !data?.id) {
        setError(data?.message ?? "Failed to post the role.");
        return;
      }

      const postedJobTitle = data.title ?? form.title.trim();

      setMessage(
        `${postedJobTitle} was posted successfully.${
          form.showSalary && (salaryMin !== null || salaryMax !== null)
            ? ` Compensation will be shown in ${form.salaryCurrency}.`
            : " Compensation is hidden for this role."
        }${data.public_url ? " The public career page is ready to share across recruiter channels." : ""}`,
      );
      setCreatedJobTitle(postedJobTitle);
      setCreatedPublicPath(data.public_url ? `/jobs/${data.public_url}` : null);
      resetForm();
    } catch {
      setError("Could not post the role right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <section>
        <Badge tone="primary">Job posting builder</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Create a production-ready job posting</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
          Post the role directly. Once the role is created, the recruiter gets immediate sharing choices for the career site, social media, WhatsApp, Telegram, and copy link.
        </p>
      </section>

      <Card className="rounded-[32px] p-8">
        {message ? (
          <div className="mb-6 rounded-[22px] border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <div>{message}</div>
            {createdPublicPath ? (
              <div className="mt-4">
                <ShareDestinations path={createdPublicPath} title={createdJobTitle || "this role"} />
              </div>
            ) : null}
          </div>
        ) : null}
        {error ? <div className="mb-6 rounded-[22px] border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div> : null}

        <form
          className="grid gap-6 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <label className="space-y-2">
            <span className="text-sm font-medium">Job title</span>
            <Input value={form.title} onChange={(event) => updateForm("title", event.target.value)} placeholder="Senior Frontend Engineer" required />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Department</span>
            <Input value={form.department} onChange={(event) => updateForm("department", event.target.value)} placeholder="Engineering" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Location</span>
            <Input value={form.location} onChange={(event) => handleLocationChange(event.target.value)} placeholder="Bengaluru, India" required />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Employment type</span>
            <select
              value={form.employmentType}
              onChange={(event) => updateForm("employmentType", event.target.value as EmploymentType)}
              className="h-11 w-full rounded-full border border-[var(--color-border)] bg-white/80 px-4 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
            >
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
              <option value="internship">Internship</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Experience level</span>
            <select
              value={form.experienceLevel}
              onChange={(event) => updateForm("experienceLevel", event.target.value as ExperienceLevel)}
              className="h-11 w-full rounded-full border border-[var(--color-border)] bg-white/80 px-4 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
            >
              <option value="entry">Entry</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="principal">Principal</option>
            </select>
          </label>

          <div className="space-y-2">
            <span className="text-sm font-medium">Experience range for role</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={form.experienceMinYears}
                onChange={(event) => updateForm("experienceMinYears", event.target.value)}
                placeholder="Min years"
              />
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={form.experienceMaxYears}
                onChange={(event) => updateForm("experienceMaxYears", event.target.value)}
                placeholder="Max years"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Compensation range</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={form.salaryMin}
                onChange={(event) => updateForm("salaryMin", event.target.value)}
                placeholder="Minimum salary"
              />
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={form.salaryMax}
                onChange={(event) => updateForm("salaryMax", event.target.value)}
                placeholder="Maximum salary"
              />
            </div>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Salary currency</span>
            <select
              value={form.salaryCurrency}
              onChange={(event) => {
                setIsCurrencyManuallySet(true);
                updateForm("salaryCurrency", event.target.value as CurrencyCode);
              }}
              className="h-11 w-full rounded-full border border-[var(--color-border)] bg-white/80 px-4 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
            >
              {currencyOptions.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-[var(--color-muted)]">Defaults from location, but recruiters can override it.</p>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Role summary</span>
            <textarea
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              className="min-h-36 w-full rounded-[24px] border border-[var(--color-border)] bg-white/80 px-4 py-4 text-sm outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
              placeholder="Brief summary for the hiring team and public job board."
              required
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Key responsibilities</span>
            <textarea
              value={form.responsibilities}
              onChange={(event) => updateForm("responsibilities", event.target.value)}
              className="min-h-28 w-full rounded-[24px] border border-[var(--color-border)] bg-white/80 px-4 py-4 text-sm outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
              placeholder="List the main ownership areas for this role."
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Requirements</span>
            <textarea
              value={form.requirements}
              onChange={(event) => updateForm("requirements", event.target.value)}
              className="min-h-28 w-full rounded-[24px] border border-[var(--color-border)] bg-white/80 px-4 py-4 text-sm outline-none focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5"
              placeholder="Add the must-have experience, tools, or certifications."
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-medium">Skills required</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => applySuggestedSkills(true)}
                disabled={suggestedSkills.length === 0}
              >
                Fetch from JD
              </Button>
            </div>
            <Input
              value={form.skills}
              onChange={(event) => updateForm("skills", event.target.value)}
              placeholder="React, TypeScript, Design Systems"
            />
            <p className="text-xs text-[var(--color-muted)]">
              Separate skills with commas. We auto-pick up to 5 skills from the JD text.
              {suggestedSkills.length > 0 ? ` Suggested: ${suggestedSkills.join(", ")}.` : " Add the JD summary, responsibilities, or requirements to generate them."}
            </p>
          </label>

          <label className="flex items-center gap-3 rounded-[24px] border border-[var(--color-border)] px-4 py-4 md:col-span-2">
            <input
              type="checkbox"
              checked={form.showSalary}
              onChange={(event) => updateForm("showSalary", event.target.checked)}
              className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/30"
            />
            <div>
              <div className="text-sm font-medium">Show salary on the role</div>
              <div className="text-xs text-[var(--color-muted)]">Turn this off to keep compensation hidden while still storing the range internally.</div>
            </div>
          </label>

          <div className="md:col-span-2 flex flex-wrap justify-between gap-4 rounded-[28px] border border-dashed border-[var(--color-border)] p-5">
            <div>
              <CardTitle>Publishing checks</CardTitle>
              <CardDescription className="mt-1">
                Required fields, compensation settings, the experience range, and recruiter share destinations are ready for review.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/jobs">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Post role
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
