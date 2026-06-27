import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "静岡のバイク通行禁止区間まとめ【新東名・東名・伊豆・原付別】",
  description:
    "静岡県のバイク・原付通行禁止区間を車種別に解説。新東名・東名高速は原付一種・二種が全線禁止。伊豆縦貫道の自動車専用区間も注意。箱根・伊豆ツーリング前の確認ポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "静岡のバイク通行禁止区間まとめ【新東名・東名・伊豆・原付別】",
  description: "静岡県のバイク・原付通行禁止区間を車種別に解説。",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/shizuoka-bike-restriction",
  inLanguage: "ja",
};

export default function ShizuokaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "静岡のバイク通行禁止区間まとめ", path: "/articles/shizuoka-bike-restriction" },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">← 解説記事一覧</Link>
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {["新東名", "伊豆ツーリング", "東海"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">{tag}</span>
        ))}
      </div>
      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        静岡のバイク通行禁止区間まとめ【新東名・東名・伊豆・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            静岡県は箱根・伊豆・富士山麓など人気のツーリングスポットが多い県です。
            東名高速・新東名高速は当然通行禁止ですが、
            伊豆方面では<strong>伊豆縦貫自動車道</strong>の一部区間が自動車専用道路となっているため注意が必要です。
            原付一種・二種でツーリングを計画する場合は事前に通行可能なルートを確認しましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">静岡県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">東名・新東名</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">伊豆縦貫道<br/>（自専道区間）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">国道1号<br/>バイパス</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種（50cc以下）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-yellow-600 font-bold">区間によって異なる</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種（51〜125cc）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-yellow-600 font-bold">区間によって異なる</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪（126cc〜）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">静岡県内の主要な自動車専用道路</h2>
          <div className="space-y-3">
            {[
              {
                name: "東名高速道路（静岡県内）",
                detail: "御殿場IC〜浜松IC付近が静岡県内を通過。富士・静岡・焼津・掛川・浜松など主要ICが多数。全線有料・自動車専用。",
              },
              {
                name: "新東名高速道路（静岡県内）",
                detail: "長泉沼津IC〜浜松いなさJCTが静岡県内。新富士IC・静岡SA・島田金谷IC・浜松SAなど。全線有料・自動車専用。",
              },
              {
                name: "伊豆縦貫自動車道（自動車専用区間）",
                detail: "沼津〜河津を結ぶ伊豆縦貫道のうち、修善寺道路・天城北道路などが自動車専用区間に指定されている。全区間ではないので標識要確認。",
              },
              {
                name: "静清バイパス（一部自動車専用）",
                detail: "静岡市内の国道1号バイパス区間。一部が自動車専用道路に指定されており、原付進入禁止の区間がある。",
              },
            ].map(({ name, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">全線/区間禁止（原付一種・二種）</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">伊豆・箱根ツーリングの注意点</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">伊豆スカイライン・箱根ターンパイク</p>
              <p className="text-xs text-gray-600">
                いずれも有料の一般道路（自動車専用でない）。普通二輪・大型二輪はもちろん、
                原付二種も通行可能です（ただし料金がかかります）。
                箱根・芦ノ湖・熱海方面への快走路として人気のルート。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">西伊豆スカイライン・仁科峠</p>
              <p className="text-xs text-gray-600">
                無料の一般道路で全車種通行可。富士山と駿河湾を同時に眺められる絶景ルート。
                原付でも走行可能ですが急カーブ・急勾配が多いため安全速度で走行してください。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（静岡県内）</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道1号</strong>（静岡県内の幹線。バイパスの自専道区間は迂回）</li>
            <li><strong>国道136号</strong>（三島〜松崎の伊豆半島西海岸）</li>
            <li><strong>国道135号</strong>（熱海〜下田の伊豆東海岸）</li>
            <li><strong>国道414号</strong>（天城越えルート、修善寺〜下田）</li>
          </ul>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">静岡・伊豆のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、東名・新東名・伊豆縦貫道の自動車専用区間が含まれていないかを自動で警告します。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li><Link href="/prefectures/shizuoka" className="text-orange-600 underline text-sm">→ 静岡県の通行禁止区間一覧マップ</Link></li>
            <li><Link href="/articles/kanagawa-bike-restriction" className="text-orange-600 underline text-sm">→ 神奈川のバイク通行禁止区間まとめ（箱根方面）</Link></li>
            <li><Link href="/articles/125cc-road-guide" className="text-orange-600 underline text-sm">→ 125ccが走れる道・走れない道ガイド</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
