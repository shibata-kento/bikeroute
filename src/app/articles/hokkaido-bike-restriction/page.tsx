import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "北海道のバイク通行禁止区間まとめ【道央道・原付・ツーリング注意点】",
  description:
    "北海道ツーリングでのバイク通行禁止区間を車種別に解説。道央自動車道・道東道など高速道路は原付一種・二種が通行禁止。国道・道道の代替ルートと通行可否早見表をまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "北海道のバイク通行禁止区間まとめ【道央道・原付・ツーリング注意点】",
  description:
    "北海道ツーリングでのバイク通行禁止区間を車種別に解説。道央自動車道など高速道路は原付一種・二種が通行禁止。",
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/hokkaido-bike-restriction",
  inLanguage: "ja",
};

export default function HokkaidoBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "北海道のバイク通行禁止区間まとめ", path: "/articles/hokkaido-bike-restriction" },
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
        {["道央自動車道", "通行禁止", "北海道"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        北海道のバイク通行禁止区間まとめ【道央道・原付・ツーリング注意点】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月25日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            北海道はバイクツーリングの聖地として知られていますが、
            原付一種・原付二種で走行する場合は<strong>高速道路・自動車専用道路</strong>の通行制限に注意が必要です。
            本州と異なり、北海道では高速道路がなくても無料の自動車専用道路（自専道）が多く整備されており、
            これらも原付は通行禁止です。
            また、広大な土地柄、高速道路を使えない場合の迂回距離が大幅に長くなることも覚えておきましょう。
          </p>
        </section>

        {/* 基本ルール */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">北海道内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">道央道・道東道等</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">無料自専道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">一般国道・道道</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種</td>
                  <td className="border border-gray-200 px-3 py-2">50cc以下</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種</td>
                  <td className="border border-gray-200 px-3 py-2">51〜125cc</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪</td>
                  <td className="border border-gray-200 px-3 py-2">126cc以上</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 主要高速道路 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">北海道の主要高速道路・自専道（原付禁止）</h2>
          <p className="mb-3">
            以下の路線はすべて自動車専用道路のため、原付一種・原付二種は通行禁止です。
          </p>

          <div className="space-y-3">
            {[
              {
                label: "全線禁止（原付一種・二種）",
                name: "道央自動車道",
                detail: "函館〜旭川を縦貫する北海道の主幹高速。小樽IC・札幌IC・千歳IC・苫小牧IC等が有名。全線自動車専用。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "道東自動車道",
                detail: "千歳〜釧路を結ぶ高速道路。トマム・帯広方面へのアクセス路線。全線自動車専用。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "旭川紋別自動車道",
                detail: "旭川〜紋別を結ぶ無料の自動車専用道路。無料ながら全線自動車専用のため原付は通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "深川留萌自動車道",
                detail: "深川JCT〜留萌ICを結ぶ無料自専道。日本海方面（留萌・増毛）へのルートで注意が必要。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "札樽自動車道",
                detail: "札幌〜小樽を結ぶ高速道路。小樽ツーリングの往路・復路で使いたくなるが原付は禁止。",
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

        {/* 無料自専道の注意 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">「無料」でも自動車専用道路は通行禁止</h2>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800 mb-3">
            <strong>重要：</strong> 北海道には無料で走れる自動車専用道路が多数あります。
            「料金がかからない＝原付も通れる」ではありません。
            <strong>「自動車専用」の標識があれば原付は通行禁止</strong>です。
          </div>
          <p>
            旭川紋別自動車道・深川留萌自動車道・函館新道・江差自動車道など、
            無料の自動車専用道路が各地に整備されています。
            入口の青い「自動車専用」標識（または「二輪の自動車以外の自動車の通行禁止」標識）を
            必ず確認してください。
          </p>
        </section>

        {/* 代替ルート */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の主要代替ルート（北海道）</h2>
          <p className="mb-2">
            北海道は広大なため、高速道路を使えないと距離・時間が大幅に増えます。
            主要な代替ルートを把握しておきましょう。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道5号</strong>（函館〜小樽〜札幌）</li>
            <li><strong>国道36号</strong>（札幌〜苫小牧〜室蘭方面）</li>
            <li><strong>国道38号</strong>（帯広〜釧路）</li>
            <li><strong>国道12号</strong>（札幌〜旭川。日本一長い直線道路区間あり）</li>
            <li><strong>国道40号</strong>（旭川〜稚内）</li>
            <li><strong>道道各線</strong>（市街地移動）</li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            ※ 夏は観光シーズンで一般道も混雑します。早朝出発や時間帯を選んだ走行が快適です。
          </p>
        </section>

        {/* ツーリング注意点 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">北海道ツーリングの注意点</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">ガソリンスタンドの間隔が長い</p>
              <p className="text-xs text-gray-600">
                山間部・道東・道北では給油できる場所が50〜100km以上離れることがあります。
                出発前に必ず満タンにし、給油計画を立てましょう。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">気象変化に注意</p>
              <p className="text-xs text-gray-600">
                北海道は天候が急変することがあります。山越えルートでは霧・突然の降雨が頻繁です。
                防水装備と防寒具を用意しましょう。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">ヒグマ・野生動物に注意</p>
              <p className="text-xs text-gray-600">
                山間部の道道では早朝・夕方にヒグマや鹿が出没することがあります。
                スピードを控えめにして安全走行を心がけてください。
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">北海道のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、道央道や無料自専道などの自動車専用区間が
            ルートに含まれていないかを自動で警告します。ツーリング前の確認にどうぞ。
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
              <Link href="/prefectures/hokkaido" className="text-orange-600 underline text-sm">
                → 北海道の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/moped-expressway-reason" className="text-orange-600 underline text-sm">
                → 有料道路・バイパスで原付が通れない理由
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
