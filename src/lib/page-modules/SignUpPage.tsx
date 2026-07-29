import { SignUp } from "@clerk/nextjs"
import { sanitizeRedirectPath } from "@/lib/utils"

export default function SignUpPage() {
  const redirectUrl = typeof window !== "undefined"
    ? sanitizeRedirectPath(new URLSearchParams(window.location.search).get("redirect_url"))
    : undefined

  return (
    <SignUp
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={redirectUrl}
    />
  )
}
