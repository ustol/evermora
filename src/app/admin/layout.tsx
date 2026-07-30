import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminShell } from "./AdminShell";

function hasAdminClaim(sessionClaims: unknown): boolean {
  if (!sessionClaims || typeof sessionClaims !== "object") return false;
  const claims = sessionClaims as {
    role?: unknown;
    metadata?: { role?: unknown };
    publicMetadata?: { role?: unknown };
  };
  return (
    claims.role === "admin" ||
    claims.metadata?.role === "admin" ||
    claims.publicMetadata?.role === "admin"
  );
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/admin");
  }

  if (!hasAdminClaim(sessionClaims)) {
    redirect("/dashboard");
  }

  return <AdminShell>{children}</AdminShell>;
}
