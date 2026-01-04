import { NextResponse } from "next/server";

const BASE_URL = "https://u1xbad85mh.execute-api.us-east-1.amazonaws.com/dev";

export async function GET() {
  try {
    const upstream = await fetch(`${BASE_URL}/challenges/completedchallenges`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

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

