import { Link } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Newspaper, Plus, Trash2 } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listAllPostsAdmin, deletePost, type BlogPostWithCover } from "@/services/blog"
import { formatDayMonthYear } from "@/lib/date"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-success/10 text-success",
}

function PostRow({ post }: { post: BlogPostWithCover }) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(supabase, post.id),
    onSuccess: () => {
      toast.success("Post deleted.")
      queryClient.invalidateQueries({ queryKey: ["blog-posts", "admin"] })
    },
    onError: () => toast.error("Couldn't delete this post."),
  })

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
        {post.coverImageUrl ? (
          <img src={post.coverImageUrl} alt="" className="size-full object-cover" />
        ) : (
          <Newspaper className="size-6 text-muted-foreground" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/admin/blog/${post.id}/edit`}
            className="truncate font-medium text-foreground hover:text-heritage-gold"
          >
            {post.title}
          </Link>
          <Badge className={statusStyles[post.status]}>{post.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {post.published_at
            ? `Published ${formatDayMonthYear(post.published_at)}`
            : `Created ${formatDayMonthYear(post.created_at)}`}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Link
          to={`/admin/blog/${post.id}/edit`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Edit
        </Link>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive/80" />
            }
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this post?</AlertDialogTitle>
              <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate()}
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default function AdminBlogPage() {
  const supabase = useSupabaseClient()

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blog-posts", "admin"],
    queryFn: () => listAllPostsAdmin(supabase),
  })

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Blog"
        description="Posts published here appear at /blog for every visitor."
        actions={
          <Link to="/admin/blog/new" className={cn(buttonVariants())}>
            <Plus className="size-4" aria-hidden="true" />
            New post
          </Link>
        }
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Newspaper}
          title="No posts yet"
          description="Write your first post to share updates with visitors."
          action={
            <Link to="/admin/blog/new" className={cn(buttonVariants())}>
              <Plus className="size-4" aria-hidden="true" />
              New post
            </Link>
          }
        />
      )}
    </Container>
  )
}
