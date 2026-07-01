import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "秋田県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "秋田県のバイク・原付通行禁止区間を車種別に解説。秋田自動車道・日本海東北自動車道は原付一種・二種が全線通行禁止。田沢湖・角館・男鹿へのツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "秋田県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "秋田県のバイク・原付通行禁止区間を車種別に解説。秋田自動車道・日本海東北自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/akita-bike-restriction",
  inLanguage: "ja",
};

export default function AkitaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "秋田県のバイク通行禁止区間まとめ", path: "/articles/akita-bike-restriction" },
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
        {["秋田自動車道", "日本海東北自動車道", "通行禁止", "東北"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        秋田県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            秋田県は田沢湖・角館・男鹿半島・白神山地など、自然豊かなツーリングルートが魅力の県です。
            県内には岩手・宮城方面から延びる<strong>秋田自動車道</strong>と、
            日本海沿いを北上する<strong>日本海東北自動車道</strong>が走っています。
            いずれも高速自動車国道・自動車専用道路であるため、
            原付一種（50cc以下）・原付二種（51〜125cc）は通行禁止です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">秋田県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">秋田自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">日本海東北自動車道</th>
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
                name: "秋田自動車道（北上JCT〜秋田IC）",
                detail: "岩手県の北上JCTを起点に秋田平野を横断し秋田ICへ至る高速自動車国道。横手IC・大曲ICなど秋田県南部の主要インターを経由。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "日本海東北自動車道（秋田北IC〜）",
                detail: "秋田市北部の秋田北ICを起点に青森方面へ日本海沿岸を北上する自動車専用道路。男鹿方面とは別ルートとなる。自動車専用道路指定のため、原付一種・二種は通行禁止。",
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
            秋田県内の一般道は比較的走りやすいルートが多いですが、
            冬期は積雪・路面凍結による通行規制が多発します。
            特に内陸の山岳道路では冬期通行止めとなる区間も多いため、
            ツーリングシーズンを選んで計画することをお勧めします。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 日本海東北自動車道の一部区間は無料開放されていますが、
            自動車専用道路指定は継続しています。標識に従って走行してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">高速道路が使えない原付の場合、以下の一般道が主要な代替ルートになります。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道13号</strong>（山形〜横手〜秋田方面、秋田道の代替）</li>
            <li><strong>国道7号</strong>（新潟〜秋田〜青森方面、日本海東北道の代替）</li>
            <li><strong>国道101号</strong>（秋田〜男鹿〜能代方面の日本海沿岸ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全ルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">秋田のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、秋田道・日本海東北道などの
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
              <Link href="/prefectures/akita" className="text-orange-600 underline text-sm">
                → 秋田県の通行禁止区間一覧マップ
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
