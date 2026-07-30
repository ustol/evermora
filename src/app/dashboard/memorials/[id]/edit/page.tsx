import { notFound, redirect } from "next/navigation"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getMemorialById } from "@/services/memorials"
import { Container } from "@/components/layout/Container"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialEditPage({ params }: PageProps) {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in")

  const { id } = await params
  const memorial = await getMemorialById(current.supabase, id)
  if (!memorial || memorial.owner_id !== current.profile.id) notFound()

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Edit memorial</h1>
      <p className="text-muted-foreground">Make changes to this memorial page.</p>
    </Container>
  )
}
