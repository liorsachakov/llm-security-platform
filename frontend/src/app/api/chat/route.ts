import { NextResponse } from "next/server";
import { proxyProtectedRequest } from "@/lib/server/backend-proxy";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      prompt?: string;
      session_id?: string;
    };

    if (!body.prompt?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!body.session_id) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    return proxyProtectedRequest({
      path: `/sessions/${encodeURIComponent(body.session_id)}/messages`,
      method: "POST",
      body: JSON.stringify({ prompt: body.prompt.trim() }),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
