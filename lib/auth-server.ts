import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_KEYS, parseAuthUser } from "@/lib/auth";

export async function getStoredSession() {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value ?? null,
    refreshToken: cookieStore.get(AUTH_COOKIE_KEYS.refreshToken)?.value ?? null,
    user: parseAuthUser(cookieStore.get(AUTH_COOKIE_KEYS.user)?.value),
  };
}

export async function requireStoredSession() {
  const session = await getStoredSession();

  if (!session.accessToken && !session.refreshToken) {
    redirect("/login");
  }

  return session;
}

export async function redirectIfAuthenticated() {
  const session = await getStoredSession();

  if (session.accessToken || session.refreshToken) {
    redirect("/dashboard");
  }
}