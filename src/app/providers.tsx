"use client";

import { Suspense, lazy } from "react";

/**
 * Thin wrapper — was QueryClientProvider + devtools.
 * Kept as a pass-through so we don't need to rewire every layout.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
