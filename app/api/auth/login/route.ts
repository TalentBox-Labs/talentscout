import { NextResponse } from "next/server";
import { extractErrorMessage, getApiUrl, normalizeAuthUser, setAuthCookies } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  try {
    const payload = new URLSearchParams({
      username: email,
      password,
    });

    const backendResponse = await fetch(getApiUrl("/api/v1/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
      cache: "no-store",
    });

    const data = (await backendResponse.json().catch(() => null)) as Record<string, unknown> | null;

    if (!backendResponse.ok || !data) {
      return NextResponse.json(
        { message: extractErrorMessage(data, "Login failed.") },
        { status: backendResponse.status || 500 },
      );
    }

    const user = normalizeAuthUser((data.user ?? {}) as Record<string, unknown>);
    const response = NextResponse.json({ success: true, message: "Logged in successfully.", user });

    setAuthCookies(response, {
      accessToken: String(data.access_token ?? ""),
      refreshToken: String(data.refresh_token ?? ""),
      user,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Could not reach the authentication service. Make sure the backend is running." },
      { status: 503 },
    );
  }
}