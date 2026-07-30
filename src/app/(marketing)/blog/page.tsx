import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { formatDayMonthYear } from "@/lib/date";

function getSupabase() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );
}

async function fetchPublishedPosts() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("fetchPublishedPosts:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    ...p,
    coverImageUrl: p.cover_image_path
      ? supabase.storage.from("blog-images").getPublicUrl(p.cover_image_path).data.publicUrl
      : null,
    authorName: p.author_name ?? "Akornafa",
  }));
}

export default async function BlogListPage() {
  const posts = await fetchPublishedPosts();

  return (
    <Container className="flex flex-col gap-8 py-12 sm:py-16">
      <PageHeader
        title="From Akornafa"
        description="Guidance, stories, and updates on honouring a life well lived."
      />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
                <span className="text-xs font-medium tracking-wide text-heritage-gold uppercase">
                  {post.authorName}
                </span>
                <h3 className="font-heading text-lg leading-snug text-foreground">{post.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <span className="mt-auto pt-2 text-xs text-muted-foreground">
                  {post.published_at ? formatDayMonthYear(post.published_at) : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Newspaper}
          title="No posts yet"
          description="Blog posts will appear here once published."
        />
      )}
    </Container>
  );
}
