"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface SupabaseSignInFormProps {
  error?: string | null;
  redirectUrl?: string;
}

export function SupabaseSignInForm({ error, redirectUrl = "/dashboard" }: SupabaseSignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const showAdminSetupHelp = redirectUrl.startsWith("/admin") && error?.toLowerCase().includes("invalid");
  const adminSetupUrl = `/sign-up?${new URLSearchParams({
    redirect_url: redirectUrl,
    message: "If your admin account predates the auth migration, create a Supabase password for the same email once. You will be returned to the admin dashboard.",
  }).toString()}`;

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back to Akornafa</p>
      </div>

      <form
        action="/api/auth/sign-in"
        method="post"
        className="space-y-4"
        onSubmit={() => setSubmitting(true)}
      >
        <input type="hidden" name="redirect_url" value={redirectUrl} />
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              className="flex h-10 w-full rounded-lg border border-input bg-background pl-3 pr-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 rounded-md text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {showAdminSetupHelp && (
          <p className="rounded-lg border border-heritage-gold/30 bg-heritage-gold/10 px-3 py-2 text-sm text-foreground">
            Admin access now uses Supabase passwords. If this is an existing admin email, {" "}
            <Link href={adminSetupUrl} className="font-medium underline underline-offset-2 hover:text-foreground/80">
              create your admin password
            </Link>
            {" "}and then sign in again.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition-all hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && <Loader2 className="size-4 animate-spin" />}
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link href="/sign-up" className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/80">
          Sign up
        </Link>
      </p>
    </div>
  );
}
