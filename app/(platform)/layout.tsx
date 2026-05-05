import type { ReactNode } from "react";
import { requireStoredSession } from "@/lib/auth-server";
import { AppShell } from "@/components/layout/app-shell";

export default async function PlatformLayout({ children }: { children: ReactNode }) {
  await requireStoredSession();

  return <AppShell>{children}</AppShell>;
}
