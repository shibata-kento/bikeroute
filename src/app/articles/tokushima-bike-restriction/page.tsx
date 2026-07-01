import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "徳島県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "徳島県のバイク・原付通行禁止区間を車種別に解説。徳島自動車道・高松自動車道は原付一種・二種が全線通行禁止。大歩危・祖谷・鳴門ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "徳島県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "徳島県のバイク・原付通行禁止区間を車種別に解説。徳島自動車道・高松自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/tokushima-bike-restriction",
  inLanguage: "ja",
};

export default function TokushimaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "徳島県のバイク通行禁止区間まとめ", path: "/articles/tokushima-bike-restriction" },
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
        {["徳島自動車道", "高松自動車道", "通行禁止", "四国"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        徳島県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            徳島県は大歩危・祖谷のかずら橋・鳴門の渦潮など、四国の玄関口として人気のツーリングエリアです。
            本州・淡路島経由で四国へ入る際の主要ルートである<strong>高松自動車道（鳴門JCT〜板野IC）</strong>や、
            西へ向かう<strong>徳島自動車道（鳴門IC〜川之江JCT）</strong>は
            高速自動車国道に指定されており、原付一種・原付二種は通行できません。
            四国ツーリングの起点となる徳島の通行規制を事前に把握しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">徳島県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">徳島自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">高松自動車道</th>
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
                name: "徳島自動車道（鳴門IC〜川之江JCT）",
                detail: "徳島県東部の鳴門ICから愛媛・高知方面の川之江JCTまでを結ぶ高速自動車国道。四国横断の基幹ルート。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "高松自動車道（鳴門JCT〜板野IC）",
                detail: "淡路島経由で本州から四国へ入る際の接続路線。鳴門JCTから高松方面へ向かう区間も高速自動車国道のため、原付一種・二種は通行禁止。",
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
            徳島県の国道11号（東部沿岸）や国道192号（吉野川沿い）は原付でも走行可能です。
            大歩危・祖谷方面の国道32号・439号は山岳ルートで道幅が狭い箇所も多いため、
            慎重な運転を心がけてください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 大鳴門橋（神戸淡路鳴門自動車道）は高速自動車国道のため、
            原付一種・二種は通行禁止です。本州から四国への渡航に際してはフェリーの利用も検討してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で徳島県を走る場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道11号</strong>（徳島市内〜鳴門方面の沿岸ルート）</li>
            <li><strong>国道192号</strong>（吉野川沿いを西へ向かう主要幹線）</li>
            <li><strong>国道32号</strong>（大歩危・祖谷方面の渓谷ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、車種を入力するだけで
            自動車専用区間を避けた安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">徳島県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、徳島自動車道・高松自動車道などの
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
              <Link href="/prefectures/tokushima" className="text-orange-600 underline text-sm">
                → 徳島県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/kagawa-bike-restriction" className="text-orange-600 underline text-sm">
                → 香川県のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
