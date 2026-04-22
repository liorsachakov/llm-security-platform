import { NextResponse } from "next/server";
import { getAuthenticatedUserFromCookies } from "@/lib/server/backend-proxy";

export async function GET() {
  const user = await getAuthenticatedUserFromCookies();
  return NextResponse.json({ user }, { status: 200 });
}
