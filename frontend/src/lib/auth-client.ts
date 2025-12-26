import type { PublicUser } from "@/lib/mock-db";

export async function apiLogin(params: { identifier: string; password: string }): Promise<PublicUser> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = (await res.json()) as { user?: PublicUser; error?: string };
  if (!res.ok || !data.user) {
    throw new Error(data.error || "Login failed");
  }
  return data.user;
}

export async function apiMe(): Promise<PublicUser | null> {
  const res = await fetch("/api/auth/me", { method: "GET" });
  const data = (await res.json()) as { user: PublicUser | null };
  return data.user ?? null;
}

export async function apiLogout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}


