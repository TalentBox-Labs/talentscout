export type WorkspaceTone = "primary" | "success" | "warning" | "danger";

export type WorkspaceMetric = {
  label: string;
  value: string;
  delta: string;
};

export type WorkspaceTaskPriority = "High" | "Medium" | "Low";

export type WorkspaceTask = {
  title: string;
  detail: string;
  priority: WorkspaceTaskPriority;
};

export type WorkspaceOverviewCard = {
  icon: "jobs" | "candidates" | "attention";
  label: string;
  value: string;
  detail: string;
};

export type PipelineCard = {
  name: string;
  role: string;
  fitScore: string;
};

export type PipelineColumn = {
  name: string;
  count: number;
  cards: PipelineCard[];
};

export type WorkspaceActivityItem = {
  id: string;
  label: string;
  timestamp: string;
};

export type WorkspaceHealth = {
  label: string;
  tone: WorkspaceTone;
};

export type WorkspaceOverviewPayload = {
  summary: {
    totalJobs: number;
    openJobs: number;
    draftJobs: number;
    pausedJobs: number;
    totalCandidates: number;
    totalApplications: number;
    appliedCount: number;
    screeningCount: number;
    interviewCount: number;
    offerCount: number;
    hiredCount: number;
    avgTimeToHire: number;
    conversionRate: number;
  };
  metrics: WorkspaceMetric[];
  tasks: WorkspaceTask[];
  overview: WorkspaceOverviewCard[];
  pipeline: PipelineColumn[];
  recentActivity: WorkspaceActivityItem[];
  insights: string[];
  health: WorkspaceHealth;
  warnings?: string[];
};