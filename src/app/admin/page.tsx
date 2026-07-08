import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminList } from "./AdminList";

export const metadata = {
  title: "管理画面 | BikeRoute",
  robots: { index: false, follow: false },
};

function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  return (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
    .includes(email);
}

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdmin(user?.email)) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">管理画面 — 投稿審査</h1>
        <p className="mt-1 text-sm text-gray-500">
          ユーザーが投稿した審査待ち区間を承認・却下できます
        </p>
      </div>
      <AdminList />
    </main>
  );
}
