import { Navigate, Outlet } from "react-router-dom"
import { useProfile } from "@/hooks/useProfile"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * UX-level gate only — real enforcement lives in the database (RLS +
 * admin-only RPCs), which never trusts this client-side role check alone.
 */
export function RequireAdmin() {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Skeleton className="h-8 w-48" />
      </div>
    )
  }

  if (!profile || profile.role !== "admin") {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
