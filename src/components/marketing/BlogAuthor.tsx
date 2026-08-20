import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function safeAvatar(src?: string | null): string | null {
  if (!src) return null;
  try {
    const url = new URL(src);
    return url.protocol === "https:" ? src : null;
  } catch {
    return null;
  }
}

function initialOf(name: string) {
  return (name.trim().charAt(0) || "?").toUpperCase();
}

/**
 * A small circular author avatar beside the author's name, used on the blog
 * list and blog detail pages. Falls back to the author's initial (on the
 * brand gold) when no photo is available or the photo fails to load.
 */
export function BlogAuthor({
  name,
  avatarUrl,
  size = "sm",
  className,
  nameClassName,
}: {
  name: string;
  avatarUrl?: string | null;
  size?: "default" | "sm" | "lg";
  className?: string;
  nameClassName?: string;
}) {
  const avatar = safeAvatar(avatarUrl);

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2", className)}>
      <Avatar size={size} className="shrink-0">
        {avatar ? <AvatarImage src={avatar} alt={name} /> : null}
        <AvatarFallback className="bg-heritage-gold/15 font-semibold text-heritage-gold">
          {initialOf(name)}
        </AvatarFallback>
      </Avatar>
      <span className={cn("truncate", nameClassName)}>{name}</span>
    </span>
  );
}
