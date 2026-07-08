import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/bike-no-entry-signs" },
  title: "二輪通行禁止の標識の見分け方【原付・バイク別に解説】",
  description:
    "「自動二輪車通行禁止」「原動機付自転車通行禁止」「自動車専用」など、バイクに関係する標識の見分け方を解説。どの標識がどの車種に適用されるかを一覧表と図で整理しました。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "二輪通行禁止の標識の見分け方【原付・バイク別に解説】",
  description:
    "「自動二輪車通行禁止」「原動機付自転車通行禁止」「自動車専用」など、バイクに関係する標識の見分け方を解説。",
  datePublished: "2026-06-04",
  dateModified: "2026-06-04",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://www.bikeroutemap.com" },
  url: "https://www.bikeroutemap.com/articles/bike-no-entry-signs",
  inLanguage: "ja",
};

type SignCardProps = {
  color: string;
  shape: "circle" | "rect";
  label: string;
  name: string;
  applies: { vehicle: string; ok: boolean }[];
  note: string;
};

function SignCard({ color, shape, label, name, applies, note }: SignCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-4">
        {/* 標識模式図 */}
        <div
          className="shrink-0 flex items-center justify-center text-white font-bold text-xs text-center leading-tight"
          style={{
            width: 64,
            height: 64,
            background: color,
            borderRadius: shape === "circle" ? "50%" : 8,
            padding: 4,
          }}
        >
          {label}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm mb-2">{name}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {applies.map(({ vehicle, ok }) => (
              <span
                key={vehicle}
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  ok
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {ok ? "○" : "✕"} {vehicle}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">{note}</p>
        </div>
      </div>
    </div>
  );
}

