import Link from "next/link"
import { requireUser } from "@/lib/require-auth"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { listMemorialsOwnedBy } from "@/services/memorials"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { OwnerMemorialCard } from "@/components/memorial/OwnerMemorialCard"

export default async function DashboardMemorialsPage() {
  const user = await requireUser("/dashboard/memorials")
  const supabase = await createServerSupabaseClient()

  let memorials: Awaited<ReturnType<typeof listMemorialsOwnedBy>>
  try {
    memorials = await listMemorialsOwnedBy(supabase, user.id)
  } catch {
    return <Container className="py-16"><ErrorState /></Container>
  }

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="My memorials"
        description="Manage the memorials you've created."
        actions={
          <Link href="/dashboard/memorials/new" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80">
            Create a memorial
          </Link>
        }
      />
      {memorials.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memorials.map((m) => <OwnerMemorialCard key={m.id} memorial={m} />)}
        </div>
      ) : (
        <EmptyState title="No memorials yet" description="Create your first memorial to get started." />
      )}
    </Container>
  )
}
