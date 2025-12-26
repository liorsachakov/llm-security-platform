import { NextResponse } from "next/server";
import { findUserByIdentifier, toPublicUser } from "@/lib/mock-db";
import { MOCK_SESSION_COOKIE, serializeSession } from "@/lib/mock-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      identifier?: string;
      password?: string;
    };

    const identifier = body?.identifier?.trim();
    const password = body?.password ?? "";

    if (!identifier || !password) {
      return NextResponse.json({ error: "Identifier and password are required" }, { status: 400 });
    }

    const user = findUserByIdentifier(identifier);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const publicUser = toPublicUser(user);
    const res = NextResponse.json({ user: publicUser });
    res.cookies.set({
      name: MOCK_SESSION_COOKIE,
      value: serializeSession({ user: publicUser }),
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      // 7 days
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}


