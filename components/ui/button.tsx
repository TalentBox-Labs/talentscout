import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)] hover:brightness-110",
  secondary: "bg-white text-slate-950 hover:bg-slate-100 dark:bg-slate-50 dark:hover:bg-white",
  ghost: "bg-transparent text-[var(--color-fg)] hover:bg-white/50 dark:hover:bg-white/5",
  outline: "border border-[var(--color-border)] bg-white/60 text-[var(--color-fg)] hover:bg-white dark:bg-white/5 dark:hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const { asChild, children, ...buttonProps } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;

    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
