"use client";

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js"
import { Flower2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn, sanitizeRedirectPath } from "@/lib/utils"

interface PurchaseGiftDialogProps {
  memorialId: string
  slug: string
  onPurchased: (purchaseId: string) => void
}

interface Gift {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string
}

export function PurchaseGiftDialog({ memorialId, slug, onPurchased }: PurchaseGiftDialogProps) {
  const { isSignedIn } = useUser()
  const [open, setOpen] = useState(false)
  const [gifts, setGifts] = useState<Gift[]>([])
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [purchasing, setPurchasing] = useState(false)
  const [purchaserName, setPurchaserName] = useState("")

  useEffect(() => {
    if (!open) return
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } }
    )
    supabase
      .from("gift_catalog")
      .select("*")
      .eq("is_active", true)
      .order("price", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          setGifts(
            (data ?? []).map((g: any) => ({
              id: g.id,
              name: g.name,
              description: g.description,
              price: g.price,
              imageUrl: g.image_path
                ? /^https?:\/\//.test(g.image_path) || g.image_path.startsWith("data:")
                  ? g.image_path
                  : `/api/media?bucket=gift-assets&path=${encodeURIComponent(g.image_path)}`
                : "",
            }))
          )
        }
      })
  }, [open])

  async function handlePurchase() {
    if (!selectedGift) return
    setPurchasing(true)

    try {
      const buyerEmail = ""
      const response = await fetch("/api/verify-gift-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memorialId,
          giftId: selectedGift.id,
          amount: selectedGift.price,
          purchaserDisplayName: purchaserName.trim() || undefined,
          buyerEmail,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? "Payment failed")

      toast.success("Thank you for your gift!")
      onPurchased(data.purchaseId ?? "purchased")
      setOpen(false)
      setSelectedGift(null)
      setPurchaserName("")
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.")
    } finally {
      setPurchasing(false)
    }
  }

  if (!isSignedIn) {
    const redirectUrl = sanitizeRedirectPath(`/memorials/${slug}`)
    return (
      <Link
        href={`/sign-in${redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ""}`}
        className={cn(buttonVariants({ variant: "outline", className: "w-full" }))}
      >
        <Flower2 className="size-4" aria-hidden="true" />
        Send a wreath or rose
      </Link>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) {
          setSelectedGift(null)
          setPurchaserName("")
        }
      }}
    >
      <DialogTrigger render={<Button variant="outline" className="w-full" />}>
        <Flower2 className="size-4" aria-hidden="true" />
        Send a wreath or rose
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send a gift</DialogTitle>
          <DialogDescription>
            Choose a virtual wreath or rose to lay in honour of the deceased.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {gifts.map((gift) => (
            <button
              key={gift.id}
              type="button"
              onClick={() => setSelectedGift(gift)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-colors",
                selectedGift?.id === gift.id
                  ? "border-heritage-gold bg-heritage-gold/10 ring-2 ring-heritage-gold"
                  : "border-border hover:bg-muted"
              )}
            >
              <img src={gift.imageUrl} alt={gift.name} className="aspect-square w-full rounded-lg object-cover" />
              <span className="text-xs font-medium">{gift.name}</span>
              <span className="text-xs text-muted-foreground">₵{gift.price}</span>
            </button>
          ))}
        </div>

        <Field className="mt-2">
          <FieldLabel htmlFor="purchaser-name">Your name (optional)</FieldLabel>
          <Input
            id="purchaser-name"
            value={purchaserName}
            onChange={(e) => setPurchaserName(e.target.value)}
            placeholder="Displayed on the memorial"
          />
        </Field>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={!selectedGift || purchasing}>
            {purchasing ? "Processing…" : `Pay ₵${selectedGift?.price ?? 0}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
