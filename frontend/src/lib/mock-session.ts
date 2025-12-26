import type { PublicUser } from "@/lib/mock-db";

export const MOCK_SESSION_COOKIE = "mock_session";

export type MockSession = {
  user: PublicUser;
};

function encodeBase64Utf8(input: string): string {
  // Node runtime
  if (typeof Buffer !== "undefined") return Buffer.from(input, "utf8").toString("base64");
  // Edge/browser runtime
  // eslint-disable-next-line no-undef
  return btoa(unescape(encodeURIComponent(input)));
}

function decodeBase64Utf8(input: string): string {
  // Node runtime
  if (typeof Buffer !== "undefined") return Buffer.from(input, "base64").toString("utf8");
  // Edge/browser runtime
  // eslint-disable-next-line no-undef
  return decodeURIComponent(escape(atob(input)));
}

export function serializeSession(session: MockSession): string {
  return encodeBase64Utf8(JSON.stringify(session));
}

export function parseSession(raw: string): MockSession | null {
  try {
    const json = decodeBase64Utf8(raw);
    const parsed = JSON.parse(json) as MockSession;
    if (!parsed?.user?.id || !parsed?.user?.email || !parsed?.user?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}


