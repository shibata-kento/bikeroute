import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "東京都のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "東京都のバイク・原付通行禁止区間を車種別に解説。東名高速・中央自動車道・関越自動車道は原付一種・二種が全線通行禁止。首都高速は別記事で詳解。出発前に確認すべきポイントをまとめました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "東京都のバイク通行禁止区間まとめ【原付・125cc別】",
  description:
    "東京都のバイク・原付通行禁止区間を車種別に解説。東名高速・中央自動車道・関越自動車道は原付一種・二種が全線通行禁止。首都高速は別記事で詳解。",
  datePublished: "2026-07-01",
  dateModified: "2026-07-01",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/tokyo-bike-restriction",
  inLanguage: "ja",
};

export default function TokyoBikeRestrictionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "東京都のバイク通行禁止区間まとめ", path: "/articles/tokyo-bike-restriction" },
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
        {["東名高速", "中央自動車道", "関越自動車道", "通行禁止", "関東"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        東京都のバイク通行禁止区間まとめ【原付・125cc別】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月1日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            東京都は日本最大の都市として、複数の広域高速道路が都内を起点に延びています。
            <strong>東名高速道路・中央自動車道・関越自動車道</strong>はいずれも高速自動車国道であるため、
            原付一種（50cc以下）・原付二種（51〜125cc）は全線通行禁止です。
            首都高速道路については規制内容が複雑なため、
            <Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline">別記事（首都高速バイク通行禁止区間まとめ）</Link>
            をご参照ください。本記事では東京を起点とする広域高速道路を中心に解説します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">東京都内の通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">高速自動車国道</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">首都高速</th>
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
                name: "東名高速道路（東京IC〜）",
                detail: "東京ICを起点に神奈川・静岡・愛知方面へ延びる高速自動車国道。東京IC（世田谷区）から乗り入れる場合も含め、原付一種・二種は入口から通行不可。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "中央自動車道（高井戸IC〜）",
                detail: "高井戸ICを起点に八王子・甲府・名古屋方面へ延びる高速自動車国道。都内区間（高井戸〜八王子）も原付は通行禁止。",
              },
              {
                label: "全線禁止（原付一種・二種）",
                name: "関越自動車道（練馬IC〜）",
                detail: "練馬ICを起点に埼玉・群馬・新潟方面へ延びる高速自動車国道。都内区間は練馬IC付近のみだが、原付は通行禁止。",
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

          <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
            <strong>首都高速道路について：</strong> 首都高は都市高速として規制が複雑です。詳細は
            <Link href="/articles/shutoko-bike-restriction" className="underline">首都高速道路 バイク通行禁止区間まとめ</Link>
            をご参照ください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">一般道での注意点</h2>
          <p className="mb-3">
            東京都内の一般道では、自動車専用の標識が出ている区間や一部のトンネル・橋梁で
            二輪車の通行が制限される場合があります。また、都内の大通りでは時間帯によって
            通行規制が実施される場合があるため、標識の確認を怠らないようにしてください。
          </p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong> 東京都内の幹線道路（環状線・放射道路）の一部区間で、
            自動車専用道路の標識が設置されている箇所があります。標識に従って走行してください。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">高速道路が使えない原付の場合、以下の一般道が主要な代替ルートになります。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>国道246号</strong>（渋谷〜厚木方面、東名高速の代替）</li>
            <li><strong>国道20号（甲州街道）</strong>（新宿〜八王子〜甲府方面、中央道の代替）</li>
            <li><strong>国道254号・川越街道</strong>（池袋〜川越方面、関越自動車道の代替）</li>
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使うと、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全ルートを確認できます。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">東京発のルートを出発前にチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では車種を選ぶだけで、高速自動車国道の自動車専用区間が
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
              <Link href="/prefectures/tokyo" className="text-orange-600 underline text-sm">
                → 東京都の通行禁止区間一覧マップ
              </Link>
            </li>
            <li>
              <Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">
                → 首都高速道路 バイク通行禁止区間まとめ
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
