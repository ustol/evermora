import { SignIn } from "@clerk/react"
import { useSearchParams } from "react-router-dom"
import { sanitizeRedirectPath } from "@/lib/utils"

export default function SignInPage() {
  const [searchParams] = useSearchParams()
  const redirectUrl = sanitizeRedirectPath(searchParams.get("redirect_url"))

  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={redirectUrl}
    />
  )
}
