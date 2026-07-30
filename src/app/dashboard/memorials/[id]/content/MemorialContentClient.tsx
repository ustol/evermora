"use client"

import { useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase-browser"
import { updateMemorial, replaceFuneralEvents } from "@/services/memorialDrafts"
import { Button } from "@/components/ui/button"
import type { Database } from "@/types/supabase"
import type { FuneralEventValues } from "@/types/memorial-form"

type Memorial = Database["public"]["Tables"]["memorials"]["Row"]
type FuneralEvent = Database["public"]["Tables"]["funeral_events"]["Row"]

interface Props {
  memorial: Memorial
  events: FuneralEvent[]
}

export function MemorialContentClient({ memorial, events: initialEvents }: Props) {
  const [supabase] = useState(() => createClient())
  const [announcement, setAnnouncement] = useState(memorial.announcement ?? "")
  const [biography, setBiography] = useState(memorial.biography ?? "")
  const [obituary, setObituary] = useState(memorial.obituary ?? "")
  const [quotation, setQuotation] = useState(memorial.quotation ?? "")
  const [events, setEvents] = useState<FuneralEventValues[]>(
    initialEvents.length > 0
      ? initialEvents.map((e) => ({
          title: e.title,
          eventType: e.event_type as FuneralEventValues["eventType"],
          eventDate: e.event_date,
          startTime: e.start_time ?? "",
          endTime: e.end_time ?? "",
          venue: e.venue ?? "",
          townCity: e.town_city ?? "",
          region: e.region ?? "",
          country: e.country ?? "",
          directionsUrl: e.directions_url ?? "",
          dressCode: e.dress_code ?? "",
          additionalInstructions: e.additional_instructions ?? "",
        }))
      : [],
  )
  const [saving, setSaving] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateMemorial(supabase, memorial.id, {
        announcement: announcement || null,
        biography: biography || null,
        obituary: obituary || null,
        quotation: quotation || null,
      })
      if (events.length > 0) {
        await replaceFuneralEvents(supabase, memorial.id, events)
      }
      toast.success("Memorial content updated.")
    } catch {
      toast.error("Couldn't save changes.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="mt-6 max-w-2xl space-y-6">
      {/* Announcement */}
      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="font-heading text-lg font-semibold text-foreground">Announcement</legend>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">A brief message shown prominently at the top.</p>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="In loving memory of…"
        />
      </fieldset>

      {/* Biography */}
      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="font-heading text-lg font-semibold text-foreground">Biography</legend>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">The story of their life.</p>
        <textarea
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Write their biography here…"
        />
      </fieldset>

      {/* Obituary */}
      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="font-heading text-lg font-semibold text-foreground">Obituary</legend>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">A formal notice of their passing.</p>
        <textarea
          value={obituary}
          onChange={(e) => setObituary(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Write the obituary here…"
        />
      </fieldset>

      {/* Quotation */}
      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="font-heading text-lg font-semibold text-foreground">Quotation</legend>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">A meaningful quote or scripture.</p>
        <textarea
          value={quotation}
          onChange={(e) => setQuotation(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="“To live in hearts we leave behind is not to die.”"
        />
      </fieldset>

      {/* Funeral events */}
      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="font-heading text-lg font-semibold text-foreground">Funeral events</legend>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">Manage memorial events and services.</p>
        <div className="space-y-4">
          {events.map((ev, i) => (
            <div key={i} className="rounded-lg border border-border bg-background p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  value={ev.title}
                  onChange={(e) => {
                    const next = [...events]; next[i] = { ...next[i], title: e.target.value, eventType: next[i].eventType }; setEvents(next)
                  }}
                  placeholder="Event title"
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus: ring-2 focus:ring-ring"
                />
                <input
                  value={ev.eventType}
                  onChange={(e) => {
                    const next = [...events]; next[i] = { ...next[i], eventType: e.target.value as FuneralEventValues["eventType"] }; setEvents(next)
                  }}
                  placeholder="Type (e.g. Funeral, Viewing)"
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="date"
                  value={ev.eventDate}
                  onChange={(e) => {
                    const next = [...events]; next[i] = { ...next[i], eventDate: e.target.value }; setEvents(next)
                  }}
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={ev.venue}
                  onChange={(e) => {
                    const next = [...events]; next[i] = { ...next[i], venue: e.target.value }; setEvents(next)
                  }}
                  placeholder="Venue"
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={ev.townCity}
                  onChange={(e) => {
                    const next = [...events]; next[i] = { ...next[i], townCity: e.target.value }; setEvents(next)
                  }}
                  placeholder="Town / City"
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={ev.country}
                  onChange={(e) => {
                    const next = [...events]; next[i] = { ...next[i], country: e.target.value }; setEvents(next)
                  }}
                  placeholder="Country"
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="button"
                onClick={() => setEvents(events.filter((_, j) => j !== i))}
                className="mt-2 text-xs font-medium text-destructive hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setEvents([...events, { title: "", eventType: "other", eventDate: "", startTime: "", endTime: "", venue: "", townCity: "", region: "", country: "", directionsUrl: "", dressCode: "", additionalInstructions: "" }])}
            className="text-sm font-medium text-heritage-gold hover:underline"
          >
            + Add event
          </button>
        </div>
      </fieldset>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  )
}
