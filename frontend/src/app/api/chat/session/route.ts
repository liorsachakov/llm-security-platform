import { NextResponse } from "next/server";
import { proxyProtectedRequest } from "@/lib/server/backend-proxy";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionID = searchParams.get("session_id");

  if (!sessionID) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  return proxyProtectedRequest({
    path: `/sessions/${encodeURIComponent(sessionID)}`,
    method: "GET",
  });
}
