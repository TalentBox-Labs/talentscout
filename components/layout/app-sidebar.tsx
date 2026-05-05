"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bot, LayoutDashboard, Plus, Settings2, ShieldCheck } from "lucide-react";
import type { AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SessionLike = {
  user: AuthUser | null;
};

export function AppSidebar({ session }: { session: SessionLike }) {
  const pathname = usePathname();
  const isSuperAdmin = Boolean(session.user?.isSuperAdmin);
  const appLinks = isSuperAdmin
    ? [
        { label: "Admin overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Platform analytics", href: "/analytics", icon: BarChart3 },
        { label: "Admin settings", href: "/settings", icon: Settings2 },
      ]
    : [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Jobs", href: "/jobs", icon: Bot },
        { label: "Analytics", href: "/analytics", icon: BarChart3 },
        { label: "Settings", href: "/settings", icon: Settings2 },
      ];
  const quickActions = isSuperAdmin
    ? [
        { label: "Review approvals", href: "/dashboard" },
        { label: "Open analytics", href: "/analytics" },
        { label: "Platform settings", href: "/settings" },
      ]
    : [
        { label: "Post a role", href: "/jobs/new" },
        { label: "Create application", href: "/applications/new" },
      ];
  const subtitle = isSuperAdmin ? "Platform control center" : "Recruiting command center";
  const initials = `${session.user?.firstName?.[0] ?? "A"}${session.user?.lastName?.[0] ?? "D"}`;
  const roleLabel = isSuperAdmin ? "Super admin" : "Workspace member";

  return (
    <aside className="surface-panel hidden w-[280px] shrink-0 flex-col justify-between border-r border-[var(--color-border)] px-5 py-6 lg:flex">
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">HireStack (TalentOS)</div>
            <div className="text-sm text-[var(--color-muted)]">{subtitle}</div>
          </div>
        </div>

        <nav className="space-y-2">
          {appLinks.map((item) => {
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
            {quickActions.map((action) => (
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
            {initials}
          </div>
          <div>
            <div className="font-semibold">{session.user?.fullName ?? "Admin user"}</div>
            <div className="text-sm text-[var(--color-muted)] inline-flex items-center gap-1">
              {isSuperAdmin ? <ShieldCheck className="h-3.5 w-3.5" /> : null}
              {roleLabel}
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-center" asChild>
          <Link href={isSuperAdmin ? "/settings" : "/dashboard"}>{isSuperAdmin ? "Open admin settings" : "Manage workspace"}</Link>
        </Button>
      </div>
    </aside>
  );
}
