import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { slugify } from "@/lib/slug"

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"]
type BlogPostStatus = Database["public"]["Enums"]["blog_post_status"]
type BlogPostImageRow = Database["public"]["Tables"]["blog_post_images"]["Row"]

export interface BlogPostWithCover extends BlogPostRow {
  coverImageUrl: string | null
}

export interface BlogPostImage extends BlogPostImageRow {
  url: string
}

function blogImageUrl(supabase: SupabaseClient<Database>, path: string): string {
  return supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl
}

function attachCoverUrl(
  supabase: SupabaseClient<Database>,
  post: BlogPostRow
): BlogPostWithCover {
  return {
    ...post,
    coverImageUrl: post.cover_image_path ? blogImageUrl(supabase, post.cover_image_path) : null,
  }
}

// --- Public ---

export async function listPublishedPosts(
  supabase: SupabaseClient<Database>
): Promise<BlogPostWithCover[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) throw error
  return (data ?? []).map((p) => attachCoverUrl(supabase, p))
}

export async function getPublishedPostBySlug(
  supabase: SupabaseClient<Database>,
  slug: string
): Promise<BlogPostWithCover | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()

  if (error) throw error
  return data ? attachCoverUrl(supabase, data) : null
}

export async function listPostImages(
  supabase: SupabaseClient<Database>,
  postId: string
): Promise<BlogPostImage[]> {
  const { data, error } = await supabase
    .from("blog_post_images")
    .select("*")
    .eq("post_id", postId)
    .order("sort_order", { ascending: true })

  if (error) throw error
  return (data ?? []).map((img) => ({ ...img, url: blogImageUrl(supabase, img.storage_path) }))
}

// --- Admin ---

export async function listAllPostsAdmin(
  supabase: SupabaseClient<Database>
): Promise<BlogPostWithCover[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data ?? []).map((p) => attachCoverUrl(supabase, p))
}

export async function getPostById(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<BlogPostWithCover | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data ? attachCoverUrl(supabase, data) : null
}

async function isPostSlugAvailable(
  supabase: SupabaseClient<Database>,
  slug: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()
  if (error) throw error
  return !data
}

async function generateUniquePostSlug(
  supabase: SupabaseClient<Database>,
  title: string
): Promise<string> {
  const root = slugify(title) || "post"
  let candidate = root
  let suffix = 2
  while (!(await isPostSlugAvailable(supabase, candidate))) {
    candidate = `${root}-${suffix}`
    suffix += 1
  }
  return candidate
}

export async function createPost(
  supabase: SupabaseClient<Database>,
  params: {
    authorId: string
    title: string
    excerpt?: string
    content: string
    status: BlogPostStatus
  }
): Promise<BlogPostRow> {
  const slug = await generateUniquePostSlug(supabase, params.title)

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      author_id: params.authorId,
      slug,
      title: params.title,
      excerpt: params.excerpt || null,
      content: params.content,
      status: params.status,
      published_at: params.status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePost(
  supabase: SupabaseClient<Database>,
  id: string,
  params: {
    title: string
    excerpt?: string
    content: string
    status: BlogPostStatus
    currentPublishedAt: string | null
  }
) {
  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: params.title,
      excerpt: params.excerpt || null,
      content: params.content,
      status: params.status,
      published_at:
        params.status === "published"
          ? (params.currentPublishedAt ?? new Date().toISOString())
          : null,
    })
    .eq("id", id)
  if (error) throw error
}

export async function deletePost(supabase: SupabaseClient<Database>, id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)
  if (error) throw error
}

export async function uploadCoverImage(
  supabase: SupabaseClient<Database>,
  postId: string,
  file: File
): Promise<void> {
  const extension = file.name.split(".").pop() ?? "jpg"
  const path = `${postId}/cover-${crypto.randomUUID()}.${extension}`

  const { error: uploadError } = await supabase.storage.from("blog-images").upload(path, file)
  if (uploadError) throw uploadError

  const { error } = await supabase
    .from("blog_posts")
    .update({ cover_image_path: path })
    .eq("id", postId)
  if (error) throw error
}

export async function addPostImage(
  supabase: SupabaseClient<Database>,
  postId: string,
  file: File,
  sortOrder = 0
): Promise<void> {
  const extension = file.name.split(".").pop() ?? "jpg"
  const path = `${postId}/photo-${crypto.randomUUID()}.${extension}`

  const { error: uploadError } = await supabase.storage.from("blog-images").upload(path, file)
  if (uploadError) throw uploadError

  const { error } = await supabase.from("blog_post_images").insert({
    post_id: postId,
    storage_path: path,
    sort_order: sortOrder,
  })
  if (error) throw error
}

export async function deletePostImage(supabase: SupabaseClient<Database>, imageId: string) {
  const { error } = await supabase.from("blog_post_images").delete().eq("id", imageId)
  if (error) throw error
}

export async function updatePostImageSortOrder(
  supabase: SupabaseClient<Database>,
  imageId: string,
  sortOrder: number
) {
  const { error } = await supabase
    .from("blog_post_images")
    .update({ sort_order: sortOrder })
    .eq("id", imageId)
  if (error) throw error
}

export type { BlogPostRow, BlogPostStatus }
