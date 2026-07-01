import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "宮崎県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "宮崎県のバイク・原付通行禁止区間を車種別に解説。宮崎自動車道（都城IC〜宮崎IC）・東九州自動車道（日向IC〜宮崎IC）は原付一種・二種が全線通行禁止。出発前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "宮崎県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "宮崎県のバイク・原付通行禁止区間を車種別に解説。宮崎自動車道・東九州自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/miyazaki-bike-restriction",
  inLanguage: "ja",
};

export default function MiyazakiBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "宮崎県のバイク通行禁止区間まとめ", path: "/articles/miyazaki-bike-restriction" },
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
        {["宮崎自動車道", "東九州自動車道", "通行禁止", "九州"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        宮崎県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            宮崎県は日南海岸や高千穂峡など自然豊かなツーリングスポットが多く、<strong>宮崎自動車道</strong>と<strong>東九州自動車道</strong>が県内の主要幹線として機能しています。
            しかしこれらの高速自動車国道・自動車専用道路は、原付一種（50cc以下）・原付二種（51〜125cc）が全線通行禁止です。
            広大な宮崎県をツーリングする前に、車種に合ったルートを確認しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">宮崎県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">宮崎自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">東九州自動車道</th>
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
            宮崎県内を走る高速道路はすべて<strong>高速自動車国道または自動車専用道路</strong>に指定されており、
            原付一種・原付二種は一切の入口から通行できません。
          </p>

          <div className="space-y-3">
            {[
              {
                label: "全線禁止（原付一種・二種）",
                name: "宮崎自動車道（都城IC〜宮崎IC）",
                detail: "鹿児島方面から宮崎市内へのアクセスに使われる路線。都城ICから宮崎ICまでの区間が宮崎県内の主要部分です。沿線の一般道として国道10号が並行します。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "東九州自動車道（日向IC〜宮崎IC）",
                detail: "大分方面から宮崎市内へのアクセスに使われる路線。日向ICから宮崎ICまでの区間では、延岡・日向方面の移動でも原付・125cc以下は通行禁止です。",
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
            宮崎市内の幹線道路や国道バイパスでは、一部に自動車専用区間が設定されているケースがあります。
            日南・串間方面の国道220号沿いは海沿いで景色がよく人気のルートですが、
            一部区間で規制がある場合もあるため標識を確認してください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 宮崎県内の山岳部（高千穂・椎葉方面）は道幅が狭く、
            ツーリング中の転倒リスクが高い区間があります。安全速度での走行を心がけてください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">宮崎自動車道・東九州自動車道が使えない場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道10号</strong>（宮崎市〜都城市・延岡市方面の幹線）</li>
            <li><strong>国道220号</strong>（宮崎市〜日南・串間方面・日南海岸沿い）</li>
            <li><strong>国道327号・国道218号</strong>（延岡市〜高千穂方面）</li>
            <li><strong>国道269号</strong>（都城市〜志布志方面）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">宮崎県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、宮崎自動車道・東九州自動車道の
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
              <Link href="/prefectures/miyazaki" className="text-orange-600 underline text-sm">
                → 宮崎県の通行禁止区間一覧マップ
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
