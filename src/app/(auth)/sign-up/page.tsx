"use client";

import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { sanitizeRedirectPath } from "@/lib/utils";

function SignUpContent() {
  const searchParams = useSearchParams();
  const redirectUrl = sanitizeRedirectPath(searchParams?.get("redirect_url"));

  return (
    <SignUp
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={redirectUrl}
    />
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20">Loading…</div>}>
      <SignUpContent />
    </Suspense>
  );
}
