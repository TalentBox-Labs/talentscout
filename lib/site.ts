import { BarChart3, BriefcaseBusiness, LayoutDashboard, Settings2, Sparkles, UsersRound } from "lucide-react";

export const siteConfig = {
  name: "TalentScout",
  description: "AI-native applicant tracking platform for modern recruiting teams.",
  marketingLinks: [
    { label: "Platform", href: "#platform" },
    { label: "Workflows", href: "#workflows" },
    { label: "Analytics", href: "#analytics" },
    { label: "Contact", href: "#contact" },
  ],
  appLinks: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
    { label: "Candidates", href: "/candidates", icon: UsersRound },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings2 },
  ],
  quickActions: [
    { label: "Post a role", href: "/jobs/new" },
    { label: "Create application", href: "/applications/new" },
  ],
  badges: ["AI Matching", "Talent CRM", "Pipeline Analytics", "Ubuntu Docker Ready"],
  heroStats: [
    { label: "Roles actively hiring", value: "34" },
    { label: "Avg. shortlist time", value: "18 min" },
    { label: "Top-match precision", value: "92%" },
  ],
  accentLabel: "Recruiting, redesigned for high-velocity teams.",
  footerBlurb: "TalentScout helps recruiters ship a better candidate experience without losing operational control.",
} as const;

export const highlights = [
  {
    title: "Centralized requisitions",
    description: "Track hiring plans, approvals, and sourcing activity from a single control room.",
    metric: "34 active jobs",
  },
  {
    title: "AI-fit candidate ranking",
    description: "Spot the most relevant candidates by skills, recency, market fit, and pipeline momentum.",
    metric: "94 fit score",
  },
  {
    title: "Hiring analytics",
    description: "See funnel conversion, time-to-hire, and interviewer workload without spreadsheet archaeology.",
    metric: "-12% time to hire",
  },
  {
    title: "Docker-first deployment",
    description: "Build once, ship to Ubuntu with a standalone Next.js container and a minimal compose file.",
    metric: "Node 20 Alpine",
  },
];

export const pillTags = ["TypeScript", "Next.js App Router", "Tailwind CSS", "Reusable UI"];

export const envConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000",
};

export const sparklineData = [42, 54, 49, 70, 64, 77, 85];

export const contactEmail = "hello@talentscout.ai";

export const promoText = "Launch a polished ATS frontend without sacrificing maintainability.";

export const featureCallout = {
  heading: "Everything recruiters need, minus the chaos",
  subheading: "Composable UI, data-rich dashboards, and an app shell designed for daily usage—not just demo screenshots.",
  icon: Sparkles,
};
