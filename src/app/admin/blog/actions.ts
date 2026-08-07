"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { slugify } from "@/lib/slug";
import type { Database } from "@/types/supabase";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

async function isSlugAvailable(slug: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("blog_posts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return !data;
}

async function generateUniqueSlug(title: string): Promise<string> {
  const root = slugify(title) || "post";
  let candidate = root;
  let suffix = 2;
  while (!(await isSlugAvailable(candidate))) {
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

interface CreatePostParams {
  title: string;
  excerpt?: string;
  content: string;
  status: "draft" | "published";
  coverImagePath?: string | null;
}

interface CreatePostResult {
  success: boolean;
  error?: string;
  post?: BlogPostRow;
}

export async function createBlogPost(params: CreatePostParams): Promise<CreatePostResult> {
  try {
    // Verify user is authenticated
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "You must be signed in." };
    }

    // Verify user is admin
    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("id, role")
      .eq("clerk_user_id", user.id)
      .maybeSingle();

    if (!profile || profile.role !== "admin") {
      return { success: false, error: "Only administrators can create blog posts." };
    }

    const slug = await generateUniqueSlug(params.title);

    const { data: post, error: insertError } = await admin
      .from("blog_posts")
      .insert({
        author_id: profile.id,
        slug,
        title: params.title,
        excerpt: params.excerpt || null,
        content: params.content,
        status: params.status,
        published_at: params.status === "published" ? new Date().toISOString() : null,
        cover_image_path: params.coverImagePath || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("createBlogPost insert error:", insertError);
      return { success: false, error: insertError.message };
    }

    return { success: true, post };
  } catch (err) {
    console.error("createBlogPost error:", err);
    return { success: false, error: "Something went wrong creating the post." };
  }
}
