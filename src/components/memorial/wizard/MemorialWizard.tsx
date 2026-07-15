import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { WizardStepper } from "@/components/memorial/wizard/WizardStepper"
import { PersonalDetailsStep } from "@/components/memorial/wizard/PersonalDetailsStep"
import { PhotographStep } from "@/components/memorial/wizard/PhotographStep"
import { LifeStoryStep } from "@/components/memorial/wizard/LifeStoryStep"
import { FuneralArrangementsStep } from "@/components/memorial/wizard/FuneralArrangementsStep"
import { PrivacySettingsStep } from "@/components/memorial/wizard/PrivacySettingsStep"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import { getFuneralEvents, getSignedPhotoUrl } from "@/services/memorials"
import {
  getMemorialById,
  createMemorialDraft,
  updateMemorial,
  publishMemorial,
  personalDetailsToPatch,
  lifeStoryToPatch,
  privacySettingsToPatch,
  replaceFuneralEvents,
  generateUniqueSlug,
  isSlugAvailable,
  uploadPrimaryPhoto,
} from "@/services/memorialDrafts"
import type { Database } from "@/types/supabase"
import type {
  PersonalDetailsValues,
  LifeStoryValues,
  FuneralEventValues,
  PrivacySettingsValues,
} from "@/types/memorial-form"

type Memorial = Database["public"]["Tables"]["memorials"]["Row"]
type FuneralEvent = Database["public"]["Tables"]["funeral_events"]["Row"]

interface MemorialWizardProps {
  memorialId?: string
}

function toFuneralEventValues(event: FuneralEvent): FuneralEventValues {
  return {
    id: event.id,
    title: event.title,
    eventType: event.event_type,
    eventDate: event.event_date,
    startTime: event.start_time ?? "",
    endTime: event.end_time ?? "",
    venue: event.venue,
    townCity: event.town_city,
    region: event.region ?? "",
    country: event.country,
    directionsUrl: event.directions_url ?? "",
    dressCode: event.dress_code ?? "",
    additionalInstructions: event.additional_instructions ?? "",
  }
}

