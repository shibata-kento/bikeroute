import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ArticleSources } from "@/components/ArticleSources";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/bike-passage-chart" },
  title: "バイク・原付の通行区分 完全早見表【車種×道路×標識・保存版】",
  description:
    "原付一種・原付二種・普通二輪・大型二輪が、高速・自動車専用道路・バイパス・一般道をそれぞれ通れるかを1ページに集約した保存版早見表。標識別の可否と、法律上の車種分類のカラクリも図解します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "バイク・原付の通行区分 完全早見表【車種×道路×標識・保存版】",
  description:
    "原付一種・原付二種・普通二輪・大型二輪が各道路を通れるかを1ページに集約した保存版早見表。標識別の可否と車種分類のカラクリも解説。",
  datePublished: "2026-07-26",
  dateModified: "2026-08-28",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/bike-passage-chart",
  inLanguage: "ja",
};

// 「高速×排気量」クエリ（125cc 高速 乗れる／何ccから高速／高速 道路 原付 等）向けFAQ
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "原付や125ccは高速道路に乗れますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "乗れません。原付一種（50cc）も原付二種（125cc）も、高速道路・自動車専用道路は通行禁止です。125ccは道路交通法上は普通自動二輪車ですが、高速道路を通行できる条件を満たさないため乗れません。",
      },
    },
    {
      "@type": "Question",
      name: "何ccから高速道路に乗れますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "総排気量125cc超（126cc以上）の二輪から高速道路に乗れます。つまり軽二輪（126〜250cc）以上です。125ccちょうどは「125cc超」に含まれないため乗れません。",
      },
    },
    {
      "@type": "Question",
      name: "125ccで高速道路に乗れないのはなぜですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "高速道路・自動車専用道路を通行できる条件が「総排気量125cc超（126cc以上）」だからです。運転免許の区分（原付か自動二輪か）とは別の、排気量による基準で判断されます。",
      },
    },
  ],
};

const OK = "○";
const NG = "×";

function Cell({ v }: { v: string }) {
  return (
    <td className={`border border-gray-200 px-2 py-2 text-center font-bold ${v === NG ? "text-red-600 bg-red-50" : "text-green-700"}`}>
      {v}
    </td>
  );
}

