import { proxyProtectedRequest } from "@/lib/server/backend-proxy";

export async function GET() {
  return proxyProtectedRequest({
    path: "/admin/challenges",
    method: "GET",
  });
}

export async function POST(request: Request) {
  const body = await request.text();

  return proxyProtectedRequest({
    path: "/admin/challenges",
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
}
