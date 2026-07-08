import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/tunnel-bike-restriction" },
  title: "バイク・二輪車通行禁止トンネルまとめ【全国・山手トンネル・川崎・関門】",
  description:
    "山手トンネル・川崎トンネル・大阪港トンネル・関門トンネルなど、普通二輪（126cc以上）でも通行禁止のトンネルを全国まとめ。車種別の通行可否早見表と迂回ルートを解説します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "バイク・二輪車通行禁止トンネルまとめ【全国・山手トンネル・川崎・関門】",
  description:
    "山手トンネル・川崎トンネル・大阪港トンネル・関門トンネルなど、普通二輪でも通行禁止のトンネルを全国まとめ。",
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/tunnel-bike-restriction",
  inLanguage: "ja",
};

export default function TunnelBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "バイク・二輪車通行禁止トンネルまとめ", path: "/articles/tunnel-bike-restriction" },
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
        {["トンネル", "二輪禁止", "全国"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        バイク・二輪車通行禁止トンネルまとめ【全国・山手トンネル・川崎・関門】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月25日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            「高速道路は126cc以上のバイクなら通れる」と思っていても、
            <strong>トンネルによっては普通二輪・大型二輪でも通行禁止</strong>になっているケースがあります。
            山手トンネル（東京）、川崎トンネル（神奈川）、大阪港トンネル（大阪）などが代表例です。
            これらはナビには反映されないため、事前に把握しておくことが重要です。
          </p>
        </section>

        {/* なぜトンネルだけ禁止なのか */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">なぜトンネルだけ二輪禁止になるのか</h2>
          <p className="mb-2">
            長大トンネルで二輪車が禁止される主な理由は<strong>換気・安全上の問題</strong>です。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>排気ガスが密閉空間に充満しやすい</li>
            <li>転倒した場合の二次事故リスクが高い（逃げ場がない）</li>
            <li>火災発生時の避難が困難</li>
            <li>海底・水底トンネルは換気設備に限界がある</li>
          </ul>
          <p className="mt-3">
            排気量や免許の種類に関係なく、「二輪の自動車通行禁止」の標識が設置されたトンネルは
            すべてのバイクが通行できません。
          </p>
        </section>

        {/* 全国の主要二輪禁止トンネル */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">全国の主要な二輪通行禁止トンネル</h2>

          {/* 関東 */}
          <h3 className="text-base font-bold text-gray-800 mb-2 mt-4">関東エリア</h3>
          <div className="space-y-3">
            {[
              {
                label: "二輪禁止（全車種）",
                name: "山手トンネル（首都高速中央環状線・C2）",
                region: "東京",
                detail: "大橋JCT〜西新宿JCT〜熊野町JCT〜板橋JCT。延長18.2kmで首都高最長。換気問題から全二輪が禁止。迂回は山手通り（目黒通り）などを使用。",
              },
              {
                label: "二輪禁止（全車種）",
                name: "川崎トンネル（首都高速湾岸線・B）",
                region: "神奈川",
                detail: "川崎浮島JCT付近。多摩川を横断する水底トンネル区間で二輪全車種禁止。川崎方面から東京湾岸を通るルートで注意。",
              },
            ].map(({ label, name, region, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{label}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{region}</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>

          {/* 関西 */}
          <h3 className="text-base font-bold text-gray-800 mb-2 mt-6">関西エリア</h3>
          <div className="space-y-3">
            {[
              {
                label: "二輪禁止（全車種）",
                name: "大阪港トンネル（阪神高速湾岸線）",
                region: "大阪",
                detail: "南港〜北港を結ぶ海底トンネル。換気・安全上の理由から全二輪禁止。南港地区（ATCやインテックス大阪）へのアクセスでは代替の橋を使う必要あり。",
              },
              {
                label: "二輪禁止（全車種）",
                name: "夢咲トンネル（阪神高速湾岸線）",
                region: "大阪",
                detail: "此花区のUSJ周辺区間。湾岸線の海底トンネル。ユニバーサルシティへのアクセスルートで注意が必要。",
              },
            ].map(({ label, name, region, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{label}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{region}</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>

          {/* 九州・その他 */}
          <h3 className="text-base font-bold text-gray-800 mb-2 mt-6">九州・その他</h3>
          <div className="space-y-3">
            {[
              {
                label: "二輪禁止（全車種）",
                name: "関門トンネル（国道2号）",
                region: "山口・福岡",
                detail: "本州と九州を結ぶ国道2号の海底トンネル。全二輪禁止のため、バイクは関門橋（高速道路）を利用するか、フェリーを使う必要がある。なお50cc原付はフェリーのみ利用可（関門橋も禁止）。",
              },
              {
                label: "二輪禁止（全車種）",
                name: "若戸トンネル（福岡県道）",
                region: "福岡",
                detail: "洞海湾を横断する若戸トンネル（海底トンネル）。有料道路で全二輪禁止。若戸大橋は二輪も通行可能なのでそちらを利用する。",
              },
            ].map(({ label, name, region, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{label}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{region}</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 通行可否まとめ */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">二輪禁止トンネル 車種別通行可否</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">トンネル名</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付一種<br/>（50cc以下）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付二種<br/>（125cc以下）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">普通二輪・大型<br/>（126cc以上）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "山手トンネル（C2）", g1: "禁止", g2: "禁止", g3: "禁止" },
                  { name: "川崎トンネル（湾岸線）", g1: "禁止", g2: "禁止", g3: "禁止" },
                  { name: "大阪港トンネル", g1: "禁止", g2: "禁止", g3: "禁止" },
                  { name: "夢咲トンネル", g1: "禁止", g2: "禁止", g3: "禁止" },
                  { name: "関門トンネル（国道）", g1: "禁止", g2: "禁止", g3: "禁止" },
                  { name: "若戸トンネル", g1: "禁止", g2: "禁止", g3: "禁止" },
                ].map(({ name, g1, g2, g3 }, i) => (
                  <tr key={name} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                    <td className="border border-gray-200 px-3 py-2 font-medium">{name}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">{g1}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">{g2}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">{g3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            ※ 各トンネルの規制状況は変更される場合があります。走行前に現地標識をご確認ください。
          </p>
        </section>

        {/* 標識の見方 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">トンネル入口の標識の見方</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">「自動二輪車通行禁止」標識</p>
              <p className="text-xs text-gray-600">
                バイクのシルエットに赤い斜線。排気量に関係なくすべての自動二輪車（原付を含む）が禁止。
                補助標識で「原付を除く」と書いてある場合は原付一種・二種は通行可能（まれなケース）。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">「自動車専用」標識との違い</p>
              <p className="text-xs text-gray-600">
                「自動車専用」標識は原付を禁止するが普通二輪・大型二輪は通行可能。
                「二輪の自動車通行禁止」標識はすべての二輪を禁止する。この2つは別物。
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">ルート上にトンネル禁止区間がないか確認</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute は山手トンネル・川崎トンネルなどの二輪禁止トンネルを含む通行禁止区間のデータを収録しています。
            ルートチェックで出発前に確認してください。
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
              <Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">
                → 首都高速道路 バイク通行禁止区間まとめ（山手トンネル含む）
              </Link>
            </li>
            <li>
              <Link href="/articles/osaka-bike-restriction" className="text-orange-600 underline text-sm">
                → 大阪のバイク通行禁止区間まとめ（大阪港トンネル含む）
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline text-sm">
                → 二輪通行禁止の標識の見分け方
              </Link>
            </li>
            <li>
              <Link href="/segments" className="text-orange-600 underline text-sm">
                → 通行禁止区間マップで地図から確認する
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
