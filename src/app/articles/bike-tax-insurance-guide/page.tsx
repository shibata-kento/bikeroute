import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/bike-tax-insurance-guide" },
  title: "車種区分で変わる 通行・税金・保険・車検の完全比較【原付〜大型二輪】",
  description:
    "原付一種・原付二種・軽二輪・普通二輪・大型二輪で、通れる道だけでなく税金・自賠責・任意保険・車検まで変わります。特に大きい「125ccの壁」「250ccの壁」を一覧表で整理。ファミリーバイク特約も解説します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "車種区分で変わる 通行・税金・保険・車検の完全比較【原付〜大型二輪】",
  description:
    "原付〜大型二輪で通行・税金・自賠責・任意保険・車検がどう変わるかを一覧で整理。125ccの壁・250ccの壁を解説。",
  datePublished: "2026-07-26",
  dateModified: "2026-07-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/bike-tax-insurance-guide",
  inLanguage: "ja",
};

export default function BikeTaxInsuranceGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "車種区分で変わる 通行・税金・保険・車検", path: "/articles/bike-tax-insurance-guide" },
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

      <div className="mb-2">
        <TagPills tags={["車種区分", "保険", "税金"]} />
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        車種区分で変わる 通行・税金・保険・車検の完全比較【原付〜大型二輪】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            バイクは排気量による<strong>車種区分</strong>で、通れる道だけでなく
            <strong>税金・自賠責・任意保険・車検</strong>まで変わります。とくに影響が大きいのが
            <strong>「125ccの壁」と「250ccの壁」</strong>。どの区分を選ぶかで維持コストと使い勝手が大きく変わるため、
            購入前に全体像を押さえておきましょう。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">車種区分で変わるもの 一覧</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-2 py-2 text-left font-bold">区分（排気量）</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">高速道路</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">軽自動車税/年</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">車検</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">任意保険</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["原付一種（〜50cc）", "×", "2,000円", "なし", "ファミバイ特約可"],
                  ["原付二種（〜125cc）", "×", "2,000〜2,400円", "なし", "ファミバイ特約可"],
                  ["軽二輪（〜250cc）", "○", "3,600円", "なし", "単独加入"],
                  ["小型二輪（251cc〜）", "○", "6,000円", "あり（2年）", "単独加入"],
                ].map(([k, hw, tax, syaken, hoken]) => (
                  <tr key={k}>
                    <td className="border border-gray-200 px-2 py-2 font-medium">{k}</td>
                    <td className={`border border-gray-200 px-2 py-2 text-center font-bold ${hw === "×" ? "text-red-600 bg-red-50" : "text-green-700"}`}>{hw}</td>
                    <td className="border border-gray-200 px-2 py-2 text-center">{tax}</td>
                    <td className="border border-gray-200 px-2 py-2 text-center">{syaken}</td>
                    <td className="border border-gray-200 px-2 py-2 text-center">{hoken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            ※軽自動車税（種別割）は標準税率。自賠責保険は全車種で加入が義務です。金額は改正・自治体・契約条件で変わるため、最新の公式情報でご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">「125ccの壁」— コスパ最強と言われる理由</h2>
          <p className="mb-3">
            原付二種（125cc以下）と、その上の軽二輪（126cc以上）の間には、通行と保険の両面で大きな差があります。
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>高速道路：</strong>125cc以下は不可、126cc以上は可。ロング移動の自由度が大きく変わります
              （原付二種の下道ツーリングは{" "}
              <Link href="/articles/125cc-touring-guide" className="text-orange-600 underline">こちらのコツ</Link>
              {" "}を参照）。
            </li>
            <li>
              <strong>任意保険：</strong>125cc以下は、自動車の任意保険に付けられる<strong>ファミリーバイク特約</strong>が使えます。
              車を持っている家庭なら、単独でバイク保険に入るより割安になることが多いのが強みです。
            </li>
            <li>
              <strong>税金：</strong>年2,000〜2,400円と、維持費が非常に軽い。
            </li>
          </ul>
          <p className="mt-3">
            「街乗り＋下道ツーリング中心で、維持費を抑えたい」なら原付二種、
            「高速で遠くへ行きたい」なら軽二輪以上、が大きな分かれ目です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">「250ccの壁」— 車検の有無</h2>
          <p className="mb-3">
            もう一つの境目が<strong>250cc</strong>です。
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>250cc以下（軽二輪まで）：車検なし。</strong>点検整備は必要ですが、定期的な車検費用がかかりません。</li>
            <li><strong>251cc以上（小型二輪）：車検あり（2年ごと）。</strong>維持コストと手間が増えますが、車格・装備の選択肢は広がります。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">ファミリーバイク特約とは（125cc以下の任意保険の裏技）</h2>
          <p className="mb-3">
            ファミリーバイク特約は、<strong>自動車の任意保険に付帯できる、125cc以下専用の特約</strong>です。
            契約者やその家族が運転する125cc以下のバイク全般が対象になり、複数台持っていても1つの特約でカバーできるのが特徴です。
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>メリット：</strong>保険料が割安になりやすい／等級（ノンフリート等級）に影響しない場合が多い／複数台をまとめてカバー。</li>
            <li><strong>注意点：</strong>車両保険が付けられない・ロードサービスが付かないなど、単独のバイク保険より補償範囲が狭いことがあります。契約前に補償内容を確認しましょう。</li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            126cc以上ではファミリーバイク特約は使えず、単独のバイク任意保険への加入になります。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">車種が決まったら、通れる道もチェック</p>
          <p className="text-sm text-gray-700 mb-3">
            原付一種・二種は高速・自動車専用道路に乗れません。BikeRoute で車種を選んでルートを事前確認すれば、
            うっかり通行禁止区間へ進入するのを防げます。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事</h2>
          <ul className="space-y-2">
            <li><Link href="/articles/bike-passage-chart" className="text-orange-600 underline text-sm">バイク・原付の通行区分 完全早見表【保存版】</Link></li>
            <li><Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">原付一種・原付二種・普通二輪の通行ルール完全ガイド</Link></li>
            <li><Link href="/articles/new-moped-2025" className="text-orange-600 underline text-sm">新基準原付（2025年11月〜）の走行ルール解説</Link></li>
          </ul>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="text-base font-bold text-gray-900 mb-2">参考・出典</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-500 leading-relaxed">
            <li>地方税法（軽自動車税 種別割）</li>
            <li>自動車損害賠償保障法（自賠責保険）</li>
            <li>道路運送車両法（車格区分・車検制度）／道路交通法（車両区分・通行区分）</li>
            <li>各損害保険会社が公表するファミリーバイク特約・二輪車保険の商品概要</li>
          </ul>
          <p className="mt-3 text-xs text-gray-400 leading-relaxed">
            税額・保険料・制度は改正や契約条件で変わります。金額・補償内容は必ず最新の公式情報・各保険会社の約款でご確認ください。
          </p>
        </section>

      </div>
    </main>
  );
}
