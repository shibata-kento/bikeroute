import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "沖縄県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "沖縄県のバイク・原付通行禁止区間を車種別に解説。沖縄自動車道（那覇IC〜許田IC）・那覇空港自動車道は原付一種・二種が全線通行禁止。出発前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "沖縄県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "沖縄県のバイク・原付通行禁止区間を車種別に解説。沖縄自動車道・那覇空港自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/okinawa-bike-restriction",
  inLanguage: "ja",
};

export default function OkinawaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "沖縄県のバイク通行禁止区間まとめ", path: "/articles/okinawa-bike-restriction" },
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
        {["沖縄自動車道", "那覇空港自動車道", "通行禁止", "沖縄"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        沖縄県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            沖縄県は美しい海と独自の文化が魅力のツーリングスポットで、原付やバイクでの旅が人気です。
            しかし沖縄本島を縦断する<strong>沖縄自動車道</strong>と<strong>那覇空港自動車道</strong>は、
            原付一種（50cc以下）・原付二種（51〜125cc）が全線通行禁止です。
            レンタルバイクを含め、沖縄でバイクを利用する際は出発前に通行ルールを確認しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">沖縄県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">沖縄自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">那覇空港自動車道</th>
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
          <p className="mb-3">
            沖縄県内を走る高速道路・自動車専用道路はすべて原付一種・原付二種の通行が禁止されています。
            <strong>沖縄自動車道</strong>は沖縄本島を南北に縦断する唯一の高速道路です。
          </p>

          <div className="space-y-3">
            {[
              {
                label: "全線禁止（原付一種・二種）",
                name: "沖縄自動車道（那覇IC〜許田IC）",
                detail: "那覇ICから名護市の許田ICまで沖縄本島を縦断する路線。北部・中部へのアクセスに利用されますが、原付・125cc以下は全区間で通行禁止です。国道58号が並行する代替ルートです。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "那覇空港自動車道",
                detail: "那覇空港から那覇IC方面へ接続する自動車専用道路。空港と市街地を結ぶ短距離路線ですが、原付・125cc以下は通行禁止です。国道331号や一般道でアクセスしてください。",
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
            沖縄本島の一般道は比較的走りやすいですが、那覇市内や国道58号沿いは交通量が多く渋滞が発生しやすい区間です。
            また本島北部（やんばる）の林道や一部区間は道幅が狭く、離合に注意が必要です。
            レンタルバイクで沖縄を訪れる場合は、バイクの排気量と通行可能区間を事前に確認してください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 沖縄では夏季に強い日差しと急な豪雨が発生します。
            雨天時は路面が滑りやすくなるため、特に慎重な運転を心がけてください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">沖縄自動車道・那覇空港自動車道が使えない場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道58号</strong>（那覇市〜名護市・北部方面、沖縄自動車道に並行する幹線）</li>
            <li><strong>国道329号</strong>（うるま市〜名護市・東海岸沿い）</li>
            <li><strong>国道331号</strong>（那覇市〜糸満市・南部方面）</li>
            <li><strong>県道・海岸線</strong>（中部・北部の観光ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">沖縄県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、沖縄自動車道・那覇空港自動車道の
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
              <Link href="/prefectures/okinawa" className="text-orange-600 underline text-sm">
                → 沖縄県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/kagoshima-bike-restriction" className="text-orange-600 underline text-sm">
                → 鹿児島県のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
