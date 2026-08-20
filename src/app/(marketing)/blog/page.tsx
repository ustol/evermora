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

  // Resolve each author's name + photo from the public profile view (the
  // profiles table itself is RLS-locked to the owner/admin, so public pages
  // read the RLS-bypassing public_profiles view instead).
  const authorIds = [...new Set((data ?? []).map((p) => p.author_id))];
  const authorByProfileId = new Map<string, { display_name: string; avatar_url: string | null }>();
  if (authorIds.length > 0) {
    const { data: profiles } = await supabase
      .from("public_profiles")
      .select("id, display_name, avatar_url")
      .in("id", authorIds);
    for (const profile of profiles ?? []) {
      authorByProfileId.set(profile.id, profile);
    }
  }

  return (data ?? []).map((p) => {
    const profile = authorByProfileId.get(p.author_id);
    return {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      authorName: profile?.display_name ?? p.author_name ?? "Akornafa",
      authorAvatarUrl: profile?.avatar_url ?? null,
      coverImageUrl: p.cover_image_path
        ? supabase.storage.from("blog-images").getPublicUrl(p.cover_image_path).data.publicUrl
        : null,
      publishedAt: p.published_at,
    };
  });
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
