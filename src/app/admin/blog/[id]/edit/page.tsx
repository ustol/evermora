import { BlogPostEditor } from "@/components/admin/BlogPostEditor"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminBlogEditorPage({ params }: PageProps) {
  const { id } = await params
  return <BlogPostEditor postId={id} />
}
