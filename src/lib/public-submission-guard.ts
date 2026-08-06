import type { NextRequest } from "next/server";

const MAX_PUBLIC_MULTIPART_BYTES = 10 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const buckets = new Map<string, { count: number; resetAt: number }>();

export class PublicSubmissionError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
    this.name = "PublicSubmissionError";
  }
}

export function assertPublicSubmissionAllowed(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_PUBLIC_MULTIPART_BYTES) {
    throw new PublicSubmissionError("That upload is too large. Please choose a smaller file.", 413);
  }

  const now = Date.now();
  const ip = getClientIp(request);
  const key = `${ip}:${request.nextUrl.pathname}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new PublicSubmissionError("Too many submissions. Please wait a few minutes and try again.", 429);
  }

  current.count += 1;
}

export function getSafePublicError(error: unknown) {
  if (error instanceof PublicSubmissionError) {
    return { message: error.message, status: error.status };
  }
  return { message: "Something went wrong. Please try again.", status: 500 };
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "anonymous";
}
