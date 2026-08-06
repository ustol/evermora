import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getMemorialById } from "@/services/memorials"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"
import { MemorialWizard } from "@/components/memorial/wizard/MemorialWizard"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialEditPage({ params }: PageProps) {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in?redirect_url=/dashboard/memorials")
  if (!current.profile) notFound()

  const { id } = await params
  const memorial = await getMemorialById(current.supabase, id)
  if (!memorial) notFound()
  if (!current.ownerIds.includes(memorial.owner_id)) notFound()

  return (
    <Suspense fallback={<Container className="py-12"><Skeleton className="h-96 w-full rounded-2xl" /></Container>}>
      <MemorialWizard memorialId={memorial.id} userId={current.profile.id} />
    </Suspense>
  )
}
