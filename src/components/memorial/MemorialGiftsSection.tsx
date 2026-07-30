"use client";

import { useState } from "react";
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
        slug={slug}
        onPurchased={setJustPlacedId}
      />

      {gifts.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
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
                  className="aspect-square w-full rounded-lg object-cover"
                />
              ) : (
                <div className="aspect-square w-full rounded-lg bg-muted flex items-center justify-center">
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
