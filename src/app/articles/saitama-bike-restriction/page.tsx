import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "埼玉のバイク通行禁止区間まとめ【首都高・外環道・関越・原付別】",
  description:
    "埼玉県のバイク・原付通行禁止区間を車種別に解説。首都高速埼玉線・外環自動車道・関越自動車道は原付一種・二種が全線禁止。代替ルートの国道17号・254号もまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "埼玉のバイク通行禁止区間まとめ【首都高・外環道・関越・原付別】",
  description: "埼玉県のバイク・原付通行禁止区間を車種別に解説。",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/saitama-bike-restriction",
  inLanguage: "ja",
};

export default function SaitamaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "埼玉のバイク通行禁止区間まとめ", path: "/articles/saitama-bike-restriction" },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">← 解説記事一覧</Link>
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {["首都高埼玉線", "外環道", "関東"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">{tag}</span>
        ))}
      </div>
      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        埼玉のバイク通行禁止区間まとめ【首都高・外環道・関越・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            埼玉県は東京に隣接しており、首都高速・外環道・関越道・東北道など複数の自動車専用道路が通過しています。
            これらはすべて原付一種・二種が通行禁止です。
            さいたま市・川越・川口方面への移動では、特に首都高速埼玉線と外環自動車道に注意してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">埼玉県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">首都高埼玉線</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">外環道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">関越・東北道</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種（50cc以下）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種（51〜125cc）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪（126cc〜）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">埼玉県内の主要な自動車専用道路</h2>
          <div className="space-y-3">
            {[
              {
                name: "首都高速埼玉線（S1・S2・S5・S6）",
                detail: "川口JCT〜さいたま見沼・与野・大宮・新都心を結ぶ首都高の埼玉方面路線。東北道とも直結。原付は全線通行禁止。",
              },
              {
                name: "東京外環自動車道（外環・C3）",
                detail: "三郷南IC〜大泉JCTが埼玉県内を通過。外環は無料区間と有料区間が混在するが全線自動車専用。川口・草加・八潮・三郷方面で注意。",
              },
              {
                name: "関越自動車道",
                detail: "練馬IC〜藤岡JCTが埼玉県内を大きく通過。所沢・川越・鶴ヶ島・東松山・嵐山・花園などのICがある。全線自動車専用。",
              },
              {
                name: "東北自動車道",
                detail: "川口JCT〜白河ICが埼玉県内。浦和・岩槻・久喜・加須・羽生・館林（群馬）方面への移動で注意。全線自動車専用。",
              },
              {
                name: "東北道・圏央道（桶川・鴻巣エリア）",
                detail: "圏央道（首都圏中央連絡自動車道）が北関東を環状に結ぶ。桶川・北本・鴻巣・久喜・幸手IC周辺で横断する。全線自動車専用。",
              },
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
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（埼玉県内）</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道17号</strong>（東京・板橋〜大宮〜熊谷・高崎方面の幹線）</li>
            <li><strong>国道16号</strong>（所沢・川越・春日部・越谷を環状に結ぶ）</li>
            <li><strong>国道254号</strong>（和光〜川越方面）</li>
            <li><strong>国道4号</strong>（浦和〜久喜〜栃木方面）</li>
            <li><strong>国道463号</strong>（所沢〜浦和・越谷方面）</li>
          </ul>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">埼玉のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、首都高埼玉線・外環道などの自動車専用区間が含まれていないかを自動で警告します。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li><Link href="/prefectures/saitama" className="text-orange-600 underline text-sm">→ 埼玉県の通行禁止区間一覧マップ</Link></li>
            <li><Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">→ 首都高速道路 バイク通行禁止区間まとめ（東京版）</Link></li>
            <li><Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">→ 原付一種・原付二種・普通二輪の通行ルール完全ガイド</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
