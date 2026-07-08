import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/kanagawa-bike-restriction" },
  title: "神奈川のバイク通行禁止区間マップ【横羽線・湾岸線・125cc・原付別】",
  description:
    "神奈川県の125cc・原付 通行禁止区間を地図で確認。横羽線・湾岸線・第三京浜・横浜横須賀道路は原付一種・二種が全線禁止。車種別の通行可否早見表と代替ルートをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "神奈川のバイク通行禁止区間まとめ【横羽線・湾岸線・原付別】",
  description:
    "神奈川県のバイク・原付通行禁止区間を車種別に解説。首都高神奈川線（横羽線・湾岸線）・第三京浜・横浜新道・横浜横須賀道路は原付一種・二種が通行禁止。",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/kanagawa-bike-restriction",
  inLanguage: "ja",
};

export default function KanagawaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "神奈川のバイク通行禁止区間まとめ", path: "/articles/kanagawa-bike-restriction" },
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
        {["横羽線", "湾岸線", "関東"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        神奈川のバイク通行禁止区間まとめ【横羽線・湾岸線・原付別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月15日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            神奈川県内は首都高速神奈川線（横羽線・湾岸線）をはじめ、第三京浜・横浜横須賀道路・横浜新道など
            <strong>自動車専用道路</strong>が多数走っています。
            これらはすべて原付一種・原付二種の通行が禁止されており、
            横浜・川崎エリアを走る原付乗りは特に注意が必要です。
            本記事で主要な通行禁止区間を路線別に確認しましょう。
          </p>
        </section>

        {/* 早見表 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">神奈川県内・主要路線の通行可否早見表</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">路線名</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付一種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付二種</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">普通二輪以上</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["首都高 横羽線（K1）", "✕", "✕", "○"],
                  ["首都高 湾岸線（K3・K5）", "✕", "✕", "○"],
                  ["首都高 狩場線（K3）", "✕", "✕", "○"],
                  ["第三京浜道路", "✕", "✕", "○"],
                  ["横浜横須賀道路", "✕", "✕", "○"],
                  ["横浜新道", "✕", "✕", "○"],
                  ["小田原厚木道路", "✕", "✕", "○"],
                  ["東名高速道路", "✕", "✕", "○"],
                  ["新東名高速道路", "✕", "✕", "○"],
                ].map(([route, v1, v2, normal]) => (
                  <tr key={route} className={v1 === "✕" ? "" : "bg-gray-50"}>
                    <td className="border border-gray-200 px-3 py-2 font-medium">{route}</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-bold ${v1 === "✕" ? "text-red-600" : "text-green-600"}`}>{v1}</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-bold ${v2 === "✕" ? "text-red-600" : "text-green-600"}`}>{v2}</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-bold ${normal === "✕" ? "text-red-600" : "text-green-600"}`}>{normal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            ✕ = 通行禁止　○ = 通行可（ただし標識に従うこと）
          </p>
        </section>

        {/* 横羽線 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">首都高速神奈川線（横羽線・K1）</h2>
          <p className="mb-3">
            横浜市内を東西に走る首都高の神奈川エリア中心路線です。
            羽田空港方面（東京）〜横浜方面を結び、通勤・観光でも利用者が多い路線ですが、
            <strong>自動車専用道路</strong>のため原付は通行禁止です。
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">原付禁止</span>
              <span className="font-bold text-gray-900 text-sm">横羽線（K1）— 全線</span>
            </div>
            <p className="text-xs text-gray-600">
              大師IC（川崎市）〜三ツ沢IC（横浜市）の全区間。横浜みなとみらい方面へのアクセスに使われるが、
              50cc・125cc以下のバイクは進入できません。代替は国道15号・産業道路など。
            </p>
          </div>
        </section>

        {/* 湾岸線 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">首都高速湾岸線（K3・K5）</h2>
          <p className="mb-3">
            東京湾岸沿いを走る路線で、横浜・川崎の工業エリアや横浜港方面へのアクセスに使われます。
            神奈川県内区間はすべて原付禁止です。
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">原付禁止</span>
                <span className="font-bold text-gray-900 text-sm">湾岸線 K3（大黒〜幸浦）</span>
              </div>
              <p className="text-xs text-gray-600">
                横浜港・大黒埠頭方面と幸浦ICを結ぶ区間。横浜ベイブリッジを含む。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">原付禁止</span>
                <span className="font-bold text-gray-900 text-sm">湾岸線 K5（幸浦〜釜利谷）</span>
              </div>
              <p className="text-xs text-gray-600">
                金沢区方面の湾岸ルート。横須賀方面へ向かう際に使われる区間。
              </p>
            </div>
          </div>
        </section>

        {/* その他の路線 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">その他の自動車専用道路</h2>
          <div className="space-y-3">
            {[
              {
                name: "第三京浜道路",
                detail: "横浜市緑区（都筑IC）〜世田谷区（玉川IC）を結ぶ有料道路。全線自動車専用。川崎・港北方面から東京都内へのルートとして使われる。",
              },
              {
                name: "横浜横須賀道路",
                detail: "横浜市から横須賀市・横須賀港方面を結ぶ自動車専用道路。三浦半島方面への幹線ルートだが、原付は一切通行不可。",
              },
              {
                name: "横浜新道",
                detail: "保土ケ谷〜戸塚を結ぶ自動車専用有料道路。横浜市内南北移動に使われる。国道1号のバイパスだが原付禁止。",
              },
              {
                name: "小田原厚木道路",
                detail: "厚木〜小田原を結ぶ自動車専用道路。箱根・湘南エリアへのアクセスに使われるが、全線で原付は通行禁止。",
              },
            ].map(({ name, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">原付禁止</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 原付の代替ルート */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付の代替ルート（横浜・川崎エリア）</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道15号（第一京浜）</strong>— 川崎〜横浜の主要幹線</li>
            <li><strong>国道1号</strong>— 横浜市内〜戸塚〜小田原方面</li>
            <li><strong>国道16号</strong>— 横浜〜横須賀方面</li>
            <li><strong>国道246号</strong>— 横浜市北部〜東京（港北・青葉区経由）</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">神奈川のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、横羽線・湾岸線などの自動車専用区間が
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
              <Link href="/prefectures/kanagawa" className="text-orange-600 underline text-sm">
                → 神奈川県の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">
                → 首都高速道路 バイク通行禁止区間まとめ（東京版）
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                → 原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
