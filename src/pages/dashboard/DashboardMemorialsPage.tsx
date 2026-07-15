import { useQuery } from "@tanstack/react-query"
import { Plus, HeartHandshake } from "lucide-react"
import { Link } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { buttonVariants } from "@/components/ui/button"
import { OwnerMemorialCard } from "@/components/memorial/OwnerMemorialCard"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import { listMemorialsOwnedBy } from "@/services/memorials"
import { cn } from "@/lib/utils"

export default function DashboardMemorialsPage() {
  const supabase = useSupabaseClient()
  const { data: profile } = useProfile()

  const { data: memorials, isLoading, isError, refetch } = useQuery({
    queryKey: ["owner-memorials", profile?.id],
    queryFn: () => listMemorialsOwnedBy(supabase, profile!.id),
    enabled: !!profile,
  })

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Your memorials"
        description="Every memorial you've created, whether it's a draft or already published."
        actions={
          <Link to="/dashboard/memorials/new" className={cn(buttonVariants())}>
            <Plus className="size-4" aria-hidden="true" />
            Create a memorial
          </Link>
        }
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : memorials && memorials.length > 0 ? (
        <div className="flex flex-col gap-4">
          {memorials.map((memorial) => (
            <OwnerMemorialCard key={memorial.id} memorial={memorial} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={HeartHandshake}
          title="No memorials yet"
          description="Create your first memorial to announce a funeral and start gathering tributes."
          action={
            <Link
              to="/dashboard/memorials/new"
              className={cn(buttonVariants())}
            >
              <Plus className="size-4" aria-hidden="true" />
              Create a memorial
            </Link>
          }
        />
      )}
    </Container>
  )
}
