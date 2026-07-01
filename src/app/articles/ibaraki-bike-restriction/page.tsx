import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "茨城県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "茨城県のバイク・原付通行禁止区間を車種別に解説。常磐自動車道・東関東自動車道・北関東自動車道は原付一種・二種が全線通行禁止。出発前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "茨城県のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "茨城県のバイク・原付通行禁止区間を車種別に解説。常磐自動車道・東関東自動車道・北関東自動車道は原付一種・二種が全線通行禁止。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/ibaraki-bike-restriction",
  inLanguage: "ja",
};

export default function IbarakiBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "茨城県のバイク通行禁止区間まとめ", path: "/articles/ibaraki-bike-restriction" },
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
        {["常磐自動車道", "東関東自動車道", "北関東自動車道", "通行禁止", "関東"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        茨城県のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            茨城県は東京から北東方向に位置し、
            <strong>常磐自動車道・東関東自動車道・北関東自動車道</strong>の3路線が県内を走ります。
            いずれも高速自動車国道または自動車専用道路に指定されており、
            原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止となっています。
            茨城・水戸・つくば方面へ原付でツーリングを計画している場合は、
            これらの高速道路を迂回する一般道ルートを事前に確認しましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">茨城県内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">常磐自動車道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">北関東・東関東道</th>
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
                name: "常磐自動車道（三郷JCT〜北茨城IC）",
                detail: "東京・三郷JCTから茨城県北端の北茨城ICまで縦断する高速自動車国道。水戸IC・日立ICなど茨城県内の主要インターを経由する。原付一種・二種は全IC入口から進入禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "東関東自動車道（潮来IC〜）",
                detail: "千葉方面から茨城県潮来ICへ至る高速自動車国道の茨城県延伸区間。鹿嶋・潮来エリアへのアクセスに使われるが、原付は通行不可。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "北関東自動車道（友部JCT〜）",
                detail: "常磐道の友部JCTを起点に栃木・群馬方面へ延びる高速自動車国道。笠間・水戸南方面と栃木・群馬を結ぶ東西幹線。原付一種・二種は全線通行禁止。",
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
            茨城県内の一般道は概ね走行しやすいですが、自動車専用道路の標識が出ている区間では
            原付の進入が禁止されています。また、国道6号や国道51号などの幹線道路は
            交通量が多いため、安全に注意して走行してください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 茨城県内の一部バイパス区間（自動車専用道路指定）では
            原付・125cc以下の通行が禁止されている場合があります。標識を必ず確認してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">高速道路が使えない原付の場合、以下の一般道が主要な代替ルートになります。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道6号</strong>（東京〜水戸方面、常磐道の代替）</li>
            <li><strong>国道51号</strong>（水戸〜成田〜千葉方面、東関東道の代替）</li>
            <li><strong>国道50号</strong>（水戸〜小山〜高崎方面、北関東道の代替）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全ルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">茨城のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、常磐道・北関東道などの自動車専用区間が
            含まれていないかを自動で警告します。
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
              <Link href="/prefectures/ibaraki" className="text-orange-600 underline text-sm">
                → 茨城県の通行禁止区間一覧マップ
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
