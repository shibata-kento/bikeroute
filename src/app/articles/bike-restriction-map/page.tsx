import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "バイク・50cc 通行禁止区間マップを地図で確認【車種別・全国対応】",
  description:
    "50cc・125cc・二輪車の通行禁止区間を地図上で確認できます。自動車専用道路・二輪禁止トンネルを車種別にマップ表示。首都高・阪神高速など全国対応。ツーリング前の事前チェックに。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "50cc・バイクの通行禁止区間マップの見方と使い方【BikeRoute】",
  description:
    "原付50cc・125cc・二輪車の通行禁止区間をマップで確認する方法。BikeRouteの使い方と禁止区間の種類を解説。",
  datePublished: "2026-06-08",
  dateModified: "2026-06-08",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/bike-restriction-map",
  inLanguage: "ja",
};

export default function BikeRestrictionMapPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "50cc・バイクの通行禁止区間マップの使い方", path: "/articles/bike-restriction-map" },
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
        {["通行禁止マップ", "50cc", "ルート確認"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        バイク・50cc 通行禁止区間マップを地図で確認【車種別・全国対応】
      </h1>
      <p className="mb-4 text-xs text-gray-400">公開: 2026年6月8日</p>

      {/* 地図への直接リンク（最重要CTA） */}
      <div className="mb-8 rounded-xl border-2 border-orange-300 bg-orange-50 p-4">
        <p className="text-sm font-bold text-gray-900 mb-1">今すぐ地図で確認したい方はこちら</p>
        <p className="text-xs text-gray-600 mb-3">車種を選ぶと通行禁止区間が地図に表示されます</p>
        <Link
          href="/segments"
          className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
        >
          通行禁止区間マップを開く →
        </Link>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            「50ccで通れない道ってどこ？」「二輪車が通行禁止の区間をマップで見たい」——
            こうした疑問を解決するのが BikeRoute の通行禁止区間マップです。
            本記事ではマップの見方と、出発前に確認すべき禁止区間の種類を解説します。
          </p>
        </section>

        {/* なぜマップで確認が必要か */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">なぜ出発前にマップで確認するのか</h2>
          <p className="mb-3">
            Google マップや一般的なカーナビは、バイクの車種（排気量・区分）を考慮したルート案内に対応していません。
            原付一種（50cc以下）のライダーが Google マップのルートをそのまま走ると、
            自動車専用道路や二輪車通行禁止区間に誘導されてしまうケースがあります。
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="font-bold text-red-800 text-sm mb-1">通行禁止区間を知らずに走ると…</p>
              <ul className="text-xs text-red-700 list-disc pl-4 space-y-1">
                <li>道路交通法違反（通行禁止違反）で反則金・違反点数</li>
                <li>高速道路本線への誤進入による重大事故のリスク</li>
                <li>山岳トンネルや都市高速での立ち往生</li>
              </ul>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-bold text-green-800 text-sm mb-1">マップで事前確認するメリット</p>
              <ul className="text-xs text-green-700 list-disc pl-4 space-y-1">
                <li>通行禁止区間を含むルートを出発前に把握できる</li>
                <li>代替ルートに変更してから Google マップを開ける</li>
                <li>初めて走る道でも安心してスタートできる</li>
              </ul>
            </div>
          </div>
        </section>

        {/* BikeRouteマップの使い方 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">BikeRoute 通行禁止区間マップの使い方</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm">
                1
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">禁止区間マップを開く</p>
                <p className="text-xs text-gray-600">
                  BikeRoute トップページから「禁止区間マップ」へ移動、または
                  <Link href="/segments" className="text-orange-600 underline ml-1">こちら</Link>
                  から直接アクセスできます。
                  全国の通行禁止区間が一覧表示されます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm">
                2
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">車種でフィルタリング</p>
                <p className="text-xs text-gray-600">
                  「原付一種（50cc以下）」「原付二種（125cc以下）」「普通二輪以上」から
                  自分のバイクの区分を選択します。
                  選択した車種が通れない禁止区間だけに絞り込めます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm">
                3
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">ルート上の区間を確認</p>
                <p className="text-xs text-gray-600">
                  走る予定の道路名・エリアで区間を探し、
                  開始地点・終了地点・禁止内容を確認します。
                  「投稿する」から新しい禁止区間を報告することもできます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm">
                4
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">ルート検索で自動チェック</p>
                <p className="text-xs text-gray-600">
                  トップページで出発地・目的地・車種を入力すると、
                  ルート上に禁止区間が含まれていないかを自動判定します。
                  禁止区間が検出された場合は警告が表示されます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 禁止区間の種類 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">マップに登録されている禁止区間の種類</h2>
          <p className="mb-3">
            BikeRoute のマップには以下の3種類の通行禁止区間が登録されています。
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">自動車専用道路</span>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">原付一種・原付二種が通れない道路</p>
              <p className="text-xs text-gray-600">
                高速道路・都市高速（首都高・阪神高速など）・自動車専用バイパスが対象。
                道路法に基づき「自動車専用」に指定された区間で、原付（125cc以下）は通行禁止。
                普通二輪（126cc以上）は通行可能。
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">二輪通行禁止</span>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">バイク全車種が通れない道路</p>
              <p className="text-xs text-gray-600">
                「自動二輪車通行禁止」の標識が設置された区間。排気量に関係なくすべてのバイクが禁止。
                山岳トンネル（首都高 山手トンネル、東京湾アクアライン 川崎トンネルなど）が代表例。
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">原付通行禁止</span>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">原付のみが通れない道路</p>
              <p className="text-xs text-gray-600">
                「原動機付自転車通行禁止」の標識がある区間。
                原付一種・原付二種が禁止で、普通二輪以上は通行可。
                幹線道路の一部区間に設置されることがあります。
              </p>
            </div>
          </div>
        </section>

        {/* 車種別の影響まとめ */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">車種別：どの禁止区間が関係するか</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">禁止区間の種類</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">50cc<br/>（原付一種）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">125cc<br/>（原付二種）</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">126cc以上<br/>（普通二輪）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["自動車専用道路（高速・首都高など）", "✕", "✕", "○"],
                  ["二輪通行禁止（山岳トンネルなど）", "✕", "✕", "✕"],
                  ["原付通行禁止区間", "✕", "✕", "○"],
                  ["一般道（標識なし）", "○", "○", "○"],
                ].map(([type, c50, c125, c250]) => (
                  <tr key={type}>
                    <td className="border border-gray-200 px-3 py-2">{type}</td>
                    {[c50, c125, c250].map((s, i) => (
                      <td
                        key={i}
                        className={`border border-gray-200 px-3 py-2 text-center font-bold ${
                          s === "✕" ? "text-red-600 bg-red-50" : "text-green-600"
                        }`}
                      >
                        {s}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            ※ 新基準原付（125cc以下・4kW以下）は原付一種と同じ欄が適用されます。
          </p>
        </section>

        {/* 全国の主な禁止区間 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">全国の主な通行禁止区間（原付・50cc 通行不可）</h2>
          <p className="mb-3">
            原付一種（50cc）・原付二種（125cc）が通行できない代表的な区間を地域別に整理します。
          </p>
          <div className="space-y-3">
            {[
              {
                region: "関東",
                items: [
                  "首都高速道路 全線（原付一種・二種は全線禁止）",
                  "首都高 山手トンネル C2（普通二輪も禁止）",
                  "東京湾アクアライン 川崎トンネル（普通二輪も禁止）",
                  "国道1号 横浜新道・横浜横須賀道路",
                  "国道16号 横浜町田IC付近バイパス区間",
                ],
              },
              {
                region: "関西",
                items: [
                  "阪神高速道路 全線（原付一種・二種は全線禁止）",
                  "名神高速道路（高速自動車国道）",
                  "第二京阪道路（自動車専用区間）",
                ],
              },
              {
                region: "全国共通",
                items: [
                  "東名・中央道・東北道など高速自動車国道 全線",
                  "各都市の都市高速道路",
                  "「自動車専用」標識のある国道バイパス",
                ],
              },
            ].map(({ region, items }) => (
              <div key={region} className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-bold text-gray-800 text-sm mb-2">{region}</p>
                <ul className="list-disc pl-4 space-y-1">
                  {items.map((item) => (
                    <li key={item} className="text-xs text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            ※ BikeRoute の禁止区間マップでは上記以外の区間も随時追加されています。
            走る予定の道路を事前にマップで確認することをおすすめします。
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">通行禁止区間マップを今すぐ確認</p>
          <p className="text-sm text-gray-700 mb-4">
            BikeRoute の禁止区間マップでは、原付50cc・125cc・二輪車が通れない道を
            全国規模で確認できます。ツーリング前に必ずチェックしてください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/segments"
              className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600 text-center"
            >
              禁止区間マップを見る →
            </Link>
            <Link
              href="/"
              className="inline-block rounded-lg border border-orange-500 px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 text-center"
            >
              ルートで自動チェックする →
            </Link>
          </div>
        </div>

        {/* 関連記事 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連記事</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/articles/bike-traffic-rules" className="text-orange-600 underline text-sm">
                原付一種・原付二種・普通二輪の通行ルール完全ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">
                首都高速道路 バイク通行禁止区間まとめ
              </Link>
            </li>
            <li>
              <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline text-sm">
                二輪通行禁止の標識の見分け方
              </Link>
            </li>
            <li>
              <Link href="/articles/moped-expressway-reason" className="text-orange-600 underline text-sm">
                有料道路・バイパスで原付が通れない理由
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
