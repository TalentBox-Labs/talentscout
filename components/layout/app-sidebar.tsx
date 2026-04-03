"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Plus } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="surface-panel hidden w-[280px] shrink-0 flex-col justify-between border-r border-[var(--color-border)] px-5 py-6 lg:flex">
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">TalentScout</div>
            <div className="text-sm text-[var(--color-muted)]">Recruiting command center</div>
          </div>
        </div>

        <nav className="space-y-2">
          {siteConfig.appLinks.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]"
                    : "text-[var(--color-muted)] hover:bg-white/60 hover:text-[var(--color-fg)] dark:hover:bg-white/5",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="surface-card rounded-[28px] p-5">
          <div className="mb-3 text-sm font-semibold">Quick actions</div>
          <div className="space-y-3">
            {siteConfig.quickActions.map((action) => (
              <Link key={action.href} href={action.href} className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-muted)] transition hover:text-[var(--color-fg)]">
                {action.label}
                <Plus className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-card rounded-[28px] p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white dark:bg-slate-100 dark:text-slate-950">
            JS
          </div>
          <div>
            <div className="font-semibold">Jane Smith</div>
            <div className="text-sm text-[var(--color-muted)]">Lead recruiter</div>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-center">
          Manage workspace
        </Button>
      </div>
    </aside>
  );
}
