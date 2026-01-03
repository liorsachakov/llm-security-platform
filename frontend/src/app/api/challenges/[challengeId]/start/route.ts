import { NextResponse } from "next/server";

const BASE_URL = "https://u1xbad85mh.execute-api.us-east-1.amazonaws.com/dev";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  try {
    const { challengeId } = await params;

    if (!challengeId) {
      return NextResponse.json(
        { error: "Challenge ID is required" },
        { status: 400 }
      );
    }

    const upstream = await fetch(
      `${BASE_URL}/challenges/${encodeURIComponent(challengeId)}/start`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body: text },
        { status: 502 }
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
