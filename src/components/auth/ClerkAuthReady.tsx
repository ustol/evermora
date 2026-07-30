"use client";

import { useEffect, useState } from "react";

interface ClerkAuthReadyProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    Clerk?: {
      load: (options?: Record<string, unknown>) => Promise<void>;
      loaded?: boolean;
    };
  }
}

export function ClerkAuthReady({ children }: ClerkAuthReadyProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadClerk() {
      try {
        for (let i = 0; i < 150; i++) {
          if (window.Clerk?.loaded) break;
          if (window.Clerk && !window.Clerk.loaded) {
            window.Clerk.load({});
          }
          await new Promise((r) => setTimeout(r, 200));
        }

        if (!window.Clerk?.loaded) {
          throw new Error("Clerk load did not complete.");
        }

        if (!cancelled) setReady(true);
      } catch (error) {
        console.error("ClerkAuthReady error:", error);
        if (!cancelled) setFailed(true);
      }
    }

    loadClerk();
    return () => {
      cancelled = true;
    };
  }, []);

  if (ready) return <>{children}</>;

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 size-9 animate-spin rounded-full border-[3px] border-muted border-t-heritage-gold" />
        <h1 className="font-heading text-xl font-semibold text-foreground">
          {failed ? "Unable to load sign-in" : "Preparing secure sign in"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {failed
            ? "We could not load the secure sign-in form. Please refresh the page."
            : "Connecting to Clerk\u2026"}
        </p>
        {failed && (
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Refresh page
          </button>
        )}
      </div>
    </div>
  );
}
