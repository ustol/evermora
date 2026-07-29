import { z } from "zod"

const optionalText = z.string().trim().optional()

export const personalDetailsSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    middleNames: optionalText,
    surname: z.string().trim().min(1, "Surname is required"),
    displayName: z.string().trim().min(1, "Display name is required"),
    gender: optionalText,
    dateOfBirth: optionalText,
    dateOfDeath: z.string().trim().min(1, "Date of death is required"),
    placeOfBirth: optionalText,
    placeOfDeath: optionalText,
    hometown: optionalText,
    nationality: optionalText,
  })
  .refine(
    (data) =>
      !data.dateOfBirth || new Date(data.dateOfBirth) <= new Date(data.dateOfDeath),
    {
      message: "Date of birth must be before the date of death",
      path: ["dateOfBirth"],
    }
  )
export type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>

export const lifeStorySchema = z.object({
  announcement: optionalText,
  biography: optionalText,
  obituary: optionalText,
  familyMessage: optionalText,
  quotation: optionalText,
  religiousAffiliation: optionalText,
  occupation: optionalText,
})
export type LifeStoryValues = z.infer<typeof lifeStorySchema>

export const funeralEventSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "Event title is required"),
  eventType: z.enum([
    "wake",
    "burial",
    "funeral_service",
    "thanksgiving_service",
    "reception",
    "other",
  ]),
  eventDate: z.string().trim().min(1, "Date is required"),
  startTime: optionalText,
  endTime: optionalText,
  venue: z.string().trim().min(1, "Venue is required"),
  townCity: z.string().trim().min(1, "Town or city is required"),
  region: optionalText,
  country: z.string().trim().min(1, "Country is required"),
  directionsUrl: optionalText,
  dressCode: optionalText,
  additionalInstructions: optionalText,
})
export type FuneralEventValues = z.infer<typeof funeralEventSchema>

export const funeralArrangementsSchema = z.object({
  events: z.array(funeralEventSchema),
})
export type FuneralArrangementsValues = z.infer<typeof funeralArrangementsSchema>

export const privacySettingsSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3, "Link must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only"
    ),
  privacy: z.enum(["public", "private", "unlisted"]),
  allowTributes: z.boolean(),
  allowCondolences: z.boolean(),
  requireApproval: z.boolean(),
  allowContributorPhotos: z.boolean(),
  showContributorNames: z.boolean(),
  searchIndexable: z.boolean(),
})
export type PrivacySettingsValues = z.infer<typeof privacySettingsSchema>

export const eventTypeOptions: { value: FuneralEventValues["eventType"]; label: string }[] = [
  { value: "wake", label: "Wake" },
  { value: "burial", label: "Burial" },
  { value: "funeral_service", label: "Funeral service" },
  { value: "thanksgiving_service", label: "Thanksgiving service" },
  { value: "reception", label: "Reception" },
  { value: "other", label: "Other" },
]
