"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setPosts(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader title="Blog posts" description="Manage published and draft blog posts."
        actions={<Link href="/admin/blog/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80">New post</Link>} />
      {loading ? <Skeleton className="h-64 rounded-2xl" /> : (
        <div className="flex flex-col gap-3">
          {posts?.map((p) => (
            <Link key={p.id} href={`/admin/blog/${p.id}/edit`} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:bg-muted transition-colors">
              <div><p className="font-medium">{p.title}</p><p className="text-sm text-muted-foreground">{p.status}</p></div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  )
}
