import { useMemo, useState } from "react"
import { UserRound } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const WORD_LIMIT = 100

interface TruncatedWriteupProps {
  text: string
  label: string
  memorialName: string
  photoUrl: string | null
  photoAlt?: string | null
}

export function TruncatedWriteup({
  text,
  label,
  memorialName,
  photoUrl,
  photoAlt,
}: TruncatedWriteupProps) {
  const [open, setOpen] = useState(false)

  const { preview, isTruncated } = useMemo(() => {
    const words = text.trim().split(/\s+/)
    if (words.length <= WORD_LIMIT) {
      return { preview: text, isTruncated: false }
    }
    return { preview: words.slice(0, WORD_LIMIT).join(" ") + "…", isTruncated: true }
  }, [text])

  return (
    <>
      <p className="whitespace-pre-wrap">
        {preview}
        {isTruncated && (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="font-medium text-heritage-gold hover:underline"
            >
              Read more
            </button>
          </>
        )}
      </p>

      {isTruncated && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader className="items-center text-center">
              <div className="size-20 shrink-0 overflow-hidden rounded-full border-2 border-border bg-muted">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={photoAlt ?? ""}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground">
                    <UserRound className="size-8" aria-hidden="true" />
                  </div>
                )}
              </div>
              <DialogTitle className="font-heading text-lg text-foreground">
                {memorialName}
              </DialogTitle>
              <DialogDescription className="text-xs font-medium tracking-wide uppercase">
                {label}
              </DialogDescription>
            </DialogHeader>

            <p className="mt-2 whitespace-pre-wrap text-foreground/90">{text}</p>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
