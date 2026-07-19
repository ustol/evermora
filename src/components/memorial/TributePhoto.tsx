import { useState } from "react"
import { cn } from "@/lib/utils"

interface TributePhotoProps {
  url: string
}

/**
 * Orientation isn't known until the image loads (we don't store natural
 * dimensions), so this briefly renders full-width and reflows once the
 * image's aspect ratio is available: portrait floats and wraps with the
 * message text below it, landscape stays a full-width block up top.
 */
export function TributePhoto({ url }: TributePhotoProps) {
  const [orientation, setOrientation] = useState<"portrait" | "landscape" | null>(null)

  return (
    <img
      src={url}
      alt=""
      onLoad={(e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget
        setOrientation(naturalHeight > naturalWidth ? "portrait" : "landscape")
      }}
      className={cn(
        "mt-3 rounded-lg object-cover",
        orientation === "portrait"
          ? "float-left mr-4 mb-2 w-36 max-h-56 sm:w-44"
          : "max-h-80 w-full"
      )}
    />
  )
}
