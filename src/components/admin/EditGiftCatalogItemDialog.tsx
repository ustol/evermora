"use client";

import { useState } from "react"
import { toast } from "sonner"
import { ImagePlus } from "lucide-react"
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
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"

interface EditGiftCatalogItemDialogProps {
  gift: {
    id: string
    name: string
    price: number
  }
  onUpdated?: () => void
}

export function EditGiftCatalogItemDialog({ gift, onUpdated }: EditGiftCatalogItemDialogProps) {
  const supabase = useSupabaseClient()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState(gift.name)
  const [price, setPrice] = useState(String(gift.price))
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError("Name is required."); return }
    const numericPrice = Number(price)
    if (isNaN(numericPrice) || numericPrice <= 0) { setError("Price must be a positive number."); return }
    setError(null)
    setSaving(true)

    try {
        const { error: updateError } = await supabase
        .from("gift_catalog")
        .update({ name: name.trim(), price: numericPrice })
        .eq("id", gift.id)
      if (updateError) throw updateError

      toast.success("Gift updated.")
      setOpen(false)
      onUpdated?.()
    } catch (err) {
      console.error("update error:", err)
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm">Edit</Button>} />
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit gift</DialogTitle>
            <DialogDescription>Update this gift catalog item.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-4">
            <Field data-invalid={!!error}>
              <FieldLabel>Name</FieldLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              {error && <FieldError>{error}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Price (₵)</FieldLabel>
              <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Field>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
