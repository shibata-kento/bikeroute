import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "新基準原付（2025年11月〜）の走行ルール解説 — 125ccでも原付一種扱い？",
  description:
    "2025年11月から導入された新基準原付（排気量125cc以下・出力4kW以下）の通行ルールを解説。高速道路・自動車専用道路・バイパスへの通行可否、従来の原付一種・二種との違いも比較します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "新基準原付（2025年11月〜）の走行ルール解説 — 125ccでも原付一種扱い？",
  description: "2025年11月から導入された新基準原付（排気量125cc以下・出力4kW以下）の通行ルールを解説。高速道路・自動車専用道路・バイパスへの通行可否、従来の原付一種・二種との違いも比較します。",
  datePublished: "2026-06-03",
  dateModified: "2026-06-03",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/new-moped-2025",
  inLanguage: "ja",
};

export default function NewMoped2025Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "新基準原付（2025年11月〜）の走行ルール解説", path: "/articles/new-moped-2025" },
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
        {["新基準原付", "125cc", "2025年改正"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        新基準原付（2025年11月〜）の走行ルール解説<br />
        — 125ccでも原付一種扱い？
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月3日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            2025年11月から、排気量125cc以下の一部バイクが「新基準原付」として
            <strong>原付一種（第一種原動機付自転車）</strong>に区分されるようになりました。
            これにより「125ccなのに原付扱い？」と混乱するライダーが増えています。
            本記事では新基準原付の通行ルールを整理します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">新基準原付とは何か</h2>
          <p className="mb-3">
            2025年10月の道路交通法改正により、以下の条件を満たすバイクが
            「原付一種」として扱われるようになりました。
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
            <p className="font-bold text-gray-800">新基準原付の条件（すべて満たすこと）</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>排気量 <strong>125cc以下</strong></li>
              <li>最高出力 <strong>4kW（約5.4馬力）以下</strong></li>
              <li>製造業者が「新基準原付」として届け出た車両</li>
            </ul>
          </div>
          <p className="mt-3">
            これは主に電動バイク（モペット）の普及に対応した改正で、
            125cc・電動バイクの一部が原付一種として運転できるようになりました。
            普通自動車免許（AT限定含む）で乗れるのが大きな特徴です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">新基準原付の通行ルール</h2>
          <p className="mb-3">
            新基準原付は「原付一種」扱いなので、通行ルールは従来の50cc以下の原付と<strong>まったく同じ</strong>です。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">道路種別</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">新基準原付<br/>（〜125cc / 4kW以下）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付二種<br/>（〜125cc / 4kW超）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">高速道路</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕ 通行不可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕ 通行不可</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">自動車専用道路</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕ 通行不可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕ 通行不可</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">有料道路（一般）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">✕ 通行不可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-gray-600">△ 道路による</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">一般道（標識なし）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○ 通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">○ 通行可</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">法定速度</td>
                  <td className="border border-gray-200 px-3 py-2 text-center font-medium">30km/h</td>
                  <td className="border border-gray-200 px-3 py-2 text-center font-medium">60km/h</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">二段階右折</td>
                  <td className="border border-gray-200 px-3 py-2 text-center font-medium">必要</td>
                  <td className="border border-gray-200 px-3 py-2 text-center font-medium">不要</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3">
            <p className="font-bold text-yellow-800 text-xs mb-1">⚠️ 注意</p>
            <p className="text-xs text-yellow-700">
              同じ「125cc」でも出力が4kWを超えると原付二種扱いになります。
              自分のバイクがどちらに該当するかは、車検証または製造業者の資料で確認してください。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">よくある勘違い</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-800 text-xs mb-1">Q. 125ccなら高速道路に乗れる？</p>
              <p className="text-xs text-gray-700">
                <strong>A. 新基準原付（4kW以下）は乗れません。</strong>
                高速道路を通るには排気量126cc以上（普通二輪以上）が必要です。
                新基準原付は排気量125cc以下・出力4kW以下なので、高速道路は通行不可です。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-800 text-xs mb-1">Q. 普通自動車免許で新基準原付に乗れる？</p>
              <p className="text-xs text-gray-700">
                <strong>A. 乗れます。</strong>
                新基準原付は原付一種なので、普通自動車免許（MT・AT限定どちらも）で運転できます。
                ただし速度30km/h・二段階右折などの制限はあります。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-800 text-xs mb-1">Q. BikeRouteでは「新基準原付」を選べる？</p>
              <p className="text-xs text-gray-700">
                <strong>A. 「原付一種」を選択してください。</strong>
                新基準原付は道路交通法上の原付一種なので、BikeRouteでは「原付一種（50cc以下・新基準原付）」を選ぶと正しく通行禁止区間がチェックされます。
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">新基準原付のルートを事前確認する</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では「原付一種」を選択すると、自動車専用道路・高速道路・有料道路を
            回避したルートで通行禁止区間をチェックできます。
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
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                原付一種・原付二種・普通二輪の通行ルール完全ガイド【車種別】
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
