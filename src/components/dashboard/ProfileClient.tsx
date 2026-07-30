"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import { Container } from "@/components/layout/Container";

export function ProfileClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const authUser = data.user ?? null;
      setUser(authUser);
      setFirstName((authUser?.user_metadata?.first_name as string) ?? "");
      setLastName((authUser?.user_metadata?.last_name as string) ?? "");
      setEmail(authUser?.email ?? "");
      setLoading(false);
    });
  }, []);

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSavingProfile(true);

    const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const { data, error: updateError } = await supabase.auth.updateUser({
      email: email.trim(),
      data: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        display_name: displayName,
      },
    });

    if (updateError) {
      setError(updateError.message);
      setSavingProfile(false);
      return;
    }

    setUser(data.user);
    await fetch("/api/profile/sync", { method: "POST" }).catch(() => undefined);
    setMessage("Profile updated. If you changed your email, check your inbox to confirm it.");
    setSavingProfile(false);
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSavingPassword(true);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setSavingPassword(false);
      return;
    }

    setPassword("");
    setMessage("Password updated.");
    setSavingPassword(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <Container className="py-12">
        <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-heritage-gold" />
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl text-foreground">Your profile</h1>
      <p className="mt-2 text-sm text-muted-foreground">Manage your account details, email, and password.</p>

      <div className="mt-8 max-w-xl space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-heritage-gold text-2xl font-bold text-obsidian">
              {email.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                {(user?.user_metadata?.display_name as string) ?? "User"}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          {message && <p className="mt-4 rounded-lg border border-heritage-gold/30 bg-heritage-gold/10 px-3 py-2 text-sm text-foreground">{message}</p>}
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Account details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-foreground">First name</label>
              <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-foreground">Last name</label>
              <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit" disabled={savingProfile} className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-50">
            {savingProfile ? "Saving…" : "Save changes"}
          </button>
        </form>

        <form onSubmit={handlePasswordUpdate} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Password</h2>
          <div>
            <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-foreground">New password</label>
            <input id="newPassword" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="At least 6 characters" />
          </div>
          <button type="submit" disabled={savingPassword || password.length < 6} className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-50">
            {savingPassword ? "Updating…" : "Update password"}
          </button>
        </form>

        <button
          onClick={handleSignOut}
          className="w-full rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          Sign out
        </button>
      </div>
    </Container>
  );
}
