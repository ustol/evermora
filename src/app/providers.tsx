"use client";

import { ClerkProfileSync } from "@/components/auth/ClerkProfileSync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProfileSync />
      {children}
    </>
  );
}
