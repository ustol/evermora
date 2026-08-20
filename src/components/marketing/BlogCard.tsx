import Link from "next/link"
import { Newspaper } from "lucide-react"
import { formatDayMonthYear } from "@/lib/date"
import { BlogAuthor } from "@/components/marketing/BlogAuthor"

export interface BlogPostSummary {
  slug: string
  title: string
  excerpt: string | null
  authorName: string
  authorAvatarUrl: string | null
  coverImageUrl: string | null
  publishedAt: string | null
}

/**
 * A blog post card in the exact style used on /blog — cover image on top,
 * then the author (photo in a small circle + name), title, a two-line
 * excerpt, and the publish date.
 */
export function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-heritage-gold/10">
            <Newspaper className="size-10 text-heritage-gold/40" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <BlogAuthor
          name={post.authorName}
          avatarUrl={post.authorAvatarUrl}
          size="sm"
          nameClassName="text-xs font-medium tracking-wide text-heritage-gold uppercase"
        />
        <h3 className="font-heading text-lg leading-snug text-foreground">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto pt-2 text-xs text-muted-foreground">
          {post.publishedAt ? formatDayMonthYear(post.publishedAt) : ""}
        </span>
      </div>
    </Link>
  )
}
