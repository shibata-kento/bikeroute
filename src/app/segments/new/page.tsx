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
          <p className="mt-1 text-sm text-gray-500">
            情報は他ユーザーによる確認投票（3票以上）で公開されます。
          </p>
          <div className="mt-3 mb-6 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-700 space-y-1">
            <p className="font-bold">投稿の手順</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>対象車種を選択（例：原付一種・原付二種）</li>
              <li>道路名・都道府県・説明を入力</li>
              <li>地図をクリックして始点（入口）→ 終点（出口）を指定</li>
              <li>「投稿する」を押して完了</li>
            </ol>
          </div>
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
