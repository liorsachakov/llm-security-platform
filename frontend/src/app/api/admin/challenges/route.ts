import { NextResponse } from "next/server";

const ADMIN_CHALLENGES_URL =
  "https://u1xbad85mh.execute-api.us-east-1.amazonaws.com/dev/admin/challenges";

export async function GET() {
  try {
    const upstream = await fetch(ADMIN_CHALLENGES_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body: text },
        { status: 502 },
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      system_prompt?: string;
    };

    const title = body?.title?.trim();
    const description = body?.description?.trim();
    const system_prompt = body?.system_prompt?.trim();

    if (!title || !description || !system_prompt) {
      return NextResponse.json(
        { error: "title, description, and system_prompt are required" },
        { status: 400 },
      );
    }

    const upstream = await fetch(ADMIN_CHALLENGES_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, system_prompt }),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body: text },
        { status: 502 },
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Bad request", details: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    );
  }
}


