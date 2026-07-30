import { notFound, redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { getMemorialById } from "@/services/memorials"
import { getFuneralEvents } from "@/services/memorials"
import { Container } from "@/components/layout/Container"
import { MemorialContentClient } from "./MemorialContentClient"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialContentPage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in?redirect_url=/dashboard/memorials")

  const { id } = await params
  const memorial = await getMemorialById(supabase, id)
  if (!memorial || memorial.owner_id !== user.id) notFound()

  const events = await getFuneralEvents(supabase, id)

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Edit: {memorial.display_name || `${memorial.first_name} ${memorial.surname}`}</h1>
      <MemorialContentClient memorial={memorial} events={events} />
    </Container>
  )
}
