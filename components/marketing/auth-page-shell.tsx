import Link from "next/link";
import { Bot, CheckCircle2 } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { companyDetails, footerContactEmails, siteConfig } from "@/lib/site";

type AuthPageShellProps = {
  mode: "login" | "signup";
  title: string;
  description: string;
  alternateLabel: string;
  alternateHref: string;
  alternateCta: string;
};

const benefits = [
  "Structured requisitions and candidate pipelines",
  "AI-assisted fit scoring with shared reviewer context",
  "Hiring analytics for recruiters, managers, and leaders",
];

const authFooterLinks = [
  { label: "Platform", href: "/#platform" },
  { label: "Workflows", href: "/#workflows" },
  { label: "Analytics", href: "/#analytics" },
  { label: "Contact", href: "/#contact" },
] as const;

export function AuthPageShell({
  mode,
  title,
  description,
  alternateLabel,
  alternateHref,
  alternateCta,
}: AuthPageShellProps) {
  const isSignup = mode === "signup";
  const topRightCta = isSignup
    ? { href: "/login", label: "Log in" }
    : { href: "/signup", label: "Start free trial" };
  const panelClass =
    "rounded-[36px] border border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(248,250,252,0.92))] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]";

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-8 sm:px-8 lg:px-12">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex items-center justify-between gap-4 rounded-full border border-slate-200/70 bg-white/62 px-5 py-3 shadow-[0_14px_38px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/8 dark:bg-slate-950/45">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold tracking-tight">HireStack (TalentOS)</div>
              <div className="text-xs text-[var(--color-muted)]">AI-native ATS</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/">Back to site</Link>
            </Button>
            <Button asChild>
              <Link href={topRightCta.href}>{topRightCta.label}</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="hero-gradient rounded-[38px] border border-slate-200/75 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.1)] dark:border-white/8">
            <div className="inline-flex rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
              {isSignup ? "Start your hiring system" : "Welcome back to HireStack"}
            </div>
            <h1 className="mt-6 max-w-2xl text-balance text-4xl font-black tracking-[-0.04em] sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">{description}</p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-[22px] border border-slate-200/75 bg-white/82 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" />
                  <p className="text-sm leading-6 text-[var(--color-muted)]">{benefit}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className={panelClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              {isSignup ? "Sign up" : "Log in"}
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">{isSignup ? "Start with your work email" : "Access your HireStack (TalentOS) account"}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              HireStack (TalentOS) now validates credentials, creates sessions, and protects private app routes through the backend auth service.
            </p>

            <AuthForm mode={mode} />

            <div className="mt-6 rounded-[24px] border border-slate-200/75 bg-white/82 px-4 py-4 text-sm text-[var(--color-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none">
              {alternateLabel}{" "}
              <Link href={alternateHref} className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline">
                {alternateCta}
              </Link>
            </div>
          </Card>
        </div>

        <footer className="grid gap-4 border-t border-slate-200/70 px-1 py-5 text-sm text-[var(--color-muted)] dark:border-white/8 lg:grid-cols-[1.02fr_0.66fr_0.84fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{companyDetails.label}</div>
            <div className="mt-1 text-[14px] font-semibold text-[var(--color-fg)]">{siteConfig.name}</div>
            <p className="mt-1 max-w-md text-[11px] leading-[1.45]">{siteConfig.footerBlurb}</p>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{companyDetails.legalName}</p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Explore</div>
            <div className="mt-2 grid gap-1 text-[12px]">
              {authFooterLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-[var(--color-fg)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Contact</div>
            <div className="mt-2 space-y-1">
              {footerContactEmails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="block text-[11px] transition hover:text-[var(--color-fg)]">
                  {email}
                </a>
              ))}
              <p className="max-w-sm text-[11px] leading-[1.45]">{companyDetails.address}</p>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-1 border-t border-slate-200/70 pt-2.5 text-[10px] text-slate-500 dark:border-white/8 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026, All rights reserved</p>
            <p>{siteConfig.name} is a product of TalentBox Labs Inc.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}