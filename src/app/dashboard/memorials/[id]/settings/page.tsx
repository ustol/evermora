import { notFound, redirect } from "next/navigation"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getMemorialById } from "@/services/memorials"
import { Container } from "@/components/layout/Container"
import { MemorialSettingsClient } from "./MemorialSettingsClient"

interface PageProps { params: Promise<{ id: string }> }

export default async function MemorialSettingsPage({ params }: PageProps) {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in?redirect_url=/dashboard/memorials")

  const { id } = await params
  const memorial = await getMemorialById(current.supabase, id)
  if (!memorial || !current.ownerIds.includes(memorial.owner_id)) notFound()

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Configure privacy, moderation, and deletion options.</p>
      <MemorialSettingsClient memorial={memorial} />
    </Container>
  )
}
