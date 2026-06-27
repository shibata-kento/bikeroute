import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "原付一種・原付二種・普通二輪の通行ルール完全ガイド【車種別】",
  description:
    "50cc・125cc・それ以上のバイクで「通れない道」が違う理由を、法律の仕組みからわかりやすく解説します。自動車専用道路・高速道路・バイパスごとに、原付一種・原付二種・普通二輪の通行可否を整理。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "原付一種・原付二種・普通二輪の通行ルール完全ガイド【車種別】",
  description: "50cc・125cc・それ以上のバイクで「通れない道」が違う理由を、法律の仕組みからわかりやすく解説します。自動車専用道路・高速道路・バイパスごとに、原付一種・原付二種・普通二輪の通行可否を整理。",
  datePublished: "2026-06-03",
  dateModified: "2026-06-03",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/bike-traffic-rules",
  inLanguage: "ja",
};

export default function BikeTrafficRulesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "原付一種・原付二種・普通二輪の通行ルール完全ガイド", path: "/articles/bike-traffic-rules" },
      ]} />
      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">
          ← 解説記事一覧
        </Link>
      </div>

      <div className="mb-2 flex flex-wrap gap-1">
        {["通行ルール", "車種別", "自動車専用道路"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        原付一種・原付二種・普通二輪の通行ルール完全ガイド【車種別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月3日</p>

      <div className="prose-custom space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            バイクに乗っていると「この道、入っていいの？」と迷うことがあります。
            特に自動車専用道路やバイパスでは、車種によって通行できるかどうかが異なります。
            本記事では<strong>原付一種・原付二種・普通二輪以上</strong>の3区分ごとに、
            通行ルールをわかりやすく整理します。
          </p>
        </section>

        {/* 車種区分 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">バイクの車種区分とは</h2>
          <p className="mb-3">
            日本の道路交通法では、バイクを排気量によって以下のように区分しています。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">区分</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">法定速度</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">二段階右折</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種</td>
                  <td className="border border-gray-200 px-3 py-2">50cc以下 / 新基準原付</td>
                  <td className="border border-gray-200 px-3 py-2">30km/h</td>
                  <td className="border border-gray-200 px-3 py-2">必要</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種</td>
                  <td className="border border-gray-200 px-3 py-2">51〜125cc</td>
                  <td className="border border-gray-200 px-3 py-2">60km/h</td>
                  <td className="border border-gray-200 px-3 py-2">不要</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪</td>
                  <td className="border border-gray-200 px-3 py-2">126〜400cc</td>
                  <td className="border border-gray-200 px-3 py-2">60km/h</td>
                  <td className="border border-gray-200 px-3 py-2">不要</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">大型二輪</td>
                  <td className="border border-gray-200 px-3 py-2">401cc以上</td>
                  <td className="border border-gray-200 px-3 py-2">60km/h</td>
                  <td className="border border-gray-200 px-3 py-2">不要</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            ※ 2025年11月以降、排気量125cc以下の一部モデルが「新基準原付」として原付一種扱いになりました（詳しくは
            <Link href="/articles/new-moped-2025" className="text-orange-600 underline">別記事</Link>参照）。
          </p>
        </section>

        {/* 通行禁止の道路 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">道路の種類と通行可否</h2>
          <p className="mb-3">
            バイクの通行制限は、道路の種類によって決まります。大きく分けると
            <strong>高速自動車国道</strong>・<strong>自動車専用道路</strong>・<strong>一般道路</strong>の3種類があります。
          </p>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">① 高速自動車国道（高速道路）</h3>
          <p className="mb-2">
            東名高速・名神高速・東北道などの高速道路です。
            <strong>原付一種・原付二種はどちらも通行できません</strong>（道路交通法第75条の4）。
            普通二輪以上（126cc〜）は通行できます。
          </p>
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-700">
            原付一種 ✕ / 原付二種 ✕ / 普通二輪以上 ○
          </div>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">② 自動車専用道路（バイパス・都市高速など）</h3>
          <p className="mb-2">
            「自動車専用」の標識が立っている道路です。国道バイパスや都市高速（首都高・阪神高速など）が該当します。
            <strong>原付一種・原付二種はともに通行不可</strong>です（道路法第48条の7）。
          </p>
          <p className="mb-2">
            ただし「自動車専用」の指定がないバイパス（国道改良区間など）は、
            標識がなければ原付二種も通行できます。
          </p>
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-700">
            原付一種 ✕ / 原付二種 ✕ / 普通二輪以上 ○
          </div>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">③ 二輪通行禁止区間</h3>
          <p className="mb-2">
            トンネルや山岳道路の一部に「二輪の自動車以外の自動車通行止め」や「自動二輪車通行止め」の標識がある区間があります。
            これは排気量に関係なく、<strong>すべてのバイクが通行不可</strong>になります。
          </p>
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-700">
            原付一種 ✕ / 原付二種 ✕ / 普通二輪以上 ✕
          </div>
        </section>

        {/* まとめ表 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">通行可否まとめ</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">道路種別</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付一種<br/>（〜50cc）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付二種<br/>（51〜125cc）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">普通二輪以上<br/>（126cc〜）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">高速自動車国道（高速道路）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">自動車専用道路（バイパス等）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">自動車専用指定のないバイパス</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕ *</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">二輪通行禁止区間</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">一般道路（標識なし）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            * 最高速度30km/h・二段階右折の制限はあるが通行自体は可能な場合もある。ただし道路によって異なる。
          </p>
        </section>

        {/* 見分け方 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">現場での見分け方</h2>
          <p className="mb-3">
            現地では以下の標識を確認してください。
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>「自動車専用」の青い看板</strong>
              ：道路の入口に設置。原付一種・原付二種は通行不可。
            </li>
            <li>
              <strong>「自動二輪車通行止め」の赤い標識</strong>
              ：二輪車全車が通行不可。
            </li>
            <li>
              <strong>「原動機付自転車通行禁止」の標識</strong>
              ：原付一種・原付二種が通行不可（普通二輪以上は可）。
            </li>
          </ul>
          <p className="mt-3">
            標識が見当たらなくても、道路の形状や速度から「自動車専用か？」と迷う場合は
            ルート計画の段階で事前確認することをお勧めします。
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">ルートに通行禁止区間が含まれていないか確認する</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では出発地・目的地と車種を入力するだけで、
            通行禁止区間が含まれていないかを自動でチェックできます。
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/articles/new-moped-2025" className="text-orange-600 underline text-sm">
                新基準原付（2025年11月〜）の走行ルール解説
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-orange-600 underline text-sm">
                よくある質問（FAQ）
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
