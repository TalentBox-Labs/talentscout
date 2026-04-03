import { envConfig } from "@/lib/site";
import { settingsSections } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section>
        <Badge tone="primary">Workspace settings</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Deployment, permissions, and automation controls</h1>
        <p className="mt-2 text-[var(--color-muted)]">A cleaned settings hub for both app governance and Ubuntu Docker readiness.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {settingsSections.map((section) => (
          <Card key={section.title} className="rounded-[28px] p-6">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{section.description}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {section.items.map((item) => (
                <li key={item} className="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-[var(--color-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <Card className="rounded-[28px] p-6">
        <h2 className="text-xl font-semibold">Environment verification</h2>
        <p className="mt-3 text-sm text-[var(--color-muted)]">Current public API base URL: <span className="font-medium text-[var(--color-fg)]">{envConfig.apiBaseUrl}</span></p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">This value is supplied from `.env` and is ready to be overridden in Docker or Ubuntu server environments.</p>
      </Card>
    </div>
  );
}