export function MemorialWizard({ memorialId }: MemorialWizardProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const supabase = useSupabaseClient()
  const { data: profile, isLoading: profileLoading } = useProfile()

  // Saving step 1 of a NEW memorial navigates to the /edit route, which
  // mounts a fresh wizard instance — the step to resume at rides along in
  // navigation state so the user lands on step 2 instead of back on step 1.
  const [step, setStep] = useState<number>(() => {
    const state = location.state as { step?: number } | null
    return state?.step ?? 1
  })
  const [memorial, setMemorial] = useState<Memorial | null>(null)
  const [events, setEvents] = useState<FuneralEventValues[]>([])
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const existingQuery = useQuery({
    queryKey: ["memorial-draft", memorialId],
    queryFn: async () => {
      if (!memorialId) return null
      const m = await getMemorialById(supabase, memorialId)
      if (!m) return null
      const [eventRows, signedUrl] = await Promise.all([
        getFuneralEvents(supabase, m.id),
        getSignedPhotoUrl(supabase, m.primary_photo_path),
      ])
      return { memorial: m, events: eventRows, photoUrl: signedUrl }
    },
    enabled: !!memorialId,
  })

  useEffect(() => {
    if (existingQuery.data) {
      setMemorial(existingQuery.data.memorial)
      setEvents(existingQuery.data.events.map(toFuneralEventValues))
      setPhotoUrl(existingQuery.data.photoUrl)
    }
  }, [existingQuery.data])

  async function handlePersonalDetailsSubmit(values: PersonalDetailsValues) {
    if (!profile) {
      toast.error("Your profile is still loading — please try again in a moment.")
      return
    }
    setSubmitting(true)
    try {
      if (!memorial) {
        const slug = await generateUniqueSlug(supabase, values.displayName)
        const created = await createMemorialDraft(
          supabase,
          profile.id,
          values,
          slug
        )
        setMemorial(created)
        navigate(`/dashboard/memorials/${created.id}/edit`, {
          replace: true,
          state: { step: 2 },
        })
      } else {
        const updated = await updateMemorial(
          supabase,
          memorial.id,
          personalDetailsToPatch(values)
        )
        setMemorial(updated)
      }
      setStep(2)
    } catch {
      toast.error("Couldn't save these details. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handlePhotoSubmit(result: {
    file: File | null
    removed: boolean
    alt: string
  }) {
    if (!memorial || !profile) return
    setSubmitting(true)
    try {
      let photoPath = memorial.primary_photo_path
      if (result.file) {
        photoPath = await uploadPrimaryPhoto(
          supabase,
          memorial.id,
          profile.id,
          result.file
        )
      } else if (result.removed) {
        photoPath = null
      }

      const updated = await updateMemorial(supabase, memorial.id, {
        primary_photo_path: photoPath,
        primary_photo_alt: photoPath ? result.alt : null,
      })
      setMemorial(updated)
      setPhotoUrl(await getSignedPhotoUrl(supabase, photoPath))
      setStep(3)
    } catch {
      toast.error("Couldn't save the photograph. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLifeStorySubmit(values: LifeStoryValues) {
    if (!memorial) return
    setSubmitting(true)
    try {
      const updated = await updateMemorial(
        supabase,
        memorial.id,
        lifeStoryToPatch(values)
      )
      setMemorial(updated)
      setStep(4)
    } catch {
      toast.error("Couldn't save the life story. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleFuneralArrangementsSubmit(values: {
    events: FuneralEventValues[]
  }) {
    if (!memorial) return
    setSubmitting(true)
    try {
      await replaceFuneralEvents(supabase, memorial.id, values.events)
      setEvents(values.events)
      setStep(5)
    } catch {
      toast.error("Couldn't save the funeral arrangements. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSaveDraft(values: PrivacySettingsValues) {
    if (!memorial) return
    setSubmitting(true)
    try {
      await updateMemorial(
        supabase,
        memorial.id,
        privacySettingsToPatch(values)
      )
      toast.success("Draft saved. You can come back and finish it any time.")
      navigate("/dashboard/memorials")
    } catch {
      toast.error("Couldn't save your settings. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handlePublish(values: PrivacySettingsValues) {
    if (!memorial) return
    setSubmitting(true)
    try {
      await updateMemorial(
        supabase,
        memorial.id,
        privacySettingsToPatch(values)
      )
      await publishMemorial(supabase, memorial.id)
      if (values.privacy === "private") {
        toast.success(
          "Memorial published — it's set to Private, so only you can see it. Change it to Public in settings when you're ready to share."
        )
      } else if (values.privacy === "unlisted") {
        toast.success(
          "Memorial published — it's Unlisted, so only people with the link can see it."
        )
      } else {
        toast.success("Memorial published.")
      }
      navigate(`/memorials/${values.slug}`)
    } catch {
      toast.error("Couldn't publish this memorial. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (memorialId && (existingQuery.isError || existingQuery.data === null)) {
    return (
      <Container className="py-12">
        <ErrorState
          title="Memorial not found"
          description="This memorial doesn't exist, or you don't have permission to edit it."
        />
      </Container>
    )
  }

  // In edit mode, wait for the loaded memorial to land in state before
  // mounting any form — react-hook-form captures defaultValues on first
  // render only, so mounting a frame early would show empty fields.
  if (memorialId && (!memorial || profileLoading)) {
    return (
      <Container className="py-12">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-6 h-96 w-full" />
      </Container>
    )
  }

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title={memorialId ? "Edit memorial" : "Create a memorial"}
        description="Your progress is saved automatically as you move through each step."
      />

      <WizardStepper currentStep={step} />

      <div className="max-w-2xl">
        {step === 1 && (
          <PersonalDetailsStep
            defaultValues={
              memorial
                ? {
                    firstName: memorial.first_name,
                    middleNames: memorial.middle_names ?? "",
                    surname: memorial.surname,
                    displayName: memorial.display_name,
                    gender: memorial.gender ?? "",
                    dateOfBirth: memorial.date_of_birth ?? "",
                    dateOfDeath: memorial.date_of_death,
                    placeOfBirth: memorial.place_of_birth ?? "",
                    placeOfDeath: memorial.place_of_death ?? "",
                    hometown: memorial.hometown ?? "",
                    nationality: memorial.nationality ?? "",
                  }
                : {}
            }
            onSubmit={handlePersonalDetailsSubmit}
            submitting={submitting}
          />
        )}

        {step === 2 && memorial && (
          <PhotographStep
            currentPhotoUrl={photoUrl}
            currentPhotoAlt={memorial.primary_photo_alt ?? ""}
            onSubmit={handlePhotoSubmit}
            onBack={() => setStep(1)}
            submitting={submitting}
          />
        )}

        {step === 3 && memorial && (
          <LifeStoryStep
            defaultValues={{
              announcement: memorial.announcement ?? "",
              biography: memorial.biography ?? "",
              obituary: memorial.obituary ?? "",
              familyMessage: memorial.family_message ?? "",
              quotation: memorial.quotation ?? "",
              religiousAffiliation: memorial.religious_affiliation ?? "",
              occupation: memorial.occupation ?? "",
            }}
            onSubmit={handleLifeStorySubmit}
            onBack={() => setStep(2)}
            submitting={submitting}
          />
        )}

        {step === 4 && memorial && (
          <FuneralArrangementsStep
            defaultValues={events}
            onSubmit={handleFuneralArrangementsSubmit}
            onBack={() => setStep(3)}
            submitting={submitting}
          />
        )}

        {step === 5 && memorial && (
          <PrivacySettingsStep
            defaultValues={{
              slug: memorial.slug,
              privacy: memorial.privacy,
              allowTributes: memorial.allow_tributes,
              allowCondolences: memorial.allow_condolences,
              requireApproval: memorial.require_approval,
              allowContributorPhotos: memorial.allow_contributor_photos,
              showContributorNames: memorial.show_contributor_names,
              searchIndexable: memorial.search_indexable,
            }}
            checkSlugAvailable={(slug) =>
              isSlugAvailable(supabase, slug, memorial.id)
            }
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
            onBack={() => setStep(4)}
            submitting={submitting}
          />
        )}
      </div>
    </Container>
  )
}
