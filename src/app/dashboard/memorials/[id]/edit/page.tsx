import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { getMemorialById } from "@/services/memorials"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"
import { MemorialWizard } from "@/components/memorial/wizard/MemorialWizard"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialEditPage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in?redirect_url=/dashboard/memorials")

  const { id } = await params
  const memorial = await getMemorialById(supabase, id)
  if (!memorial) notFound()
  if (memorial.owner_id !== user.id) notFound()

  return (
    <Suspense fallback={<Container className="py-12"><Skeleton className="h-96 w-full rounded-2xl" /></Container>}>
      <MemorialWizard memorialId={memorial.id} userId={user.id} />
    </Suspense>
  )
}
