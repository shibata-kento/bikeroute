"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthButton() {
  const [userEmail, setUserEmail] = useState<string | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function handleLogout() {
    setLoading(true);
    await supabase.auth.signOut();
    location.reload();
  }

  if (userEmail === undefined) return null;

  if (userEmail) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-gray-500 sm:block">{userEmail}</span>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="rounded-lg bg-orange-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-orange-600 disabled:opacity-50"
    >
      {loading ? "…" : "Googleでログイン"}
    </button>
  );
}
