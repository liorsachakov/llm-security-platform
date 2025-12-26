import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MOCK_SESSION_COOKIE, parseSession } from "@/lib/mock-session";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(MOCK_SESSION_COOKIE)?.value;
  if (!raw) return NextResponse.json({ user: null }, { status: 200 });

  const session = parseSession(raw);
  if (!session) return NextResponse.json({ user: null }, { status: 200 });

  return NextResponse.json({ user: session.user }, { status: 200 });
}


