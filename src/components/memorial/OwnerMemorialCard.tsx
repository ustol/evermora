"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { UserRound } from "lucide-react"
import { formatLifespanYears } from "@/lib/date"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"

interface OwnerMemorialCardProps {
  memorial: any
}

export function OwnerMemorialCard({ memorial }: OwnerMemorialCardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [imgError, setImgError] = useState(false)

  // Reset image error when photo URL changes
  const photoUrl = memorial.photoUrl ?? null
  useEffect(() => { setImgError(false) }, [photoUrl])

  async function handleDelete() {
    setDeletingId(memorial.id)
    try {
      const res = await fetch(`/api/dashboard/memorials/${memorial.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("delete failed")
      toast.success("Memorial deleted.")
      window.location.reload()
    } catch (err) {
      console.error("delete error:", err)
      toast.error("Could not delete the memorial.")
    } finally {
      setDeletingId(null)
    }
  }

  const name = memorial.display_name || `${memorial.first_name} ${memorial.surname}`
  const lifespan = formatLifespanYears(memorial.date_of_birth, memorial.date_of_death)

  return (
    <div className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card pt-16 pb-5 px-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Featured image — half inside, half outside the card */}
      <div className="absolute inset-x-0 -top-12 flex justify-center">
        <div className="relative size-24 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md">
          {photoUrl && !imgError ? (
            <img
              src={photoUrl}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/50">
              <UserRound className="size-8 text-muted-foreground/40" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 text-center w-full">
          <Link
            href={`/dashboard/memorials/${memorial.id}/content`}
            className="font-heading text-lg text-foreground hover:underline"
          >
            {name}
          </Link>
          {lifespan && <p className="text-sm text-muted-foreground">{lifespan}</p>}
        </div>
        <span className={cn(
          "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
          memorial.status === "published" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" :
          memorial.status === "draft" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
          "bg-muted text-muted-foreground"
        )}>
          {memorial.status}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Link href={`/dashboard/memorials/${memorial.id}/edit`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Details
        </Link>
        <Link href={`/dashboard/memorials/${memorial.id}/content`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Manage content
        </Link>
        <Link href={`/dashboard/memorials/${memorial.id}/content#contribution-review-title`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Review tributes
        </Link>
        <Link href={`/dashboard/memorials/${memorial.id}/gallery`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Gallery
        </Link>
        <Link href={`/dashboard/memorials/${memorial.id}/settings`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Settings
        </Link>

        <AlertDialog>
          <AlertDialogTrigger render={
            <Button variant="destructive" size="sm" disabled={deletingId === memorial.id}>
              {deletingId === memorial.id ? "Deleting…" : "Delete"}
            </Button>
          } />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this memorial?</AlertDialogTitle>
              <AlertDialogDescription>
                This action can't be undone. The memorial and its associated content will be removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="destructive" onClick={handleDelete} disabled={deletingId === memorial.id}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
