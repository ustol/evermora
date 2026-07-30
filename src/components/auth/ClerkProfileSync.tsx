"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function ClerkProfileSync() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    void fetch("/api/profile/sync", { method: "POST" }).catch((error: unknown) => {
      console.error("Profile sync failed", error);
    });
  }, [isLoaded, isSignedIn]);

  return null;
}
