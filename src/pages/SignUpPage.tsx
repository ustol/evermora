import { SignUp } from "@clerk/react"
import { useSearchParams } from "react-router-dom"
import { sanitizeRedirectPath } from "@/lib/utils"

export default function SignUpPage() {
  const [searchParams] = useSearchParams()
  const redirectUrl = sanitizeRedirectPath(searchParams.get("redirect_url"))

  return (
    <SignUp
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={redirectUrl}
    />
  )
}
