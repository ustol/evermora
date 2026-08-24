import { notFound, redirect } from "next/navigation"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getMemorialById, getSignedPhotoUrl } from "@/services/memorials"
import { listMediaForModeration } from "@/services/media"
import { Container } from "@/components/layout/Container"
import { GalleryClient } from "./GalleryClient"
import { FeaturedImageSection } from "@/components/memorial/FeaturedImageSection"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialGalleryPage({ params }: PageProps) {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in?redirect_url=/dashboard/memorials")

  const { id } = await params
  const memorial = await getMemorialById(current.supabase, id)
  if (!memorial || !current.ownerIds.includes(memorial.owner_id)) notFound()

  const [photos, photoUrl] = await Promise.all([
    listMediaForModeration(current.supabase, id),
    memorial.primary_photo_path
      ? getSignedPhotoUrl(current.supabase, memorial.primary_photo_path).catch(() => null)
      : Promise.resolve(null),
  ])

  const memorialName = memorial.display_name || `${memorial.first_name} ${memorial.surname}`

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Photo gallery</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage photos for this memorial.</p>
      <FeaturedImageSection
        memorialId={id}
        memorialName={memorialName}
        currentPhotoUrl={photoUrl}
        currentAlt={memorial.primary_photo_alt}
      />
      <GalleryClient memorialId={id} photos={photos} />
    </Container>
  )
}
