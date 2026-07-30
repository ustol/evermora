"use client";

import { useEffect, useState, useRef } from "react"
import { Flower2 } from "lucide-react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { createPendingGiftPurchase } from "@/services/gifts"
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
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PurchaseGiftDialogProps {
  memorialId: string
  onPurchased: (purchase: {
    id: string
    purchaserDisplayName: string
    createdAt: string
    gift: { name: string; imageUrl: string }
  }) => void
}

interface Gift {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string
}

export function PurchaseGiftDialog({ memorialId, onPurchased }: PurchaseGiftDialogProps) {
  const supabase = useSupabaseClient()
  const [open, setOpen] = useState(false)
  const [gifts, setGifts] = useState<Gift[]>([])
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [purchasing, setPurchasing] = useState(false)
  const [purchaserName, setPurchaserName] = useState("")
  const [purchaserEmail, setPurchaserEmail] = useState("")

  useEffect(() => {
    if (!open) return
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
  }, [open, supabase])

  async function handlePurchase() {
    if (!selectedGift) return
    const email = purchaserEmail.trim()
    if (!email) {
      toast.error("Please enter an email — Paystack requires it for the receipt.")
      return
    }
    const displayName = purchaserName.trim() || "Anonymous"
    setPurchasing(true)

    try {
      // 1. Create the pending purchase. amount/currency are set server-side by
      //    the pricing trigger; we only get back the id + Paystack reference.
      const { id, paystackReference } = await createPendingGiftPurchase(supabase, {
        memorialId,
        giftCatalogId: selectedGift.id,
        purchaserDisplayName: displayName,
      })

      // 2. Open the Paystack popup against that reference.
      // Dynamic import avoids SSR failure (@paystack/inline-js references window)
      const PaystackPop = (await import("@paystack/inline-js")).default
      const popup = new PaystackPop()
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email,
        amount: Math.round(selectedGift.price * 100), // minor units
        currency: "GHS",
        reference: paystackReference,
        onSuccess: async () => {
          // 3. Verify server-side before trusting the popup's success report.
          try {
            const res = await fetch("/api/verify-gift-purchase", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ purchaseId: id }),
            })
            const data = await res.json()
            if (!res.ok || !data.ok) {
              throw new Error(data.error ?? data.reason ?? "Payment could not be verified")
            }
            toast.success("Thank you for your gift!")
            onPurchased({
              id,
              purchaserDisplayName: displayName,
              createdAt: new Date().toISOString(),
              gift: { name: selectedGift.name, imageUrl: selectedGift.imageUrl },
            })
            setOpen(false)
            setSelectedGift(null)
            setPurchaserName("")
            setPurchaserEmail("")
          } catch (err: any) {
            toast.error(err.message ?? "Could not confirm your payment.")
          } finally {
            setPurchasing(false)
          }
        },
        onCancel: () => {
          setPurchasing(false)
          toast("Payment cancelled.")
        },
        onError: (err) => {
          setPurchasing(false)
          toast.error(err.message ?? "Payment error. Please try again.")
        },
      })
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.")
      setPurchasing(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) {
          setSelectedGift(null)
          setPurchaserName("")
          setPurchaserEmail("")
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

        <div className="mt-4 grid grid-cols-3 gap-2">
          {gifts.map((gift) => (
            <button
              key={gift.id}
              type="button"
              onClick={() => setSelectedGift(gift)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border p-2 text-center transition-colors",
                selectedGift?.id === gift.id
                  ? "border-heritage-gold bg-heritage-gold/10 ring-2 ring-heritage-gold"
                  : "border-border hover:bg-muted"
              )}
            >
              <img src={gift.imageUrl} alt={gift.name} className="size-14 rounded-lg object-contain" />
              <span className="text-xs font-medium">{gift.name}</span>
              <span className="text-xs text-muted-foreground">₵{gift.price}</span>
            </button>
          ))}
        </div>

        <Field className="mt-2">
          <FieldLabel htmlFor="purchaser-name">Your name</FieldLabel>
          <Input
            id="purchaser-name"
            value={purchaserName}
            onChange={(e) => setPurchaserName(e.target.value)}
            placeholder="Displayed on the memorial"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="purchaser-email">Email</FieldLabel>
          <Input
            id="purchaser-email"
            type="email"
            value={purchaserEmail}
            onChange={(e) => setPurchaserEmail(e.target.value)}
            placeholder="For your receipt"
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
