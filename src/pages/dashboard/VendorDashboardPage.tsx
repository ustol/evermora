import { useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Check, ImagePlus, Plus, Store, Trash2, X } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import {
  getVendorByOwnerId,
  registerVendor,
  updateVendorProfile,
  uploadVendorLogo,
  listAllListingsForOwner,
  createVendorListing,
  uploadListingImage,
  setListingActive,
  deleteVendorListing,
  vendorCategoryOptions,
  type VendorCategory,
  type VendorListing,
  type VendorWithLogo,
} from "@/services/vendors"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

const statusStyles: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  suspended: "bg-destructive/10 text-destructive",
}

const statusMessages: Record<string, string> = {
  pending: "Your application is awaiting review by an Evermora administrator.",
  approved: "Your business is live. You can manage your listings below.",
  rejected: "Your application was not approved. You can update your details below.",
  suspended: "Your vendor account has been suspended. Contact support for details.",
}

function VendorProfileForm({
  vendor,
  onSaved,
}: {
  vendor: VendorWithLogo | null
  onSaved: () => void
}) {
  const supabase = useSupabaseClient()
  const { data: profile } = useProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [businessName, setBusinessName] = useState(vendor?.business_name ?? "")
  const [category, setCategory] = useState<VendorCategory>(vendor?.category ?? "other")
  const [description, setDescription] = useState(vendor?.description ?? "")
  const [phone, setPhone] = useState(vendor?.phone ?? "")
  const [email, setEmail] = useState(vendor?.email ?? "")
  const [whatsapp, setWhatsapp] = useState(vendor?.whatsapp ?? "")
  const [location, setLocation] = useState(vendor?.location ?? "")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(vendor?.logoUrl ?? null)

  const mutation = useMutation({
    mutationFn: async () => {
      if (!profile) throw new Error("Not signed in")
      const params = {
        businessName: businessName.trim(),
        category,
        description: description.trim() || undefined,
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        whatsapp: whatsapp.trim() || undefined,
        location: location.trim() || undefined,
      }

      let vendorId = vendor?.id
      if (vendor) {
        await updateVendorProfile(supabase, vendor.id, params)
      } else {
        const created = await registerVendor(supabase, { ownerId: profile.id, ...params })
        vendorId = created.id
      }

      if (logoFile && vendorId) {
        await uploadVendorLogo(supabase, vendorId, logoFile)
      }
    },
    onSuccess: () => {
      toast.success(
        vendor ? "Business details updated." : "Application submitted for review."
      )
      onSaved()
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  })

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please choose a JPEG, PNG, or WebP image.")
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("That image is larger than 8MB.")
      return
    }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!businessName.trim()) {
      toast.error("Please enter your business name.")
      return
    }
    mutation.mutate()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
          {logoPreview ? (
            <img src={logoPreview} alt="" className="size-full object-cover" />
          ) : (
            <Store className="size-6 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleLogoChange}
            className="hidden"
            id="vendor-logo-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="size-4" aria-hidden="true" />
            {logoPreview ? "Replace logo" : "Add logo"}
          </Button>
        </div>
      </div>

      <Field>
        <FieldLabel htmlFor="vendor-business-name">Business name</FieldLabel>
        <Input
          id="vendor-business-name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="e.g. Serene Blooms Florists"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="vendor-category">Category</FieldLabel>
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as VendorCategory)}
          items={vendorCategoryOptions}
        >
          <SelectTrigger id="vendor-category" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {vendorCategoryOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="vendor-description">Description</FieldLabel>
        <Textarea
          id="vendor-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell visitors about your business…"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="vendor-location">Location</FieldLabel>
        <Input
          id="vendor-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Accra, Ghana"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="vendor-phone">Phone</FieldLabel>
          <Input
            id="vendor-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="024 123 4567"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="vendor-whatsapp">WhatsApp</FieldLabel>
          <Input
            id="vendor-whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="024 123 4567"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="vendor-email">Email</FieldLabel>
          <Input
            id="vendor-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
          />
        </Field>
      </div>
      <FieldDescription>
        Shown on your public vendor page so visitors can contact you directly.
      </FieldDescription>

      <Button type="submit" className="w-fit" disabled={mutation.isPending}>
        {mutation.isPending
          ? "Saving…"
          : vendor
            ? "Save changes"
            : "Submit for review"}
      </Button>
    </form>
  )
}

