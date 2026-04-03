import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-slate-900/5 text-slate-700 ring-slate-900/10 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10",
  primary: "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300",
  success: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  warning: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
  danger: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300",
};

export function Badge({ className, tone = "neutral", children }: { className?: string; tone?: BadgeTone; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset", toneClasses[tone], className)}>
      {children}
    </span>
  );
}
