import { SignIn } from "@clerk/nextjs"
import { sanitizeRedirectPath } from "@/lib/utils"

export default function SignInPage() {
  // In Next.js, useSearchParams is available via next/navigation.
  // This page is not directly imported by the app router — see src/app/(auth)/sign-in/
  const redirectUrl = typeof window !== "undefined"
    ? sanitizeRedirectPath(new URLSearchParams(window.location.search).get("redirect_url"))
    : undefined

  return (
    <SignIn
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={redirectUrl}
    />
  )
}
