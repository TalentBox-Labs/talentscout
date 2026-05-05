import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_KEYS,
  clearAuthCookies,
  extractErrorMessage,
  getApiUrl,
  normalizeAuthUser,
  setAuthCookies,
} from "@/lib/auth";

async function fetchCurrentUser(accessToken: string) {
  return fetch(getApiUrl("/api/v1/auth/me"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
}

async function refreshAccessToken(refreshToken: string) {
  return fetch(getApiUrl("/api/v1/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split("; ")
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf("=");
        return [cookie.slice(0, index), cookie.slice(index + 1)];
      }),
  );

  let accessToken = cookies[AUTH_COOKIE_KEYS.accessToken] ?? "";
  const refreshToken = cookies[AUTH_COOKIE_KEYS.refreshToken] ?? "";

  if (!accessToken && !refreshToken) {
    const response = NextResponse.json({ authenticated: false, message: "No active session." }, { status: 401 });
    clearAuthCookies(response);
    return response;
  }

  try {
    let meResponse = accessToken ? await fetchCurrentUser(accessToken) : null;

    if ((!meResponse || meResponse.status === 401) && refreshToken) {
      const refreshResponse = await refreshAccessToken(refreshToken);
      const refreshData = (await refreshResponse.json().catch(() => null)) as Record<string, unknown> | null;

      if (!refreshResponse.ok || !refreshData?.access_token) {
        const response = NextResponse.json(
          { authenticated: false, message: extractErrorMessage(refreshData, "Session refresh failed.") },
          { status: 401 },
        );
        clearAuthCookies(response);
        return response;
      }

      accessToken = String(refreshData.access_token);
      meResponse = await fetchCurrentUser(accessToken);
    }

    const meData = (await meResponse?.json().catch(() => null)) as Record<string, unknown> | null;

    if (!meResponse?.ok || !meData) {
      const response = NextResponse.json(
        { authenticated: false, message: extractErrorMessage(meData, "Session lookup failed.") },
        { status: meResponse?.status || 401 },
      );
      clearAuthCookies(response);
      return response;
    }

    const user = normalizeAuthUser(meData);
    const response = NextResponse.json({ authenticated: true, user });
    setAuthCookies(response, { accessToken, refreshToken, user });
    return response;
  } catch {
    return NextResponse.json(
      { authenticated: false, message: "Could not reach the authentication service." },
      { status: 503 },
    );
  }
}