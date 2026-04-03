"use client";

import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full" aria-hidden="true" />;
  }

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = activeTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/70 text-[var(--color-muted)] transition-all hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {isDark ? <SunMedium className="h-4 w-4 text-amber-300" /> : <MoonStar className="h-4 w-4 text-blue-600" />}
    </button>
  );
}
