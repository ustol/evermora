"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface GoogleSignInButtonProps {
  label?: string;
  redirectUrl?: string;
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.6 12.23c0-.74-.07-1.45-.19-2.13H12v4.03h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.22c1.89-1.74 2.99-4.3 2.99-7.43Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.96-.89 6.61-2.41l-3.22-2.51c-.89.6-2.03.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.08v2.59A9.99 9.99 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.41 13.92A6.01 6.01 0 0 1 6.1 12c0-.67.11-1.32.31-1.92V7.49H3.08A9.99 9.99 0 0 0 2 12c0 1.61.39 3.14 1.08 4.51l3.33-2.59Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.96c1.47 0 2.78.5 3.81 1.49l2.86-2.86C16.95 2.99 14.7 2 12 2a9.99 9.99 0 0 0-8.92 5.49l3.33 2.59C7.2 7.72 9.4 5.96 12 5.96Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleSignInButton({ label = "Continue with Google", redirectUrl = "/dashboard" }: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <form action="/api/auth/sign-in/google" method="get" onSubmit={() => setLoading(true)}>
      <input type="hidden" name="redirect_url" value={redirectUrl} />
      <button
        type="submit"
        disabled={loading}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 text-sm font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Redirecting…</span>
          </>
        ) : (
          <>
            <GoogleIcon />
            <span>{label}</span>
          </>
        )}
      </button>
    </form>
  );
}
