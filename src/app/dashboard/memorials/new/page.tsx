"use client";

import { Suspense } from "react";
import MemorialWizardPage from "@/lib/pages/dashboard/MemorialWizardPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20">Loading…</div>}>
      <MemorialWizardPage />
    </Suspense>
  );
}
