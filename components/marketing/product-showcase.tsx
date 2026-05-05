"use client";

import Image from "next/image";
import * as React from "react";
import { BarChart3, BriefcaseBusiness, LayoutDashboard, Sparkles, UsersRound } from "lucide-react";

type PreviewTab = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  points: string[];
};

const previewTabs: Array<PreviewTab & { icon: React.ComponentType<{ className?: string }> }> = [
  {
    id: "dashboard",
    label: "Dashboard",
    eyebrow: "Daily recruiting cockpit",
    title: "Run hiring operations from one shared command center",
    description:
      "See activity, open roles, pipeline stages, and priority candidates in a single workspace that keeps recruiters and hiring managers aligned.",
    src: "/previews/dashboard-preview.png",
    alt: "HireStack (TalentOS) dashboard showing recruiting activity, pipeline stages, active jobs, and priority candidates.",
    points: [
      "Monitor the live candidate pipeline without switching tools",
      "Surface priority candidates and active jobs side by side",
      "See what changed recently before the day gets noisy",
    ],
    icon: LayoutDashboard,
  },
  {
    id: "candidates",
    label: "Candidates",
    eyebrow: "Shortlist and review",
    title: "Turn candidate volume into a clear shortlist",
    description:
      "Search, review, and progress candidates from a reusable pipeline view that keeps fit, stage, and role context visible.",
    src: "/previews/candidates-preview.png",
    alt: "HireStack (TalentOS) candidates page showing candidate search, AI-qualified metrics, fit scores, and stage progression.",
    points: [
      "Review AI-qualified talent with stage and fit score context",
      "Search across role, company, skills, and location in one pass",
      "Keep top-skill trends and scorecards close to the candidate view",
    ],
    icon: UsersRound,
  },
  {
    id: "analytics",
    label: "Analytics",
    eyebrow: "Funnel and team performance",
    title: "Spot bottlenecks before they slow the hiring plan",
    description:
      "Track conversion, pass rates, offer acceptance, and recruiter throughput with a view built for hiring leaders and operators.",
    src: "/previews/analytics-preview.png",
    alt: "HireStack (TalentOS) analytics page showing funnel conversion metrics, pass rates, offer acceptance, and operational hiring notes.",
    points: [
      "Understand funnel performance from sourced to offer",
      "Review pass rates and interviewer capacity in one place",
      "Turn operational notes into better weekly decisions",
    ],
    icon: BarChart3,
  },
  {
    id: "jobs",
    label: "Jobs",
    eyebrow: "Role management",
    title: "Keep requisitions structured from draft to active hiring",
    description:
      "Manage job postings, role status, application volume, and approvals in one source of truth for the hiring team.",
    src: "/previews/jobs-preview.png",
    alt: "HireStack (TalentOS) jobs page showing published roles, applicant volume, average fit score, and job posting status.",
    points: [
      "Track published, draft, and paused roles without spreadsheet cleanup",
      "See applicant volume and fit quality at a glance",
      "Create and update roles with cleaner recruiter workflow handoffs",
    ],
    icon: BriefcaseBusiness,
  },
];

