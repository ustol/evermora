import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ShareButton } from "@/components/shared/ShareButton";
import { UserRound } from "lucide-react";
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

  const { data: images } = await supabase
    .from("blog_post_images")
    .select("*")
    .eq("post_id", post.id)
    .order("sort_order", { ascending: true });

  return {
    post: {
      ...post,
      coverImageUrl: post.cover_image_path
        ? supabase.storage.from("blog-images").getPublicUrl(post.cover_image_path).data.publicUrl
        : null,
      authorName: post.author_name ?? "Akornafa",
    },
    images: (images ?? []).map((img) => ({
      ...img,
      url: supabase.storage.from("blog-images").getPublicUrl(img.storage_path).data.publicUrl,
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

  const { post, images } = result;

  return (
    <Container className="py-16">
      <article className="mx-auto max-w-3xl">
        {post.coverImageUrl && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <UserRound className="size-4" />
            {post.authorName}
          </span>
          <span>{post.published_at ? formatDayMonthYear(post.published_at) : ""}</span>
        </div>

        <h1 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 flex items-center gap-3">
          <ShareButton
            path={`/blog/${slug}`}
            title={post.title}
          />
        </div>

        <div className="prose prose-stone mt-10 max-w-none">
          {post.content?.split("\n").map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

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
    </Container>
  );
}
