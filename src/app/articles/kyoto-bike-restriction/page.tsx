import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "京都府のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "京都府のバイク・原付通行禁止区間を車種別に解説。名神高速・京滋バイパス・第二京阪道路は原付一種・二種が全線通行禁止。京都観光ツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "京都府のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "京都府のバイク・原付通行禁止区間を車種別に解説。名神高速・京滋バイパス・第二京阪道路は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/kyoto-bike-restriction",
  inLanguage: "ja",
};

export default function KyotoBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "京都府のバイク通行禁止区間まとめ", path: "/articles/kyoto-bike-restriction" },
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
        {["名神高速", "京滋バイパス", "第二京阪道路", "通行禁止", "近畿"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        京都府のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            京都府は古都観光だけでなく、丹後半島・美山・周山街道など多彩なツーリングルートが魅力の地域です。
            ただし、市街地へのアクセスに使われる<strong>名神高速道路</strong>や、
            大津〜宇治を結ぶ<strong>京滋バイパス</strong>、大阪方面への<strong>第二京阪道路</strong>は
            自動車専用道路に指定されており、原付一種・原付二種は通行できません。
            京都市内への迂回ルートも含めて事前に確認しておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">京都府内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">名神高速</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">京滋・第二京阪</th>
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
                name: "名神高速道路（京都南IC〜京都東IC）",
                detail: "大阪・名古屋方面と京都市内を結ぶ基幹高速道路。京都南IC〜京都東IC区間も高速自動車国道のため、原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "京滋バイパス",
                detail: "大津（滋賀）から久御山・宇治を経由して第二京阪へ接続する自動車専用道路。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "第二京阪道路（自動車専用）",
                detail: "京都市南部から大阪方面へ延びる自動車専用道路。全線が自動車専用道路に指定されており、原付一種・二種は通行できない。",
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
            京都市内は碁盤の目状の道路網が整備されており、原付での移動は比較的しやすい環境です。
            ただし、一部の幹線道路では二輪車の通行が制限される時間帯がある場合や、
            バイパス区間で自動車専用標識が設置されていることがあります。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 京都縦貫自動車道（丹波IC〜沓掛IC）は自動車専用道路区間を含みます。
            原付一種・二種はこれらの区間に進入できません。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で京都府を走る場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道1号</strong>（大阪〜京都を結ぶ幹線、原付でも走行可）</li>
            <li><strong>国道9号</strong>（京都市内〜亀岡〜丹波方面）</li>
            <li><strong>府道・旧街道</strong>（嵯峨野・美山方面への観光ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、車種を入力するだけで
            自動車専用区間を避けた安全なルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">京都府のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、名神高速・京滋バイパス・第二京阪などの
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
              <Link href="/prefectures/kyoto" className="text-orange-600 underline text-sm">
                → 京都府の通行禁止区間一覧マップ
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
