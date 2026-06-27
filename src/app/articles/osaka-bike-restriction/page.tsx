import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "大阪のバイク通行禁止区間まとめ【阪神高速・原付別】",
  description:
    "大阪府のバイク・原付通行禁止区間を車種別に解説。阪神高速道路は原付一種・二種が全線通行禁止。大阪港トンネルなど二輪車全車種禁止区間も。出発前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "大阪のバイク通行禁止区間まとめ【阪神高速・原付別】",
  description:
    "大阪府のバイク・原付通行禁止区間を車種別に解説。阪神高速道路は原付一種・二種が全線通行禁止。大阪港トンネルなど二輪車全車種禁止区間も。",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/osaka-bike-restriction",
  inLanguage: "ja",
};

export default function OsakaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "大阪のバイク通行禁止区間まとめ", path: "/articles/osaka-bike-restriction" },
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
        {["阪神高速", "通行禁止", "近畿"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        大阪のバイク通行禁止区間まとめ【阪神高速・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月15日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            大阪府内を走るバイク乗りが特に注意すべきは<strong>阪神高速道路</strong>の通行制限です。
            阪神高速は全線が「自動車専用道路」に指定されているため、原付一種・原付二種は一切通行できません。
            さらに大阪港トンネルや夢咲トンネルなど、普通二輪以上でも通行禁止となるトンネル区間が複数あります。
            本記事で出発前に確認しておきましょう。
          </p>
        </section>

        {/* 基本ルール */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">大阪府内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">阪神高速</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">近畿道・名神</th>
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

        {/* 阪神高速 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">阪神高速道路の通行禁止区間</h2>
          <p className="mb-3">
            阪神高速道路は大阪・神戸エリアを結ぶ都市高速で、全線が<strong>自動車専用道路</strong>です。
            原付一種・原付二種はすべての入口から通行禁止となります。
            入口の「自動車専用」標識を必ず確認してください。
          </p>

          <div className="space-y-3">
            {[
              {
                label: "全線禁止（原付一種・二種）",
                name: "1号環状線",
                detail: "大阪都心部を一周する環状路線。梅田・難波・天王寺方面へのアクセスに使われるが原付は進入不可。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "11号池田線",
                detail: "梅田〜池田（宝塚方面）を結ぶ路線。北摂エリアへの移動に使われる。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "13号東大阪線",
                detail: "東大阪〜東成を結ぶ路線。近畿道と接続。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "14号松原線",
                detail: "天王寺〜松原JCTを結ぶ路線。南大阪方面への主要ルート。",
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
            ※ 阪神高速は大阪府内だけでなく兵庫県（神戸方面）にも路線が延びています。
            大阪市内から神戸方面へのルートでも注意が必要です。
          </p>
        </section>

        {/* 二輪禁止トンネル */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">二輪車全車種が通行禁止のトンネル</h2>
          <p className="mb-3">
            大阪府内では以下のトンネル区間で、126cc以上の普通二輪・大型二輪も通行が禁止されています。
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">二輪禁止</span>
                <span className="font-bold text-gray-900 text-sm">大阪港トンネル（阪神高速湾岸線）</span>
              </div>
              <p className="text-xs text-gray-600">
                大阪港の南港と北港を結ぶ海底トンネル区間。換気・安全上の理由から自動二輪車の通行が全面禁止。
                南港〜天保山方面への移動は地上ルートを使う必要があります。
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">二輪禁止</span>
                <span className="font-bold text-gray-900 text-sm">夢咲トンネル（阪神高速湾岸線）</span>
              </div>
              <p className="text-xs text-gray-600">
                ユニバーサルシティ方面（此花区）の湾岸線区間にある海底トンネル。
                USJ周辺へバイクでアクセスする際は注意が必要です。
              </p>
            </div>
          </div>
        </section>

        {/* 国道・一般道の注意点 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">一般道でも注意が必要な区間</h2>
          <p className="mb-3">
            高速道路以外でも、大阪府内には二輪通行禁止の標識が設置された区間があります。
            特に交通量の多い幹線道路や橋梁・トンネルで規制されているケースがあるため、
            標識の確認を怠らないようにしてください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 大阪市内の一部交差点・幹線道路では時間帯により二輪の通行規制が実施される場合があります。
            標識に従って走行してください。
          </div>
        </section>

        {/* 代替ルート */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（大阪市内）</h2>
          <p className="mb-2">阪神高速が使えない場合、以下の一般道が主要な代替ルートになります。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道1号・国道2号</strong>（東西方向の幹線）</li>
            <li><strong>国道25号・国道308号</strong>（東大阪・奈良方面）</li>
            <li><strong>大阪市道・府道</strong>（市内移動）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を入力するだけで
            自動車専用区間やトンネル禁止区間を含まない安全ルートを確認できます。
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">大阪のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、阪神高速の自動車専用区間・
            トンネル禁止区間が含まれていないかを自動で警告します。
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            ルートをチェックする →
          </Link>
        </div>

        {/* 関連リンク */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/prefectures/osaka" className="text-orange-600 underline text-sm">
                → 大阪府の通行禁止区間一覧マップ
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
