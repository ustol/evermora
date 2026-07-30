"use client";

import { useRef, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"
import { Plus, ImagePlus } from "lucide-react"
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
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 3 * 1024 * 1024

export function AddGiftCatalogItemDialog() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function resetForm() {
    setName("")
    setPrice("")
    setFile(null)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return
    if (!ALLOWED_TYPES.includes(selected.type)) { toast.error("JPEG, PNG, or WebP only."); return }
    if (selected.size > MAX_FILE_SIZE) { toast.error("Max 3MB."); return }
    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError("Name is required."); return }
    const numericPrice = Number(price)
    if (!price.trim() || isNaN(numericPrice) || numericPrice <= 0) { setError("Enter a valid price."); return }
    if (!file) { setError("Please choose an image."); return }
    setError(null)
    setSaving(true)

    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
      const ext = file.name.split(".").pop() ?? "png"
      const path = `gifts/${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage.from("gift-assets").upload(path, file)
      if (uploadError) throw uploadError

      const { error: insertError } = await supabase.from("catalog_gifts").insert({
        name: name.trim(),
        image_path: path,
        price: numericPrice,
      })
      if (insertError) throw insertError

      toast.success("Gift added to catalog.")
      setOpen(false)
      resetForm()
    } catch (err) {
      console.error("add gift error:", err)
      toast.error("Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => { setOpen(next); if (!next) resetForm() }}
    >
      <DialogTrigger render={<Button><Plus className="size-4" /> Add gift</Button>} />
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add gift to catalog</DialogTitle>
            <DialogDescription>Add a new wreath or rose that visitors can purchase.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-4">
            <Field data-invalid={!!error}>
              <FieldLabel>Name</FieldLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. White Lily" />
              {error && <FieldError>{error}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Price (₵)</FieldLabel>
              <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
            </Field>
            <Field>
              <FieldLabel>Image</FieldLabel>
              <FieldDescription>JPEG, PNG, or WebP. Max 3MB.</FieldDescription>
              <Input ref={fileInputRef} type="file" accept={ALLOWED_TYPES.join(",")} onChange={handleFileChange} />
              {previewUrl && <img src={previewUrl} alt="" className="mt-2 h-32 rounded-lg object-contain" />}
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
