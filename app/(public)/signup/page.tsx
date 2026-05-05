import { redirectIfAuthenticated } from "@/lib/auth-server";
import { AuthPageShell } from "@/components/marketing/auth-page-shell";

export default async function SignupPage() {
  await redirectIfAuthenticated();

  return (
    <AuthPageShell
      mode="signup"
      title="Create a HireStack (TalentOS) account for structured, high-velocity hiring."
      description="Start a HireStack (TalentOS) trial to manage requisitions, rank candidates, and keep hiring teams aligned from shortlist to offer."
      alternateLabel="Already have an account?"
      alternateHref="/login"
      alternateCta="Log in"
    />
  );
}