import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "有料道路・バイパスで原付が通れないのはなぜ？【法律の仕組みを解説】",
  description:
    "原付一種・原付二種が高速道路・自動車専用道路を通れない理由を、道路交通法・道路法の仕組みから解説。有料道路とバイパスの違い、「自動車専用」の意味まで詳しく説明します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "有料道路・バイパスで原付が通れないのはなぜ？【法律の仕組みを解説】",
  description:
    "原付一種・原付二種が高速道路・自動車専用道路を通れない理由を、道路交通法・道路法の仕組みから解説。",
  datePublished: "2026-06-04",
  dateModified: "2026-06-04",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/moped-expressway-reason",
  inLanguage: "ja",
};

export default function MopedExpresswayReasonPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "有料道路・バイパスで原付が通れない理由", path: "/articles/moped-expressway-reason" },
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
        {["法律解説", "自動車専用道路", "原付"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        有料道路・バイパスで原付が通れないのはなぜ？【法律の仕組みを解説】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月4日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            「原付は高速に乗れないのは知っているけど、なぜ？」
            「バイパスも同じルール？有料道路はどうなの？」
            こうした疑問を持つライダーは多いです。
            ルールを暗記するだけでなく<strong>理由を理解する</strong>と、
            初めて走る道でも標識を見て正しく判断できるようになります。
          </p>
        </section>

        {/* 2種類の道路法律 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付を規制する2つの法律</h2>
          <p className="mb-3">
            原付の通行制限は、<strong>道路交通法</strong>と<strong>道路法</strong>という
            2つの異なる法律によって定められています。
            この2つを混同すると「どの道が通れないか」が正確に判断できません。
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="font-bold text-blue-900 text-sm mb-1">① 道路交通法（第75条の4）— 高速自動車国道</p>
              <p className="text-xs text-blue-800">
                高速自動車国道（東名・中央道・東北道など）において、
                総排気量125cc以下の自動二輪車および原動機付自転車は通行禁止と規定。
                法定最高速度30km/h の原付一種が100km/h 超の高速道路を走ることは
                <strong>速度・安全性の両面で不可能</strong>なため、法律で明確に禁止されています。
              </p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <p className="font-bold text-purple-900 text-sm mb-1">② 道路法（第48条の7）— 自動車専用道路</p>
              <p className="text-xs text-purple-800">
                国土交通大臣または都道府県知事が「自動車専用道路」として指定した道路は、
                自動車（普通・大型・自動二輪など）のみ通行可能。
                原動機付自転車（原付一種・二種）は「自動車」に含まれないため通行禁止。
                首都高・阪神高速・一部バイパスがこれに当たります。
              </p>
            </div>
          </div>
        </section>

        {/* なぜ原付は除外されたのか */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">なぜ原付は「自動車」に含まれないのか</h2>
          <p className="mb-3">
            日本の法律では、乗り物の区分が以下のように定義されています。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">区分</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">法律上の定義</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">代表例</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["自動車", "道路交通法上の自動車（普通・大型・自動二輪など）", "乗用車・トラック・126cc以上のバイク"],
                  ["自動二輪車", "自動車の一種。排気量126cc以上の二輪車", "中型・大型バイク"],
                  ["原動機付自転車", "自動車とは別区分。排気量125cc以下の二輪車", "原付一種・原付二種"],
                ].map(([cat, def, ex]) => (
                  <tr key={cat}>
                    <td className="border border-gray-200 px-3 py-2 font-medium">{cat}</td>
                    <td className="border border-gray-200 px-3 py-2 text-gray-600">{def}</td>
                    <td className="border border-gray-200 px-3 py-2 text-gray-600">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            「原動機付自転車」は法律上<strong>自転車に近い乗り物</strong>として設計された区分です。
            自動車専用道路は「自動車のみ通行可」の道路なので、自動車に含まれない原付は
            排気量に関係なく通行できません。
          </p>
        </section>

        {/* 有料道路との関係 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">「有料道路」＝「通れない」ではない</h2>
          <p className="mb-3">
            よくある誤解が「有料道路は原付が通れない」というものです。
            しかし<strong>有料道路と自動車専用道路は別の概念</strong>です。
          </p>

          <div className="rounded-lg border border-gray-200 bg-white p-4 mb-3">
            <p className="font-bold text-gray-800 text-sm mb-2">料金を取る ≠ 自動車専用</p>
            <p className="text-xs text-gray-600">
              有料道路は「料金を徴収する道路」の総称であり、
              自動車専用の指定があるかどうかは別問題です。
              有料であっても自動車専用指定がなければ原付も通行できます（実際には少数）。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">道路の種類</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">有料</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">自動車専用</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">原付通行</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["高速自動車国道（東名など）", "○", "○", "✕"],
                  ["都市高速（首都高・阪神高速）", "○", "○", "✕"],
                  ["自動車専用バイパス（有料）", "○", "○", "✕"],
                  ["自動車専用バイパス（無料）", "—", "○", "✕"],
                  ["一般有料道路（自動車専用なし）", "○", "✕", "○"],
                  ["無料バイパス（自動車専用なし）", "—", "✕", "○"],
                ].map(([road, fee, auto, moped]) => (
                  <tr key={road}>
                    <td className="border border-gray-200 px-3 py-2">{road}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">{fee}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">{auto}</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-bold ${moped === "✕" ? "text-red-600 bg-red-50" : "text-green-600"}`}>{moped}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* バイパスの判断方法 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">バイパスを通れるか判断する方法</h2>
          <p className="mb-3">
            バイパスは道路の改良・迂回のために整備された新道の総称で、
            法律上は<strong>「自動車専用」の指定の有無</strong>だけが判断基準です。
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
              <span className="text-red-600 font-black text-lg shrink-0">✕</span>
              <div>
                <p className="font-bold text-red-800 text-sm">入口に「自動車専用」の青看板がある</p>
                <p className="text-xs text-red-700">原付一種・原付二種は通行禁止。普通二輪以上は通行可。</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
              <span className="text-green-600 font-black text-lg shrink-0">○</span>
              <div>
                <p className="font-bold text-green-800 text-sm">入口に「自動車専用」の看板がない</p>
                <p className="text-xs text-green-700">原付二種も通行可能。原付一種は速度・二段階右折のルールに従う。</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            ※ バイパスの整備状況や自動車専用の指定は路線ごとに異なります。
            ナビに頼らず現地の看板で確認するか、BikeRoute で事前チェックすることを推奨します。
          </p>
        </section>

        {/* まとめ */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">まとめ：判断の軸は「自動車専用か否か」</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>原付が通れない理由は<strong>法律上「自動車」に含まれない</strong>から</li>
            <li>高速道路は道路交通法、自動車専用道路は道路法で別々に規制されている</li>
            <li>有料道路すべてが通れないわけではなく、<strong>「自動車専用」の指定がある道路だけ</strong>が禁止</li>
            <li>バイパスは入口の「自動車専用」看板の有無で判断する</li>
            <li>判断に迷う場合は BikeRoute で出発前にルートチェックする</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">ルート上の自動車専用区間を自動で検出</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、
            ルート上に自動車専用区間・二輪禁止区間が含まれていないかを自動チェックします。
            知識と組み合わせることで、より安全なルート計画が立てられます。
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
              <Link href="/articles/125cc-road-guide" className="text-orange-600 underline text-sm">
                原付二種（125cc以下）で通れる道・通れない道ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline text-sm">
                二輪通行禁止の標識の見分け方
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
