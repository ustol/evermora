import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-heading text-6xl text-heritage-gold">404</p>
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <Link to="/" className={buttonVariants()}>
        Return home
      </Link>
    </div>
  )
}
