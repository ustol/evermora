"use client";

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, ExternalLink, Plus, FileEdit } from "lucide-react"
import { listAllPostsAdmin, type BlogPostWithCover } from "@/services/blog"
import { formatDayMonthYear } from "@/lib/date"

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  published: "default",
  draft: "secondary",
}

export default function AdminBlogPage() {
  const supabase = useSupabaseClient()
  const [posts, setPosts] = useState<BlogPostWithCover[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listAllPostsAdmin(supabase)
      .then(setPosts)
      .finally(() => setLoading(false))
  }, [supabase])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Blog posts"
        description="Manage published and draft blog posts."
        actions={
          <Link href="/admin/blog/new">
            <Button>
              <Plus className="size-4" />
              New post
            </Button>
          </Link>
        }
      />
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : !posts?.length ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16">
          <FileEdit className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No blog posts yet.</p>
          <Link href="/admin/blog/new">
            <Button variant="outline" size="sm">
              <Plus className="size-4" />
              Create your first post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {p.coverImageUrl ? (
                <div className="h-36 overflow-hidden">
                  <img
                    src={p.coverImageUrl}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-36 items-center justify-center bg-muted/50">
                  <FileEdit className="size-8 text-muted-foreground/40" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground leading-snug line-clamp-2">
                    {p.title}
                  </h3>
                  <Badge variant={statusVariant[p.status] ?? "outline"} className="shrink-0 text-[11px]">
                    {p.status}
                  </Badge>
                </div>
                {p.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                )}
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-[11px] text-muted-foreground">
                    {formatDayMonthYear(p.published_at ?? p.created_at)}
                  </span>
                  <div className="flex items-center gap-1">
                    {p.status === "published" && (
                      <Link
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        title="View on site"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/blog/${p.id}/edit`}
                      className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      title="Edit post"
                    >
                      <Pencil className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
