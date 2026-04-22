import type { AuthUser } from "@/lib/auth";
import { apiJsonFetch } from "@/lib/client-api";

export async function apiLogin(params: { username: string; password: string }): Promise<AuthUser> {
  const data = await apiJsonFetch<{ user: AuthUser }>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return data.user;
}

export async function apiRegister(params: {
  username: string;
  password: string;
  email: string;
  country: string;
  dateOfBirth: string;
}): Promise<void> {
  await apiJsonFetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
}

export async function apiMe(): Promise<AuthUser | null> {
  const data = await apiJsonFetch<{ user: AuthUser | null }>("/api/auth/me", { method: "GET" });
  return data.user ?? null;
}

export async function apiLogout(): Promise<void> {
  await apiJsonFetch("/api/auth/logout", { method: "POST" });
}
