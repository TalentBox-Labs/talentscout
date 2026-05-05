import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEYS, clearAuthCookies, getApiUrl } from "@/lib/auth";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const accessToken = cookieHeader
    .split("; ")
    .find((cookie) => cookie.startsWith(`${AUTH_COOKIE_KEYS.accessToken}=`))
    ?.split("=")
    .slice(1)
    .join("=");

  if (accessToken) {
    try {
      await fetch(getApiUrl("/api/v1/auth/logout"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      });
    } catch {
      // Ignore backend logout failures; cookie clearing is the important part here.
    }
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully." });
  clearAuthCookies(response);
  return response;
}