export function ProductShowcase() {
  const [activeTabId, setActiveTabId] = React.useState(previewTabs[0].id);

  const activeTab = previewTabs.find((tab) => tab.id === activeTabId) ?? previewTabs[0];
  const activeTabIndex = previewTabs.findIndex((tab) => tab.id === activeTab.id) + 1;

  return (
    <section className="grid gap-6 rounded-[36px] border border-[var(--color-border)] bg-white/70 p-5 shadow-[var(--shadow-soft)] dark:bg-white/5 lg:grid-cols-[0.33fr_0.67fr] lg:p-6">
      <div className="flex flex-col gap-4">
        <div className="px-2">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Interactive product tour</div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Explore the ATS through real product screens</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            Switch between the core recruiting surfaces to see how HireStack (TalentOS) supports daily workflow, candidate review, analytics, and requisition management.
          </p>
        </div>

        <div className="grid gap-3">
          {previewTabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={[
                  "group relative overflow-hidden rounded-[28px] border p-4 text-left transition-all duration-300",
                  isActive
                    ? "border-[var(--color-primary)]/35 bg-[linear-gradient(145deg,rgba(219,234,254,0.9),rgba(255,255,255,0.96))] shadow-[0_20px_55px_rgba(37,99,235,0.14)] dark:bg-[linear-gradient(145deg,rgba(30,41,59,0.92),rgba(15,23,42,0.96))]"
                    : "border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(248,250,252,0.9))] hover:-translate-y-0.5 hover:border-[var(--color-primary)]/25 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]",
                ].join(" ")}
                aria-pressed={isActive}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
                <div className="relative flex items-start gap-3">
                  <div
                    className={[
                      "mt-0.5 flex h-12 w-12 items-center justify-center rounded-[18px] border text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-[1.03]",
                      isActive
                        ? "border-[var(--color-primary)]/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(219,234,254,0.86))] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(30,41,59,0.55))]"
                        : "border-slate-200/75 bg-white/80 dark:border-white/8 dark:bg-white/5",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                          Screen {index + 1}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-[var(--color-fg)]">{tab.label}</div>
                      </div>
                      {isActive ? (
                        <span className="inline-flex items-center rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                          Active
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-primary)]">{tab.eyebrow}</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{tab.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-[34px] border border-slate-200/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.9))] p-[1px] shadow-[0_28px_90px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.96),rgba(15,23,42,0.9))]">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[rgba(37,99,235,0.14)] blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-10 h-28 w-28 rounded-full bg-[rgba(14,165,233,0.12)] blur-3xl" />

          <div className="relative rounded-[33px] border border-white/70 bg-[var(--color-surface)]/95 p-3 backdrop-blur dark:border-white/8 dark:bg-slate-950/85">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-slate-200/80 bg-white/85 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="hidden text-xs font-medium tracking-[0.14em] text-slate-500 sm:block dark:text-slate-400">
                  PREMIUM PREVIEW FRAME
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-full border border-slate-200/80 bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  Screen {activeTabIndex}
                </div>
                <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] shadow-sm dark:shadow-none">
                  {activeTab.eyebrow}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.94))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))]">
              <div key={activeTab.id} className="animate-showcase-enter group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-[var(--color-surface)] shadow-[0_18px_50px_rgba(15,23,42,0.14)] dark:border-white/8 dark:shadow-[0_20px_55px_rgba(2,6,23,0.4)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_34%)]" />
                <div className="pointer-events-none absolute inset-x-6 top-4 flex items-center justify-between rounded-full border border-white/60 bg-slate-950/58 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/88 shadow-[0_8px_24px_rgba(15,23,42,0.24)] backdrop-blur sm:text-xs">
                  <span>{activeTab.label} view</span>
                  <span className="inline-flex items-center gap-2 text-white/72">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
                    Live product preview
                  </span>
                </div>
                <Image
                  src={activeTab.src}
                  alt={activeTab.alt}
                  width={1200}
                  height={1600}
                  className="h-[580px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  priority={activeTab.id === "dashboard"}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.12))] dark:bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.42))]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            key={`${activeTab.id}-summary`}
            className="animate-showcase-enter relative overflow-hidden rounded-[30px] border border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(248,250,252,0.92))] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.07)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]"
          >
            <div className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full bg-[rgba(37,99,235,0.12)] blur-3xl" />
            <div className="relative inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              <Sparkles className="h-3.5 w-3.5" />
              {activeTab.eyebrow}
            </div>
            <div className="relative mt-5 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Editorial summary</div>
              <h3 className="text-2xl font-semibold tracking-tight text-balance">{activeTab.title}</h3>
              <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">{activeTab.description}</p>
            </div>
          </div>

          <div
            key={`${activeTab.id}-points`}
            className="animate-showcase-enter rounded-[30px] border border-slate-200/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(248,250,252,0.92))] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.07)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">What teams get</div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Key outcomes</div>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              {activeTab.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-[20px] border border-slate-200/75 bg-white/88 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/8 dark:bg-white/5 dark:shadow-none"
                >
                  <span className="mt-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[10px] font-bold text-[var(--color-primary)]">
                    ✓
                  </span>
                  <span className="leading-6">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}