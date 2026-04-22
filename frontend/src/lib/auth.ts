export type UserRole = "Owner" | "Attacker";

export type AuthUser = {
  username: string;
  role: UserRole;
  isAdmin: boolean;
};

export const AUTH_TOKEN_COOKIE = "auth_token";
export const AUTH_USER_COOKIE = "auth_user";

export function normalizeBackendUser(payload: { username: string; is_admin?: boolean; isAdmin?: boolean }): AuthUser {
  const isAdmin = Boolean(payload.is_admin ?? payload.isAdmin);

  return {
    username: payload.username,
    role: isAdmin ? "Owner" : "Attacker",
    isAdmin,
  };
}

function encodeBase64Utf8(input: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(input, "utf8").toString("base64");
  // eslint-disable-next-line no-undef
  return btoa(unescape(encodeURIComponent(input)));
}

function decodeBase64Utf8(input: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(input, "base64").toString("utf8");
  // eslint-disable-next-line no-undef
  return decodeURIComponent(escape(atob(input)));
}

export function serializeAuthUser(user: AuthUser): string {
  return encodeBase64Utf8(JSON.stringify(user));
}

export function parseAuthUser(raw?: string | null): AuthUser | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(decodeBase64Utf8(raw)) as Partial<AuthUser>;

    if (!parsed?.username || (parsed.role !== "Owner" && parsed.role !== "Attacker")) {
      return null;
    }

    return {
      username: parsed.username,
      role: parsed.role,
      isAdmin: Boolean(parsed.isAdmin ?? parsed.role === "Owner"),
    };
  } catch {
    return null;
  }
}
