import type { Metadata } from "next";
import Link from "next/link";
import { SegmentList } from "@/components/SegmentList";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "二輪車・バイク 通行禁止区間マップ",
  description:
    "二輪車・バイク・原付50ccが通れない道の通行禁止区間マップ。自動車専用道路・高速道路・二輪禁止トンネルを全国一覧で確認。50cc通行禁止マップ・二輪車通行禁止マップとして出発前にご活用ください。",
};

export default function SegmentsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "通行禁止区間マップ", path: "/segments" },
      ]} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
            ← ルート検索に戻る
          </Link>
          <h1 className="mt-1 text-2xl font-black text-gray-900">二輪車・バイク 通行禁止区間マップ</h1>
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
