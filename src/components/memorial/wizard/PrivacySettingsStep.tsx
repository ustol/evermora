import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Globe, Eye, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FieldGroup, FieldSeparator, Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { SwitchField } from "@/components/forms/SwitchField"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  privacySettingsSchema,
  type PrivacySettingsValues,
} from "@/types/memorial-form"
import { siteConfig } from "@/config/site"

interface PrivacySettingsStepProps {
  defaultValues: Partial<PrivacySettingsValues>
  checkSlugAvailable: (slug: string) => Promise<boolean>
  onSaveDraft: (values: PrivacySettingsValues) => void
  onPublish: (values: PrivacySettingsValues) => void
  onBack: () => void
  submitting?: boolean
}

const privacyOptions = [
  {
    value: "public" as const,
    icon: Globe,
    label: "Public",
    description: "Visible to everyone and appears in search results.",
  },
  {
    value: "unlisted" as const,
    icon: Eye,
    label: "Unlisted",
    description: "Only visible to people with the direct link.",
  },
  {
    value: "private" as const,
    icon: Lock,
    label: "Private",
    description: "Only visible to you and anyone you add as a collaborator.",
  },
]

export function PrivacySettingsStep({
  defaultValues,
  checkSlugAvailable,
  onSaveDraft,
  onPublish,
  onBack,
  submitting,
}: PrivacySettingsStepProps) {
  const form = useForm<PrivacySettingsValues>({
    resolver: zodResolver(privacySettingsSchema),
    defaultValues: {
      slug: "",
      privacy: "private",
      allowTributes: true,
      allowCondolences: true,
      requireApproval: true,
      allowContributorPhotos: false,
      showContributorNames: true,
      searchIndexable: true,
      ...defaultValues,
    },
  })

  async function handlePublish(values: PrivacySettingsValues) {
    if (values.slug !== defaultValues.slug) {
      const available = await checkSlugAvailable(values.slug)
      if (!available) {
        form.setError("slug", {
          message: "This link is already taken — please choose another.",
        })
        return
      }
    }
    onPublish(values)
  }

  async function handleSaveDraft() {
    const values = form.getValues()
    if (values.slug !== defaultValues.slug) {
      const available = await checkSlugAvailable(values.slug)
      if (!available) {
        form.setError("slug", {
          message: "This link is already taken — please choose another.",
        })
        return
      }
    }
    onSaveDraft(values)
  }

  return (
    <form onSubmit={form.handleSubmit(handlePublish)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="slug"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="slug">
                Memorial link<span className="text-destructive"> *</span>
              </FieldLabel>
              <Input
                {...field}
                id="slug"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>
                  {siteConfig.url}/memorials/{field.value || "…"}
                </FieldDescription>
              )}
            </Field>
          )}
        />

        <FieldSeparator />

        <Controller
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="privacy">Who can see this memorial?</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="privacy" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {privacyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>
                {
                  privacyOptions.find((o) => o.value === field.value)
                    ?.description
                }
              </FieldDescription>
            </Field>
          )}
        />

        <FieldSeparator />

        <SwitchField
          control={form.control}
          name="allowTributes"
          label="Allow tributes"
          description="Let visitors leave a tribute or memory."
        />
        <SwitchField
          control={form.control}
          name="allowCondolences"
          label="Allow condolences"
          description="Let visitors leave a condolence message."
        />
        <SwitchField
          control={form.control}
          name="requireApproval"
          label="Require approval before publishing"
          description="Review tributes, condolences, and photos before they appear."
        />
        <SwitchField
          control={form.control}
          name="allowContributorPhotos"
          label="Allow photo uploads from visitors"
          description="Let approved contributors add their own photographs."
        />
        <SwitchField
          control={form.control}
          name="showContributorNames"
          label="Show contributor names publicly"
          description="If turned off, contributions appear without the author's name."
        />
        <SwitchField
          control={form.control}
          name="searchIndexable"
          label="Allow search engines to index this page"
        />
      </FieldGroup>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={submitting}
          >
            Save as draft
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Publishing…" : "Publish memorial"}
          </Button>
        </div>
      </div>
    </form>
  )
}
