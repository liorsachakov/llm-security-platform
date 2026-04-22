import { NextResponse } from "next/server";
import { MOCK_MODELS } from "@/lib/mock-models";
import { getAuthenticatedUserFromCookies } from "@/lib/server/backend-proxy";

export async function GET() {
  const user = await getAuthenticatedUserFromCookies();
  if (!user || user.role !== "Owner") {
    return NextResponse.json({ models: [] }, { status: 200 });
  }

  return NextResponse.json({ models: MOCK_MODELS }, { status: 200 });
}
