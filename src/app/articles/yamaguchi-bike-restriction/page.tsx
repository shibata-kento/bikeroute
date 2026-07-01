import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "山口県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "山口県のバイク・原付通行禁止区間を車種別に解説。山陽自動車道・中国自動車道・山口宇部道路は原付一種・二種が全線通行禁止。秋吉台・錦帯橋ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "山口県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "山口県のバイク・原付通行禁止区間を車種別に解説。山陽自動車道・中国自動車道・山口宇部道路は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/yamaguchi-bike-restriction",
  inLanguage: "ja",
};

export default function YamaguchiiBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "山口県のバイク通行禁止区間まとめ", path: "/articles/yamaguchi-bike-restriction" },
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
        {["山陽自動車道", "中国自動車道", "山口宇部道路", "通行禁止", "中国"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        山口県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            山口県は秋吉台・錦帯橋・角島大橋など絶景スポットが多く、
            九州へのアクセスルートとしても人気のツーリングエリアです。
            瀬戸内側を走る<strong>山陽自動車道（玖珂IC〜下関IC）</strong>、
            中国山地を越える<strong>中国自動車道（六日市IC〜小月JCT）</strong>、
            そして宇部方面への<strong>山口宇部道路</strong>は自動車専用道路に指定されており、
            原付一種・原付二種は通行できません。九州・関門トンネルへのアクセスも含め事前確認が重要です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">山口県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">山陽道・中国道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">山口宇部道路</th>
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
                name: "山陽自動車道（玖珂IC〜下関IC）",
                detail: "広島側の玖珂ICから下関ICまでの山陽道山口県区間。関門橋方面への主要ルート。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "中国自動車道（六日市IC〜小月JCT）",
                detail: "島根県境の六日市ICから小月JCTまでの中国道山口県区間。中国山地を横断するルート。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "山口宇部道路",
                detail: "山口市内から宇部空港方面へ延びる自動車専用道路。原付一種・二種は全線通行禁止。宇部市内へは国道190号を利用する。",
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
            山口県内の国道2号（山陽側）や国道9号（日本海側）は原付でも走行可能です。
            関門トンネルの人道・車道は125cc以下でも通行できますが、
            関門自動車道（高速区間）は原付通行禁止です。
            九州へのアクセスには関門人道トンネルか関門連絡船の利用を検討してください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 関門橋（中国自動車道の海峡部）は高速自動車国道のため原付は通行禁止です。
            原付での九州渡航は関門トンネル（国道2号）を利用してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で山口県を走る場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道2号</strong>（瀬戸内沿いの山陽幹線ルート）</li>
            <li><strong>国道191号・490号</strong>（角島大橋や日本海沿いの絶景ルート）</li>
            <li><strong>国道315号</strong>（秋吉台・萩方面の内陸ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、車種を入力するだけで
            自動車専用区間を避けた安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">山口県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、山陽道・中国道・山口宇部道路などの
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
              <Link href="/prefectures/yamaguchi" className="text-orange-600 underline text-sm">
                → 山口県の通行禁止区間一覧マップ
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
