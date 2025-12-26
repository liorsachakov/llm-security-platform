export type UserRole = "Owner" | "Provider" | "Attacker";

export type PublicUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

export type MockUserRecord = PublicUser & {
  password: string;
  joinDate: string; // YYYY-MM-DD
  avatar: string;
};

/**
 * Seeded users for local/mock auth.
 * NOTE: This is intentionally hardcoded for UI development only.
 */
export const MOCK_USERS: MockUserRecord[] = [
  {
    id: "usr_owner_001",
    username: "owner_demo",
    email: "owner@demo.local",
    password: "OwnerDemo123!",
    role: "Owner",
    joinDate: "2025-09-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=owner_demo",
  },
  {
    id: "usr_attacker_001",
    username: "attacker_demo",
    email: "attacker@demo.local",
    password: "AttackerDemo123!",
    role: "Attacker",
    joinDate: "2025-10-02",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=attacker_demo",
  },
];

export function toPublicUser(user: MockUserRecord): PublicUser {
  const { password: _password, ...rest } = user;
  return rest;
}

export function findUserByIdentifier(identifier: string): MockUserRecord | undefined {
  const normalized = identifier.trim().toLowerCase();
  return MOCK_USERS.find(
    (u) => u.email.toLowerCase() === normalized || u.username.toLowerCase() === normalized,
  );
}


