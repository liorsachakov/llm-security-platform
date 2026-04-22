import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/backend-api";
import { normalizeBackendUser } from "@/lib/auth";
import { clearAuthCookies, setAuthCookies } from "@/lib/server/backend-proxy";

function tryParsePayload(text: string) {
  try {
    return JSON.parse(text) as { token?: string; username?: string; is_admin?: boolean; error?: string };
  } catch {
    return { error: text || "Login failed" };
  }
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

    if (!upstream.ok || !payload.token || !payload.username) {
      const response = NextResponse.json(
        { error: payload.error ?? "Login failed" },
        { status: upstream.status || 500 },
      );
      clearAuthCookies(response);
      return response;
    }

    const backendUsername = payload.username;
    const token = payload.token;

    const user = normalizeBackendUser({
      username: backendUsername,
      is_admin: payload.is_admin,
    });
    const response = NextResponse.json({ user }, { status: 200 });
    setAuthCookies(response, token, user);
    return response;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
