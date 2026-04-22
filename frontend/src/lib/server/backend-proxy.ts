import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, AUTH_USER_COOKIE, AuthUser, parseAuthUser, serializeAuthUser } from "@/lib/auth";
import { getBackendBaseUrl } from "@/lib/backend-api";

function getCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(typeof maxAge === "number" ? { maxAge } : {}),
  };
}

function tryParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractErrorMessage(text: string, fallback: string): string {
  const parsed = tryParseJson(text) as { error?: string } | null;
  return parsed?.error || text || fallback;
}

function buildJsonResponse(body: unknown, status: number): NextResponse {
  return NextResponse.json(body, { status });
}

export function setAuthCookies(response: NextResponse, token: string, user: AuthUser) {
  response.cookies.set({
    name: AUTH_TOKEN_COOKIE,
    value: token,
    ...getCookieOptions(60 * 60),
  });
  response.cookies.set({
    name: AUTH_USER_COOKIE,
    value: serializeAuthUser(user),
    ...getCookieOptions(60 * 60),
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set({
    name: AUTH_TOKEN_COOKIE,
    value: "",
    ...getCookieOptions(0),
  });
  response.cookies.set({
    name: AUTH_USER_COOKIE,
    value: "",
    ...getCookieOptions(0),
  });
}

export async function getAuthenticatedUserFromCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
  if (!token) return null;
  return parseAuthUser(cookieStore.get(AUTH_USER_COOKIE)?.value);
}

type ProxyOptions = {
  path: string;
  method?: string;
  body?: BodyInit | null;
  cache?: RequestCache;
  headers?: HeadersInit;
};

export async function proxyProtectedRequest({
  path,
  method = "GET",
  body,
  cache = "no-store",
  headers,
}: ProxyOptions): Promise<NextResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return buildJsonResponse({ error: "Authentication required" }, 401);
  }

  const upstream = await fetch(`${getBackendBaseUrl()}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(headers ?? {}),
    },
    ...(body !== undefined ? { body } : {}),
    cache,
  });

  const text = await upstream.text();
  const contentType = upstream.headers.get("content-type") ?? "application/json";

  if (upstream.status === 401) {
    const response = buildJsonResponse(
      {
        error: extractErrorMessage(text, "Your session has expired. Please sign in again."),
        authExpired: true,
      },
      401,
    );
    clearAuthCookies(response);
    return response;
  }

  if (upstream.status === 403) {
    return buildJsonResponse({ error: extractErrorMessage(text, "Forbidden") }, 403);
  }

  if (!upstream.ok) {
    return buildJsonResponse(
      {
        error: extractErrorMessage(text, "Upstream error"),
        status: upstream.status,
      },
      upstream.status,
    );
  }

  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": contentType },
  });
}
