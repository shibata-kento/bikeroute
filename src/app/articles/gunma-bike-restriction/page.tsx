import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "群馬県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "群馬県のバイク・原付通行禁止区間を車種別に解説。関越自動車道・北関東自動車道・上信越自動車道は原付一種・二種が全線通行禁止。草津・尾瀬へのツーリング前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "群馬県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "群馬県のバイク・原付通行禁止区間を車種別に解説。関越自動車道・北関東自動車道・上信越自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/gunma-bike-restriction",
  inLanguage: "ja",
};

export default function GunmaBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "群馬県のバイク通行禁止区間まとめ", path: "/articles/gunma-bike-restriction" },
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
        {["関越自動車道", "上信越自動車道", "北関東自動車道", "通行禁止", "関東"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        群馬県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            群馬県は草津温泉・尾瀬・赤城山など、バイクツーリングの人気スポットが多い県です。
            県内には<strong>関越自動車道・北関東自動車道・上信越自動車道</strong>の3つの高速自動車国道が走っており、
            いずれも原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止となっています。
            高速道路を使わずに群馬の観光地を巡るルートを事前に計画しましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">群馬県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">関越自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">上信越・北関東道</th>
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
                name: "関越自動車道（高崎IC〜水上IC）",
                detail: "埼玉方面から群馬県を縦断し新潟へ至る高速自動車国道の群馬県内区間。高崎IC・前橋IC・渋川伊香保ICなど主要インターを経由。スキーリゾートや温泉地方面への主要幹線だが、原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "北関東自動車道（高崎JCT〜桐生IC）",
                detail: "関越道・高崎JCTを起点に太田・桐生方面へ延びる高速自動車国道の群馬県内区間。茨城・栃木方面への東西幹線。原付一種・二種は全線通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "上信越自動車道（藤岡JCT〜）",
                detail: "関越道・藤岡JCTを起点に軽井沢・長野方面へ延びる高速自動車国道。富岡IC・下仁田ICなどを経由して信越方面へ向かう幹線。原付一種・二種は全線通行禁止。",
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
            群馬県内の一般道は山間部を含め多彩なルートがあります。ただし、一部のバイパス区間や
            自動車専用道路の標識が設置されている区間では原付の通行が禁止されています。
            また、山間部の峠道では落石・路面凍結など季節によるリスクにも注意してください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 草津温泉・志賀高原方面の山岳道路では冬期通行止めになる区間があります。
            出発前に道路状況を確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">高速道路が使えない原付の場合、以下の一般道が主要な代替ルートになります。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道17号（中山道）</strong>（東京〜高崎〜新潟方面、関越道の代替）</li>
            <li><strong>国道18号</strong>（高崎〜軽井沢〜長野方面、上信越道の代替）</li>
            <li><strong>国道50号・国道354号</strong>（高崎〜太田〜桐生方面、北関東道の代替）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全ルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">群馬のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、関越道・上信越道などの
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
              <Link href="/prefectures/gunma" className="text-orange-600 underline text-sm">
                → 群馬県の通行禁止区間一覧マップ
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
