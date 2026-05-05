import type { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  AUTH_COOKIE_KEYS,
  clearAuthCookies,
  extractErrorMessage,
  getApiUrl,
  parseAuthUser,
  setAuthCookies,
} from "@/lib/auth";

type ServerSession = {
  accessToken: string | null;
  refreshToken: string | null;
  user: ReturnType<typeof parseAuthUser>;
};

export type BackendAuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: ReturnType<typeof parseAuthUser>;
  refreshed: boolean;
  clearCookies: boolean;
  errorMessage?: string;
};

export type BackendFetchResult = {
  response: Response | null;
  auth: BackendAuthState;
};

async function getServerSession(): Promise<ServerSession> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value ?? null,
    refreshToken: cookieStore.get(AUTH_COOKIE_KEYS.refreshToken)?.value ?? null,
    user: parseAuthUser(cookieStore.get(AUTH_COOKIE_KEYS.user)?.value),
  };
}

async function fetchWithAccessToken(path: string, init: RequestInit, accessToken: string) {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;

  if (init.body && !headers.has("Content-Type") && !isFormData) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(getApiUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });
}

async function refreshServerAccessToken(refreshToken: string) {
  const response = await fetch(getApiUrl("/api/v1/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as Record<string, unknown> | null;

  if (!response.ok || !data?.access_token) {
    return {
      accessToken: null,
      errorMessage: extractErrorMessage(data, "Session refresh failed."),
    };
  }

  return {
    accessToken: String(data.access_token),
  };
}

export async function getServerAccessToken() {
  const session = await getServerSession();
  return session.accessToken;
}

export async function backendFetch(path: string, init: RequestInit = {}): Promise<BackendFetchResult> {
  const session = await getServerSession();
  let accessToken = session.accessToken;

  const auth: BackendAuthState = {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    user: session.user,
    refreshed: false,
    clearCookies: false,
  };

  if (!accessToken && !session.refreshToken) {
    auth.clearCookies = true;
    auth.errorMessage = "No active session.";
    return { response: null, auth };
  }

  if (accessToken) {
    const response = await fetchWithAccessToken(path, init, accessToken);
    if (response.status !== 401) {
      return { response, auth };
    }
  }

  if (!session.refreshToken) {
    auth.clearCookies = true;
    auth.errorMessage = "No active session.";
    return { response: null, auth };
  }

  const refreshResult = await refreshServerAccessToken(session.refreshToken);
  if (!refreshResult.accessToken) {
    auth.clearCookies = true;
    auth.errorMessage = refreshResult.errorMessage ?? "Session refresh failed.";
    return { response: null, auth };
  }

  accessToken = refreshResult.accessToken;
  auth.accessToken = accessToken;
  auth.refreshed = true;

  const retryResponse = await fetchWithAccessToken(path, init, accessToken);
  if (retryResponse.status === 401) {
    auth.clearCookies = true;
    auth.errorMessage = "No active session.";
    return { response: null, auth };
  }

  return { response: retryResponse, auth };
}

export async function adminBackendFetch(path: string, init: RequestInit = {}) {
  return backendFetch(path, init);
}

export function applyBackendAuth(response: NextResponse, auth: BackendAuthState) {
  if (auth.clearCookies) {
    clearAuthCookies(response);
    return response;
  }

  if (auth.refreshed && auth.accessToken) {
    setAuthCookies(response, {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      user: auth.user,
    });
  }

  return response;
}
