import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/chiba-bike-restriction" },
  title: "千葉のバイク通行禁止区間まとめ【アクアライン・湾岸線・京葉道路・原付別】",
  description:
    "千葉県のバイク・原付通行禁止区間を車種別に解説。東京湾アクアライン・京葉道路・東関東道は原付一種・二種が通行禁止。アクアラインの二輪通行可否と代替ルートもまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "千葉のバイク通行禁止区間まとめ【アクアライン・湾岸線・京葉道路・原付別】",
  description: "千葉県のバイク・原付通行禁止区間を車種別に解説。",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/chiba-bike-restriction",
  inLanguage: "ja",
};

export default function ChibaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "千葉のバイク通行禁止区間まとめ", path: "/articles/chiba-bike-restriction" },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">← 解説記事一覧</Link>
      </div>
      <div className="mb-2">
        <TagPills tags={["アクアライン", "湾岸線", "関東"]} />
      </div>
      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        千葉のバイク通行禁止区間まとめ【アクアライン・湾岸線・京葉道路・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            千葉県でバイクに乗る際は<strong>東京湾アクアライン</strong>・<strong>首都高速湾岸線</strong>・<strong>京葉道路</strong>の通行制限に注意が必要です。
            アクアラインは普通二輪・大型二輪は通行できますが、原付一種・二種は通行禁止です。
            また、湾岸線の川崎トンネル付近は二輪全車種が通行禁止の区間があります（神奈川側）。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">千葉県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">アクアライン</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">首都高湾岸線<br/>（千葉側）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">京葉道路・<br/>東関東道</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種（50cc以下）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種（51〜125cc）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪（126cc〜）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可（有料）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">東京湾アクアライン（普通二輪は通行可）</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4 mb-3">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">原付禁止</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">普通二輪・大型は通行可</span>
              <span className="font-bold text-gray-900 text-sm">東京湾アクアライン</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              川崎〜木更津を結ぶ約15kmの海底・海上ルート。普通二輪・大型二輪は通行可能（有料・ETC利用可）。
              原付一種・二種は通行禁止のため、房総半島へのアクセスは一般道（国道127号・東京湾フェリー）を利用。
            </p>
            <div className="rounded bg-blue-50 px-3 py-2 text-xs text-blue-800">
              <strong>料金目安（普通二輪）：</strong> ETC利用で通常600円程度（時間帯・通勤割引あり）。
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">千葉県内の主要な自動車専用道路</h2>
          <div className="space-y-3">
            {[
              {
                name: "首都高速湾岸線（B・千葉側）",
                detail: "浦安〜千葉〜千葉東JCTを結ぶ首都高の千葉方面路線。ディズニーリゾート周辺（浦安IC）も通過。原付全線禁止。",
              },
              {
                name: "京葉道路",
                detail: "一之江IC（東京）〜千葉ICを結ぶ自動車専用道路。市川・船橋・千葉市内への移動でよく使われるが原付禁止。",
              },
              {
                name: "東関東自動車道",
                detail: "高谷JCT〜潮来IC（茨城）方面。千葉北IC・四街道IC・佐倉ICなど千葉中部を横断。成田空港への主要ルートだが原付禁止。",
              },
              {
                name: "館山自動車道",
                detail: "千葉IC〜富浦IC。房総半島への幹線だが全線自動車専用。木更津・君津・鴨川・館山方面へのツーリングで注意。",
              },
              {
                name: "千葉東金道路",
                detail: "千葉東IC〜東金IC。内房・外房方面への移動に利用されるが自動車専用。",
              },
            ].map(({ name, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">全線禁止（原付一種・二種）</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート・アクセス方法</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道14号</strong>（東京〜千葉の主要幹線）</li>
            <li><strong>国道16号</strong>（千葉市・船橋・市川を環状に結ぶ）</li>
            <li><strong>国道127号</strong>（東京湾岸・木更津〜館山の一般道）</li>
            <li><strong>東京湾フェリー</strong>（久里浜〜金谷。原付も乗船可能。房総半島への迂回手段）</li>
          </ul>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">千葉のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、アクアライン・京葉道路などの自動車専用区間が含まれていないかを自動で警告します。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li><Link href="/prefectures/chiba" className="text-orange-600 underline text-sm">→ 千葉県の通行禁止区間一覧マップ</Link></li>
            <li><Link href="/articles/kanagawa-bike-restriction" className="text-orange-600 underline text-sm">→ 神奈川のバイク通行禁止区間まとめ</Link></li>
            <li><Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">→ 首都高速道路 バイク通行禁止区間まとめ（東京版）</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
