import { SuperAdminDashboard } from "@/components/dashboard/super-admin-dashboard";
import { WorkspaceDashboard } from "@/components/dashboard/workspace-dashboard";
import { getStoredSession } from "@/lib/auth-server";

export default async function DashboardPage() {
  const session = await getStoredSession();

  if (session.user?.isSuperAdmin) {
    return <SuperAdminDashboard />;
  }

  return <WorkspaceDashboard user={session.user} />;
}
