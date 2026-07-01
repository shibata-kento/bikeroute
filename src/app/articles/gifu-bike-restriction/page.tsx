import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "岐阜県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "岐阜県のバイク・原付通行禁止区間を車種別に解説。東海北陸自動車道（一宮JCT〜飛騨清見IC）、中央自動車道（小牧JCT〜中津川IC）、東海環状自動車道は原付一種・二種が全線通行禁止。飛騨・白川郷ツーリング前に確認を。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "岐阜県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "岐阜県のバイク・原付通行禁止区間を車種別に解説。東海北陸自動車道・中央自動車道・東海環状自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/gifu-bike-restriction",
  inLanguage: "ja",
};

export default function GifuBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "岐阜県のバイク通行禁止区間まとめ", path: "/articles/gifu-bike-restriction" },
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
        {["東海北陸自動車道", "東海環状自動車道", "通行禁止", "東海"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        岐阜県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            岐阜県は飛騨高山・白川郷・奥飛騨など、バイクツーリングの聖地として人気の高い県です。
            名古屋・愛知方面から岐阜県に入る際に利用する<strong>東海北陸自動車道</strong>・<strong>中央自動車道</strong>・<strong>東海環状自動車道</strong>は
            いずれも高速自動車国道または自動車専用道路であり、原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止です。
            飛騨・白川郷を目指すツーリングでは、車種に応じたルート選択が必須です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">岐阜県内の通行制限・基本ルール</h2>
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
                name: "東海北陸自動車道（一宮JCT〜飛騨清見IC）",
                detail: "愛知県一宮JCTから飛騨清見ICまでの全区間。岐阜市・関・美濃・郡上八幡・白鳥・荘川を通過し飛騨地方への最速ルート。世界遺産・白川郷へのアクセスにも使われるが、125cc以下は全線通行不可。国道156号（ひるがの高原経由）が代替ルート。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "中央自動車道（小牧JCT〜中津川IC）",
                detail: "愛知県と岐阜県にまたがる区間のうち、岐阜県内（可児市・中津川市周辺）を通過する部分。名古屋から木曽・長野方面へのルートとして使われるが、125cc以下は全線通行不可。国道19号が並走する代替ルート。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "東海環状自動車道（岐阜県内区間）",
                detail: "豊田市を起点に岐阜県内を通過し、北勢バイパス（三重県）へと続く環状路線の岐阜県区間。土岐・多治見・関・各務原・大垣方面を結ぶ。自動車専用道路として整備されており、原付一種・二種は通行禁止。",
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
            岐阜県内の一般国道・県道は原則として二輪車の通行規制はありません。
            ただし、岐阜市内・大垣市内のバイパス区間（国道21号大垣バイパスなど）に自動車専用指定区間が含まれる場合があります。
            また、安房トンネル（国道471号）は二輪車を含む一般車両が通行可能な有料道路で、飛騨から長野・松本方面へのショートカットルートです。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 国道156号（ひるがの高原〜白鳥間）は白川郷や東海北陸道の代替ルートとして重要ですが、
            冬季（12月〜4月頃）は積雪・凍結に十分注意してください。スタッドレスタイヤでも通行困難な場合があります。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で岐阜県内を移動する場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道156号</strong>（東海北陸道と並走、郡上八幡〜白川郷〜五箇山方面）</li>
            <li><strong>国道41号</strong>（岐阜市〜下呂〜高山方面の飛騨川沿いルート）</li>
            <li><strong>国道19号</strong>（中津川〜恵那〜中央道に並走する木曽路ルート）</li>
            <li><strong>国道21号</strong>（岐阜市〜大垣〜関ヶ原〜米原方面）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を選ぶだけで
            自動車専用区間を回避したルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">岐阜県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、東海北陸道・中央道・東海環状道の自動車専用区間が
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
              <Link href="/prefectures/gifu" className="text-orange-600 underline text-sm">
                → 岐阜県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/nagoya-bike-restriction" className="text-orange-600 underline text-sm">
                → 名古屋・愛知のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
