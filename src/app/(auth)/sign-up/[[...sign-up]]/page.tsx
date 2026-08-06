import { SupabaseSignUpForm } from "@/components/auth/SupabaseSignUpForm";
import { sanitizeRedirectPath } from "@/lib/utils";

interface SignUpPageProps {
  searchParams: Promise<{
    email?: string;
    error?: string;
    message?: string;
    redirect_url?: string;
  }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  return (
    <SupabaseSignUpForm
      error={params.error ?? null}
      initialEmail={params.email ?? ""}
      message={params.message ?? null}
      redirectUrl={sanitizeRedirectPath(params.redirect_url) ?? "/dashboard"}
    />
  );
}
