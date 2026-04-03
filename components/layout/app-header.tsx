import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="surface-panel sticky top-0 z-30 border-b border-[var(--color-border)] px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="text-lg font-bold">TalentScout</div>
        </div>
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
          <Input placeholder="Search jobs, candidates, or activities" className="pl-10" />
        </div>
        <div className="flex items-center gap-3 self-end lg:self-auto">
          <ThemeToggle />
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/70 text-[var(--color-muted)] transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <Button asChild>
            <Link href="/jobs/new">Post a job</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
