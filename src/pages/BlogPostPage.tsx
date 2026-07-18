import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Container } from "@/components/layout/Container"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { ShareButton } from "@/components/shared/ShareButton"
import { MediaLightbox } from "@/components/memorial/MediaLightbox"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { getPublishedPostBySlug, listPostImages } from "@/services/blog"
import { formatDayMonthYear } from "@/lib/date"

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const supabase = useSupabaseClient()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getPublishedPostBySlug(supabase, slug!),
    enabled: !!slug,
  })

  const { data: images } = useQuery({
    queryKey: ["blog-post-images", post?.id],
    queryFn: () => listPostImages(supabase, post!.id),
    enabled: !!post,
  })

  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-8 w-64" />
        </div>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className="py-16">
        <ErrorState onRetry={() => refetch()} />
      </Container>
    )
  }

  if (!post) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Post not found"
          description="This post may be unpublished, or the link may be incorrect."
        />
      </Container>
    )
  }

  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt=""
          className="aspect-video w-full rounded-2xl object-cover"
        />
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        {post.published_at ? (
          <p className="text-sm text-muted-foreground">{formatDayMonthYear(post.published_at)}</p>
        ) : (
          <span />
        )}
        <ShareButton path={`/blog/${post.slug}`} title={post.title} />
      </div>
      <h1 className="mt-2 font-heading text-3xl text-foreground sm:text-4xl">{post.title}</h1>

      <div className="mt-8 whitespace-pre-wrap text-foreground/90">{post.content}</div>

      {images && images.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-xl text-foreground">Related pictures</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={image.caption ? `View photo: ${image.caption}` : `View photo ${index + 1} of ${images.length}`}
                className="aspect-square overflow-hidden rounded-lg border border-border bg-muted"
              >
                <img src={image.url} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </section>
      )}

      {images && openIndex !== null && (
        <MediaLightbox
          photos={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </Container>
  )
}