export default function BikePassageChartPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "バイク・原付の通行区分 完全早見表", path: "/articles/bike-passage-chart" },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">
          ← 解説記事一覧
        </Link>
      </div>

      <div className="mb-2">
        <TagPills tags={["早見表", "通行区分", "保存版"]} />
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        バイク・原付の通行区分 完全早見表【車種×道路×標識・保存版】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            「この排気量で、この道は通れる？」を1ページで解決する保存版の早見表です。
            <strong>車種×道路種別</strong>、<strong>標識×車種</strong>の2つのマトリクスと、
            混乱しやすい<strong>法律上の車種分類</strong>までまとめました。ブックマークしてツーリング前の確認にどうぞ。
          </p>
        </section>

        {/* 車種×道路種別 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">① 車種 × 道路種別の早見表</h2>
          <p className="text-xs text-gray-500 mb-3">
            道路の通行可否は、実は<strong>「125cc以下か、126cc以上か」</strong>でほぼ決まります。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-2 py-2 text-left font-bold">道路の種類</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">原付一種<br />〜50cc</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">原付二種<br />〜125cc</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">126cc以上<br />（軽二輪〜大型）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["高速自動車国道（東名・中央道など）", NG, NG, OK],
                  ["自動車専用道路（首都高・阪神高速・自専バイパス）", NG, NG, OK],
                  ["自動車専用の指定がないバイパス", OK, OK, OK],
                  ["一般国道・県道", OK, OK, OK],
                  ["二輪車通行禁止区間（トンネル・峠など）", NG, NG, NG],
                ].map(([road, a, b, c]) => (
                  <tr key={road}>
                    <td className="border border-gray-200 px-2 py-2 font-medium">{road}</td>
                    <Cell v={a} />
                    <Cell v={b} />
                    <Cell v={c} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            ※「自動車専用でないバイパス」でも、局所的に「原付通行止め」等の補助標識がある区間は例外です。
            ※二輪車通行禁止区間は排気量に関わらず全ての二輪が不可（四輪は可の場合が多い）。
          </p>
        </section>

        {/* 標識×車種 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">② 標識 × 車種の早見表</h2>
          <div className="space-y-3">
            {[
              {
                src: "/signs/jp-325.svg",
                name: "自動車専用（325）",
                desc: "高速・自動車専用道路の入口。原付は進入禁止、126cc以上のみ可。",
                cells: [NG, NG, OK],
              },
              {
                src: "/signs/jp-307.svg",
                name: "二輪の自動車・原動機付自転車通行止め（307）",
                desc: "すべての二輪が通行禁止。排気量無関係。",
                cells: [NG, NG, NG],
              },
              {
                src: "/signs/jp-304.svg",
                name: "二輪の自動車以外の自動車通行止め（304）",
                desc: "禁止は四輪。二輪・原付は通行できる（紛らわしい）。",
                cells: [OK, OK, OK],
              },
            ].map((s) => (
              <div key={s.name} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={`${s.name}の標識`} width={64} height={64} loading="lazy" className="shrink-0 rounded-md border border-gray-100 bg-white" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm mb-1">{s.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{s.desc}</p>
                    <div className="flex gap-1 text-xs">
                      {["原付一種", "原付二種", "126cc以上"].map((label, i) => (
                        <span key={label} className={`rounded-full px-2 py-0.5 font-medium ${s.cells[i] === NG ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                          {s.cells[i]} {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            標識の見分け方の詳細は{" "}
            <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline">二輪通行禁止の標識の見分け方</Link>
            {" "}へ。
          </p>
        </section>

        {/* 法律上の分類 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">③ 混乱の元「法律上の車種分類」を整理</h2>
          <p className="mb-3">
            バイクの区分がややこしいのは、<strong>2つの法律で呼び方が違う</strong>からです。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-2 py-2 text-left font-bold">排気量</th>
                  <th className="border border-gray-200 px-2 py-2 text-left font-bold">道路交通法上の区分（運転ルール）</th>
                  <th className="border border-gray-200 px-2 py-2 text-left font-bold">道路運送車両法上の区分（車格）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["〜50cc", "原動機付自転車", "原付一種"],
                  ["51〜125cc", "普通自動二輪車", "原付二種"],
                  ["126〜250cc", "普通自動二輪車", "軽二輪"],
                  ["251〜400cc", "普通自動二輪車", "小型二輪（普通二輪）"],
                  ["401cc〜", "大型自動二輪車", "小型二輪（大型二輪）"],
                ].map(([cc, doko, sharyo]) => (
                  <tr key={cc}>
                    <td className="border border-gray-200 px-2 py-2 font-medium">{cc}</td>
                    <td className="border border-gray-200 px-2 py-2">{doko}</td>
                    <td className="border border-gray-200 px-2 py-2">{sharyo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-800">
            <strong className="block mb-1">なぜ原付二種は「自動二輪」なのに高速に乗れない？</strong>
            原付二種（125cc以下）は道路交通法上は「普通自動二輪車」ですが、
            <strong>高速道路・自動車専用道路を通れる条件は「総排気量125cc超（126cc以上）」</strong>という別基準です。
            つまり「自動二輪だが125cc以下」なので、高速・自専道路は通行できません。
            運転区分（原付か自動二輪か）と、高速に乗れるかの基準（126cc以上か）は別物、と覚えると混乱しません。
          </div>
        </section>

        {/* 高速×排気量 の検索需要（125cc 高速 乗れる／何ccから高速 等）に対応 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付・125ccは高速道路に乗れる？何ccから乗れる？</h2>
          <div className="space-y-3">
            {[
              {
                q: "原付・125ccは高速道路に乗れる？",
                a: "乗れません。原付一種（50cc）も原付二種（125cc）も、高速道路・自動車専用道路はすべて通行禁止です。無料の自動車専用道路（バイパス等）も同様に通れません。",
              },
              {
                q: "何ccから高速道路に乗れる？",
                a: "総排気量125cc超（126cc以上）の二輪から乗れます。つまり軽二輪（126〜250cc）以上。125ccちょうどは「125cc超」に含まれないため不可です。",
              },
              {
                q: "125ccは自動二輪なのに、なぜ高速に乗れない？",
                a: "道路交通法上は「普通自動二輪車」ですが、高速道路を通行できる条件は排気量による別基準（126cc以上）だからです。免許区分と高速に乗れる基準は別物です。",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-bold text-gray-900 text-sm mb-1">Q. {q}</p>
                <p className="text-sm text-gray-700">{a}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            なぜ排気量で線引きされるのかは{" "}
            <Link href="/articles/moped-expressway-reason" className="text-orange-600 underline">有料道路・バイパスで原付が通れない理由</Link>
            {" "}で詳しく解説しています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">よくある誤解トップ3</h2>
          <div className="space-y-3">
            {[
              ["「有料道路は原付NG」？", "誤解です。禁止の基準は料金ではなく『自動車専用』の指定。自動車専用でない一般有料道路なら原付も通れることがあります。"],
              ["「バイパスは全部ダメ」？", "いいえ。『自動車専用』の青看板がないバイパスは原付も通行可。看板の有無で判断します。"],
              ["「125ccは原付だから高速は当然ダメ」？", "結果は正しいですが理由が違います。道交法上は自動二輪。高速不可の理由は『125cc以下』という排気量条件です。"],
            ].map(([q, a]) => (
              <div key={q} className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-bold text-gray-900 text-sm mb-1">Q. {q}</p>
                <p className="text-sm text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">早見表で迷ったら、ルートごと自動判定</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute なら出発地・目的地・車種を入れるだけで、ルート上に通れない区間が含まれていないかを自動でチェックできます。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事（詳しく知る）</h2>
          <ul className="space-y-2">
            <li><Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">原付一種・原付二種・普通二輪の通行ルール完全ガイド</Link></li>
            <li><Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline text-sm">二輪通行禁止の標識の見分け方</Link></li>
            <li><Link href="/articles/125cc-road-guide" className="text-orange-600 underline text-sm">原付二種（125cc以下）で通れる道・通れない道ガイド</Link></li>
            <li><Link href="/articles/moped-expressway-reason" className="text-orange-600 underline text-sm">有料道路・バイパスで原付が通れない理由</Link></li>
          </ul>
        </section>

        <ArticleSources />

      </div>
    </main>
  );
}
