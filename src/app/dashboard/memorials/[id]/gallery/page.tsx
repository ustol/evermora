import { notFound, redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { getMemorialById } from "@/services/memorials"
import { listMediaForModeration } from "@/services/media"
import { Container } from "@/components/layout/Container"
import { GalleryClient } from "./GalleryClient"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialGalleryPage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in?redirect_url=/dashboard/memorials")

  const { id } = await params
  const memorial = await getMemorialById(supabase, id)
  if (!memorial || memorial.owner_id !== user.id) notFound()

  const photos = await listMediaForModeration(supabase, id)

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Photo gallery</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage photos for this memorial.</p>
      <GalleryClient memorialId={id} photos={photos} />
    </Container>
  )
}
