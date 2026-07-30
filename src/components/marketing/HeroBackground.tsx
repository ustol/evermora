"use client";

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SLIDE_DURATION_MS = 6000

interface HeroBackgroundProps {
  images: { id: string; url: string }[]
}

/**
 * Decorative hero background with a simple crossfade slideshow.
 * Each image fades in/out over 1.2s. A warm overlay ensures text
 * remains readable regardless of the image.
 */
export function HeroBackground({ images }: HeroBackgroundProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(id)
  }, [images.length])

  // No images → gradient fallback
  if (images.length === 0) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-br from-obsidian/60 via-rich-black/70 to-obsidian/80"
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((image, i) => (
        <img
          key={image.id}
          src={image.url}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-1000 motion-reduce:transition-none",
            i === active ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      {/* Warm gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/75 via-obsidian/65 to-obsidian/85" />
    </div>
  )
}
