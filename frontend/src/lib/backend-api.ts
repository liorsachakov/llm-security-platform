function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

export function getBackendBaseUrl(): string {
  const directBaseUrl = process.env.BACKEND_API_BASE_URL?.trim();
  if (directBaseUrl) {
    return directBaseUrl.replace(/\/+$/, "");
  }

  const origin = process.env.BACKEND_API_ORIGIN?.trim();
  const stage = process.env.BACKEND_API_STAGE?.trim();

  if (!origin) {
    throw new Error(
      "Missing backend API configuration. " +
      "Set BACKEND_API_BASE_URL or BACKEND_API_ORIGIN + BACKEND_API_STAGE in your .env.local file. " +
      "See .env.example for details."
    );
  }

  return `${origin.replace(/\/+$/, "")}/${trimSlashes(stage || "prod")}`;
}
