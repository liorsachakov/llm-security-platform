import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MOCK_MODELS } from "@/lib/mock-models";
import { MOCK_SESSION_COOKIE, parseSession } from "@/lib/mock-session";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(MOCK_SESSION_COOKIE)?.value;
  const session = raw ? parseSession(raw) : null;
  if (!session?.user?.id) return NextResponse.json({ models: [] }, { status: 200 });

  const models = MOCK_MODELS.filter((m) => m.ownerUserId === session.user.id);
  return NextResponse.json({ models }, { status: 200 });
}


