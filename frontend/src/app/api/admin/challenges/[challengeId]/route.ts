import { NextResponse } from "next/server";
import { proxyProtectedRequest } from "@/lib/server/backend-proxy";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  const { challengeId } = await params;
  if (!challengeId) {
    return NextResponse.json({ error: "challengeId is required" }, { status: 400 });
  }

  return proxyProtectedRequest({
    path: `/admin/challenges/${encodeURIComponent(challengeId)}`,
    method: "DELETE",
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  const { challengeId } = await params;
  if (!challengeId) {
    return NextResponse.json({ error: "challengeId is required" }, { status: 400 });
  }

  const body = await request.text();

  return proxyProtectedRequest({
    path: `/admin/challenges/${encodeURIComponent(challengeId)}`,
    method: "PUT",
    body,
    headers: { "Content-Type": "application/json" },
  });
}