function ListingCard({ listing, vendorId }: { listing: VendorListing; vendorId: string }) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["vendor-listings", "owner", vendorId] })

  const toggleMutation = useMutation({
    mutationFn: () => setListingActive(supabase, listing.id, !listing.is_active),
    onSuccess: () => invalidate(),
    onError: () => toast.error("Couldn't update this listing."),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteVendorListing(supabase, listing.id),
    onSuccess: () => {
      toast.success("Listing deleted.")
      invalidate()
    },
    onError: () => toast.error("Couldn't delete this listing."),
  })

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      {listing.imageUrl && (
        <img src={listing.imageUrl} alt="" className="size-16 shrink-0 rounded-lg object-cover" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium text-foreground">{listing.name}</p>
          <Badge className={listing.is_active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
            {listing.is_active ? "Active" : "Hidden"}
          </Badge>
        </div>
        {listing.price != null && (
          <p className="text-sm text-muted-foreground">
            {listing.currency} {Number(listing.price).toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex shrink-0 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => toggleMutation.mutate()}
          disabled={toggleMutation.isPending}
        >
          {listing.is_active ? <X className="size-4" aria-hidden="true" /> : <Check className="size-4" aria-hidden="true" />}
          {listing.is_active ? "Hide" : "Show"}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive/80" />
            }
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
              <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate()}
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

function AddListingForm({ vendorId }: { vendorId: string }) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const mutation = useMutation({
    mutationFn: async () => {
      let imagePath: string | undefined
      if (file) {
        imagePath = await uploadListingImage(supabase, vendorId, file)
      }
      await createVendorListing(supabase, {
        vendorId,
        name: name.trim(),
        description: description.trim() || undefined,
        price: price ? Number(price) : undefined,
        imagePath,
      })
    },
    onSuccess: () => {
      toast.success("Listing added.")
      queryClient.invalidateQueries({ queryKey: ["vendor-listings", "owner", vendorId] })
      setOpen(false)
      setName("")
      setDescription("")
      setPrice("")
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    onError: () => toast.error("Couldn't add this listing."),
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return
    if (!ALLOWED_TYPES.includes(selected.type)) {
      toast.error("Please choose a JPEG, PNG, or WebP image.")
      return
    }
    if (selected.size > MAX_FILE_SIZE) {
      toast.error("That image is larger than 8MB.")
      return
    }
    setFile(selected)
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Plus className="size-4" aria-hidden="true" />
        Add a listing
      </Button>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!name.trim()) {
          toast.error("Please enter a listing name.")
          return
        }
        mutation.mutate()
      }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
    >
      <Field>
        <FieldLabel htmlFor="listing-name">Name</FieldLabel>
        <Input
          id="listing-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Standard floral arrangement"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="listing-description">Description (optional)</FieldLabel>
        <Textarea
          id="listing-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="listing-price">Price in GHS (optional)</FieldLabel>
        <Input
          id="listing-price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="listing-image">Photo (optional)</FieldLabel>
        <Input
          ref={fileInputRef}
          id="listing-image"
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleFileChange}
        />
      </Field>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Adding…" : "Add listing"}
        </Button>
      </div>
    </form>
  )
}

export default function VendorDashboardPage() {
  const supabase = useSupabaseClient()
  const { data: profile } = useProfile()
  const queryClient = useQueryClient()

  const { data: vendor, isLoading } = useQuery({
    queryKey: ["vendor-owner", profile?.id],
    queryFn: () => getVendorByOwnerId(supabase, profile!.id),
    enabled: !!profile,
  })

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ["vendor-listings", "owner", vendor?.id],
    queryFn: () => listAllListingsForOwner(supabase, vendor!.id),
    enabled: !!vendor && vendor.status === "approved",
  })

  if (isLoading) {
    return (
      <Container className="flex flex-col gap-6 py-10">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </Container>
    )
  }

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Vendor"
        description={
          vendor
            ? "Manage your business details and listings."
            : "Register your business to advertise funeral-related products and services."
        }
      />

      {vendor && (
        <div className="flex items-center gap-2">
          <Badge className={statusStyles[vendor.status]}>{vendor.status}</Badge>
          <p className="text-sm text-muted-foreground">{statusMessages[vendor.status]}</p>
        </div>
      )}

      {vendor?.status === "rejected" && vendor.rejection_reason && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <span className="font-medium">Reason: </span>
          {vendor.rejection_reason}
        </div>
      )}

      <VendorProfileForm
        vendor={vendor ?? null}
        onSaved={() =>
          queryClient.invalidateQueries({ queryKey: ["vendor-owner", profile?.id] })
        }
      />

      {vendor?.status === "approved" && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-foreground">Your listings</h2>
          </div>

          <AddListingForm vendorId={vendor.id} />

          {listingsLoading ? (
            <Skeleton className="h-24 w-full rounded-2xl" />
          ) : (
            listings?.map((listing) => (
              <ListingCard key={listing.id} listing={listing} vendorId={vendor.id} />
            ))
          )}
        </section>
      )}
    </Container>
  )
}
