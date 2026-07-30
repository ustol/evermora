import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface MemorialsNewPageProps {
  params: Promise<{ rest?: string[] }>;
}

export default async function MemorialsNewPage({ params }: MemorialsNewPageProps) {
  const { rest = [] } = await params;
  const target = `/memorials/new${rest.length ? `/${rest.join("/")}` : ""}`;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent(target)}`);
  }

  redirect("/dashboard/memorials/new");
}
