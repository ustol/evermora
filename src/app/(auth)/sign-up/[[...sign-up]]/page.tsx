import { SupabaseSignUpForm } from "@/components/auth/SupabaseSignUpForm";

interface SignUpPageProps {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  return <SupabaseSignUpForm error={params.error ?? null} message={params.message ?? null} />;
}
