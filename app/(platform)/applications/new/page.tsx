import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function NewApplicationPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Card className="rounded-[32px] p-8">
        <h1 className="text-3xl font-bold tracking-tight">Create application</h1>
        <p className="mt-2 text-[var(--color-muted)]">Link a candidate to a role and trigger your initial evaluation workflow.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Candidate</span>
            <Input placeholder="Alex Rivera" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Job</span>
            <Input placeholder="Senior Frontend Engineer" />
          </label>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Create application</Button>
        </div>
      </Card>
    </div>
  );
}
