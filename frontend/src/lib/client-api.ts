"use client";

type ApiErrorPayload = {
  error?: string;
  authExpired?: boolean;
  [key: string]: unknown;
};

export class ApiError extends Error {
  status: number;
  payload: ApiErrorPayload | null;

  constructor(message: string, status: number, payload: ApiErrorPayload | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function readResponsePayload(response: Response): Promise<ApiErrorPayload | null> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as ApiErrorPayload;
  } catch {
    return { error: text };
  }
}

export async function apiJsonFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const payload = await readResponsePayload(response);

  if (!response.ok) {
    if (typeof window !== "undefined" && payload?.authExpired) {
      window.dispatchEvent(
        new CustomEvent("auth-expired", {
          detail: {
            error: payload.error ?? "Your session has expired. Please sign in again.",
          },
        }),
      );
    }

    throw new ApiError(payload?.error ?? "Request failed", response.status, payload);
  }

  return (payload ?? {}) as T;
}
