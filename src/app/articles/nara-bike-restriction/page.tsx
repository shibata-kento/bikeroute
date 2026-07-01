import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "奈良県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "奈良県のバイク・原付通行禁止区間を車種別に解説。西名阪自動車道・京奈和自動車道・名阪国道の自動車専用区間は原付一種・二種が通行禁止。吉野・奈良ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "奈良県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "奈良県のバイク・原付通行禁止区間を車種別に解説。西名阪自動車道・京奈和自動車道・名阪国道の自動車専用区間は原付一種・二種が通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/nara-bike-restriction",
  inLanguage: "ja",
};

export default function NaraBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "奈良県のバイク通行禁止区間まとめ", path: "/articles/nara-bike-restriction" },
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
        {["西名阪自動車道", "京奈和自動車道", "名阪国道", "通行禁止", "近畿"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        奈良県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            奈良県は吉野の山岳ルートや飛鳥・明日香村など、バイクツーリングに人気のエリアが多い県です。
            大阪方面から奈良へアクセスする際に使われる<strong>西名阪自動車道</strong>、
            奈良・京都・和歌山を結ぶ<strong>京奈和自動車道</strong>、
            そして大阪〜名古屋を繋ぐ<strong>名阪国道の自動車専用区間</strong>は
            原付一種・原付二種が通行禁止です。吉野や飛鳥へのツーリング前に確認しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">奈良県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">西名阪自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">京奈和・名阪国道</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種</td>
                  <td className="border border-gray-200 px-3 py-2">50cc以下</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止区間あり</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種</td>
                  <td className="border border-gray-200 px-3 py-2">51〜125cc</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">禁止区間あり</td>
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
                name: "西名阪自動車道（松原JCT〜天理IC）",
                detail: "大阪の松原JCTから奈良の天理ICまでを結ぶ高速自動車国道。奈良市内へのアクセスルートとして多用されるが、原付一種・二種は全線通行禁止。",
              },
              {
                label: "禁止区間あり（原付一種・二種）",
                name: "京奈和自動車道",
                detail: "京都・奈良・和歌山を縦断する自動車専用道路。全線が自動車専用道路に指定されており、原付一種・二種は通行禁止。整備が進んでいる区間に注意。",
              },
              {
                label: "自動車専用区間あり（原付注意）",
                name: "名阪国道（一部自動車専用区間）",
                detail: "大阪〜名古屋を結ぶ国道25号の有料バイパス。全体的には一般国道扱いだが、一部に自動車専用区間が設定されている区間があるため事前確認が必要。",
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
            奈良県内の国道169号（吉野方面）や国道24号（奈良市内）は原付でも走行可能ですが、
            バイパス区間や自動車専用道路標識が出ている箇所では通行できない区間があります。
            特に京奈和道に並行する区間では、本線への誤進入に注意してください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 名阪国道（国道25号）は一部区間で「自動車専用道路」の標識があります。
            入口標識を必ず確認し、原付は一般道へ迂回してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で奈良県を走る場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道24号</strong>（京都〜奈良市内〜橿原を結ぶ幹線）</li>
            <li><strong>国道169号</strong>（奈良市内〜吉野〜熊野方面の山岳ルート）</li>
            <li><strong>県道・旧大和路</strong>（飛鳥・明日香村など歴史エリアのルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、車種を入力するだけで
            自動車専用区間を避けた安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">奈良県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、西名阪・京奈和・名阪国道などの
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
              <Link href="/prefectures/nara" className="text-orange-600 underline text-sm">
                → 奈良県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/osaka-bike-restriction" className="text-orange-600 underline text-sm">
                → 大阪府のバイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
