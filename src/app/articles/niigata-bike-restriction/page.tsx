import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "新潟県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "新潟県のバイク・原付通行禁止区間を車種別に解説。北陸自動車道（朝日まほろばIC〜新潟西IC）、関越自動車道（湯沢IC〜三条燕IC）、磐越自動車道は原付一種・二種が全線通行禁止。出発前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "新潟県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "新潟県のバイク・原付通行禁止区間を車種別に解説。北陸自動車道・関越自動車道・磐越自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/niigata-bike-restriction",
  inLanguage: "ja",
};

export default function NiigataBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "新潟県のバイク通行禁止区間まとめ", path: "/articles/niigata-bike-restriction" },
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
        {["北陸自動車道", "関越自動車道", "通行禁止", "北信越"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        新潟県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            新潟県は日本海側最大の県であり、北陸自動車道・関越自動車道・磐越自動車道の3本の高速道路が通過します。
            これらはすべて<strong>高速自動車国道</strong>に指定されており、原付一種（50cc以下）・原付二種（51〜125cc）は全線にわたり通行禁止です。
            ツーリング先として人気の越後湯沢や佐渡へのアクセスでも、車種によって使えるルートが大きく変わります。
            出発前に必ず確認しましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">新潟県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">高速自動車国道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">自動車専用道路</th>
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
                name: "北陸自動車道（朝日まほろばIC〜新潟西IC）",
                detail: "新潟県内を日本海沿いに縦断する区間。朝日まほろばICから新潟西ICまで全線が高速自動車国道であり、原付一種・二種は通行不可。新潟市内から富山・石川方面へのアクセスに利用される主要ルート。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "関越自動車道（湯沢IC〜長岡JCT〜三条燕IC）",
                detail: "群馬県から新潟県を結ぶ幹線。湯沢ICから三条燕ICまでの新潟県内区間が対象。越後湯沢・魚沼・長岡エリアのツーリングで関越道を使う場合、125cc以下は全面禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "磐越自動車道（新潟IC〜）",
                detail: "新潟市から福島県会津若松方面を結ぶ路線。新潟ICから磐越道に入るルートでも原付一種・二種は通行不可。阿賀野川沿いを走る景観が人気のルートだが125cc以下は要注意。",
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

          <p className="mt-3 text-xs text-gray-500">
            ※ 上記はいずれも高速自動車国道であり、道路標識の「自動車専用」表示が目印です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">一般道での注意点</h2>
          <p className="mb-3">
            新潟県内の一般国道・県道では基本的に二輪車の通行規制はありませんが、
            一部のバイパス区間で自動車専用の指定が入ることがあります。
            特に新潟バイパス（国道8号・49号・7号が合流するバイパス群）は自動車専用道路として整備されており、原付は通行できません。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 新潟バイパス（国道8号新潟BP・国道49号など）は自動車専用区間を含みます。
            進入前に「自動車専用」標識を必ず確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">原付・125cc以下で新潟県内を移動する場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道8号</strong>（日本海沿岸を北陸方面へ、柏崎・糸魚川経由）</li>
            <li><strong>国道17号</strong>（越後湯沢〜長岡〜新潟市内、三国峠越え）</li>
            <li><strong>国道49号</strong>（新潟市〜会津方面、磐越道の並走ルート）</li>
            <li><strong>国道290号・352号</strong>（魚沼エリアの山岳ルート）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を選ぶだけで
            自動車専用区間を回避したルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">新潟県のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、北陸道・関越道・磐越道の自動車専用区間が
            ルートに含まれていないかを自動で警告します。
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
              <Link href="/prefectures/niigata" className="text-orange-600 underline text-sm">
                → 新潟県の通行禁止区間一覧マップ
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
