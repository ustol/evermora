import { Share2, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

interface ShareButtonProps {
  /** Site-relative path, e.g. "/memorials/some-slug" or "/blog/some-slug". */
  path: string
  title: string
}

const canUseWebShare = typeof navigator !== "undefined" && "share" in navigator

export function ShareButton({ path, title }: ShareButtonProps) {
  async function handleShare() {
    const url = `${siteConfig.url}${path}`

    if (canUseWebShare) {
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
