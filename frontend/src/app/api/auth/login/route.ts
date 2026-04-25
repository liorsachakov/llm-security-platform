import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/backend-api";
import { normalizeBackendUser } from "@/lib/auth";
import { clearAuthCookies, setAuthCookies } from "@/lib/server/backend-proxy";

type BackendLoginPayload = {
  token?: string;
  access_token?: string;
  username?: string;
  is_admin?: unknown;
  isAdmin?: unknown;
  admin?: unknown;
  role?: string;
  error?: string;
};

function tryParsePayload(text: string): BackendLoginPayload {
  try {
    return JSON.parse(text) as BackendLoginPayload;
  } catch {
    return { error: text || "Login failed" };
  }
}

function resolveIsAdmin(payload: BackendLoginPayload): boolean {
  if (payload.is_admin !== undefined) return Boolean(payload.is_admin);
  if (payload.isAdmin !== undefined) return Boolean(payload.isAdmin);
  if (payload.admin !== undefined) return Boolean(payload.admin);
  if (typeof payload.role === "string") {
    return payload.role.toLowerCase() === "owner" || payload.role.toLowerCase() === "admin";
  }
  return false;
}

function resolveToken(payload: BackendLoginPayload): string | undefined {
  return payload.token ?? payload.access_token;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    const username = body?.username?.trim().toLowerCase();
    const password = body?.password ?? "";

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const upstream = await fetch(`${getBackendBaseUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const text = await upstream.text();
    const payload = text ? tryParsePayload(text) : {};
    const token = resolveToken(payload);

    if (!upstream.ok || !token || !payload.username) {
      const response = NextResponse.json(
        { error: payload.error ?? "Login failed" },
        { status: upstream.status || 500 },
      );
      clearAuthCookies(response);
      return response;
    }

    const backendUsername = payload.username;

    const user = normalizeBackendUser({
      username: backendUsername,
      is_admin: resolveIsAdmin(payload),
    });
    const response = NextResponse.json({ user }, { status: 200 });
    setAuthCookies(response, token, user);
    return response;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
