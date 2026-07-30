/**
 * Validates required environment variables at startup so a missing key fails
 * fast with a clear message instead of surfacing as a cryptic runtime error.
 *
 * In Next.js, public env vars (exposed to the browser) must be prefixed with
 * NEXT_PUBLIC_. Server-side-only vars are NOT prefixed.
 */

const requiredClientEnvVars = [
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY",
] as const

type RequiredClientEnvVar = (typeof requiredClientEnvVars)[number]

function readEnv(): Record<RequiredClientEnvVar, string> {
  const missing: string[] = []
  const values = {} as Record<RequiredClientEnvVar, string>

  for (const key of requiredClientEnvVars) {
    const value = process.env[key]
    if (!value) {
      missing.push(key)
    } else {
      values[key] = value
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        "Copy .env.example to .env.local and fill in real values."
    )
  }

  return values
}

export const env = readEnv()
