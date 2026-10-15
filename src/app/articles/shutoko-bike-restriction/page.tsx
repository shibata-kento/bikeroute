import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ArticleSources } from "@/components/ArticleSources";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/shutoko-bike-restriction" },
  title: "首都高速道路 バイク通行禁止区間まとめ【原付・二輪別】",
  description:
    "首都高速道路でバイクが通れない区間を車種別に解説。原付一種・原付二種は全線通行禁止。普通二輪・大型二輪向けの規制をまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "首都高速道路 バイク通行禁止区間まとめ【原付・二輪別】",
  description:
    "首都高速道路でバイクが通れない区間を車種別に解説。原付一種・原付二種は全線通行禁止。普通二輪・大型二輪向けの規制をまとめました。",
  datePublished: "2026-06-04",
  dateModified: "2026-06-04",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/shutoko-bike-restriction",
  inLanguage: "ja",
};

export default function ShutokoBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "首都高速道路 バイク通行禁止区間まとめ", path: "/articles/shutoko-bike-restriction" },
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

      <div className="mb-2">
        <TagPills tags={["首都高速", "通行禁止", "関東"]} />
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        首都高速道路 バイク通行禁止区間まとめ【原付・二輪別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月4日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            関東を走るバイク乗りが必ず直面するのが「首都高速道路（首都高）に乗れるのか？」という疑問です。
            首都高は<strong>自動車専用道路</strong>であるため、車種によって通行可否が大きく異なります。
            また、普通二輪以上でも一部のトンネル区間では通行が禁止されています。
            本記事では車種ごとのルールを整理し、知らずに侵入してしまうリスクを防ぎます。
          </p>
        </section>

        {/* 基本ルール */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">首都高速道路の基本ルール</h2>
          <p className="mb-3">
            首都高速道路は全線が<strong>「自動車専用道路」</strong>に指定されています。
            道路交通法・道路法の規定により、原動機付自転車（原付一種・原付二種）は
            自動車専用道路を通行することができません。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">首都高 通行</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">根拠</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種</td>
                  <td className="border border-gray-200 px-3 py-2">50cc以下・新基準原付</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2">自動車専用道路の規定</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種</td>
                  <td className="border border-gray-200 px-3 py-2">51〜125cc</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2">自動車専用道路の規定</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪</td>
                  <td className="border border-gray-200 px-3 py-2">126cc以上</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本通行可</td>
                  <td className="border border-gray-200 px-3 py-2">ただし一部区間を除く</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 原付への影響 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付（〜125cc）は首都高の入口から乗れない</h2>
          <p className="mb-3">
            首都高の入口（料金所・ランプウェイ）には「自動車専用」の青い看板が設置されており、
            原付一種・原付二種はその時点から通行禁止です。
            知らずに侵入した場合は道路交通法違反（通行禁止違反）となります。
          </p>
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            <strong>注意：</strong> 125cc以下の新基準原付（2025年11月以降）も原付一種扱いのため、首都高は通行できません。
          </div>
          <p className="mt-3">
            代替ルートとして国道や都道を使う場合、BikeRoute のルートチェック機能で
            ルート上に自動車専用区間が含まれていないかを事前に確認することをおすすめします。
          </p>
        </section>

        {/* 普通二輪の通行可否 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">普通二輪・大型二輪が通行できる区間</h2>
          <p className="mb-3">
            126cc以上の普通二輪・大型二輪は首都高を通行できます。山手トンネルや湾岸線の川崎航路トンネルも通行可能です。
            ただし、区間によって二人乗り規制があるため、同乗者がいる場合は事前に首都高の案内をご確認ください。
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">通行可</span>
                <span className="font-bold text-gray-900 text-sm">山手トンネル（C2 中央環状線）</span>
              </div>
              <p className="text-xs text-gray-600">
                首都高の自動車専用道路のため125cc以下は通行できませんが、普通二輪・大型二輪は通行できます。
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">通行可</span>
                <span className="font-bold text-gray-900 text-sm">首都高速湾岸線・川崎航路トンネル</span>
              </div>
              <p className="text-xs text-gray-600">
                首都高の自動車専用道路のため125cc以下は通行できませんが、普通二輪・大型二輪は通行できます。
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">最新情報を確認</span>
                <span className="font-bold text-gray-900 text-sm">工事・緊急時の一時規制</span>
              </div>
              <p className="text-xs text-gray-600">
                首都高では工事や緊急時に通行止め・車線規制が実施される場合があります。
                出発前に首都高ドライバーズサイトで最新情報を確認してください。
              </p>
            </div>
          </div>
        </section>

        {/* 主要路線早見表 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">主要路線の通行可否早見表（普通二輪以上）</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">路線</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">通行</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">備考</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1号 上野線・羽田線", "○", "通行可"],
                  ["2号 目黒線", "○", "通行可"],
                  ["3号 渋谷線", "○", "通行可"],
                  ["4号 新宿線", "○", "通行可"],
                  ["5号 池袋線", "○", "通行可"],
                  ["6号 向島線・三郷線", "○", "通行可"],
                  ["7号 小松川線", "○", "通行可"],
                  ["9号 深川線", "○", "通行可"],
                  ["11号 台場線", "○", "通行可"],
                  ["C1 都心環状線", "○", "通行可"],
                  ["C2 中央環状線（山手トンネル区間）", "○", "普通二輪・大型二輪は通行可。125cc以下は首都高全線で通行不可"],
                  ["湾岸線（川崎航路トンネル）", "○", "普通二輪・大型二輪は通行可。125cc以下は首都高全線で通行不可"],
                ].map(([route, status, note]) => (
                  <tr key={route} className={status === "✕" ? "bg-red-50" : ""}>
                    <td className="border border-gray-200 px-3 py-2">{route}</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-bold ${status === "✕" ? "text-red-600" : "text-green-600"}`}>{status}</td>
                    <td className="border border-gray-200 px-3 py-2 text-gray-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            ※ 工事・緊急規制により変更される場合があります。出発前に必ず最新情報を確認してください。
          </p>
        </section>

        {/* ETC */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">首都高のETC・料金</h2>
          <p>
            普通二輪・大型二輪は首都高を利用できますが、料金体系は「二輪車」として計算されます。
            ETC 車載器（二輪車用）を取り付けることで ETC 割引が適用されます。
            料金は距離に応じた上限制（普通車と同額）が採用されています。
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>現金・ETC どちらも利用可</li>
            <li>二輪車用 ETC 車載器が必要（四輪用は使用不可）</li>
            <li>料金：普通車と同額（距離制・上限あり）</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">ルート上の通行禁止区間を自動チェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では出発地・目的地と車種を入力するだけで、
            首都高の自動車専用区間・二輪禁止トンネルが含まれていないかを自動で警告します。
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            ルートをチェックする →
          </Link>
        </div>

        {/* 関連記事 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/new-moped-2025" className="text-orange-600 underline text-sm">
                新基準原付（2025年11月〜）の走行ルール解説
              </Link>
            </li>
            <li>
              <Link href="/prefectures/tokyo" className="text-orange-600 underline text-sm">
                東京都の通行禁止区間一覧
              </Link>
            </li>
          </ul>
        </section>

        <ArticleSources />

      </div>
    </main>
  );
}
