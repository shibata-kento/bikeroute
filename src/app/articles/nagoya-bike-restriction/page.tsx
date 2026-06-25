import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "名古屋・愛知のバイク通行禁止区間まとめ【名古屋高速・原付別】",
  description:
    "名古屋・愛知県のバイク・原付通行禁止区間を車種別に解説。名古屋高速道路は原付一種・二種が全線通行禁止。伊勢湾岸道・名二環など自動車専用道路の通行可否早見表と代替ルートをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "名古屋・愛知のバイク通行禁止区間まとめ【名古屋高速・原付別】",
  description:
    "名古屋・愛知県のバイク・原付通行禁止区間を車種別に解説。名古屋高速道路は原付一種・二種が全線通行禁止。",
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://bikeroute.vercel.app" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://bikeroute.vercel.app" },
  url: "https://bikeroute.vercel.app/articles/nagoya-bike-restriction",
  inLanguage: "ja",
};

export default function NagoyaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "名古屋・愛知のバイク通行禁止区間まとめ", path: "/articles/nagoya-bike-restriction" },
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
        {["名古屋高速", "通行禁止", "中部"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        名古屋・愛知のバイク通行禁止区間まとめ【名古屋高速・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月25日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            名古屋・愛知エリアを走るバイク乗りが最も注意すべきは<strong>名古屋高速道路</strong>の通行制限です。
            名古屋高速は全線が「自動車専用道路」に指定されているため、原付一種・原付二種は一切通行できません。
            また、伊勢湾岸自動車道・名二環（名古屋第二環状自動車道）など、名古屋周辺には自動車専用道路が複数整備されており、
            知らずに進入してしまうリスクがあります。本記事で出発前に確認しておきましょう。
          </p>
        </section>

        {/* 基本ルール */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">愛知県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">名古屋高速</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">東名・名神</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">伊勢湾岸道</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種</td>
                  <td className="border border-gray-200 px-3 py-2">50cc以下</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種</td>
                  <td className="border border-gray-200 px-3 py-2">51〜125cc</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪</td>
                  <td className="border border-gray-200 px-3 py-2">126cc以上</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 名古屋高速 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">名古屋高速道路の通行禁止区間</h2>
          <p className="mb-3">
            名古屋高速道路は名古屋市内を中心に放射・環状路線が整備された都市高速です。
            全線が<strong>自動車専用道路</strong>のため、原付一種・原付二種はすべての入口から通行禁止です。
          </p>

          <div className="space-y-3">
            {[
              {
                label: "全線禁止（原付一種・二種）",
                name: "1号楠線",
                detail: "楠JCT〜名古屋インターを結ぶ路線。東名名古屋ICへのアクセス道路として利用される。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "2号東山線",
                detail: "名古屋市東部（千種・覚王山方面）を横断する路線。名東区・天白区方面への主要ルート。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "3号大高線",
                detail: "名古屋市中心部〜大高IC（南方面）を結ぶ路線。知多半島道路と接続。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "都心環状線（C1）",
                detail: "名古屋都心部を一周する環状線。栄・名古屋駅周辺へのアクセスに使われるが原付は進入不可。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "名古屋環状2号線（C2・名二環）",
                detail: "名古屋外周部を環状に結ぶ路線。東名・名神・伊勢湾岸道と接続し、バイパス的に利用されるが全線自動車専用。",
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

        {/* 伊勢湾岸・東名・名神 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">その他の自動車専用道路（愛知県内）</h2>

          <div className="space-y-3">
            {[
              {
                label: "全線禁止（原付一種・二種）",
                name: "伊勢湾岸自動車道",
                detail: "豊田JCT〜四日市JCTを結ぶ路線で名古屋南部を横断。工場地帯（豊田・豊明）や伊勢湾へのアクセスに利用されるが全線自動車専用。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "東名高速道路（愛知県内）",
                detail: "名古屋IC〜豊川IC区間が愛知県を通過。東名の愛知県内は原付通行禁止。名古屋ICは名古屋高速とも直結。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "名神高速道路（小牧IC周辺）",
                detail: "小牧IC付近が愛知県内。中央道・東名とも接続するため混同しないよう注意が必要。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "知多半島道路",
                detail: "名古屋南IC〜半田中央ICを結ぶ有料道路。自動車専用道路のため原付は通行禁止。知多半島ツーリングでは注意。",
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

        {/* 代替ルート */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（名古屋市内・愛知県内）</h2>
          <p className="mb-2">名古屋高速・伊勢湾岸道が使えない場合、以下の一般道が主要な代替ルートになります。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道1号</strong>（東西方向の幹線、名古屋市内を横断）</li>
            <li><strong>国道19号</strong>（名古屋〜長野方面）</li>
            <li><strong>国道22号</strong>（名古屋〜岐阜方面、名古屋外環も並行）</li>
            <li><strong>国道23号</strong>（名古屋〜豊橋・三重方面。自動車専用でない区間は通行可）</li>
            <li><strong>名古屋市道・愛知県道</strong>（市内移動）</li>
          </ul>
          <div className="mt-3 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 国道23号の一部区間は「名豊道路」として自動車専用道路区間があります。
            標識を必ず確認してください。
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">名古屋・愛知のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、名古屋高速・伊勢湾岸道などの自動車専用区間が
            ルートに含まれていないかを自動で警告します。
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
              <Link href="/prefectures/aichi" className="text-orange-600 underline text-sm">
                → 愛知県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/osaka-bike-restriction" className="text-orange-600 underline text-sm">
                → 大阪のバイク通行禁止区間まとめ（阪神高速版）
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
