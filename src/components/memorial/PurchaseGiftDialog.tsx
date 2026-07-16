import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "@clerk/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Flower2 } from "lucide-react"
import { toast } from "sonner"
import PaystackPop from "@paystack/inline-js"
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
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import {
  listActiveGiftCatalog,
  createPendingGiftPurchase,
  verifyGiftPurchase,
} from "@/services/gifts"
import { env } from "@/config/env"
import { cn, sanitizeRedirectPath } from "@/lib/utils"

interface PurchaseGiftDialogProps {
  memorialId: string
  slug: string
  onPurchased?: (purchaseId: string) => void
}

export function PurchaseGiftDialog({
  memorialId,
  slug,
  onPurchased,
}: PurchaseGiftDialogProps) {
  const { isSignedIn } = useUser()
  const { data: profile } = useProfile()
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const { data: catalog, isLoading } = useQuery({
    queryKey: ["gift-catalog", "active"],
    queryFn: () => listActiveGiftCatalog(supabase),
    enabled: open,
  })

  useEffect(() => {
    if (open && profile && !displayName) {
      setDisplayName(profile.display_name)
    }
  }, [open, profile, displayName])

  async function handlePurchase() {
    if (!selectedGiftId || !profile) return
    const gift = catalog?.find((g) => g.id === selectedGiftId)
    if (!gift) return
    if (!displayName.trim()) {
      toast.error("Please enter a name to show with your gift.")
      return
    }

    setSubmitting(true)
    try {
      const purchase = await createPendingGiftPurchase(supabase, {
        memorialId,
        giftCatalogId: selectedGiftId,
        purchaserProfileId: profile.id,
        purchaserDisplayName: displayName.trim(),
      })

      const paystack = new PaystackPop()
      paystack.newTransaction({
        key: env.VITE_PAYSTACK_PUBLIC_KEY,
        email: profile.email ?? "",
        amount: Math.round(purchase.amount * 100),
        currency: purchase.currency,
        reference: purchase.paystackReference,
        onSuccess: async () => {
          try {
            const result = await verifyGiftPurchase(supabase, purchase.id)
            if (result.ok) {
              toast.success(
                `Your ${gift.name.toLowerCase()} has been successfully placed on the memorial.`
              )
              await queryClient.invalidateQueries({
                queryKey: ["memorial-gifts", memorialId],
              })
              onPurchased?.(purchase.id)
              setOpen(false)
              setSelectedGiftId(null)
            } else {
              toast.error(
                "We couldn't confirm your payment yet — it may take a moment to appear."
              )
            }
          } catch {
            toast.error(
              "We couldn't confirm your payment. Contact support if you were charged."
            )
          } finally {
            setSubmitting(false)
          }
        },
        onCancel: () => setSubmitting(false),
        onError: () => {
          toast.error("Something went wrong starting the payment. Please try again.")
          setSubmitting(false)
        },
      })
    } catch {
      toast.error("Couldn't start this purchase. Please try again.")
      setSubmitting(false)
    }
  }

  if (!isSignedIn) {
    const redirectUrl = sanitizeRedirectPath(`/memorials/${slug}`)
    return (
      <Link
        to={`/sign-in${redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ""}`}
        className={cn(buttonVariants(), "w-full")}
      >
        <Flower2 className="size-4" aria-hidden="true" />
        Send a wreath or rose
      </Link>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full" />}>
        <Flower2 className="size-4" aria-hidden="true" />
        Send a wreath or rose
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a wreath or rose</DialogTitle>
          <DialogDescription>
            A virtual tribute shown on the memorial page, bearing whatever
            name you choose.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4">
          {isLoading ? (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          ) : catalog && catalog.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {catalog.map((gift) => (
                <button
                  key={gift.id}
                  type="button"
                  onClick={() => setSelectedGiftId(gift.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border-2 p-2 text-center transition-colors",
                    selectedGiftId === gift.id
                      ? "border-heritage-gold bg-heritage-gold/10"
                      : "border-border hover:border-heritage-gold/50"
                  )}
                >
                  <img
                    src={gift.imageUrl}
                    alt={gift.name}
                    className="aspect-square w-full rounded object-cover"
                  />
                  <span className="text-xs font-medium text-foreground">{gift.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {gift.currency} {gift.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No gifts are available to purchase right now.
            </p>
          )}

          {selectedGiftId && (
            <Field>
              <FieldLabel htmlFor="purchaser-display-name">Show this name</FieldLabel>
              <FieldDescription>
                e.g. your name, or a group like "The Mensah Family"
              </FieldDescription>
              <Input
                id="purchaser-display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Field>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handlePurchase}
            disabled={!selectedGiftId || submitting}
          >
            {submitting
              ? "Processing…"
              : selectedGiftId
                ? `Pay ${catalog?.find((g) => g.id === selectedGiftId)?.currency ?? ""} ${(
                    catalog?.find((g) => g.id === selectedGiftId)?.price ?? 0
                  ).toFixed(2)}`
                : "Select a gift"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
