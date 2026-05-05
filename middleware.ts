import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEYS, setAuthCookies } from "@/lib/auth";

const authPages = new Set(["/login", "/signup"]);
const protectedPrefixes = ["/dashboard", "/jobs", "/candidates", "/analytics", "/settings", "/applications"];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const pathname = nextUrl.pathname;
  const accessToken = nextUrl.searchParams.get("access_token");
  const refreshToken = nextUrl.searchParams.get("refresh_token");

  if (accessToken) {
    const cleanUrl = nextUrl.clone();
    cleanUrl.searchParams.delete("access_token");
    cleanUrl.searchParams.delete("refresh_token");
    cleanUrl.searchParams.delete("oauth_login");

    const response = NextResponse.redirect(cleanUrl);
    setAuthCookies(response, { accessToken, refreshToken });
    return response;
  }

  const hasSession = Boolean(cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value || cookies.get(AUTH_COOKIE_KEYS.refreshToken)?.value);

  if (isProtectedPath(pathname) && !hasSession) {
    const loginUrl = nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";

    const requestedPath = `${pathname}${nextUrl.search}`;
    if (requestedPath && requestedPath !== "/") {
      loginUrl.searchParams.set("next", requestedPath);
    }

    return NextResponse.redirect(loginUrl);
  }

  if (authPages.has(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)"],
};