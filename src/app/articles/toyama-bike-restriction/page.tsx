import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "富山県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "富山県のバイク・原付通行禁止区間を車種別に解説。北陸自動車道（小矢部砺波JCT〜朝日IC）、能越自動車道（小矢部IC〜）は原付一種・二種が全線通行禁止。立山・黒部ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "富山県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "富山県のバイク・原付通行禁止区間を車種別に解説。北陸自動車道・能越自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/toyama-bike-restriction",
  inLanguage: "ja",
};

export default function ToyamaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "富山県のバイク通行禁止区間まとめ", path: "/articles/toyama-bike-restriction" },
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
        {["北陸自動車道", "能越自動車道", "通行禁止", "北信越"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        富山県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            富山県は立山黒部アルペンルートや黒部峡谷など、バイクツーリングの人気スポットが多い県です。
            県内を通る<strong>北陸自動車道</strong>と<strong>能越自動車道</strong>はいずれも高速自動車国道または自動車専用道路に指定されており、
            原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止です。
            富山市内から石川・新潟方面へのアクセスや能登半島方面への移動では注意が必要です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">富山県内の通行制限・基本ルール</h2>
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
                name: "北陸自動車道（小矢部砺波JCT〜朝日IC）",
                detail: "石川県境の小矢部砺波JCTから新潟県境の朝日ICまでの富山県内全区間。富山市・魚津・黒部エリアを通過する北陸道の主要区間で、原付一種・二種は通行不可。並走する国道8号が代替ルートとなる。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "能越自動車道（小矢部IC〜）",
                detail: "小矢部ICから石川県方面（能登方面）へ向かう自動車専用道路。富山県から能登半島へのアクセス路として機能するが、125cc以下は全線通行禁止。",
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
            富山県内の一般国道・県道は原則として二輪車の通行規制はありません。
            ただし、富山市内のバイパス区間（国道8号富山バイパスなど）は一部が自動車専用指定となっている場合があります。
            また、立山黒部アルペンルートは一般車両（バイクを含む）の通行ができないため注意が必要です。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 立山黒部アルペンルート（芦峅寺〜大観峰間）はマイカー規制のため、バイク・原付問わず一般車両は通行できません。
            富山側からは立山駅（立山ケーブルカー）が起点になります。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で富山県内を移動する場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道8号</strong>（北陸道と並走、富山市〜石川・新潟方面）</li>
            <li><strong>国道41号</strong>（富山市〜飛騨高山方面）</li>
            <li><strong>国道415号・160号</strong>（射水・氷見・能登半島入口方面）</li>
            <li><strong>国道471号・472号</strong>（五箇山・白川郷方面の山岳ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を選ぶだけで
            自動車専用区間を回避したルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">富山県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、北陸道・能越道の自動車専用区間が
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
              <Link href="/prefectures/toyama" className="text-orange-600 underline text-sm">
                → 富山県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/ishikawa-bike-restriction" className="text-orange-600 underline text-sm">
                → 石川県のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
