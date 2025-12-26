import { NextResponse } from "next/server";
import { MOCK_SESSION_COOKIE } from "@/lib/mock-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: MOCK_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}


