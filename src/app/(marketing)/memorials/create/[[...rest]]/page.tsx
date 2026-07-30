import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface MemorialsCreatePageProps {
  params: Promise<{ rest?: string[] }>;
}

export default async function MemorialsCreatePage({ params }: MemorialsCreatePageProps) {
  const { rest = [] } = await params;
  const target = `/memorials/create${rest.length ? `/${rest.join("/")}` : ""}`;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent(target)}`);
  }

  redirect("/dashboard/memorials/new");
}
