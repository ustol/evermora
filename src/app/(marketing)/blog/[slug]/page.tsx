import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ShareButton } from "@/components/shared/ShareButton";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { BlogAuthor } from "@/components/marketing/BlogAuthor";
import { RecentBlogSidebar, type RecentBlogPost } from "@/components/marketing/RecentBlogSidebar";
import { formatDayMonthYear } from "@/lib/date";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getSupabase() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } }
  );
}

async function fetchPost(slug: string) {
  const supabase = getSupabase();
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !post) return null;

  // Resolve the author's name + photo from the public profile view (the
  // profiles table itself is RLS-locked to the owner/admin, so public pages
  // read the RLS-bypassing public_profiles view instead).
  const { data: profile } = await supabase
    .from("public_profiles")
    .select("id, display_name, avatar_url")
    .eq("id", post.author_id)
    .maybeSingle();

  const { data: images } = await supabase
    .from("blog_post_images")
    .select("*")
    .eq("post_id", post.id)
    .order("sort_order", { ascending: true });

  const { data: recentPosts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, cover_image_path, published_at")
    .eq("status", "published")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(4);

  return {
    post: {
      ...post,
      coverImageUrl: post.cover_image_path
        ? supabase.storage.from("blog-images").getPublicUrl(post.cover_image_path).data.publicUrl
        : null,
      authorName: profile?.display_name ?? post.author_name ?? "Akornafa",
      authorAvatarUrl: profile?.avatar_url ?? null,
    },
    images: (images ?? []).map((img) => ({
      ...img,
      url: supabase.storage.from("blog-images").getPublicUrl(img.storage_path).data.publicUrl,
    })),
    recentPosts: (recentPosts ?? []).map<RecentBlogPost>((recentPost) => ({
      slug: recentPost.slug,
      title: recentPost.title,
      excerpt: recentPost.excerpt,
      coverImageUrl: recentPost.cover_image_path
        ? supabase.storage.from("blog-images").getPublicUrl(recentPost.cover_image_path).data.publicUrl
        : null,
      publishedAt: recentPost.published_at,
    })),
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await fetchPost(slug);

  if (!result) notFound();

  const { post, images, recentPosts } = result;

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:gap-14">
        <article className="max-w-3xl">
          {post.coverImageUrl && (
            <div className="mb-8 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <BlogAuthor
              name={post.authorName}
              avatarUrl={post.authorAvatarUrl}
              size="default"
              nameClassName="text-sm font-medium text-foreground"
            />
            <span>{post.published_at ? formatDayMonthYear(post.published_at) : ""}</span>
          </div>

          <h1 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-8 flex items-center gap-3">
            <ShareButton
              path={`/blog/${slug}`}
              title={post.title}
            />
          </div>

          <MarkdownContent className="mt-10">{post.content ?? ""}</MarkdownContent>

          {images.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-xl">Gallery</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((image) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt=""
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </article>

        <RecentBlogSidebar posts={recentPosts} />
      </div>
    </Container>
  );
}
