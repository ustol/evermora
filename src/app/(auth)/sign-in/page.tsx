"use client";

import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { sanitizeRedirectPath } from "@/lib/utils";

function SignInContent() {
  const searchParams = useSearchParams();
  const redirectUrl = sanitizeRedirectPath(searchParams?.get("redirect_url"));

  return (
    <SignIn
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={redirectUrl}
    />
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20">Loading…</div>}>
      <SignInContent />
    </Suspense>
  );
}
