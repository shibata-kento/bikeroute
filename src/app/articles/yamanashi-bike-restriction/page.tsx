import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "山梨県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "山梨県のバイク・原付通行禁止区間を車種別に解説。中央自動車道（上野原IC〜小淵沢IC）、東富士五湖道路（富士吉田IC〜河口湖IC）は原付一種・二種が全線通行禁止。富士山・河口湖ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "山梨県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "山梨県のバイク・原付通行禁止区間を車種別に解説。中央自動車道・東富士五湖道路は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/yamanashi-bike-restriction",
  inLanguage: "ja",
};

export default function YamanashiBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "山梨県のバイク通行禁止区間まとめ", path: "/articles/yamanashi-bike-restriction" },
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
        {["中央自動車道", "東富士五湖道路", "通行禁止", "甲信越"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        山梨県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            山梨県は富士山・河口湖・南アルプスなど、バイクツーリングの人気スポットが集中する県です。
            東京・神奈川方面からのアクセスに使われる<strong>中央自動車道</strong>と、
            富士五湖エリアへの入口となる<strong>東富士五湖道路</strong>はともに高速自動車国道または自動車専用道路であり、
            原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止です。
            河口湖・富士吉田方面をツーリングする際は車種と規制を事前に確認してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">山梨県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">高速自動車国道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">自動車専用道路</th>
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
                name: "中央自動車道（上野原IC〜小淵沢IC）",
                detail: "神奈川県境に近い上野原ICから長野県境に近い小淵沢ICまでの山梨県内区間。甲府・勝沼・韮崎エリアを通過し、甲信方面へのメインルートとなる。原付一種・二種は全区間通行不可。国道20号（甲州街道）が並走する代替ルート。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "東富士五湖道路（富士吉田IC〜河口湖IC）",
                detail: "富士吉田ICから河口湖ICを結ぶ自動車専用道路。富士五湖エリアへのアクセスに多用されるが、125cc以下は全線通行禁止。富士吉田〜河口湖間は国道139号・富士パノラマライン（県道71号）が代替ルートとなる。",
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

          <p className="mt-3 text-xs text-gray-500">
            ※ 高速自動車国道・自動車専用道路への進入は「自動車専用」標識が目印です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">一般道での注意点</h2>
          <p className="mb-3">
            山梨県内の国道・県道は原則として二輪車の通行規制はありません。
            ただし、甲府市内の一部バイパス区間や、中央道に並行する国道20号の一部に自動車専用指定区間が設けられている場合があります。
            また富士スバルライン（富士山有料道路）は一般のバイクは通行可能ですが、
            河口湖から五合目への登山シーズン中はマイカー規制が実施されることがあります。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 富士スバルラインはバイク通行可能ですが、登山シーズン（7〜8月）は
            マイカー規制による通行制限が実施されます。事前に富士山有料道路の規制情報を確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で山梨県内を移動する場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道20号（甲州街道）</strong>（中央道と並走、上野原〜甲府〜小淵沢方面）</li>
            <li><strong>国道139号</strong>（富士吉田〜河口湖〜本栖湖〜静岡方面）</li>
            <li><strong>国道137号（御坂みち）</strong>（甲府盆地〜河口湖方面の山越えルート）</li>
            <li><strong>国道52号</strong>（甲府〜身延〜静岡方面）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を選ぶだけで
            自動車専用区間を回避したルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">山梨県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、中央道・東富士五湖道路の自動車専用区間が
            ルートに含まれていないかを自動で警告します。
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
              <Link href="/prefectures/yamanashi" className="text-orange-600 underline text-sm">
                → 山梨県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">
                → 首都高速道路 バイク通行禁止区間まとめ（東京版）
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
