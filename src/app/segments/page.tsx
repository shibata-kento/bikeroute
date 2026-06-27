import type { Metadata } from "next";
import Link from "next/link";
import { SegmentList } from "@/components/SegmentList";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "バイク・原付 通行禁止区間マップ【50cc・125cc・今すぐ地図で確認・無料】",
  description:
    "50cc・125cc・バイクが通れない道を今すぐ地図で確認できます。車種を選ぶだけで自動車専用道路・二輪禁止トンネルを絞り込みマップ表示。首都高・阪神高速など全国対応・無料。",
};

export default function SegmentsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "通行禁止区間マップ", path: "/segments" },
      ]} />
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
            ← ルート検索に戻る
          </Link>
          <h1 className="mt-1 text-2xl font-black text-gray-900">二輪車・バイク 通行禁止区間マップ【地図で確認】</h1>
        </div>
        <Link
          href="/segments/new"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
        >
          + 投稿する
        </Link>
      </div>

      {/* マップ説明 */}
      <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          原付50cc・125cc・二輪車が通れない通行禁止区間を全国一覧で掲載しています。
          自動車専用道路（高速道路・首都高・阪神高速など）、二輪車通行禁止トンネル、
          原付通行禁止区間の3種類に対応。ツーリング前の出発地・目的地確認にご活用ください。
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { label: "自動車専用道路", sub: "原付一種・二種 禁止", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "二輪通行禁止", sub: "全二輪 禁止", color: "bg-red-50 text-red-700 border-red-200" },
            { label: "原付通行禁止", sub: "原付一種・二種 禁止", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
          ].map(({ label, sub, color }) => (
            <div key={label} className={`rounded-lg border px-3 py-2 ${color}`}>
              <p className="font-bold">{label}</p>
              <p className="opacity-75 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          データはJMPSA・国土交通省・OpenStreetMap・ユーザー投稿をもとに構成。内容は参考情報です。走行時は必ず現地の標識を確認してください。
        </p>
      </section>

      <SegmentList />
    </main>
  );
}
