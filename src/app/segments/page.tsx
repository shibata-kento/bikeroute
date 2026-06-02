import Link from "next/link";
import { SegmentList } from "@/components/SegmentList";

export const metadata = { title: "禁止区間マップ | BikeRoute" };

export default function SegmentsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
            ← ルート検索に戻る
          </Link>
          <h1 className="mt-1 text-2xl font-black text-gray-900">禁止区間リスト</h1>
        </div>
        <Link
          href="/segments/new"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
        >
          + 投稿する
        </Link>
      </div>

      <SegmentList />
    </main>
  );
}
