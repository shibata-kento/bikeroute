import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "広島のバイク通行禁止区間まとめ【広島高速・山陽道・しまなみ海道・原付別】",
  description:
    "広島県のバイク・原付通行禁止区間を車種別に解説。広島高速道路は原付一種・二種が全線禁止。しまなみ海道（西瀬戸道）は普通二輪が通行可能。代替ルートと通行可否をまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "広島のバイク通行禁止区間まとめ【広島高速・山陽道・しまなみ海道・原付別】",
  description: "広島県のバイク・原付通行禁止区間を車種別に解説。",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/hiroshima-bike-restriction",
  inLanguage: "ja",
};

export default function HiroshimaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "広島のバイク通行禁止区間まとめ", path: "/articles/hiroshima-bike-restriction" },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">← 解説記事一覧</Link>
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {["広島高速", "しまなみ海道", "中国地方"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">{tag}</span>
        ))}
      </div>
      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        広島のバイク通行禁止区間まとめ【広島高速・山陽道・しまなみ海道・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            広島県でバイクに乗る際は<strong>広島高速道路</strong>と<strong>山陽自動車道</strong>の通行制限に注意が必要です。
            また、しまなみ海道（西瀬戸自動車道）は<strong>普通二輪・大型二輪が通行可能</strong>ですが、
            原付一種・二種はフェリーや渡船を利用する必要があります。
            本記事で事前に確認しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">広島県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">広島高速道路</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">山陽自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">しまなみ海道<br/>（西瀬戸道）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種（50cc以下）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種（51〜125cc）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪（126cc〜）</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">通行可（有料）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">広島高速道路（全路線禁止・原付一種・二種）</h2>
          <p className="mb-3">広島高速は広島市内を中心に整備された都市高速で、全線が自動車専用道路です。</p>
          <div className="space-y-3">
            {[
              { name: "1号線（北線）", detail: "広島JCT〜広島北IC。広島市北部（可部・安佐方面）へのアクセスルート。" },
              { name: "2号線（東線）", detail: "広島IC〜府中〜東広島方面。山陽道への接続路線。" },
              { name: "3号線（空港連絡線）", detail: "広島市内〜広島空港を結ぶ路線。空港アクセスでの注意が必要。" },
              { name: "4号線（東西線）", detail: "広島市内中心部を東西に横断。二葉山トンネルを通る区間あり。" },
              { name: "5号線（中島線）", detail: "広島市内の中心部ルート。流通センター・宇品港方面へのアクセス。" },
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
          <h2 className="text-lg font-bold text-gray-900 mb-3">しまなみ海道（西瀬戸自動車道）</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-4 mb-3">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">原付禁止</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">普通二輪・大型は通行可</span>
              <span className="font-bold text-gray-900 text-sm">しまなみ海道（西瀬戸自動車道）</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              尾道〜今治（愛媛）を結ぶ全長約60kmの本州四国連絡道路。
              <strong>普通二輪・大型二輪は自動車道区間を通行可能</strong>（有料。ETCも利用可）。
              原付一種・二種は自動車道区間を通行禁止。
              ただし各島と島の間を結ぶ橋には<strong>原付・自転車用の専用道</strong>が併設されているため、
              それを利用すれば原付でも渡島できます（有料）。
            </p>
            <div className="rounded bg-blue-50 px-3 py-2 text-xs text-blue-800">
              <strong>原付でのしまなみ海道：</strong> 各橋の側道（原付道・自転車道）を利用。橋ごとに通行料が必要。
              尾道〜今治まで通しで走ると通行料の合計は数百円程度。
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（広島県内）</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道2号</strong>（広島県内の主要幹線、尾道〜広島〜岩国）</li>
            <li><strong>国道54号</strong>（広島〜三次・松江方面）</li>
            <li><strong>国道183号</strong>（広島〜庄原・備後方面）</li>
            <li><strong>県道・市道</strong>（広島市内の移動）</li>
          </ul>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">広島・しまなみ海道のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、広島高速・山陽道などの自動車専用区間が含まれていないかを自動で警告します。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            <li><Link href="/prefectures/hiroshima" className="text-orange-600 underline text-sm">→ 広島県の通行禁止区間一覧マップ</Link></li>
            <li><Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">→ 原付一種・原付二種・普通二輪の通行ルール完全ガイド</Link></li>
            <li><Link href="/articles/moped-expressway-reason" className="text-orange-600 underline text-sm">→ 有料道路・バイパスで原付が通れない理由</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
