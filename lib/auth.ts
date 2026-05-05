import type { NextResponse } from "next/server";

export const AUTH_COOKIE_KEYS = {
  accessToken: "talentscout_access_token",
  refreshToken: "talentscout_refresh_token",
  user: "talentscout_user",
} as const;

export const AUTH_COOKIE_MAX_AGE = {
  accessToken: 60 * 30,
  refreshToken: 60 * 60 * 24 * 7,
} as const;

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
  isVerified: boolean;
  isSuperAdmin?: boolean;
  approvalStatus?: string;
};

type CookiePayload = {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: AuthUser | null;
};

export function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000").replace(/\/$/, "");
}

export function getApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export function normalizeAuthUser(user: Record<string, unknown>): AuthUser {
  const firstName = String(user.first_name ?? user.firstName ?? "");
  const lastName = String(user.last_name ?? user.lastName ?? "");
  const fullName = String(user.full_name ?? user.fullName ?? `${firstName} ${lastName}`.trim());

  return {
    id: String(user.id ?? ""),
    email: String(user.email ?? ""),
    firstName,
    lastName,
    fullName,
    isActive: Boolean(user.is_active ?? user.isActive ?? false),
    isVerified: Boolean(user.is_verified ?? user.isVerified ?? false),
    isSuperAdmin: Boolean(user.is_super_admin ?? user.isSuperAdmin ?? false),
    approvalStatus: user.approval_status ? String(user.approval_status) : undefined,
  };
}

export function serializeAuthUser(user: AuthUser) {
  return encodeURIComponent(JSON.stringify(user));
}

export function parseAuthUser(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(value)) as AuthUser;
  } catch {
    return null;
  }
}

export function extractErrorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const detail = "detail" in data ? data.detail : undefined;
  const message = "message" in data ? data.message : undefined;

  if (Array.isArray(detail)) {
    const formatted = detail
      .map((entry) => {
        if (!entry || typeof entry !== "object") {
          return null;
        }

        const entryMessage = "msg" in entry && typeof entry.msg === "string" ? entry.msg.trim() : "";
        const entryLocation = "loc" in entry && Array.isArray(entry.loc)
          ? (entry.loc as unknown[])
              .filter((segment: unknown): segment is string | number => typeof segment === "string" || typeof segment === "number")
              .map(String)
              .filter((segment) => segment !== "body")
              .join(" → ")
          : "";

        if (!entryMessage) {
          return null;
        }

        return entryLocation ? `${entryLocation}: ${entryMessage}` : entryMessage;
      })
      .filter((entry): entry is string => Boolean(entry));

    if (formatted.length > 0) {
      return formatted.join("; ");
    }
  }

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  return fallback;
}

export function setAuthCookies(response: NextResponse, payload: CookiePayload) {
  const secure = process.env.NODE_ENV === "production";

  if (payload.accessToken) {
    response.cookies.set(AUTH_COOKIE_KEYS.accessToken, payload.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE.accessToken,
    });
  }

  if (payload.refreshToken) {
    response.cookies.set(AUTH_COOKIE_KEYS.refreshToken, payload.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE.refreshToken,
    });
  }

  if (payload.user) {
    response.cookies.set(AUTH_COOKIE_KEYS.user, serializeAuthUser(payload.user), {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE.refreshToken,
    });
  }
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_KEYS.accessToken, "", { path: "/", maxAge: 0 });
  response.cookies.set(AUTH_COOKIE_KEYS.refreshToken, "", { path: "/", maxAge: 0 });
  response.cookies.set(AUTH_COOKIE_KEYS.user, "", { path: "/", maxAge: 0 });
}