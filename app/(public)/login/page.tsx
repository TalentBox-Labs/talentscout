import { redirectIfAuthenticated } from "@/lib/auth-server";
import { AuthPageShell } from "@/components/marketing/auth-page-shell";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <AuthPageShell
      mode="login"
      title="Log in and pick up the hiring pipeline where you left it."
      description="Log in to HireStack (TalentOS) to review active roles, candidate pipelines, and hiring analytics from one focused system."
      alternateLabel="Need an account?"
      alternateHref="/signup"
      alternateCta="Create one"
    />
  );
}