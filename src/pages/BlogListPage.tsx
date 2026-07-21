import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Newspaper, UserRound } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listPublishedPosts } from "@/services/blog"
import { formatDayMonthYear } from "@/lib/date"

export default function BlogListPage() {
  const supabase = useSupabaseClient()

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blog-posts", "published"],
    queryFn: () => listPublishedPosts(supabase),
  })

  return (
    <Container className="flex flex-col gap-8 py-12 sm:py-16">
      <PageHeader
        title="From Akornafa"
        description="Guidance, stories, and updates on honouring a life well lived."
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <div className="aspect-video w-full overflow-hidden bg-muted">
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground">
                    <UserRound className="size-8" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                {post.published_at && (
                  <p className="text-xs text-muted-foreground">
                    {formatDayMonthYear(post.published_at)}
                  </p>
                )}
                <h2 className="font-heading text-lg text-foreground">{post.title}</h2>
                {post.excerpt && (
                  <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Newspaper}
          title="No posts yet"
          description="Check back soon for guidance and stories from Akornafa."
        />
      )}
    </Container>
  )
}
