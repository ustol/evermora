import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getCurrentProfile } from "@/lib/auth-profile"
import { MemorialWizard } from "@/components/memorial/wizard/MemorialWizard"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default async function NewMemorialPage() {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in?redirect_url=/dashboard/memorials/new")
  if (!current.profile) redirect("/dashboard")

  return (
    <Suspense fallback={<Container className="py-16"><Skeleton className="h-96 w-full rounded-2xl" /></Container>}>
      <MemorialWizard userId={current.profile.id} />
    </Suspense>
  )
}
