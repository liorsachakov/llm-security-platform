import { NextResponse } from "next/server";
import { proxyProtectedRequest } from "@/lib/server/backend-proxy";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  const { challengeId } = await params;

  if (!challengeId) {
    return NextResponse.json({ error: "Challenge ID is required" }, { status: 400 });
  }

  return proxyProtectedRequest({
    path: `/challenges/${encodeURIComponent(challengeId)}/start`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
