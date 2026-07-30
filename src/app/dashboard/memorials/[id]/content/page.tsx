import { notFound, redirect } from "next/navigation"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getMemorialById } from "@/services/memorials"
import { Container } from "@/components/layout/Container"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialContentPage({ params }: PageProps) {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in")

  const { id } = await params
  const memorial = await getMemorialById(current.supabase, id)
  if (!memorial || memorial.owner_id !== current.profile.id) notFound()

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Edit: {memorial.display_name || `${memorial.first_name} ${memorial.surname}`}</h1>
      <p className="mt-2 text-muted-foreground">Manage the content of this memorial.</p>
    </Container>
  )
}
