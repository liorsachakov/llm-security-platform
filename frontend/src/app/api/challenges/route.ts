import { proxyProtectedRequest } from "@/lib/server/backend-proxy";

export async function GET() {
  return proxyProtectedRequest({
    path: "/challenges",
    method: "GET",
  });
}
