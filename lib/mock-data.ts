export type JobStatus = "Active" | "Draft" | "Paused" | "Closed";
export type CandidateStage = "Applied" | "Screening" | "Interview" | "Offer" | "Hired";

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  schedule: string;
  status: JobStatus;
  applicants: number;
  fitRate: number;
  postedOn: string;
  compensation: string;
  summary: string;
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  location: string;
  company: string;
  stage: CandidateStage;
  fitScore: number;
  experience: string;
  email: string;
  skills: string[];
};

export const dashboardMetrics = [
  { label: "Open requisitions", value: "34", delta: "+4 this week" },
  { label: "Qualified candidates", value: "1,248", delta: "+18% pipeline growth" },
  { label: "Time to shortlist", value: "18 min", delta: "-12% vs. last month" },
  { label: "Offer acceptance", value: "88%", delta: "+6 pts quality lift" },
] as const;

export const adminOverviewMetrics = [
  { label: "Pending approvals", value: "12", delta: "4 submitted in the last 24 hours" },
  { label: "Organizations onboarding", value: "7", delta: "2 waiting on domain verification" },
  { label: "Active organizations", value: "34", delta: "+3 this month" },
  { label: "Internal actions due", value: "9", delta: "Access reviews and onboarding follow-ups" },
] as const;

export const adminApprovalQueue = [
  {
    title: "Approve Product Design Lead shortlist",
    applicant: "Avery Brooks",
    organization: "Northstar Labs",
    requestedRole: "Recruiter",
    submittedAt: "12 min ago",
    priority: "High",
    impact: "Recruiting team cannot start sourcing until access is granted.",
  },
  {
    title: "Review onboarding request for hiring manager seat",
    applicant: "Priya Menon",
    organization: "Workgrid",
    requestedRole: "Hiring manager",
    submittedAt: "48 min ago",
    priority: "Medium",
    impact: "Manager dashboard access is blocked until approval is completed.",
  },
  {
    title: "Validate new organization onboarding details",
    applicant: "Jules Carter",
    organization: "Helio Commerce",
    requestedRole: "Recruiter",
    submittedAt: "Today",
    priority: "Medium",
    impact: "Domain mismatch needs manual confirmation before activation.",
  },
] as const;

export const organizationOverview = [
  {
    name: "Northstar Labs",
    status: "Needs review",
    admins: 2,
    recruiters: 6,
    pendingUsers: 3,
    note: "Two recruiter approvals and one domain verification are waiting.",
  },
  {
    name: "Workgrid",
    status: "Healthy",
    admins: 1,
    recruiters: 4,
    pendingUsers: 1,
    note: "Last activation completed yesterday; no blockers on the org setup.",
  },
  {
    name: "Helio Commerce",
    status: "Onboarding",
    admins: 1,
    recruiters: 2,
    pendingUsers: 2,
    note: "Org profile is still missing hiring policies and default permissions.",
  },
  {
    name: "Acme Health",
    status: "Healthy",
    admins: 3,
    recruiters: 8,
    pendingUsers: 0,
    note: "No pending approvals; quarterly access review scheduled next week.",
  },
] as const;

export const adminPlatformInsights = [
  {
    title: "New users in review",
    value: "12",
    trend: "+3 since yesterday",
    description: "Most inbound requests are recruiter seats from recently onboarded organizations.",
  },
  {
    title: "Organization growth",
    value: "+3",
    trend: "month to date",
    description: "Three net-new organizations entered onboarding this month.",
  },
  {
    title: "Access activation SLA",
    value: "6.2h",
    trend: "Within target",
    description: "Average turnaround time for approval and activation remains under the 8-hour goal.",
  },
] as const;

export const adminOperationalWatchlist = [
  {
    title: "Northstar Labs domain verification",
    status: "Needs review",
    detail: "Requested domain does not fully match the applicant email domain.",
  },
  {
    title: "Inactive admin seats",
    status: "Follow-up",
    detail: "5 admin users have not logged in for more than 30 days and may need a check-in.",
  },
  {
    title: "Onboarding backlog",
    status: "Stable",
    detail: "Current approval queue is manageable, but two orgs are close to breaching SLA.",
  },
] as const;

export const adminRecentEvents = [
  { label: "3 new recruiter access requests submitted", timestamp: "10 min ago" },
  { label: "Workgrid completed organization setup and activated 2 hiring managers", timestamp: "42 min ago" },
  { label: "Northstar Labs requested manual verification for a shared inbox domain", timestamp: "1 hour ago" },
] as const;

