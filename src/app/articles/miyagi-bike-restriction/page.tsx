import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "宮城県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "宮城県のバイク・原付通行禁止区間を車種別に解説。東北自動車道・三陸自動車道・仙台東部道路・仙台南部道路は原付一種・二種が全線通行禁止。仙台・松島へのツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "宮城県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "宮城県のバイク・原付通行禁止区間を車種別に解説。東北自動車道・三陸自動車道・仙台東部道路・仙台南部道路は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/miyagi-bike-restriction",
  inLanguage: "ja",
};

export default function MiyagiBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "宮城県のバイク通行禁止区間まとめ", path: "/articles/miyagi-bike-restriction" },
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
        {["東北自動車道", "三陸自動車道", "仙台東部道路", "通行禁止", "東北"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        宮城県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            宮城県は東北の中心都市・仙台を擁し、松島・蔵王・鳴子温泉など人気ツーリングスポットが集まります。
            県内には<strong>東北自動車道・三陸自動車道・仙台東部道路・仙台南部道路</strong>の4路線が走っており、
            いずれも原付一種（50cc以下）・原付二種（51〜125cc）は通行禁止です。
            仙台市周辺では複数の自動車専用道路が張り巡らされているため、特に注意が必要です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">宮城県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">東北道・三陸道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">仙台東部・南部道路</th>
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
                name: "東北自動車道（白石IC〜大和IC）",
                detail: "宮城県内を南北に縦断する高速自動車国道。福島県境の白石ICから仙台方面・大和ICまでの区間。村田JCT・仙台南ICなど主要ICを経由。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "三陸自動車道",
                detail: "仙台市から宮城県の三陸海岸を北上する自動車専用道路。松島・石巻方面へのアクセスに利用されるが、自動車専用道路のため原付一種・二種は通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "仙台東部道路",
                detail: "仙台市東部の仙台若林JCTから仙台港北ICを結ぶ自動車専用有料道路。石巻・東松島方面への主要アクセス路だが、原付一種・二種は通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "仙台南部道路",
                detail: "仙台市南部を東西に結ぶ自動車専用有料道路。仙台若林JCTから長町JCT付近を経由し東北道・山形道と接続。仙台南部の移動に使われるが、原付一種・二種は通行禁止。",
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
            仙台市内では複数の自動車専用道路が交差しており、一般道との接続点で誤進入しやすい箇所があります。
            特に仙台東部道路・南部道路の出入口付近では標識を注意して確認してください。
            一般道では国道45号・国道4号などが主要幹線となります。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 仙台市内の一部バイパス区間（自動車専用指定）では
            125cc以下の通行が禁止されています。自動車専用標識を必ず確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">高速道路が使えない原付の場合、以下の一般道が主要な代替ルートになります。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道4号</strong>（白石〜仙台〜大和方面、東北道の代替）</li>
            <li><strong>国道45号</strong>（仙台〜松島〜石巻方面、三陸道の代替）</li>
            <li><strong>国道286号・県道14号</strong>（仙台市内の南北移動）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全ルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">宮城のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、東北道・仙台東部道路などの
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
              <Link href="/prefectures/miyagi" className="text-orange-600 underline text-sm">
                → 宮城県の通行禁止区間一覧マップ
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
