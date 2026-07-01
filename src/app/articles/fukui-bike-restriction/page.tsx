import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "福井県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "福井県のバイク・原付通行禁止区間を車種別に解説。北陸自動車道（敦賀IC〜金津IC）、中部縦貫自動車道（福井北IC〜）は原付一種・二種が全線通行禁止。永平寺・東尋坊ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "福井県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "福井県のバイク・原付通行禁止区間を車種別に解説。北陸自動車道・中部縦貫自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/fukui-bike-restriction",
  inLanguage: "ja",
};

export default function FukuiBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "福井県のバイク通行禁止区間まとめ", path: "/articles/fukui-bike-restriction" },
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
        {["北陸自動車道", "中部縦貫自動車道", "通行禁止", "北陸"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        福井県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            福井県は永平寺・東尋坊・若狭湾など魅力的なツーリングスポットを持つ県です。
            県内を通る<strong>北陸自動車道</strong>と<strong>中部縦貫自動車道</strong>はいずれも高速自動車国道または自動車専用道路に指定されており、
            原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止です。
            関西方面からのアクセスや岐阜・長野方面への移動ルートを計画する際は、必ず車種と規制を確認してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">福井県内の通行制限・基本ルール</h2>
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
                name: "北陸自動車道（敦賀IC〜金津IC）",
                detail: "滋賀・京都との境に近い敦賀ICから石川県境手前の金津ICまでの福井県内全区間。福井市・鯖江・小浜方面へのアクセスに使われる北陸道の主要区間で、原付一種・二種は通行不可。並走する国道8号が代替ルートとなる。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "中部縦貫自動車道（福井北IC〜）",
                detail: "福井北ICから大野市・勝山方面を経由し岐阜県高山方面へ向かう自動車専用道路。現在も整備が進む路線で、福井から白山・飛騨方面への移動に使われるが、125cc以下は全線通行禁止。",
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
            福井県内の一般国道・県道は原則として二輪車の通行規制はありません。
            ただし、福井市周辺のバイパス区間（国道8号福井バイパス・国道158号の一部など）に自動車専用区間が設定されている場合があります。
            また若狭方面の国道27号は全線一般道ですが、交通量の多い区間では注意が必要です。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 国道158号（中部縦貫道に並走する一般道区間）を利用する場合も、自動車専用の指定区間に注意してください。
            「自動車専用」標識がある区間は原付通行不可です。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で福井県内を移動する場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道8号</strong>（北陸道と並走、敦賀〜福井〜石川方面）</li>
            <li><strong>国道27号</strong>（若狭湾沿い、小浜・舞鶴方面）</li>
            <li><strong>国道158号</strong>（福井市〜大野〜白峰・白川郷方面の一般道区間）</li>
            <li><strong>国道364号・365号</strong>（南越前・池田方面の山岳ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を選ぶだけで
            自動車専用区間を回避したルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">福井県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、北陸道・中部縦貫道の自動車専用区間が
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
              <Link href="/prefectures/fukui" className="text-orange-600 underline text-sm">
                → 福井県の通行禁止区間一覧マップ
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
