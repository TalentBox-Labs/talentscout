import { ArrowUpRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <Card className="rounded-[28px] p-5">
      <CardHeader className="mb-4">
        <div>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
        </div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </CardHeader>
      <p className="text-sm text-[var(--color-muted)]">{delta}</p>
    </Card>
  );
}
