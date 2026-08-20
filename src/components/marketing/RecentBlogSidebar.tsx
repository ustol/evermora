import Link from "next/link"
import { ArrowRight, Newspaper } from "lucide-react"
import { formatDayMonthYear } from "@/lib/date"

export interface RecentBlogPost {
  slug: string
  title: string
  excerpt: string | null
  coverImageUrl: string | null
  publishedAt: string | null
}

export function RecentBlogSidebar({ posts }: { posts: RecentBlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <aside className="lg:sticky lg:top-24" aria-labelledby="recent-blog-posts-heading">
      <div className="overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-sm ring-1 ring-foreground/5 backdrop-blur">
        <div className="border-b border-border/70 bg-secondary/40 px-5 py-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-heritage-gold uppercase">
            Keep reading
          </p>
          <h2 id="recent-blog-posts-heading" className="mt-1 font-heading text-xl text-foreground">
            Recently posted
          </h2>
        </div>

        <div className="divide-y divide-border/70">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-[72px_1fr] gap-4 p-4 transition-colors duration-200 hover:bg-secondary/45 focus-visible:bg-secondary/45 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-heritage-gold/10">
                    <Newspaper className="size-6 text-heritage-gold/45" aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="line-clamp-2 font-heading text-base leading-snug text-foreground transition-colors group-hover:text-heritage-gold">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                <p className="mt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {post.publishedAt ? formatDayMonthYear(post.publishedAt) : "Recent post"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="group flex items-center justify-between gap-3 border-t border-border/70 px-5 py-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-secondary/45 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          View all stories
          <ArrowRight
            className="size-4 text-heritage-gold transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </aside>
  )
}
