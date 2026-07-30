"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"
import { updateMemorial, publishMemorial } from "@/services/memorialDrafts"
import { deleteMemorial } from "@/services/memorials"
import { Button } from "@/components/ui/button"
import type { Database } from "@/types/supabase"

type Memorial = Database["public"]["Tables"]["memorials"]["Row"]

interface Props { memorial: Memorial }

const privacyOptions = [
  { value: "public", label: "Public", desc: "Anyone can find and view this memorial." },
  { value: "unlisted", label: "Unlisted", desc: "Only people with the direct link can view it." },
  { value: "private", label: "Private", desc: "Only you can view this memorial." },
] as const

export function MemorialSettingsClient({ memorial }: Props) {
  const router = useRouter()
  const [supabase] = useState(() => createClient())
  const [privacy, setPrivacy] = useState(memorial.privacy)
  const [allowTributes, setAllowTributes] = useState(memorial.allow_tributes)
  const [allowCondolences, setAllowCondolences] = useState(memorial.allow_condolences)
  const [requireApproval, setRequireApproval] = useState(memorial.require_approval)
  const [allowContributorPhotos, setAllowContributorPhotos] = useState(memorial.allow_contributor_photos)
  const [showContributorNames, setShowContributorNames] = useState(memorial.show_contributor_names)
  const [searchIndexable, setSearchIndexable] = useState(memorial.search_indexable)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      await updateMemorial(supabase, memorial.id, {
        privacy,
        allow_tributes: allowTributes,
        allow_condolences: allowCondolences,
        require_approval: requireApproval,
        allow_contributor_photos: allowContributorPhotos,
        show_contributor_names: showContributorNames,
        search_indexable: searchIndexable,
      })
      toast.success("Settings saved.")
    } catch {
      toast.error("Couldn't save settings.")
    } finally {
      setSaving(false)
    }
  }

  async function handlePublish() {
    setSaving(true)
    try {
      await updateMemorial(supabase, memorial.id, {
        privacy,
        allow_tributes: allowTributes,
        allow_condolences: allowCondolences,
        require_approval: requireApproval,
        allow_contributor_photos: allowContributorPhotos,
        show_contributor_names: showContributorNames,
        search_indexable: searchIndexable,
      })
      await publishMemorial(supabase, memorial.id)
      toast.success("Memorial published.")
      router.push(`/memorials/${memorial.slug}`)
    } catch {
      toast.error("Couldn't publish.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this memorial permanently? This cannot be undone.")) return
    setDeleting(true)
    try {
      await deleteMemorial(supabase, memorial.id)
      toast.success("Memorial deleted.")
      router.push("/dashboard/memorials")
    } catch {
      toast.error("Couldn't delete.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="mt-6 max-w-xl space-y-6">
      {/* Privacy */}
      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="font-heading text-lg font-semibold text-foreground">Privacy</legend>
        <div className="mt-3 space-y-3">
          {privacyOptions.map((opt) => (
            <label key={opt.value} className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                value={opt.value}
                checked={privacy === opt.value}
                onChange={() => setPrivacy(opt.value)}
                className="mt-1 size-4 accent-heritage-gold"
              />
              <div>
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Features */}
      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="font-heading text-lg font-semibold text-foreground">Moderation & features</legend>
        <div className="mt-3 space-y-4">
          <ToggleRow label="Allow tributes" checked={allowTributes} onChange={setAllowTributes} />
          <ToggleRow label="Allow condolences" checked={allowCondolences} onChange={setAllowCondolences} />
          <ToggleRow label="Require approval for contributions" checked={requireApproval} onChange={setRequireApproval} />
          <ToggleRow label="Allow contributor photos" checked={allowContributorPhotos} onChange={setAllowContributorPhotos} />
          <ToggleRow label="Show contributor names" checked={showContributorNames} onChange={setShowContributorNames} />
          <ToggleRow label="Include in search results" checked={searchIndexable} onChange={setSearchIndexable} />
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
        {memorial.status !== "published" && (
          <Button onClick={handlePublish} disabled={saving}>
            {saving ? "Saving…" : "Publish"}
          </Button>
        )}
        <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting…" : "Delete"}
        </Button>
      </div>
    </div>
  )
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-foreground">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-5 accent-heritage-gold rounded"
      />
    </label>
  )
}
