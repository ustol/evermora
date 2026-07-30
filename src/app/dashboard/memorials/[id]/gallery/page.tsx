import { notFound, redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { getMemorialById } from "@/services/memorials"
import { Container } from "@/components/layout/Container"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialGalleryPage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in?redirect_url=/dashboard/memorials")

  const { id } = await params
  const memorial = await getMemorialById(supabase, id)
  if (!memorial || memorial.owner_id !== user.id) notFound()

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Photo gallery</h1>
      <p className="text-muted-foreground">Manage photos for this memorial.</p>
    </Container>
  )
}
