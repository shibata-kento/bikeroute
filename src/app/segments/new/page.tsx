import Link from "next/link";
import { SegmentForm } from "@/components/SegmentForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = { title: "禁止区間を投稿 | BikeRoute" };

export default async function NewSegmentPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <Link href="/segments" className="text-sm text-gray-400 hover:text-gray-600">
        ← 禁止区間リストに戻る
      </Link>
      <h1 className="mt-2 text-2xl font-black text-gray-900">禁止区間を投稿</h1>

      {user ? (
        <>
          <p className="mt-1 mb-6 text-sm text-gray-500">
            情報は他ユーザーによる確認票（3票以上）で公開されます。
          </p>
          <SegmentForm />
        </>
      ) : (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">投稿するにはログインが必要です。</p>
          <p className="mt-4 text-xs text-gray-400">
            右上の「Googleでログイン」からログインしてください。
          </p>
        </div>
      )}
    </main>
  );
}
