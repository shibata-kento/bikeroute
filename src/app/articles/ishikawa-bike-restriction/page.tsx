import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/ishikawa-bike-restriction" },
  title: "石川のバイク通行禁止区間まとめ【のと里山海道・北陸道・原付別】",
  description:
    "石川県のバイク・原付通行禁止区間を車種別に解説。北陸自動車道・のと里山海道の自動車専用区間は原付一種・二種が通行禁止。能登半島ツーリング前の確認ポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "石川のバイク通行禁止区間まとめ【のと里山海道・北陸道・原付別】",
  description: "石川県のバイク・原付通行禁止区間を車種別に解説。",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/ishikawa-bike-restriction",
  inLanguage: "ja",
};

export default function IshikawaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "石川のバイク通行禁止区間まとめ", path: "/articles/ishikawa-bike-restriction" },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">← 解説記事一覧</Link>
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {["のと里山海道", "北陸自動車道", "北陸"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">{tag}</span>
        ))}
      </div>
      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        石川のバイク通行禁止区間まとめ【のと里山海道・北陸道・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            石川県（金沢・能登半島エリア）でバイクに乗る際は<strong>北陸自動車道</strong>と<strong>のと里山海道</strong>の通行制限に注意が必要です。
            特に能登半島ツーリングで多く使われる「のと里山海道」は<strong>無料の自動車専用道路</strong>であるため、
            「無料だから原付でも走れる」と誤解してしまうケースが多い道路です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">石川県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">北陸自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">のと里山海道<br/>（自専道区間）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">能越自動車道</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種（50cc以下）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種（51〜125cc）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪（126cc〜）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">のと里山海道（無料・自動車専用道路）</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">原付禁止（無料でも自動車専用）</span>
              <span className="font-bold text-gray-900 text-sm">のと里山海道</span>
            </div>
            <p className="text-xs text-gray-600">
              金沢〜穴水（のと里山空港近く）を結ぶ約83kmの道路。大半の区間が<strong>無料の自動車専用道路</strong>として整備されており、
              原付一種・二種は通行禁止。能登半島ツーリングの主要ルートだが、原付では利用できない。
              並行する国道249号・県道が代替ルート。
            </p>
          </div>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>よくある誤解：</strong> のと里山海道は無料ですが、自動車専用道路の指定があります。
            「無料＝原付OK」ではありません。標識で必ず確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">その他の自動車専用道路（石川県内）</h2>
          <div className="space-y-3">
            {[
              {
                name: "北陸自動車道（石川県内）",
                detail: "小矢部砺波JCT（富山）〜米原JCT（滋賀）のうち石川県内は小松IC・加賀IC・金沢西IC・金沢東IC等が主要IC。全線有料・自動車専用。",
              },
              {
                name: "能越自動車道（石川側）",
                detail: "金沢森本IC〜七尾・輪島方面を結ぶ無料の自動車専用道路。能登半島内陸部へのアクセスルートだが原付は禁止。",
              },
              {
                name: "金沢外環状道路（山側幹線）",
                detail: "金沢市内の環状道路として整備。自動車専用区間では原付が禁止。金沢市内の移動で注意。",
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
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（石川県・能登半島）</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道8号</strong>（北陸の主要幹線、金沢市内〜福井方面）</li>
            <li><strong>国道249号</strong>（能登半島の外浦側を一周するルート）</li>
            <li><strong>国道159号</strong>（金沢〜七尾の内浦側）</li>
            <li><strong>石川県道</strong>（能登半島内の各エリア間）</li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            ※ のと里山海道沿いに一般道（旧道・県道）が並行しており、風景を楽しみながら走ることができます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">石川・能登のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、のと里山海道の自動車専用区間などが含まれていないかを自動で警告します。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li><Link href="/prefectures/ishikawa" className="text-orange-600 underline text-sm">→ 石川県の通行禁止区間一覧マップ</Link></li>
            <li><Link href="/articles/hokkaido-bike-restriction" className="text-orange-600 underline text-sm">→ 北海道のバイク通行禁止区間まとめ（ツーリング向け）</Link></li>
            <li><Link href="/articles/moped-expressway-reason" className="text-orange-600 underline text-sm">→ 有料道路・バイパスで原付が通れない理由</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
