import { useRef, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, ImagePlus } from "lucide-react"
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
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { TextField } from "@/components/forms/TextField"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { uploadGiftImage, createGiftCatalogItem } from "@/services/gifts"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB, matches the gift-assets bucket limit

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Enter a valid price"),
})
type FormValues = z.infer<typeof schema>

export function AddGiftCatalogItemDialog() {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", price: "" },
  })

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!file) throw new Error("Please choose an image")
      const imagePath = await uploadGiftImage(supabase, file)
      await createGiftCatalogItem(supabase, {
        name: values.name,
        imagePath,
        price: Number(values.price),
      })
    },
    onSuccess: () => {
      toast.success("Gift added to the catalog.")
      queryClient.invalidateQueries({ queryKey: ["gift-catalog", "admin"] })
      form.reset()
      setFile(null)
      setPreviewUrl(null)
      setOpen(false)
    },
    onError: () => {
      toast.error("Couldn't add this gift. Please try again.")
    },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return
    if (!ALLOWED_TYPES.includes(selected.type)) {
      toast.error("Please choose a JPEG, PNG, or WebP image.")
      return
    }
    if (selected.size > MAX_FILE_SIZE) {
      toast.error("That image is larger than 3MB. Please choose a smaller file.")
      return
    }
    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="size-4" aria-hidden="true" />
        Add gift
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <DialogHeader>
            <DialogTitle>Add a wreath or rose</DialogTitle>
            <DialogDescription>
              This will appear immediately in the catalog visitors can buy from.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-4">
            <Field>
              <FieldLabel>Image</FieldLabel>
              <FieldDescription>JPEG, PNG, or WebP — up to 3MB.</FieldDescription>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                  {previewUrl ? (
                    <img src={previewUrl} alt="" className="size-full object-cover" />
                  ) : (
                    <ImagePlus className="size-6 text-muted-foreground" aria-hidden="true" />
                  )}
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept={ALLOWED_TYPES.join(",")}
                  onChange={handleFileChange}
                  className="hidden"
                  id="gift-image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? "Replace image" : "Choose image"}
                </Button>
              </div>
            </Field>

            <TextField control={form.control} name="name" label="Name" required />
            <TextField
              control={form.control}
              name="price"
              label="Price (GHS)"
              type="text"
              required
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Adding…" : "Add gift"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
