export type MockModel = {
  id: number;
  name: string;
  status: "Active" | "Testing" | "Paused";
  visibility: "Public" | "Private";
  description: string;
  uploaded: string; // YYYY-MM-DD
  vulnerabilities: number;
  tests: number;
  ownerUserId: string;
};

export const MOCK_MODELS: MockModel[] = [
  {
    id: 1,
    name: "GPT-Defense-v1",
    description: "Enhanced security model with prompt injection protection",
    visibility: "Public",
    status: "Active",
    uploaded: "2025-10-10",
    vulnerabilities: 3,
    tests: 156,
    ownerUserId: "usr_owner_001",
  },
  {
    id: 2,
    name: "SecureLLM-Beta",
    description: "Experimental model with advanced content filtering",
    visibility: "Private",
    status: "Testing",
    uploaded: "2025-10-15",
    vulnerabilities: 1,
    tests: 45,
    ownerUserId: "usr_owner_001",
  },
];


