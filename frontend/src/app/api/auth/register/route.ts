import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/backend-api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
      email?: string;
      country?: string;
      dateOfBirth?: string;
    };

    const payload = {
      username: body.username?.trim().toLowerCase(),
      password: body.password ?? "",
      email: body.email?.trim(),
      country: body.country?.trim(),
      dateOfBirth: body.dateOfBirth,
    };

    if (!payload.username || !payload.password || !payload.email || !payload.country || !payload.dateOfBirth) {
      return NextResponse.json(
        { error: "username, password, email, country, and dateOfBirth are required" },
        { status: 400 },
      );
    }

    const upstream = await fetch(`${getBackendBaseUrl()}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[register] Error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
