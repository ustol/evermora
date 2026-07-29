import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@clerk/react"
import { Skeleton } from "@/components/ui/skeleton"

/** Redirects signed-out visitors to /sign-in, preserving the page they wanted. */
export function RequireAuth() {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Skeleton className="h-8 w-48" />
      </div>
    )
  }

  if (!isSignedIn) {
    const redirectTarget = `${location.pathname}${location.search}`
    return (
      <Navigate
        to={`/sign-in?redirect_url=${encodeURIComponent(redirectTarget)}`}
        replace
      />
    )
  }

  return <Outlet />
}
