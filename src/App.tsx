import { lazy, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { ClerkProvider } from "@clerk/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { queryClient } from "@/lib/queryClient"
import { AppRouter } from "@/routes/AppRouter"
import { ProfileSyncGate } from "@/components/auth/ProfileSyncGate"
import { env } from "@/config/env"

const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((m) => ({
    default: m.ReactQueryDevtools,
  }))
)

function App() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ProfileSyncGate />
          <AppRouter />
          <Toaster position="top-center" richColors closeButton />
        </TooltipProvider>
        {import.meta.env.DEV && (
          <Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        )}
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default App
