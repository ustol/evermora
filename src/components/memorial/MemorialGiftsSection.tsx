import { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Flower2 } from "lucide-react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listPaidGiftsForMemorial } from "@/services/gifts"
import { PurchaseGiftDialog } from "@/components/memorial/PurchaseGiftDialog"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDayMonthYear } from "@/lib/date"
import { cn } from "@/lib/utils"

interface MemorialGiftsSectionProps {
  memorialId: string
  slug: string
}

export function MemorialGiftsSection({ memorialId, slug }: MemorialGiftsSectionProps) {
  const supabase = useSupabaseClient()
  const [justPlacedId, setJustPlacedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { data: gifts, isLoading } = useQuery({
    queryKey: ["memorial-gifts", memorialId],
    queryFn: () => listPaidGiftsForMemorial(supabase, memorialId),
  })

  useEffect(() => {
    if (!justPlacedId) return
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    const timeout = setTimeout(() => setJustPlacedId(null), 5000)
    return () => clearTimeout(timeout)
  }, [justPlacedId])

  return (
    <aside
      ref={sectionRef}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
    >
      <div>
        <h2 className="font-heading text-lg text-foreground">Wreaths & roses</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A virtual tribute from those who wish to send one.
        </p>
      </div>

      <PurchaseGiftDialog
        memorialId={memorialId}
        slug={slug}
        onPurchased={setJustPlacedId}
      />

      {isLoading ? (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-lg" />
          ))}
        </div>
      ) : gifts && gifts.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {gifts.map((purchase) => (
            <div
              key={purchase.id}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-1 text-center transition-colors",
                purchase.id === justPlacedId && "bg-heritage-gold/10 ring-2 ring-heritage-gold"
              )}
            >
              <img
                src={purchase.gift.imageUrl}
                alt={purchase.gift.name}
                className="aspect-square w-full rounded-lg object-cover"
              />
              <span className="line-clamp-2 text-xs font-medium text-foreground">
                {purchase.purchaserDisplayName}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {formatDayMonthYear(purchase.createdAt)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <Flower2 className="size-6 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            No wreaths or roses yet — be the first to send one.
          </p>
        </div>
      )}
    </aside>
  )
}
