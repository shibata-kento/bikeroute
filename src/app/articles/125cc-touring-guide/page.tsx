import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ArticleSources } from "@/components/ArticleSources";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/125cc-touring-guide" },
  title: "原付二種で行く「下道ロングツーリング」術 — 高速に乗らずに遠くへ",
  description:
    "高速道路・自動車専用道路に乗れない原付二種（125cc）で、下道ロングツーリングを快適に楽しむ実践ガイド。ルートの組み方、有料道路の見分け方、距離・時間の見積もり、フェリー活用まで解説します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "原付二種で行く「下道ロングツーリング」術 — 高速に乗らずに遠くへ",
  description:
    "高速道路・自動車専用道路に乗れない原付二種（125cc）で、下道ロングツーリングを快適に楽しむ実践ガイド。",
  datePublished: "2026-07-26",
  dateModified: "2026-07-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/125cc-touring-guide",
  inLanguage: "ja",
};

export default function Gentsuki2TouringGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "原付二種で行く下道ロングツーリング術", path: "/articles/125cc-touring-guide" },
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
        <TagPills tags={["原付二種", "ツーリング", "下道"]} />
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        原付二種で行く「下道ロングツーリング」術 — 高速に乗らずに遠くへ
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            原付二種（51〜125cc）は、税金・保険が安く燃費も良い、街乗りとツーリングの「いいとこ取り」ができる車格です。
            ただし一つだけ大きな制約があります。<strong>高速道路と自動車専用道路には乗れない</strong>こと。
            つまり原付二種のロングツーリングは、必然的に<strong>「下道（一般道）主体」</strong>になります。
            本記事では、高速を使わずに遠くまで気持ちよく走るための、ルート設計と当日の走らせ方のコツをまとめます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">まず前提：原付二種が走れる道・走れない道</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">道路の種類</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">原付二種（125cc）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["高速自動車国道（東名・中央道など）", "×"],
                  ["自動車専用道路（首都高・阪神高速・自専バイパス）", "×"],
                  ["自動車専用の指定がないバイパス", "○"],
                  ["一般国道・県道", "○"],
                  ["一般有料道路（自動車専用でないもの）", "△ 標識で要確認"],
                  ["二輪車通行禁止区間（トンネル等）", "×"],
                ].map(([road, ok]) => (
                  <tr key={road}>
                    <td className="border border-gray-200 px-3 py-2 font-medium">{road}</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-bold ${ok === "×" ? "text-red-600 bg-red-50" : ok.startsWith("△") ? "text-yellow-700 bg-yellow-50" : "text-green-700"}`}>{ok}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            詳しい判定は{" "}
            <Link href="/articles/125cc-road-guide" className="text-orange-600 underline">原付二種で通れる道・通れない道ガイド</Link>
            {" "}を参照してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">下道ロングツーリング 5つのコツ</h2>

          <div className="space-y-5">
            <div>
              <p className="font-bold text-gray-900 mb-1">① ルートは「自動車専用」を避けて先に組む</p>
              <p>
                最大の失敗は、走り出してから入口で「自動車専用」の青看板に気づき、引き返すこと。
                下道ツーリングは<strong>出発前のルート設計が9割</strong>です。カーナビやGoogleマップは車種を考慮せず高速や自専道路を案内してしまうため、
                <strong>原付二種を選んでルートを事前チェック</strong>しておくと安全です。BikeRoute では車種を選ぶだけで、
                ルート上に原付が通れない区間が含まれていないかを自動で判定できます。
              </p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">② 幹線国道・県道を主軸にする</p>
              <p>
                郊外の一般国道は信号が少なく流れも良いため、下道でも巡航しやすい区間が多くあります。
                市街地を貫く国道は渋滞しがちなので、<strong>市街地は県道やバイパス（自動車専用でないもの）で迂回</strong>し、
                郊外区間で国道に戻ると快適です。海沿い・山沿いの景勝国道は下道ツーリングの醍醐味でもあります。
              </p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">③ 有料道路は「有料か」でなく「自動車専用か」で判断する</p>
              <p>
                「有料道路＝原付は通れない」は誤解です。禁止の基準は料金ではなく
                <strong>「自動車専用」の指定があるかどうか</strong>。料金所に原付・二輪の料金区分がある一般有料道路なら、
                原付二種でも通れることがあります。逆に無料でも「自動車専用」標識のあるバイパスは通行不可です。
                入口の標識を必ず確認してください。
              </p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">④ 距離と時間は「高速の1.5〜2倍」で見積もる</p>
              <p>
                下道の平均移動速度は、信号や市街地を含めると<strong>おおむね時速30〜40km相当</strong>になりがちです。
                同じ目的地でも、高速利用時の1.5〜2倍の時間を見ておくと計画が破綻しません。
                無理に距離を稼ぐより、<strong>1〜2時間ごとの休憩</strong>を前提に、
                「走行6割・観光と休憩4割」くらいの余裕あるプランが、下道ツーリングを楽しくします。
              </p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">⑤ フェリー・輪行で「乗れない区間」をワープする</p>
              <p>
                長距離や離島、海峡越えでは、<strong>フェリー</strong>が強力な味方です。原付二種は多くのフェリーで
                手頃な二輪運賃で乗船でき、休憩を兼ねて一気に距離を詰められます。橋やトンネルが自動車専用で渡れない海峡でも、
                フェリー航路があれば迂回できます。区間限定で電車に載せる<strong>輪行</strong>という選択肢もあります。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">疲れをためない当日の工夫</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>給油はこまめに。</strong>125ccは航続距離が長い一方、山間部はスタンドが少ない。半分を切ったら早めに給油。</li>
            <li><strong>風対策。</strong>下道でも郊外は横風が強い。長時間で効くので、スクリーンやウェアで疲労を軽減。</li>
            <li><strong>こまめな水分・塩分補給。</strong>信号待ちが多い夏場は熱がこもりやすい。</li>
            <li><strong>日没から逆算する。</strong>下道は街灯の少ない区間があり、夜間は一気に難易度が上がる。明るいうちに主要区間を終える計画に。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">出発前チェックリスト</h2>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>ルート上に高速・自動車専用道路が混ざっていないか（車種を選んで事前チェック）</li>
            <li>通る予定のバイパス・トンネルに二輪／原付規制がないか</li>
            <li>山間部の給油ポイントを把握したか</li>
            <li>フェリー・有料道路の運賃と原付区分を確認したか</li>
            <li>日没時刻と、暗くなる前に抜けたい区間を決めたか</li>
          </ol>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">下道ルートを出発前に自動チェック</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute に出発地・目的地・車種（原付二種）を入力すると、ルート上に原付が通れない自動車専用区間が
            含まれていないかを自動判定します。「入口で引き返す」を防ぎ、下道ツーリングの計画づくりがぐっと楽になります。
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
              <Link href="/articles/125cc-road-guide" className="text-orange-600 underline text-sm">
                原付二種（125cc以下）で通れる道・通れない道ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-passage-chart" className="text-orange-600 underline text-sm">
                バイク・原付の通行区分 完全早見表【保存版】
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline text-sm">
                二輪通行禁止の標識の見分け方
              </Link>
            </li>
          </ul>
        </section>

        <ArticleSources />

      </div>
    </main>
  );
}
