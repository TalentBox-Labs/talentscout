import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  LayoutDashboard,
  Search,
  Settings2,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

export const siteConfig = {
  name: "HireStack (TalentOS)",
  description: "AI-native applicant tracking system for high-performing recruiting teams.",
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
  badges: ["AI Matching", "Talent CRM", "Pipeline Analytics", "Collaborative Hiring"],
  heroStats: [
    { label: "Roles actively hiring", value: "34" },
    { label: "Avg. shortlist time", value: "18 min" },
    { label: "Top-match precision", value: "92%" },
  ],
  accentLabel: "Recruiting, redesigned for high-velocity teams.",
  footerBlurb: "HireStack (TalentOS) helps recruiters ship a better candidate experience without losing operational control.",
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
    title: "Collaborative hiring",
    description: "Keep recruiters, hiring managers, and interviewers aligned with shared context and faster decisions.",
    metric: "7 teams aligned",
  },
];

export const pillTags = ["Requisition planning", "Candidate pipelines", "Interview coordination", "Hiring insights"];

export const envConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000",
};

export const sparklineData = [42, 54, 49, 70, 64, 77, 85];

export const contactEmail = "hello@hirestack.workcrew.ai";
export const footerContactEmails = ["hello@workcrew.ai", "sales@workcrew.ai"] as const;
export const companyDetails = {
  label: "Product of TalentBox Labs",
  legalName: "TalentBox Labs Inc",
  address: "Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
} as const;

export const promoText = "Run your hiring process from one SaaS platform built for recruiters, hiring managers, and talent leaders.";

export const featureCallout = {
  heading: "Everything recruiters need, minus the chaos",
  subheading: "A practical ATS with structured jobs, intelligent candidate ranking, and the visibility teams need to hire faster.",
  icon: Sparkles,
};

export const howItWorks = [
  {
    title: "Open a role with structure",
    description: "Create requisitions with hiring goals, scorecards, and ownership so everyone starts from the same brief.",
    metric: "1 shared source of truth",
  },
  {
    title: "Move candidates through a clear pipeline",
    description: "Track sourcing, screening, interviews, offers, and feedback in one visible workflow instead of scattered spreadsheets.",
    metric: "Full-funnel visibility",
  },
  {
    title: "Prioritize the best-fit talent",
    description: "Use AI-assisted ranking, recency, and hiring signals to focus attention on candidates most likely to convert.",
    metric: "92% top-match precision",
  },
] as const;

export const audienceCards = [
  {
    title: "For recruiters",
    description: "Stay on top of open roles, candidate momentum, outreach, and interview scheduling without juggling disconnected tools.",
    bullets: ["Prioritized candidate queues", "Faster shortlist creation", "Shared hiring notes"],
  },
  {
    title: "For hiring managers",
    description: "See where every role stands, review candidates quickly, and make decisions with clearer context and less back-and-forth.",
    bullets: ["Role progress at a glance", "Centralized feedback", "Cleaner decision loops"],
  },
  {
    title: "For founders and leaders",
    description: "Understand hiring health across the business with time-to-hire, funnel conversion, and team capacity metrics.",
    bullets: ["Pipeline performance", "Team-level visibility", "Operational hiring insights"],
  },
] as const;

export const pipelineVisibility = {
  heading: "Pipeline visibility without spreadsheet archaeology",
  description:
    "Follow every candidate from sourced to signed with a shared view of stage movement, bottlenecks, and next actions.",
  points: [
    "See which roles are stalled before they become urgent",
    "Spot candidates at risk of dropping out of process",
    "Keep interviewers and recruiters aligned on next steps",
  ],
};

export const aiScreening = {
  heading: "AI ranking and screening that sharpens human judgment",
  description:
    "HireStack (TalentOS) surfaces the strongest-fit candidates using skills, experience, recency, and pipeline signals—so teams review smarter, not just faster.",
  points: [
    "Rank candidates by fit, not just chronology",
    "Highlight strengths, risks, and missing signals early",
    "Turn raw applicant volume into a focused shortlist",
  ],
};

export const ctaContent = {
  heading: "Turn hiring into a repeatable operating system",
  description:
    "Give your team one ATS for structured jobs, collaborative reviews, and faster hiring decisions—without losing visibility as you scale.",
  primaryLabel: "Start free trial",
  secondaryLabel: "Log in",
};

export const showcaseProof = {
  stats: [
    { value: "18 min", label: "average shortlist time" },
    { value: "92%", label: "top-match precision" },
    { value: "7 teams", label: "using one shared workflow" },
  ],
  testimonials: [
    {
      quote: "We stopped asking where candidates were stuck because the pipeline finally made that obvious.",
      author: "Maya Patel",
      role: "Head of Talent",
    },
    {
      quote: "Hiring managers now review the same candidate context recruiters see, so decisions happen faster and with less back-and-forth.",
      author: "Jordan Lee",
      role: "VP Product",
    },
    {
      quote: "The analytics view gives leadership a clean weekly picture without pulling data from five different tools.",
      author: "Chris Romero",
      role: "Founder & CEO",
    },
  ],
};

export const demoStrip = {
  heading: "See HireStack (TalentOS) in a live walkthrough",
  description:
    "Book a focused product demo or request a workflow walkthrough tailored to your hiring motion.",
  primaryLabel: "Book demo",
  secondaryLabel: "Start free trial",
};

export const roleSpecificCtas = [
  {
    title: "For recruiters",
    description: "See how recruiters move shortlisted talent forward faster with structured pipelines and shared context.",
    href: "/signup",
    label: "Start free trial",
  },
  {
    title: "For hiring managers",
    description: "See live role progress, shared activity, and where hiring decisions need attention without extra status meetings.",
    href: "/signup",
    label: "Start free trial",
  },
  {
    title: "For founders",
    description: "Use recruiting analytics to understand funnel health, velocity, and team capacity.",
    href: `mailto:${contactEmail}?subject=Book%20a%20HireStack%20(TalentOS)%20executive%20demo`,
    label: "Book demo",
  },
] as const;

export const workflowComparison = {
  heading: "From fragmented hiring rituals to a repeatable hiring system",
  description:
    "Show teams the difference between reacting in disconnected tools and operating from one ATS built for daily recruiting work.",
  before: {
    title: "Without HireStack (TalentOS)",
    points: [
      "Role updates are scattered across chat, docs, and spreadsheets",
      "Candidate review depends on manual triage and ad-hoc notes",
      "Hiring leaders see bottlenecks only after the funnel has already slowed",
    ],
  },
  after: {
    title: "With HireStack (TalentOS)",
    points: [
      "Requisitions, stages, and ownership stay visible in one shared hiring system",
      "AI ranking and fit signals help teams focus on the strongest candidates faster",
      "Pipeline visibility and analytics make weekly hiring decisions far less reactive",
    ],
  },
};

export const landingSectionIcons = [LayoutDashboard, UsersRound, Target] as const;
export const workflowIcons = [BriefcaseBusiness, Eye, Sparkles] as const;
export const insightIcons = [CheckCircle2, Search, BarChart3] as const;
