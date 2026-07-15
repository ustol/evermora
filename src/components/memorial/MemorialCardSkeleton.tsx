import { Skeleton } from "@/components/ui/skeleton"

export function MemorialCardSkeleton() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-sm">
      <Skeleton className="size-24 rounded-full" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/3" />
      <Skeleton className="mt-2 h-4 w-1/2" />
    </div>
  )
}
