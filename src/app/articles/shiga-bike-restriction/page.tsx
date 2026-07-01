import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "滋賀県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "滋賀県のバイク・原付通行禁止区間を車種別に解説。名神高速・北陸自動車道・新名神高速は原付一種・二種が全線通行禁止。琵琶湖ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "滋賀県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "滋賀県のバイク・原付通行禁止区間を車種別に解説。名神高速・北陸自動車道・新名神高速は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/shiga-bike-restriction",
  inLanguage: "ja",
};

export default function ShigaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "滋賀県のバイク通行禁止区間まとめ", path: "/articles/shiga-bike-restriction" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">
          ← 解説記事一覧
        </Link>
      </div>

      <div className="mb-2 flex flex-wrap gap-1">
        {["名神高速", "北陸自動車道", "新名神高速", "通行禁止", "近畿"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        滋賀県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            滋賀県は琵琶湖を中心とした自然豊かなツーリングエリアで、名古屋・大阪・京都方面からのアクセス路線が充実しています。
            しかし、東西を貫く<strong>名神高速道路</strong>、北部の<strong>北陸自動車道</strong>、
            そして新設された<strong>新名神高速道路</strong>はいずれも高速自動車国道に指定されており、
            原付一種・原付二種は全線通行禁止です。琵琶湖一周ツーリングを計画している場合でも、
            アクセス区間の規制を事前に確認しておくことが重要です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">滋賀県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">名神高速</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">北陸道・新名神</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種</td>
                  <td className="border border-gray-200 px-3 py-2">50cc以下</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種</td>
                  <td className="border border-gray-200 px-3 py-2">51〜125cc</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪</td>
                  <td className="border border-gray-200 px-3 py-2">126cc以上</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">主要高速道路の通行禁止区間</h2>
          <div className="space-y-3">
            {[
              {
                label: "全線禁止（原付一種・二種）",
                name: "名神高速道路（大津IC〜栗東IC）",
                detail: "東京・名古屋から大阪方面へ向かう基幹高速道路。滋賀県内の大津IC〜栗東IC区間も高速自動車国道のため、原付一種・二種は通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "北陸自動車道（木之本IC〜米原JCT）",
                detail: "滋賀県北部を通り、金沢・富山方面へ延びる高速道路。米原JCTで名神と接続。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "新名神高速道路（草津田上IC〜）",
                detail: "名古屋〜神戸を結ぶ新名神の滋賀県区間。草津田上IC付近から大阪方面へ延びる。高速自動車国道のため原付は通行不可。",
              },
            ].map(({ label, name, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{label}</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">一般道での注意点</h2>
          <p className="mb-3">
            琵琶湖を周回する国道161号（西岸）や国道1号・8号（南部）は原付でも走行可能な一般道です。
            ただし、一部の自動車専用バイパス区間では通行禁止標識が設置されている場合があるため、
            標識に従って迂回路を利用してください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 国道1号・8号のバイパス区間（草津バイパスなど）では自動車専用区間が設定されている場合があります。
            標識を必ず確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で滋賀県を走る場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道161号</strong>（琵琶湖西岸を通る風光明媚なルート）</li>
            <li><strong>国道8号</strong>（米原・彦根方面の幹線道路）</li>
            <li><strong>湖東・湖西の県道</strong>（琵琶湖ビワイチ向けのルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、車種を入力するだけで
            高速自動車国道を避けた安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">滋賀県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、名神高速・北陸道・新名神などの
            自動車専用区間が含まれていないかを自動で警告します。
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/prefectures/shiga" className="text-orange-600 underline text-sm">
                → 滋賀県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/osaka-bike-restriction" className="text-orange-600 underline text-sm">
                → 大阪府のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
