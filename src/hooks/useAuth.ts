"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  isSignedIn: boolean;
}

function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: true, isSignedIn: false });

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setState({ user: data.user ?? null, loading: false, isSignedIn: Boolean(data.user) });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, loading: false, isSignedIn: Boolean(session?.user) });
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}

export const useAuth = useAuthState;

/** Alias for useAuth. */
export const useUser = useAuthState;
