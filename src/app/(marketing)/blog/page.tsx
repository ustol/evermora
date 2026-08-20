import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { Newspaper } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { BlogCard, type BlogPostSummary } from "@/components/marketing/BlogCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getSupabase() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );
}

async function fetchPublishedPosts(): Promise<BlogPostSummary[]> {
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
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    authorName: p.author_name ?? "Akornafa",
    coverImageUrl: p.cover_image_path
      ? supabase.storage.from("blog-images").getPublicUrl(p.cover_image_path).data.publicUrl
      : null,
    publishedAt: p.published_at,
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
            <BlogCard key={post.slug} post={post} />
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
