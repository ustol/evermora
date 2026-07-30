"use client";

import { useState, useCallback } from "react";
import { Flower2 } from "lucide-react";
import { PurchaseGiftDialog } from "@/components/memorial/PurchaseGiftDialog";
import { formatDayMonthYear } from "@/lib/date";
import { cn } from "@/lib/utils";

interface MemorialGiftsSectionProps {
  memorialId: string;
  slug: string;
  initialGifts?: Array<{
    id: string;
    purchaserDisplayName: string;
    createdAt: string;
    gift: { name: string; imageUrl: string };
  }>;
}

export function MemorialGiftsSection({ memorialId, slug, initialGifts = [] }: MemorialGiftsSectionProps) {
  const [gifts, setGifts] = useState(initialGifts);
  const [justPlacedId, setJustPlacedId] = useState<string | null>(null);

  const handlePurchased = useCallback((purchase: {
    id: string;
    purchaserDisplayName: string;
    createdAt: string;
    gift: { name: string; imageUrl: string };
  }) => {
    setGifts((prev) => [purchase, ...prev]);
    setJustPlacedId(purchase.id);
    // Clear highlight after a moment
    setTimeout(() => setJustPlacedId(null), 3000);
  }, []);

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      <div>
        <h2 className="font-heading text-lg text-foreground">Wreaths & roses</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A virtual tribute from those who wish to send one.
        </p>
      </div>

      <PurchaseGiftDialog
        memorialId={memorialId}
        onPurchased={handlePurchased}
      />

      {gifts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {gifts.map((purchase) => (
            <div
              key={purchase.id}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-1 text-center transition-colors",
                purchase.id === justPlacedId && "bg-heritage-gold/10 ring-2 ring-heritage-gold"
              )}
            >
              {purchase.gift.imageUrl ? (
                <img
                  src={purchase.gift.imageUrl}
                  alt={purchase.gift.name}
                  className="size-12 rounded-lg object-contain sm:size-14"
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-lg bg-muted sm:size-14">
                  <Flower2 className="size-6 text-muted-foreground" />
                </div>
              )}
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
  );
}
