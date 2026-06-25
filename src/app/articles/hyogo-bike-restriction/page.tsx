import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "兵庫のバイク通行禁止区間まとめ【阪神高速神戸線・第二神明・原付別】",
  description:
    "兵庫県のバイク・原付通行禁止区間を車種別に解説。阪神高速3号神戸線・第二神明道路は原付一種・二種が全線禁止。神戸淡路鳴門道の通行可否と代替ルートをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "兵庫のバイク通行禁止区間まとめ【阪神高速神戸線・第二神明・原付別】",
  description: "兵庫県のバイク・原付通行禁止区間を車種別に解説。",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://bikeroute.vercel.app" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://bikeroute.vercel.app" },
  url: "https://bikeroute.vercel.app/articles/hyogo-bike-restriction",
  inLanguage: "ja",
};

export default function HyogoBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "兵庫のバイク通行禁止区間まとめ", path: "/articles/hyogo-bike-restriction" },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">← 解説記事一覧</Link>
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {["阪神高速神戸線", "第二神明", "近畿"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">{tag}</span>
        ))}
      </div>
      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        兵庫のバイク通行禁止区間まとめ【阪神高速神戸線・第二神明・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            兵庫県（神戸・阪神エリア）では<strong>阪神高速道路の神戸側路線</strong>と<strong>第二神明道路</strong>に注意が必要です。
            大阪から神戸方面へバイクで移動する場合、阪神高速3号神戸線は原付一種・二種が全線禁止です。
            また明石海峡大橋を含む神戸淡路鳴門自動車道は普通二輪・大型二輪は通行できますが、原付は禁止です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">兵庫県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">阪神高速<br/>神戸線（3号）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">第二神明道路</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">神戸淡路<br/>鳴門道</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種（50cc以下）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種（51〜125cc）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪（126cc〜）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">阪神高速道路（兵庫県側路線）</h2>
          <p className="mb-3">阪神高速は大阪側だけでなく、神戸・姫路方面にも路線が延びています。兵庫県内の主要路線は以下のとおりです。</p>
          <div className="space-y-3">
            {[
              { name: "3号神戸線", detail: "梅田（大阪）〜神戸（西宮・魚崎・京橋）を結ぶ主要路線。大阪〜神戸間の最短ルートだが原付は全線禁止。" },
              { name: "5号湾岸線（兵庫側）", detail: "大阪湾岸から神戸港・第二神明方面へ延びる路線。六甲アイランド・ポートアイランド周辺を通過。" },
              { name: "31号神戸山手線", detail: "神戸市内の山手方面を通る路線。三宮・北区方面のアクセスに利用されるが原付禁止。" },
              { name: "32号新神戸トンネル", detail: "三宮〜北区（鈴蘭台）を結ぶトンネル路線。六甲山を越えるルートで注意が必要。" },
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
          <h2 className="text-lg font-bold text-gray-900 mb-3">第二神明道路・神戸淡路鳴門自動車道</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">全線禁止（原付一種・二種）</span>
                <span className="font-bold text-gray-900 text-sm">第二神明道路</span>
              </div>
              <p className="text-xs text-gray-600">
                神戸西IC〜加古川バイパス接続部を結ぶ有料道路。全線自動車専用。
                明石・加古川・姫路方面へのアクセスでよく使われるが原付は通行禁止。
                並行する国道2号・国道250号が代替ルート。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">全線禁止（原付一種・二種）</span>
                <span className="font-bold text-gray-900 text-sm">神戸淡路鳴門自動車道（明石海峡大橋含む）</span>
              </div>
              <p className="text-xs text-gray-600">
                神戸〜淡路島〜徳島を結ぶ本州四国連絡道路。明石海峡大橋は全長3,911mの世界最大級の吊り橋。
                普通二輪・大型二輪は通行可（有料）。原付一種・二種は通行禁止。
                淡路島・徳島への原付での移動はフェリーを検討してください。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（兵庫県内）</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道2号</strong>（大阪〜神戸〜姫路の主要幹線）</li>
            <li><strong>国道43号</strong>（大阪〜神戸間の幹線道路）</li>
            <li><strong>国道250号</strong>（明石〜姫路・加古川方面）</li>
            <li><strong>国道28号</strong>（神戸〜明石・淡路方面）</li>
          </ul>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">兵庫・神戸のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、阪神高速神戸線・第二神明道路などの自動車専用区間を自動で警告します。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li><Link href="/prefectures/hyogo" className="text-orange-600 underline text-sm">→ 兵庫県の通行禁止区間一覧マップ</Link></li>
            <li><Link href="/articles/osaka-bike-restriction" className="text-orange-600 underline text-sm">→ 大阪のバイク通行禁止区間まとめ（阪神高速・大阪側）</Link></li>
            <li><Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">→ 原付一種・原付二種・普通二輪の通行ルール完全ガイド</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
