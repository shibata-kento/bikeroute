import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/fukuoka-bike-restriction" },
  title: "福岡のバイク通行禁止区間まとめ【福岡都市高速・若戸トンネル・原付別】",
  description:
    "福岡・北九州のバイク通行禁止区間を車種別に解説。福岡都市高速は原付一種・二種が全線禁止。若戸トンネルは普通二輪も通行禁止。代替ルートと通行可否早見表をまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "福岡のバイク通行禁止区間まとめ【福岡都市高速・若戸トンネル・原付別】",
  description: "福岡・北九州のバイク通行禁止区間を車種別に解説。",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/fukuoka-bike-restriction",
  inLanguage: "ja",
};

export default function FukuokaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "福岡のバイク通行禁止区間まとめ", path: "/articles/fukuoka-bike-restriction" },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">← 解説記事一覧</Link>
      </div>
      <div className="mb-2">
        <TagPills tags={["福岡都市高速", "若戸トンネル", "九州"]} />
      </div>
      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        福岡のバイク通行禁止区間まとめ【福岡都市高速・若戸トンネル・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            福岡県でバイクに乗る際は<strong>福岡都市高速道路</strong>と<strong>若戸トンネル</strong>の通行制限に特に注意が必要です。
            福岡都市高速は全線が自動車専用道路のため原付一種・二種は通行禁止。
            若戸トンネルは126cc以上の普通二輪・大型二輪も通行禁止となっており、北九州エリアでの移動に影響します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">福岡県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">福岡都市高速</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">九州自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">若戸トンネル</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種（50cc以下）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種（51〜125cc）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪（126cc〜）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">福岡都市高速道路（全路線禁止・原付一種・二種）</h2>
          <p className="mb-3">福岡都市高速は福岡市・北九州市を中心に整備された都市高速で、全線が自動車専用道路です。</p>
          <div className="space-y-3">
            {[
              { name: "1号線（香椎線）", detail: "香椎浜〜大宰府IC方面を結ぶ路線。福岡市東部から博多方面へのアクセス。" },
              { name: "2号線（太宰府線）", detail: "千鳥橋〜太宰府ICを結ぶ路線。太宰府・筑紫野方面への移動に使われる。" },
              { name: "3号線（空港線）", detail: "福岡空港周辺を経由する路線。空港アクセスで注意が必要。" },
              { name: "4号線（粕屋線）", detail: "千鳥橋〜粕屋方面を結ぶ路線。福岡IC（九州道）と接続。" },
              { name: "5号線（福岡都心環状）", detail: "福岡都心部を環状につなぐ路線。天神・博多駅周辺へのアクセスに使われる。" },
            ].map(({ name, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">全線禁止（原付一種・二種）</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">若戸トンネル（普通二輪も通行禁止）</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">二輪禁止（全車種）</span>
              <span className="font-bold text-gray-900 text-sm">若戸トンネル（北九州市）</span>
            </div>
            <p className="text-xs text-gray-600">
              洞海湾を横断する海底トンネル（有料）。排気・換気上の問題から全二輪禁止。
              並行する<strong>若戸大橋</strong>は普通二輪・大型二輪の通行が可能（有料）。
              原付一種・二種は若戸大橋も通行禁止のため、対岸（戸畑・若松）へは遠回りになる。
            </p>
          </div>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 若戸大橋は普通二輪以上は通行可能ですが、原付は禁止です。
            原付で戸畑〜若松間を移動する場合は迂回路を利用してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（福岡・北九州）</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道3号</strong>（福岡〜北九州を縦貫する主要幹線）</li>
            <li><strong>国道202号</strong>（福岡市西部・糸島方面）</li>
            <li><strong>国道200号</strong>（福岡〜飯塚・直方方面）</li>
            <li><strong>国道199号</strong>（北九州市内）</li>
          </ul>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">福岡のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、福岡都市高速・若戸トンネルなどの通行禁止区間を自動で警告します。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li><Link href="/prefectures/fukuoka" className="text-orange-600 underline text-sm">→ 福岡県の通行禁止区間一覧マップ</Link></li>
            <li><Link href="/articles/tunnel-bike-restriction" className="text-orange-600 underline text-sm">→ 全国の二輪車通行禁止トンネルまとめ</Link></li>
            <li><Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">→ 原付一種・原付二種・普通二輪の通行ルール完全ガイド</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