export const jobs: Job[] = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (US)",
    schedule: "Full-time",
    status: "Active",
    applicants: 218,
    fitRate: 92,
    postedOn: "2 days ago",
    compensation: "$145k – $180k",
    summary: "Own the recruiter and hiring manager experiences across the platform.",
  },
  {
    id: "product-design-lead",
    title: "Product Design Lead",
    department: "Design",
    location: "New York, NY",
    schedule: "Hybrid",
    status: "Active",
    applicants: 84,
    fitRate: 87,
    postedOn: "5 days ago",
    compensation: "$150k – $190k",
    summary: "Lead the design system and candidate journey for enterprise recruiting teams.",
  },
  {
    id: "recruiting-operations-manager",
    title: "Recruiting Operations Manager",
    department: "Operations",
    location: "Austin, TX",
    schedule: "Full-time",
    status: "Draft",
    applicants: 0,
    fitRate: 0,
    postedOn: "Not published",
    compensation: "$110k – $135k",
    summary: "Operationalize reporting, automations, and recruiter enablement.",
  },
  {
    id: "ai-sourcing-specialist",
    title: "AI Sourcing Specialist",
    department: "Talent Acquisition",
    location: "London, UK",
    schedule: "Remote",
    status: "Paused",
    applicants: 41,
    fitRate: 81,
    postedOn: "12 days ago",
    compensation: "£70k – £88k",
    summary: "Experiment with AI prompts, sourcing workflows, and talent intelligence tactics.",
  },
];

export const candidates: Candidate[] = [
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    role: "Senior React Engineer",
    location: "San Francisco, CA",
    company: "TechCorp",
    stage: "Interview",
    fitScore: 94,
    experience: "7 years",
    email: "alex.rivera@example.com",
    skills: ["React", "TypeScript", "Next.js", "Design Systems", "GraphQL"],
  },
  {
    id: "sam-chen",
    name: "Sam Chen",
    role: "Product Manager",
    location: "New York, NY",
    company: "Innovate Inc",
    stage: "Screening",
    fitScore: 88,
    experience: "6 years",
    email: "sam.chen@example.com",
    skills: ["Roadmapping", "Figma", "Jira", "Experimentation"],
  },
  {
    id: "jordan-taylor",
    name: "Jordan Taylor",
    role: "Lead Product Designer",
    location: "Remote",
    company: "Creative Co",
    stage: "Offer",
    fitScore: 96,
    experience: "8 years",
    email: "jordan.taylor@example.com",
    skills: ["UX Strategy", "Framer", "Systems Thinking", "Accessibility"],
  },
  {
    id: "casey-smith",
    name: "Casey Smith",
    role: "Backend Developer",
    location: "Austin, TX",
    company: "DataCloud",
    stage: "Applied",
    fitScore: 73,
    experience: "5 years",
    email: "casey.smith@example.com",
    skills: ["Python", "PostgreSQL", "AWS", "Django"],
  },
];

export const pipelineColumns = [
  {
    name: "Applied",
    count: 142,
    cards: [
      { name: "Casey Smith", role: "Backend Developer", fitScore: 73 },
      { name: "Riley Hart", role: "Recruiting Ops Analyst", fitScore: 78 },
    ],
  },
  {
    name: "Screening",
    count: 68,
    cards: [
      { name: "Sam Chen", role: "Product Manager", fitScore: 88 },
      { name: "Nina Brooks", role: "Growth Recruiter", fitScore: 85 },
    ],
  },
  {
    name: "Interview",
    count: 28,
    cards: [
      { name: "Alex Rivera", role: "Senior React Engineer", fitScore: 94 },
      { name: "Priya Shah", role: "Design Lead", fitScore: 91 },
    ],
  },
  {
    name: "Offer",
    count: 6,
    cards: [
      { name: "Jordan Taylor", role: "Lead Product Designer", fitScore: 96 },
      { name: "Omar Wilson", role: "Data Engineer", fitScore: 89 },
    ],
  },
] as const;

export const analyticsMetrics = [
  { label: "Time to hire", value: "18 days", trend: "-12%" },
  { label: "Screening pass rate", value: "42%", trend: "+5 pts" },
  { label: "Offer acceptance", value: "88%", trend: "+4 pts" },
  { label: "Interviewer capacity", value: "73%", trend: "Healthy" },
] as const;

export const funnelData = [
  { stage: "Sourced", value: 412 },
  { stage: "Applied", value: 278 },
  { stage: "Screened", value: 121 },
  { stage: "Interviewed", value: 54 },
  { stage: "Offers", value: 11 },
];

export const settingsSections = [
  {
    title: "Workspace",
    description: "Branding, recruiter seats, and permissions for the HireStack (TalentOS) workspace.",
    items: ["Company profile", "User roles", "Approval chains"],
  },
  {
    title: "Automation",
    description: "Default AI prompts, routing rules, and candidate stage automations.",
    items: ["Scoring weights", "Stage triggers", "Notification rules"],
  },
  {
    title: "Deployment",
    description: "Environment and Docker settings verified for Ubuntu deployment.",
    items: ["NEXT_PUBLIC_API_BASE_URL", "Port 3000", "Standalone build"],
  },
] as const;

export const hiringActivity = [
  {
    label: "AI ranked 16 new profiles for Senior Frontend Engineer",
    timestamp: "12 min ago",
  },
  {
    label: "Jordan Taylor moved to Offer for Product Design Lead",
    timestamp: "34 min ago",
  },
  {
    label: "Recruiting Operations Manager draft updated with budget range",
    timestamp: "1 hour ago",
  },
] as const;

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id);
}

export function getCandidateById(id: string) {
  return candidates.find((candidate) => candidate.id === id);
}
