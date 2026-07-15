import { Share2, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

interface ShareMemorialButtonProps {
  slug: string
  displayName: string
}

const canUseWebShare = typeof navigator !== "undefined" && "share" in navigator

export function ShareMemorialButton({
  slug,
  displayName,
}: ShareMemorialButtonProps) {
  async function handleShare() {
    const url = `${siteConfig.url}/memorials/${slug}`

    if (canUseWebShare) {
      try {
        await navigator.share({
          title: `${displayName} — ${siteConfig.name}`,
          url,
        })
      } catch {
        // user cancelled the share sheet — no action needed
      }
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    } catch {
      toast.error("Couldn't copy the link. Please copy it from the address bar.")
    }
  }

  return (
    <Button variant="outline" onClick={handleShare}>
      {canUseWebShare ? (
        <Share2 className="size-4" aria-hidden="true" />
      ) : (
        <LinkIcon className="size-4" aria-hidden="true" />
      )}
      Share
    </Button>
  )
}
