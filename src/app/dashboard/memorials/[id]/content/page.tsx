import { notFound, redirect } from "next/navigation"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getMemorialById } from "@/services/memorials"
import { getFuneralEvents } from "@/services/memorials"
import { listContributionsForModeration } from "@/services/contributions"
import { Container } from "@/components/layout/Container"
import { MemorialContentClient } from "./MemorialContentClient"
import { ContributionModerationPanel } from "./ContributionModerationPanel"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialContentPage({ params }: PageProps) {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in?redirect_url=/dashboard/memorials")

  const { id } = await params
  const memorial = await getMemorialById(current.supabase, id)
  if (!memorial || !current.ownerIds.includes(memorial.owner_id)) notFound()

  const [events, contributions] = await Promise.all([
    getFuneralEvents(current.supabase, id),
    listContributionsForModeration(current.supabase, id),
  ])

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-heritage-gold">Memorial management</p>
        <h1 className="mt-2 font-heading text-2xl">Edit: {memorial.display_name || `${memorial.first_name} ${memorial.surname}`}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Update the memorial story, events, and review visitor tributes before they go live.
        </p>
      </div>
      <MemorialContentClient memorial={memorial} events={events} />
      <ContributionModerationPanel initialContributions={contributions} />
    </Container>
  )
}
