import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "長野県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "長野県のバイク・原付通行禁止区間を車種別に解説。長野自動車道（岡谷JCT〜安曇野IC）、中央自動車道、上信越自動車道（碓氷軽井沢IC〜更埴JCT）は原付一種・二種が全線通行禁止。信州ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "長野県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "長野県のバイク・原付通行禁止区間を車種別に解説。長野自動車道・中央自動車道・上信越自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/nagano-bike-restriction",
  inLanguage: "ja",
};

export default function NaganoBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "長野県のバイク通行禁止区間まとめ", path: "/articles/nagano-bike-restriction" },
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
        {["長野自動車道", "上信越自動車道", "通行禁止", "甲信越"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        長野県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            長野県は北アルプス・南アルプス・八ヶ岳・軽井沢など、全国有数のツーリングスポットを擁する広大な県です。
            県内には<strong>長野自動車道</strong>・<strong>中央自動車道（長野県部分）</strong>・<strong>上信越自動車道</strong>の3路線が通りますが、
            いずれも高速自動車国道であり、原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止です。
            信州ツーリングを計画する際は、車種に応じた通行可否を必ず確認してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">長野県内の通行制限・基本ルール</h2>
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
                name: "長野自動車道（岡谷JCT〜安曇野IC）",
                detail: "中央道と分岐する岡谷JCTから安曇野ICまでの区間。松本市・塩尻市を経由し、安曇野・大町・白馬方面へのアクセスに使われる路線。原付一種・二種は全線通行不可。国道19号・20号が並走する代替ルート。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "中央自動車道（長野県内区間：小牧東IC〜岡谷JCT間）",
                detail: "愛知県境の小牧東ICから岡谷JCTまでのうち、長野県内を通過する区間（伊那市・駒ヶ根市・飯田市周辺）。南信州エリアへのアクセスに使われるが、125cc以下は通行不可。国道153号・国道151号が代替ルート。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "上信越自動車道（碓氷軽井沢IC〜更埴JCT）",
                detail: "群馬県境の碓氷軽井沢ICから長野市付近の更埴JCTまでの区間。軽井沢・小諸・上田・長野市へのアクセスに多用される路線。原付一種・二種は全線通行不可。国道18号・しなの鉄道沿線道路が代替ルート。",
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
            ※ 高速自動車国道への進入は「自動車専用」標識が目印です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">一般道での注意点</h2>
          <p className="mb-3">
            長野県内の国道・県道は原則として二輪車の通行規制はありません。
            ただし、長野市内・松本市内のバイパス区間（国道19号バイパスなど）に自動車専用区間が設定されている場合があります。
            また、ビーナスラインなど山岳有料道路では通行可能ですが、積雪・凍結期（11月下旬〜4月下旬）は全面通行止めになる区間があります。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 長野県内の山岳道路（ビーナスライン・志賀草津高原ルートなど）は冬季閉鎖されます。
            季節に応じた通行可否を必ず確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で長野県内を移動する場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道18号</strong>（軽井沢〜長野市、上信越道と並走）</li>
            <li><strong>国道19号</strong>（長野市〜松本〜塩尻〜名古屋方面）</li>
            <li><strong>国道20号</strong>（塩尻〜茅野〜甲府方面）</li>
            <li><strong>国道153号</strong>（伊那〜飯田〜豊田方面、中央道と並走）</li>
            <li><strong>国道148号</strong>（安曇野〜大町〜白馬〜糸魚川方面）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を選ぶだけで
            自動車専用区間を回避したルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">長野県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、長野道・中央道・上信越道の自動車専用区間が
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
              <Link href="/prefectures/nagano" className="text-orange-600 underline text-sm">
                → 長野県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/yamanashi-bike-restriction" className="text-orange-600 underline text-sm">
                → 山梨県のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
