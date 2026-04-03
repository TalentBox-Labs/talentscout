import { pipelineColumns } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function PipelineBoard() {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {pipelineColumns.map((column) => (
        <Card key={column.name} className="rounded-[28px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{column.name}</h3>
              <p className="text-sm text-[var(--color-muted)]">{column.count} candidates</p>
            </div>
            <Badge tone="primary">Live</Badge>
          </div>
          <div className="space-y-3">
            {column.cards.map((card) => (
              <div key={card.name} className="surface-subtle rounded-3xl p-4">
                <div className="font-medium">{card.name}</div>
                <div className="mt-1 text-sm text-[var(--color-muted)]">{card.role}</div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-[var(--color-muted)]">AI fit score</span>
                  <span className="font-semibold text-[var(--color-primary)]">{card.fitScore}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
