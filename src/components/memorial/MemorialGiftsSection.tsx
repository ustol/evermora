"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Flower2 } from "lucide-react";
import { PurchaseGiftDialog } from "@/components/memorial/PurchaseGiftDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDayMonthYear } from "@/lib/date";
import { cn } from "@/lib/utils";

interface MemorialGiftsSectionProps {
  memorialId: string;
  slug: string;
}

interface GiftPurchase {
  id: string;
  purchaserDisplayName: string;
  createdAt: string;
  gift: { name: string; imageUrl: string };
}

export function MemorialGiftsSection({ memorialId, slug }: MemorialGiftsSectionProps) {
  const [gifts, setGifts] = useState<GiftPurchase[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [justPlacedId, setJustPlacedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } }
    );
    supabase
      .from("gift_purchases")
      .select("id, purchaser_display_name, created_at, gift_id, gift:catalog_gifts(name, image_path)")
      .eq("memorial_id", memorialId)
      .eq("status", "paid")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("gift fetch error:", error);
          setGifts([]);
        } else {
          setGifts(
            (data ?? []).map((row: any) => ({
              id: row.id,
              purchaserDisplayName: row.purchaser_display_name ?? "Anonymous",
              createdAt: row.created_at,
              gift: {
                name: row.gift?.name ?? "Gift",
                imageUrl: row.gift?.image_path
                  ? supabase.storage.from("gift-images").getPublicUrl(row.gift.image_path).data.publicUrl
                  : "",
              },
            }))
          );
        }
        setLoading(false);
      });
  }, [memorialId]);

  useEffect(() => {
    if (!justPlacedId) return;
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const timeout = setTimeout(() => setJustPlacedId(null), 5000);
    return () => clearTimeout(timeout);
  }, [justPlacedId]);

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

      {loading ? (
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
  );
}
