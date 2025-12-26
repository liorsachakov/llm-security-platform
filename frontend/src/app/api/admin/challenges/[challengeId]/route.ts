import { NextResponse } from "next/server";

const ADMIN_CHALLENGES_URL =
  "https://u1xbad85mh.execute-api.us-east-1.amazonaws.com/dev/admin/challenges";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;
    if (!challengeId) {
      return NextResponse.json({ error: "challengeId is required" }, { status: 400 });
    }

    const upstream = await fetch(`${ADMIN_CHALLENGES_URL}/${encodeURIComponent(challengeId)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body: text },
        { status: 502 },
      );
    }

    return new NextResponse(text || JSON.stringify({ ok: true }), {
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;
    if (!challengeId) {
      return NextResponse.json({ error: "challengeId is required" }, { status: 400 });
    }

    const body = (await request.json()) as {
      title?: string;
      description?: string;
      system_prompt?: string;
    };

    const payload: Record<string, string> = {};
    if (typeof body.title === "string" && body.title.trim()) payload.title = body.title.trim();
    if (typeof body.description === "string" && body.description.trim())
      payload.description = body.description.trim();
    if (typeof body.system_prompt === "string" && body.system_prompt.trim())
      payload.system_prompt = body.system_prompt.trim();

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { error: "At least one of title, description, or system_prompt must be provided" },
        { status: 400 },
      );
    }

    const upstream = await fetch(`${ADMIN_CHALLENGES_URL}/${encodeURIComponent(challengeId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body: text },
        { status: 502 },
      );
    }

    return new NextResponse(text || JSON.stringify({ ok: true }), {
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


