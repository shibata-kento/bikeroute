import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "島根県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "島根県のバイク・原付通行禁止区間を車種別に解説。山陰自動車道・中国自動車道は原付一種・二種が全線通行禁止。出雲大社・石見銀山ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "島根県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "島根県のバイク・原付通行禁止区間を車種別に解説。山陰自動車道・中国自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/shimane-bike-restriction",
  inLanguage: "ja",
};

export default function ShimaneBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "島根県のバイク通行禁止区間まとめ", path: "/articles/shimane-bike-restriction" },
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
        {["山陰自動車道", "中国自動車道", "通行禁止", "中国"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        島根県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            島根県は出雲大社・石見銀山・宍道湖など見どころが多く、山陰ツーリングの核心地です。
            松江〜浜田を結ぶ<strong>山陰自動車道</strong>や、
            広島方面へ向かう<strong>中国自動車道（落合JCT〜六日市IC）</strong>は
            高速自動車国道または自動車専用道路に指定されており、
            原付一種・原付二種は通行できません。出雲・石見への旅の前に規制を確認しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">島根県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">山陰自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">中国自動車道</th>
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
                name: "山陰自動車道（松江IC〜浜田IC）",
                detail: "島根県内を東西に走り、松江と浜田を結ぶ自動車専用道路。出雲・益田方面への主要アクセスルート。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "中国自動車道（落合JCT〜六日市IC）",
                detail: "岡山県の落合JCTから島根県の六日市ICまでを結ぶ高速自動車国道。中国山地を縦断する路線で、原付一種・二種は全線通行禁止。",
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
            島根県内の国道9号（山陰本線沿い）や国道54号（広島方面）は原付でも走行可能です。
            ただし、山陰自動車道の開通区間に並行する旧道や県道では、
            自動車専用道路への接続部で進入禁止標識が設置されている場合があります。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 山陰道は整備が進んでいるため、最新の開通区間を確認してください。
            新しく開通した区間も自動車専用道路として指定される場合があります。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で島根県を走る場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道9号</strong>（日本海沿いを走る山陰の幹線ルート）</li>
            <li><strong>国道54号</strong>（松江〜広島を結ぶ内陸ルート）</li>
            <li><strong>県道・旧山陰街道</strong>（歴史ある集落を通る風情あるルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、車種を入力するだけで
            自動車専用区間を避けた安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">島根県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、山陰自動車道・中国自動車道などの
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
              <Link href="/prefectures/shimane" className="text-orange-600 underline text-sm">
                → 島根県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/hiroshima-bike-restriction" className="text-orange-600 underline text-sm">
                → 広島県のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
