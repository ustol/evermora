"use client";

import { Share2, Link as LinkIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

interface ShareButtonProps {
  /** Site-relative path, e.g. "/memorials/some-slug" or "/blog/some-slug". */
  path: string
  title: string
}

export function ShareButton({ path, title }: ShareButtonProps) {
  const [copying, setCopying] = useState(false)
  const [canWebShare, setCanWebShare] = useState(false)

  useEffect(() => {
    setCanWebShare(typeof navigator !== "undefined" && "share" in navigator)
  }, [])

  async function handleShare() {
    const url = `${siteConfig.url}${path}`

    if (canWebShare) {
      try {
        await navigator.share({
          title: `${title} — ${siteConfig.name}`,
          url,
        })
      } catch {
        // user cancelled the share sheet — no action needed
      }
      return
    }

    // Fallback: copy to clipboard
    setCopying(true)
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    } catch {
      // Clipboard API not available (e.g. insecure context, sandboxed iframe) — show a selectable input
      const tempInput = document.createElement("input")
      tempInput.value = url
      tempInput.style.position = "fixed"
      tempInput.style.opacity = "0"
      tempInput.style.pointerEvents = "none"
      document.body.appendChild(tempInput)
      tempInput.select()
      try {
        document.execCommand("copy")
        toast.success("Link copied to clipboard")
      } catch {
        // Last resort — show the URL
        toast.error("Couldn't copy automatically. Try selecting the URL from the address bar.")
      }
      document.body.removeChild(tempInput)
    } finally {
      setCopying(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleShare} disabled={copying}>
      {canWebShare ? (
        <Share2 className="size-4" aria-hidden="true" />
      ) : (
        <LinkIcon className="size-4" aria-hidden="true" />
      )}
      Share
    </Button>
  )
}
