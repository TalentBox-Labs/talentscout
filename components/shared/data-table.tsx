import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type TableRow = {
  id: string;
  primary: string;
  secondary: string;
  meta: string;
  metric: string;
  status: string;
  href?: string;
};

function toneFromStatus(status: string) {
  if (["Active", "Offer", "Hired"].includes(status)) return "success" as const;
  if (["Draft", "Screening", "Interview"].includes(status)) return "warning" as const;
  if (["Closed", "Paused"].includes(status)) return "danger" as const;
  return "primary" as const;
}

export function DataTable({ title, rows }: { title: string; rows: TableRow[] }) {
  return (
    <Card className="overflow-hidden rounded-[28px] p-0">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-[var(--color-muted)]">{rows.length} entries</span>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {rows.map((row) => {
          const content = (
            <div className="flex flex-col gap-4 px-6 py-5 transition hover:bg-white/40 dark:hover:bg-white/5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold">{row.primary}</div>
                <div className="mt-1 text-sm text-[var(--color-muted)]">{row.secondary}</div>
              </div>
              <div className="text-sm text-[var(--color-muted)]">{row.meta}</div>
              <div className="text-sm font-semibold">{row.metric}</div>
              <div className="flex items-center gap-3">
                <Badge tone={toneFromStatus(row.status)}>{row.status}</Badge>
                <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
              </div>
            </div>
          );

          return row.href ? (
            <Link key={row.id} href={row.href} className="block">
              {content}
            </Link>
          ) : (
            <div key={row.id}>{content}</div>
          );
        })}
      </div>
    </Card>
  );
}
