export const theme = {
  colors: {
    canvas: "#f5f7fb",
    canvasDark: "#07111f",
    panel: "rgba(255,255,255,0.88)",
    panelDark: "rgba(12, 22, 38, 0.82)",
    panelMuted: "rgba(255,255,255,0.64)",
    panelMutedDark: "rgba(19, 33, 54, 0.72)",
    border: "rgba(15, 23, 42, 0.08)",
    borderDark: "rgba(148, 163, 184, 0.14)",
    foreground: "#0f172a",
    foregroundDark: "#f8fafc",
    muted: "#475569",
    mutedDark: "#94a3b8",
    primary: "#2563eb",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  radius: {
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    pill: "999px",
  },
  shadows: {
    soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
    glow: "0 24px 80px rgba(37, 99, 235, 0.18)",
    darkGlow: "0 24px 80px rgba(59, 130, 246, 0.18)",
  },
  fonts: {
    sans: 'Inter, "SF Pro Display", ui-sans-serif, system-ui, sans-serif',
    mono: '"SFMono-Regular", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
} as const;

export type ThemeTokens = typeof theme;
