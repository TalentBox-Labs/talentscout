import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-full border border-[var(--color-border)] bg-white/80 px-4 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-primary)]/40 focus:ring-4 focus:ring-[var(--color-primary)]/10 dark:bg-white/5",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
