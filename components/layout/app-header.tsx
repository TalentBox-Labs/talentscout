import Link from "next/link";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getStoredSession } from "@/lib/auth-server";

export async function AppHeader() {
  const session = await getStoredSession();
  const isSuperAdmin = Boolean(session.user?.isSuperAdmin);
  const searchPlaceholder = isSuperAdmin
    ? "Search approval requests, organizations, or users"
    : "Search jobs, candidates, or activities";
  const primaryAction = isSuperAdmin
    ? { href: "/dashboard", label: "Review approvals" }
    : { href: "/jobs/new", label: "Post a job" };

  return (
    <header className="surface-panel sticky top-0 z-30 border-b border-[var(--color-border)] px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="text-lg font-bold">HireStack (TalentOS)</div>
        </div>
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
          <Input placeholder={searchPlaceholder} className="pl-10" />
        </div>
        <div className="flex items-center gap-3 self-end lg:self-auto">
          {session.user ? (
            <div className="hidden rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm text-[var(--color-muted)] dark:bg-white/5 sm:block">
              <span className="font-semibold text-[var(--color-fg)]">{session.user.fullName}</span>
              <span className="mx-2 text-[var(--color-border)]">·</span>
              <span>{session.user.email}</span>
              {isSuperAdmin ? (
                <>
                  <span className="mx-2 text-[var(--color-border)]">·</span>
                  <span className="inline-flex items-center gap-1 text-[var(--color-primary)]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Super admin
                  </span>
                </>
              ) : null}
            </div>
          ) : null}
          <ThemeToggle />
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/70 text-[var(--color-muted)] transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <LogoutButton />
          <Button asChild>
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
