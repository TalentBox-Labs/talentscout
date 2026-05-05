import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  CircleAlert,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  aiScreening,
  audienceCards,
  companyDetails,
  ctaContent,
  contactEmail,
  demoStrip,
  footerContactEmails,
  highlights,
  howItWorks,
  insightIcons,
  landingSectionIcons,
  pillTags,
  pipelineVisibility,
  promoText,
  roleSpecificCtas,
  showcaseProof,
  siteConfig,
  workflowComparison,
  workflowIcons,
} from "@/lib/site";

export default function HomePage() {
  const bookDemoHref = `mailto:${contactEmail}?subject=Book%20a%20HireStack%20(TalentOS)%20demo`;
  const sectionIntroClass = "max-w-3xl lg:max-w-[44rem]";
  const premiumCardClass =
    "rounded-[32px] border border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(248,250,252,0.92))] p-6 shadow-[0_22px_55px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]";
  const sectionShellClass =
    "rounded-[36px] border border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.86),rgba(248,250,252,0.8))] shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]";

  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-20 pt-6 sm:px-8 lg:px-12">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <nav className="sticky top-6 z-30 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-200/70 bg-white/62 px-5 py-3 shadow-[0_14px_38px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/8 dark:bg-slate-950/45">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold tracking-tight">HireStack (TalentOS)</div>
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
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={bookDemoHref}>Book demo</a>
          </Button>
          <Button asChild>
            <Link href="/signup">Start free trial</Link>
          </Button>
        </div>
      </nav>

      <main className="mx-auto mt-16 flex max-w-7xl flex-col gap-14 lg:gap-16">
        <section className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
              <Sparkles className="h-4 w-4" />
              {siteConfig.accentLabel}
            </div>
            <h1 className="mt-7 max-w-5xl text-balance text-5xl font-black tracking-[-0.04em] sm:text-6xl xl:text-7xl">
              Hire faster with an ATS built for clarity, speed, and better decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-[1.15rem]">
              {promoText} HireStack (TalentOS) brings together structured requisitions, candidate pipelines, interview coordination, and hiring analytics in one streamlined command center.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={bookDemoHref}>Book demo</a>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {pillTags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--color-border)] bg-white/70 px-3 py-1.5 text-sm text-[var(--color-muted)] dark:bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Card className="hero-gradient relative rounded-[38px] border border-slate-200/75 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.1)] dark:border-white/8 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[var(--color-muted)]">Live product preview</div>
                <div className="mt-1 text-2xl font-semibold">Hiring operations, minus the chaos</div>
              </div>
              <div className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">Built for hiring teams</div>
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
                  Candidate search snapshot
                </div>
                <div className="mt-3 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm text-[var(--color-muted)] dark:bg-white/5">
                  “Show senior product designers in New York with SaaS experience, strong portfolios, and high interview momentum.”
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section id="platform" className="space-y-6">
          <div className={sectionIntroClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Platform at a glance</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">A cleaner operating layer for the entire hiring motion.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              HireStack (TalentOS) brings the core recruiting surfaces into one calmer system so teams can move faster without losing context.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const icons = [LayoutDashboard, BriefcaseBusiness, UsersRound, ShieldCheck];
            const Icon = icons[index % icons.length];

            return (
              <Card key={item.title} className={premiumCardClass}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-balance">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
                <div className="mt-5 text-sm font-semibold text-[var(--color-primary)]">{item.metric}</div>
              </Card>
            );
          })}
          </div>
        </section>

        <section className="space-y-5">
          <div className={sectionIntroClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Inside the product</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">Real screens, framed with a little more confidence.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Explore the surfaces teams use every day, from pipeline reviews to analytics, in a layout designed to feel calm, capable, and executive-ready.
            </p>
          </div>

          <ProductShowcase />
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
          <Card className={premiumCardClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Proof points</div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {showcaseProof.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border border-slate-200/75 bg-white/82 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none"
                >
                  <div className="text-3xl font-black tracking-tight text-[var(--color-fg)]">{stat.value}</div>
                  <div className="mt-2 text-sm text-[var(--color-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className={premiumCardClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">What teams are saying</div>
            <div className="mt-4 space-y-3">
              {showcaseProof.testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="rounded-[22px] border border-slate-200/75 bg-white/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none"
                >
                  <p className="text-sm leading-7 text-[var(--color-fg)]">“{testimonial.quote}”</p>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                    {testimonial.author} · {testimonial.role}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className={`grid gap-7 p-6 lg:grid-cols-[0.42fr_0.58fr] lg:p-8 ${sectionShellClass}`}>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Before and after</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{workflowComparison.heading}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">{workflowComparison.description}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-[28px] border border-rose-200/70 bg-[linear-gradient(145deg,rgba(255,241,242,0.92),rgba(255,255,255,0.9))] p-6 shadow-[0_18px_45px_rgba(244,63,94,0.07)] dark:border-rose-400/20 dark:bg-rose-950/10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                  <CircleAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-500">Before</div>
                  <h3 className="mt-1 text-xl font-semibold">{workflowComparison.before.title}</h3>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                {workflowComparison.before.points.map((point) => (
                  <li key={point} className="rounded-[18px] border border-rose-200/60 bg-white/82 px-4 py-3 dark:border-rose-400/10 dark:bg-white/5">
                    {point}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="rounded-[28px] border border-emerald-200/70 bg-[linear-gradient(145deg,rgba(236,253,245,0.92),rgba(255,255,255,0.9))] p-6 shadow-[0_18px_45px_rgba(16,185,129,0.07)] dark:border-emerald-400/20 dark:bg-emerald-950/10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-500">After</div>
                  <h3 className="mt-1 text-xl font-semibold">{workflowComparison.after.title}</h3>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                {workflowComparison.after.points.map((point) => (
                  <li key={point} className="rounded-[18px] border border-emerald-200/60 bg-white/82 px-4 py-3 dark:border-emerald-400/10 dark:bg-white/5">
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        <section id="workflows" className={`grid gap-7 p-6 lg:p-8 ${sectionShellClass}`}>
          <div className={sectionIntroClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">How it works</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">A hiring workflow teams can actually follow.</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              Replace fragmented hiring rituals with a workflow that keeps roles, candidates, and decisions moving in one consistent system.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {howItWorks.map((item, index) => {
              const Icon = workflowIcons[index % workflowIcons.length];

              return (
                <Card key={item.title} className={premiumCardClass}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
                  <div className="mt-5 text-sm font-semibold text-[var(--color-primary)]">{item.metric}</div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div className={sectionIntroClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Built for every decision-maker</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">One hiring system, translated clearly for each team involved.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Recruiters, hiring managers, and leaders all get the same source of truth — just with the visibility each of them needs most.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
          {audienceCards.map((item, index) => {
            const Icon = landingSectionIcons[index % landingSectionIcons.length];

            return (
              <Card key={item.title} className={premiumCardClass}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-balance">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-[var(--color-muted)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-primary)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
          </div>
        </section>

        <section id="analytics" className="space-y-6">
          <div className={sectionIntroClass}>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Operational intelligence</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">Analytics that keep the hiring system visible, not mysterious.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Give teams a clearer weekly picture of pipeline health, recruiting throughput, and where attention should go next.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card className="rounded-[36px] border border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(248,250,252,0.92))] p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Pipeline visibility</div>
                <h2 className="mt-1 text-2xl font-semibold">{pipelineVisibility.heading}</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{pipelineVisibility.description}</p>
            <div className="mt-6 space-y-4">
              {pipelineVisibility.points.map((point, index) => {
                const Icon = insightIcons[index % insightIcons.length];

                return (
                  <div key={point} className="flex items-start gap-3 rounded-[22px] border border-slate-200/75 bg-white/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none">
                    <Icon className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" />
                    <p className="text-sm leading-6 text-[var(--color-muted)]">{point}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="rounded-[36px] border border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(248,250,252,0.92))] p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">AI ranking and screening</div>
                <h2 className="mt-1 text-2xl font-semibold">{aiScreening.heading}</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{aiScreening.description}</p>
            <div className="mt-6 space-y-4">
              {aiScreening.points.map((point, index) => {
                const icons = [Sparkles, Search, UsersRound];
                const Icon = icons[index % icons.length];

                return (
                  <div key={point} className="flex items-start gap-3 rounded-[22px] border border-slate-200/75 bg-white/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none">
                    <Icon className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" />
                    <p className="text-sm leading-6 text-[var(--color-muted)]">{point}</p>
                  </div>
                );
              })}
            </div>
          </Card>
          </div>
        </section>

        <section className="hero-gradient rounded-[40px] border border-slate-200/75 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.1)] dark:border-white/8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
                <Sparkles className="h-4 w-4" />
                Live walkthroughs available
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">{demoStrip.heading}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">{demoStrip.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="ghost" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href={bookDemoHref}>
                    Book demo
                  </a>
                </Button>
                <Button asChild>
                  <Link href="/signup">
                    Start free trial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {roleSpecificCtas.map((role) => (
                <Card key={role.title} className="rounded-[26px] border border-slate-200/75 bg-white/82 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)] dark:border-white/8 dark:bg-white/5 dark:shadow-none">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">{role.title}</div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{role.description}</p>
                  <div className="mt-5">
                    {role.label === "Start free trial" ? (
                      <Button asChild>
                        <Link href={role.href}>{role.label}</Link>
                      </Button>
                    ) : role.href.startsWith("mailto:") ? (
                      <Button variant="outline" asChild>
                        <a href={role.href}>{role.label}</a>
                      </Button>
                    ) : (
                      <Button variant="outline" asChild>
                        <Link href={role.href}>{role.label}</Link>
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="hero-gradient rounded-[40px] border border-slate-200/75 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.1)] dark:border-white/8 sm:p-10">
          <div className={sectionIntroClass}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-primary)] dark:bg-white/5">
              <Sparkles className="h-4 w-4" />
              Product-focused by design
            </div>
            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">{ctaContent.heading}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">{ctaContent.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={bookDemoHref}>Book demo</a>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  {ctaContent.primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="grid gap-4 border-t border-slate-200/70 px-1 py-5 text-sm text-[var(--color-muted)] dark:border-white/8 lg:grid-cols-[1.02fr_0.66fr_0.84fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{companyDetails.label}</div>
            <div className="mt-1 text-[14px] font-semibold text-[var(--color-fg)]">HireStack (TalentOS)</div>
            <p className="mt-1 max-w-md text-[11px] leading-[1.45]">{siteConfig.footerBlurb}</p>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{companyDetails.legalName}</p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Explore</div>
            <div className="mt-2 grid gap-1 text-[12px]">
              <Link href="#platform" className="transition hover:text-[var(--color-fg)]">
                Platform
              </Link>
              <Link href="#workflows" className="transition hover:text-[var(--color-fg)]">
                Workflows
              </Link>
              <Link href="#analytics" className="transition hover:text-[var(--color-fg)]">
                Analytics
              </Link>
              <Link href="#contact" className="transition hover:text-[var(--color-fg)]">
                Contact
              </Link>
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
            <p>HireStack (TalentOS) is a product of TalentBox Labs Inc.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