export default function BikeNoEntrySignsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: "二輪通行禁止の標識の見分け方", path: "/articles/bike-no-entry-signs" },
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
        {["標識", "通行禁止", "見分け方"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        二輪通行禁止の標識の見分け方【原付・バイク別に解説】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月4日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            「この道、バイクで入っていいの？」と迷ったとき、判断の根拠になるのが道路標識です。
            しかしバイクに関係する標識は複数種類あり、<strong>どの標識がどの車種に適用されるか</strong>
            が分かりにくい設計になっています。
            本記事では車種ごとの通行可否を標識別に整理します。
          </p>
        </section>

        {/* 標識一覧 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">バイクに関係する標識一覧</h2>

          <div className="space-y-4">
            <SignCard
              color="#1a56a0"
              shape="rect"
              label="自動車専用"
              name="自動車専用（案内標識）"
              applies={[
                { vehicle: "原付一種", ok: false },
                { vehicle: "原付二種", ok: false },
                { vehicle: "普通二輪以上", ok: true },
              ]}
              note="高速道路・バイパスの入口に設置される青い長方形の看板。原付一種・二種は通行不可。普通二輪以上は通行可。"
            />

            <SignCard
              color="#c0392b"
              shape="circle"
              label="自動二輪車通行禁止"
              name="自動二輪車通行禁止（規制標識）"
              applies={[
                { vehicle: "原付一種", ok: false },
                { vehicle: "原付二種", ok: false },
                { vehicle: "普通二輪以上", ok: false },
              ]}
              note="赤丸に白抜きのバイクマーク。排気量に関係なく二輪車すべてが通行禁止。トンネル・山岳道路などに設置される。"
            />

            <SignCard
              color="#c0392b"
              shape="circle"
              label="原付通行禁止"
              name="原動機付自転車通行禁止（規制標識）"
              applies={[
                { vehicle: "原付一種", ok: false },
                { vehicle: "原付二種", ok: false },
                { vehicle: "普通二輪以上", ok: true },
              ]}
              note="赤丸に原付マーク。原付一種・二種が通行禁止。普通二輪以上（126cc〜）は通行可。幹線道路の一部区間で見られる。"
            />

            <SignCard
              color="#c0392b"
              shape="circle"
              label="大型自動二輪禁止"
              name="大型自動二輪車通行禁止（規制標識）"
              applies={[
                { vehicle: "原付一種", ok: true },
                { vehicle: "原付二種", ok: true },
                { vehicle: "普通二輪〜400cc", ok: true },
                { vehicle: "大型二輪（401cc〜）", ok: false },
              ]}
              note="赤丸に大型バイクマーク。401cc以上の大型二輪のみ禁止。原付・125cc・400cc以下の中型は通行可。"
            />

            <SignCard
              color="#c0392b"
              shape="circle"
              label="車両通行禁止"
              name="車両通行止め（規制標識）"
              applies={[
                { vehicle: "原付一種", ok: false },
                { vehicle: "原付二種", ok: false },
                { vehicle: "普通二輪以上", ok: false },
                { vehicle: "自動車", ok: false },
              ]}
              note="赤丸に車と二輪のマーク（または縦棒のみ）。自動車・バイク・原付すべて通行禁止。歩行者・自転車は通行可の場合が多い。"
            />
          </div>
        </section>

        {/* 早見表 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">標識別・車種別 通行可否早見表</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-2 py-2 text-left font-bold">標識</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">原付一種<br/>（〜50cc）</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">原付二種<br/>（〜125cc）</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">普通二輪<br/>（〜400cc）</th>
                  <th className="border border-gray-200 px-2 py-2 text-center font-bold">大型二輪<br/>（401cc〜）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["自動車専用（青看板）", "✕", "✕", "○", "○"],
                  ["自動二輪車通行禁止", "✕", "✕", "✕", "✕"],
                  ["原動機付自転車通行禁止", "✕", "✕", "○", "○"],
                  ["大型自動二輪車通行禁止", "○", "○", "○", "✕"],
                  ["車両通行止め", "✕", "✕", "✕", "✕"],
                  ["標識なし（一般道）", "○", "○", "○", "○"],
                ].map(([sign, ...statuses]) => (
                  <tr key={sign}>
                    <td className="border border-gray-200 px-2 py-2 font-medium">{sign}</td>
                    {statuses.map((s, i) => (
                      <td
                        key={i}
                        className={`border border-gray-200 px-2 py-2 text-center font-bold ${
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
        </section>

        {/* 紛らわしいケース */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">紛らわしいケースと判断のコツ</h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="font-bold text-yellow-800 text-sm mb-1">
                ケース①：「自動車専用」の看板がないバイパスは通れる？
              </p>
              <p className="text-xs text-yellow-700">
                通れます（原付二種も含む）。「自動車専用」の青看板が入口にない限り、バイパスでも通行可能です。
                ただし道路の形状から判断が難しい場合は、BikeRoute で事前確認することをおすすめします。
              </p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="font-bold text-yellow-800 text-sm mb-1">
                ケース②：「二輪の自動車以外の自動車通行禁止」とは？
              </p>
              <p className="text-xs text-yellow-700">
                「二輪の自動車以外」＝四輪車・三輪車が禁止、という意味です。
                つまり二輪車（バイク）は通行可能な区間を示します。
                誤読しやすい表現なので注意してください。
              </p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="font-bold text-yellow-800 text-sm mb-1">
                ケース③：補助標識がある場合
              </p>
              <p className="text-xs text-yellow-700">
                規制標識の下に補助標識（「大型」「自動二輪」「原付」など）が付いている場合、
                その補助標識の車種だけに規制が適用されます。
                本標識だけで判断せず、補助標識もあわせて確認してください。
              </p>
            </div>
          </div>
        </section>

        {/* 現地での確認方法 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">現地での確認手順</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>入口に「自動車専用」の青看板があるか確認</strong>
              <br />
              <span className="text-gray-500">あれば → 原付一種・二種は通行禁止。普通二輪以上は通行可。</span>
            </li>
            <li>
              <strong>赤丸の規制標識があるか確認</strong>
              <br />
              <span className="text-gray-500">あれば → 標識の種類と補助標識を確認して該当車種を特定。</span>
            </li>
            <li>
              <strong>両方なければ通行可能</strong>
              <br />
              <span className="text-gray-500">一般道として通行できます（速度制限標識には従う）。</span>
            </li>
            <li>
              <strong>判断に迷ったら事前にルート確認</strong>
              <br />
              <span className="text-gray-500">BikeRoute に出発地・目的地・車種を入力して自動チェック。</span>
            </li>
          </ol>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">標識の確認はルート計画の段階で</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute ではルート上に通行禁止区間が含まれていないかを出発前に自動チェックできます。
            現地で標識を見て引き返す手間を省けます。
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            ルートをチェックする →
          </Link>
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
              <Link href="/articles/125cc-road-guide" className="text-orange-600 underline text-sm">
                原付二種（125cc以下）で通れる道・通れない道ガイド
              </Link>
            </li>
            <li>
              <Link href="/articles/shutoko-bike-restriction" className="text-orange-600 underline text-sm">
                首都高速道路 バイク通行禁止区間まとめ
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
