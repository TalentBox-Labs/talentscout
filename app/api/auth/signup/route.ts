import { NextResponse } from "next/server";
import { extractErrorMessage, getApiUrl, normalizeAuthUser, setAuthCookies } from "@/lib/auth";

type SignupRequest = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  justification?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SignupRequest | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const firstName = body?.firstName?.trim() ?? "";
  const lastName = body?.lastName?.trim() ?? "";

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json({ message: "First name, last name, email, and password are required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters long." }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(getApiUrl("/api/v1/auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        organization_name: body?.organizationName?.trim() || undefined,
        justification: body?.justification?.trim() || undefined,
      }),
      cache: "no-store",
    });

    const data = (await backendResponse.json().catch(() => null)) as Record<string, unknown> | null;

    if (!backendResponse.ok || !data) {
      return NextResponse.json(
        { message: extractErrorMessage(data, "Registration failed.") },
        { status: backendResponse.status || 500 },
      );
    }

    const accessToken = String(data.access_token ?? "");
    const refreshToken = String(data.refresh_token ?? "");
    const pendingApproval = !accessToken || !refreshToken;

    if (pendingApproval) {
      return NextResponse.json({
        success: true,
        pendingApproval: true,
        message: extractErrorMessage(data, "Registration submitted. Await administrator approval."),
      });
    }

    const user = normalizeAuthUser((data.user ?? {}) as Record<string, unknown>);
    const response = NextResponse.json({ success: true, message: "Account created successfully.", user });

    setAuthCookies(response, {
      accessToken,
      refreshToken,
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