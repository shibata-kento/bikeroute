import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "高知県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "高知県のバイク・原付通行禁止区間を車種別に解説。高知自動車道・高知東部自動車道は原付一種・二種が全線通行禁止。四万十川・室戸岬ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "高知県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "高知県のバイク・原付通行禁止区間を車種別に解説。高知自動車道・高知東部自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/kochi-bike-restriction",
  inLanguage: "ja",
};

export default function KochiBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "高知県のバイク通行禁止区間まとめ", path: "/articles/kochi-bike-restriction" },
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
        {["高知自動車道", "高知東部自動車道", "通行禁止", "四国"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        高知県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            高知県は四万十川・室戸岬・足摺岬・四国カルストなど、
            豪快な自然の中を走れる四国屈指のツーリングエリアです。
            香川・愛媛方面から高知へ向かう<strong>高知自動車道（伊野IC〜須崎IC）</strong>や、
            高知東部へ延びる<strong>高知東部自動車道</strong>は
            高速自動車国道または自動車専用道路に指定されており、
            原付一種・原付二種は通行できません。長距離ツーリング前にルールを確認しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">高知県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">高知自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">高知東部自動車道</th>
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
                name: "高知自動車道（伊野IC〜須崎IC）",
                detail: "高知県西部の伊野ICから須崎ICまでを結ぶ高速自動車国道。四万十・足摺岬方面へのアクセスルートに使われるが、原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "高知東部自動車道",
                detail: "高知市東部から安芸・室戸方面へ延びる自動車専用道路。室戸岬ツーリングのアクセスに利用されることがあるが、原付一種・二種は全線通行禁止。",
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
            高知県の国道32号（大歩危方面）・国道55号（室戸方面）・国道56号（四万十方面）は
            原付でも走行可能な一般国道です。
            ただし、高知自動車道に隣接する区間ではバイパス入口への誤進入に注意してください。
            山岳部・沿岸部ともに道幅が狭い区間が多く、対向車に注意した安全運転が求められます。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 高知道の未開通区間に並行する国道では整備が進んでいます。
            最新の道路情報を確認し、自動車専用標識が出ている区間には進入しないよう注意してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で高知県を走る場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道32号</strong>（高松・大歩危から高知市内へ抜ける山岳ルート）</li>
            <li><strong>国道55号</strong>（徳島・室戸岬・安芸を経由する太平洋沿岸ルート）</li>
            <li><strong>国道56号</strong>（高知市内から四万十・宿毛・宇和島へ向かう南西ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、車種を入力するだけで
            自動車専用区間を避けた安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">高知県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、高知自動車道・高知東部自動車道などの
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
              <Link href="/prefectures/kochi" className="text-orange-600 underline text-sm">
                → 高知県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/ehime-bike-restriction" className="text-orange-600 underline text-sm">
                → 愛媛県のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
