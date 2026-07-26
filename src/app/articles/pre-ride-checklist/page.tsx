import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ArticleSources } from "@/components/ArticleSources";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/pre-ride-checklist" },
  title: "ツーリング前チェックリスト — 通行禁止で引き返さないための準備【原付・125cc】",
  description:
    "原付・125ccのツーリングで「入口で引き返す」を防ぐ出発前チェックリスト。ルートの通行可否確認、標識の予習、燃料・日没・フェリーの段取りまで、各項目がなぜ大事かとあわせて解説します。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ツーリング前チェックリスト — 通行禁止で引き返さないための準備【原付・125cc】",
  description:
    "原付・125ccのツーリングで「入口で引き返す」を防ぐ出発前チェックリストを、各項目の理由とあわせて解説。",
  datePublished: "2026-07-26",
  dateModified: "2026-07-26",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/pre-ride-checklist",
  inLanguage: "ja",
};

const CHECKS: { t: string; why: string }[] = [
  {
    t: "ルートに高速・自動車専用道路が混ざっていないか",
    why: "最重要。カーナビやGoogleマップは車種の排気量を考慮しないため、原付・125ccでも高速や自動車専用道路を案内することがあります。車種を選んでルートを事前判定しておけば、入口での引き返しを防げます。",
  },
  {
    t: "通る予定のバイパス・トンネルに二輪／原付規制がないか",
    why: "無料でも「自動車専用」指定のバイパスは原付が通れません。またトンネルには排気量に関わらず二輪すべてが通行禁止の区間があります。ルート上の該当箇所を先に洗い出しておきましょう。",
  },
  {
    t: "有料道路の原付区分・運賃を確認したか",
    why: "「有料＝原付NG」は誤解です。自動車専用でない一般有料道路なら原付も通れることがあります。逆に無料でも自動車専用なら不可。料金所の車種区分と標識を確認します。",
  },
  {
    t: "山間部の給油ポイントを把握したか",
    why: "125ccは航続距離が長い一方、山間部・郊外はガソリンスタンドが少なく営業時間も短め。燃料計が半分を切ったら早めに給油する前提で、給油可能地点を把握しておきます。",
  },
  {
    t: "日没時刻を確認し、暗くなる前に抜けたい区間を決めたか",
    why: "下道は街灯の少ない区間が多く、夜間は路面・標識の視認性が一気に落ちます。日没から逆算し、山越えや交通量の多い区間は明るいうちに終える計画にします。",
  },
  {
    t: "天候と装備を確認したか",
    why: "二輪は天候の影響を直接受けます。雨具・防風・防寒・グローブなどを天気予報に合わせて準備。夏場は熱中症対策（水分・塩分・こまめな休憩）も忘れずに。",
  },
  {
    t: "フェリー・迂回路を下調べしたか",
    why: "海峡や大きな橋が自動車専用で渡れない場合、フェリー航路や一般道の迂回が代替になります。運航時刻・二輪運賃を事前に調べておくと当日慌てません。",
  },
  {
    t: "車両の基本点検（タイヤ・ブレーキ・灯火・チェーン）をしたか",
    why: "空気圧・残溝、ブレーキの効き、ウインカー/ライト、チェーンの張りと注油。長距離ほど小さな不調が響きます。出発前の数分の点検がトラブルを防ぎます。",
  },
];

export default function PreRideChecklistPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "ツーリング前チェックリスト", path: "/articles/pre-ride-checklist" },
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
        <TagPills tags={["ツーリング", "チェックリスト", "準備"]} />
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        ツーリング前チェックリスト — 通行禁止で引き返さないための準備【原付・125cc】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年7月26日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            原付・125ccのツーリングで最も気持ちが萎える瞬間が、
            <strong>目的地の手前で「自動車専用」の標識に気づき、引き返すこと</strong>です。
            これは準備でほぼ防げます。出発前に確認したい項目を、
            <strong>なぜ大事なのか</strong>とセットでまとめました。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">出発前チェックリスト（全8項目）</h2>
          <div className="space-y-3">
            {CHECKS.map((c, i) => (
              <div key={c.t} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-black">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{c.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付が特に「うっかり進入」しやすい3か所</h2>
          <p className="mb-3">なかでも次の3つは、原付・125ccが誤って入りやすい要注意ポイントです。</p>
          <div className="space-y-2">
            {[
              ["高速道路の合流入口", "料金所やランプがそのまま本線につながっており、標識の見落としで進入しやすい。入口の「自動車専用」表示で判断。"],
              ["自動車専用のバイパス", "見た目は普通の道路でも、入口に青い『自動車専用』看板があれば原付は不可。無料でも同じ。"],
              ["二輪車通行禁止のトンネル", "排気量に関わらず二輪が禁止のトンネルがある。長大トンネルや都市部の地下道に多い。"],
            ].map(([place, note]) => (
              <div key={place} className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
                <p className="font-bold text-yellow-800 text-sm">{place}</p>
                <p className="text-xs text-yellow-700 mt-0.5">{note}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            標識の見分け方は{" "}
            <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline">二輪通行禁止の標識の見分け方</Link>
            {" "}で図解しています。
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">チェック①はBikeRouteで自動化できます</p>
          <p className="text-sm text-gray-700 mb-3">
            出発地・目的地・車種を入力するだけで、ルート上に原付が通れない自動車専用区間が含まれていないかを自動判定。
            引き返しリスクを出発前にゼロに近づけます。
          </p>
          <Link href="/" className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事</h2>
          <ul className="space-y-2">
            <li><Link href="/articles/125cc-touring-guide" className="text-orange-600 underline text-sm">原付二種で行く下道ロングツーリング術</Link></li>
            <li><Link href="/articles/bike-passage-chart" className="text-orange-600 underline text-sm">バイク・原付の通行区分 完全早見表【保存版】</Link></li>
            <li><Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline text-sm">二輪通行禁止の標識の見分け方</Link></li>
          </ul>
        </section>

        <ArticleSources />

      </div>
    </main>
  );
}
