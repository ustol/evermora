"use client";

import { useEffect, useState } from "react"
import { Flower2 } from "lucide-react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { toast } from "sonner"
import { Dialog,
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
  onPurchased: (purchaseId: string) => void
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
    setPurchasing(true)

    try {
      const response = await fetch("/api/verify-gift-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memorialId,
          giftId: selectedGift.id,
          amount: selectedGift.price,
          purchaserDisplayName: purchaserName.trim() || undefined,
          buyerEmail: purchaserEmail.trim() || undefined,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? "Payment failed")

      toast.success("Thank you for your gift!")
      onPurchased(data.purchaseId ?? "purchased")
      setOpen(false)
      setSelectedGift(null)
      setPurchaserName("")
      setPurchaserEmail("")
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.")
    } finally {
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

        <Field className="mt-2">
          <FieldLabel htmlFor="purchaser-email">Email address</FieldLabel>
          <Input
            id="purchaser-email"
            type="email"
            value={purchaserEmail}
            onChange={(e) => setPurchaserEmail(e.target.value)}
            placeholder="For receipt (not shown publicly)"
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
