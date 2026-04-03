import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, LayoutDashboard, Search, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { highlights, pillTags, promoText, siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-20 pt-6 sm:px-8 lg:px-12">
      <div className="grid-overlay absolute inset-0 opacity-40" aria-hidden="true" />
      <nav className="surface-panel sticky top-6 z-30 mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold tracking-tight">TalentScout</div>
            <div className="text-xs text-[var(--color-muted)]">AI-native ATS</div>
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {siteConfig.marketingLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-fg)]">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/dashboard">Open app</Link>
          </Button>
        </div>
      </nav>

      <main className="mx-auto mt-14 flex max-w-7xl flex-col gap-10">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
              <Sparkles className="h-4 w-4" />
              {siteConfig.accentLabel}
            </div>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black tracking-tight sm:text-6xl xl:text-7xl">
              Figma-inspired ATS workflows, cleaned up for production.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {promoText} TalentScout brings together structured job management, candidate pipelines, analytics, and Ubuntu-ready deployment in a single Next.js codebase.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard">
                  Launch dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#platform">Explore the platform</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {pillTags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--color-border)] bg-white/70 px-3 py-1.5 text-sm text-[var(--color-muted)] dark:bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Card className="hero-gradient relative rounded-[36px] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[var(--color-muted)]">Live workspace preview</div>
                <div className="mt-1 text-2xl font-semibold">Recruiting command center</div>
              </div>
              <div className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">Ready in Docker</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.heroStats.map((item) => (
                <div key={item.label} className="surface-subtle rounded-[28px] p-5">
                  <div className="text-sm text-[var(--color-muted)]">{item.label}</div>
                  <div className="mt-3 text-3xl font-bold">{item.value}</div>
                </div>
              ))}
              <div className="surface-subtle rounded-[28px] p-5 sm:col-span-2">
                <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                  <Search className="h-4 w-4 text-[var(--color-primary)]" />
                  Semantic sourcing query
                </div>
                <div className="mt-3 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm text-[var(--color-muted)] dark:bg-white/5">
                  “Find a senior product designer in New York with B2B SaaS and design system ownership.”
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section id="platform" className="grid gap-4 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const icons = [LayoutDashboard, BriefcaseBusiness, UsersRound, ShieldCheck];
            const Icon = icons[index % icons.length];

            return (
              <Card key={item.title} className="rounded-[32px] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
                <div className="mt-5 text-sm font-semibold text-[var(--color-primary)]">{item.metric}</div>
              </Card>
            );
          })}
        </section>
      </main>
    </div>
  );
}
