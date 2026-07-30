import { SupabaseSignInForm } from "@/components/auth/SupabaseSignInForm";
import { sanitizeRedirectPath } from "@/lib/utils";

interface SignInPageProps {
  searchParams: Promise<{
    error?: string;
    redirect_url?: string;
  }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  return (
    <SupabaseSignInForm
      error={params.error ?? null}
      redirectUrl={sanitizeRedirectPath(params.redirect_url) ?? "/dashboard"}
    />
  );
}
