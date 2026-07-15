/**
 * Validates required environment variables at startup so a missing key fails
 * fast with a clear message instead of surfacing as a cryptic runtime error
 * deep inside Clerk or Supabase.
 */
const requiredEnvVars = [
  "VITE_CLERK_PUBLISHABLE_KEY",
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
] as const

type RequiredEnvVar = (typeof requiredEnvVars)[number]

function readEnv(): Record<RequiredEnvVar, string> {
  const missing: string[] = []
  const values = {} as Record<RequiredEnvVar, string>

  for (const key of requiredEnvVars) {
    const value = import.meta.env[key]
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
