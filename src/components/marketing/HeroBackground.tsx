import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SLIDE_DURATION_MS = 6000

interface HeroBackgroundProps {
  images: { id: string; url: string }[]
}

/** Absolutely-positioned crossfade slideshow, decorative — sits behind the hero content. */
export function HeroBackground({ images }: HeroBackgroundProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(interval)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {images.map((image, i) => (
        <img
          key={image.id}
          src={image.url}
          alt=""
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-1000 motion-reduce:transition-none",
            i === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/75 via-obsidian/65 to-obsidian/85" />
    </div>
  )
}
