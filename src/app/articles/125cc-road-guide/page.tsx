import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "原付二種（125cc以下）で通れる道・通れない道ガイド【バイパス・専用道路】",
  description:
    "原付二種（51〜125cc）が通行できる道路・できない道路を徹底解説。高速道路・自動車専用道路は禁止。でもバイパスは通れる場合も。標識の見分け方と、BikeRouteでの事前確認方法もご紹介。",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "原付二種（125cc以下）で通れる道・通れない道ガイド【バイパス・専用道路】",
  description:
    "原付二種（51〜125cc）が通行できる道路・できない道路を徹底解説。高速道路・自動車専用道路は禁止。バイパスは通れる場合も。",
  datePublished: "2026-06-04",
  dateModified: "2026-06-04",
  author: { "@type": "Organization", name: "BikeRoute", url: "https://bikeroute.vercel.app" },
  publisher: { "@type": "Organization", name: "BikeRoute", url: "https://bikeroute.vercel.app" },
  url: "https://bikeroute.vercel.app/articles/125cc-road-guide",
  inLanguage: "ja",
};

export default function Moped125RoadGuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
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
        {["原付二種", "125cc", "バイパス"].map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">
        原付二種（125cc以下）で通れる道・通れない道ガイド【バイパス・専用道路】
      </h1>
      <p className="mb-8 text-xs text-gray-400">公開: 2026年6月4日</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p>
            原付二種（51〜125cc）は原付一種より行動範囲が広い一方、
            「どの道が通れるのか」が分かりにくいバイクでもあります。
            高速道路はダメでも、バイパスはOKな場合がある——この「場合による」がポイントです。
            本記事では通行ルールを道路種別ごとにわかりやすく整理します。
          </p>
        </section>

        {/* 原付二種とは */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付二種とは</h2>
          <p className="mb-3">
            原付二種（第二種原動機付自転車）は排気量51〜125ccのバイクを指します。
            Honda CT125、ホンダPCX125、ヤマハNMAX125、カワサキZ125PROなどが代表的です。
            2025年11月以降の「新基準原付」（125cc以下・4kW以下）は<strong>原付一種扱い</strong>なので別途注意が必要です。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">項目</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">原付一種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">原付二種</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["排気量", "50cc以下", "51〜125cc"],
                  ["法定速度", "30km/h", "60km/h"],
                  ["二段階右折", "必要", "不要"],
                  ["二人乗り", "禁止", "条件付きで可"],
                  ["高速道路", "禁止", "禁止"],
                  ["自動車専用道路", "禁止", "禁止"],
                  ["一般道バイパス（標識なし）", "制限あり", "通行可"],
                ].map(([item, ichi, ni]) => (
                  <tr key={item}>
                    <td className="border border-gray-200 px-3 py-2 font-medium">{item}</td>
                    <td className="border border-gray-200 px-3 py-2 text-gray-600">{ichi}</td>
                    <td className="border border-gray-200 px-3 py-2 text-gray-900 font-medium">{ni}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 通れない道 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付二種が通れない道</h2>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">① 高速自動車国道（高速道路）</h3>
          <p className="mb-2">
            東名高速・中央道・東北道など、国土交通省が管理する高速道路です。
            道路交通法第75条の4の規定により、原付二種は通行できません。
          </p>
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-700 mb-4">
            入口の「自動車専用」標識がなくても、高速道路は原付二種通行禁止
          </div>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">② 自動車専用道路（標識あり）</h3>
          <p className="mb-2">
            「自動車専用」の青い標識（縦長・白抜き文字）が設置された道路は通行禁止です。
            首都高・阪神高速・名古屋高速などの都市高速道路、および国道バイパスの一部が該当します。
          </p>
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-700 mb-4">
            入口に「自動車専用」看板がある = 原付二種は入れない
          </div>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">③ 二輪通行禁止区間</h3>
          <p className="mb-2">
            特定のトンネルや道路に「自動二輪車通行禁止」の標識が設置されている区間です。
            この場合は排気量に関係なくすべてのバイクが通行できません。
          </p>
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-700">
            例：首都高 山手トンネル・東京アクアライン川崎トンネル
          </div>
        </section>

        {/* 通れる道 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">原付二種が通れる道</h2>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">✅ 一般道路（標識なし）</h3>
          <p>
            都道府県道・市町村道などの一般道はすべて通行可能です（二輪禁止標識がない限り）。
            法定速度は60km/h（制限標識に従う）。
          </p>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">✅ 自動車専用指定のないバイパス</h3>
          <p className="mb-2">
            これが最もよく誤解されるポイントです。
            バイパスと名のついた道路でも、<strong>「自動車専用」の標識がなければ原付二種も通行できます</strong>。
          </p>
          <p className="mb-2">
            国道バイパスの整備区間では、旧道と並行して新道（バイパス）が作られる場合があります。
            新道に「自動車専用」の指定がなければ、原付二種も走行可能です。
          </p>
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-xs text-green-700">
            見分け方：入口に「自動車専用」の看板がなければ通行可（ただし現地確認推奨）
          </div>

          <h3 className="font-bold text-gray-800 mt-4 mb-2">✅ 有料道路（自動車専用指定なし）</h3>
          <p>
            有料道路でも「自動車専用」指定のない区間は通行できます。
            ただし一般的な有料道路（自動車道）は自動車専用のケースが多いため、事前確認が必要です。
          </p>
        </section>

        {/* よくある誤解 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">よくある誤解・トラブル事例</h2>
          <div className="space-y-3">
            {[
              {
                q: "「バイパスは全部通れない」と思っていた",
                a: "誤りです。自動車専用の指定がないバイパスは通行可能です。標識で確認してください。",
              },
              {
                q: "ナビのルートに首都高が含まれていた",
                a: "カーナビは原付二種の制限を考慮しないことがあります。BikeRoute で事前チェックを。",
              },
              {
                q: "高速の入口まで行ってしまった",
                a: "入口手前に「自動車専用」標識があるので、そこで引き返せます。侵入前に気づくことが重要です。",
              },
              {
                q: "125ccに乗り換えたら高速に乗れると思った",
                a: "原付二種（125cc）は高速道路・自動車専用道路を通行できません。高速に乗るには126cc以上が必要です。",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-bold text-gray-800 text-sm mb-1">Q. {q}</p>
                <p className="text-xs text-gray-600">A. {a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 早見表 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">通行可否まとめ</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold">道路種別</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold">原付二種</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["高速自動車国道（高速道路）", "✕ 禁止"],
                  ["自動車専用道路（標識あり）", "✕ 禁止"],
                  ["都市高速（首都高・阪神高速など）", "✕ 禁止"],
                  ["二輪通行禁止区間（標識あり）", "✕ 禁止"],
                  ["自動車専用指定のないバイパス", "○ 通行可"],
                  ["一般国道・都道府県道", "○ 通行可"],
                  ["市区町村道", "○ 通行可"],
                ].map(([road, status]) => (
                  <tr key={road} className={status.startsWith("✕") ? "bg-red-50" : ""}>
                    <td className="border border-gray-200 px-3 py-2">{road}</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-bold ${status.startsWith("✕") ? "text-red-600" : "text-green-600"}`}>
                      {status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">ルートに自動車専用区間が含まれていないか確認する</p>
          <p className="text-sm text-gray-700 mb-3">
            BikeRoute では「原付二種」を選択してルートを入力するだけで、
            通行禁止区間が含まれていないかを自動チェックします。
            バイパスの自動車専用区間なども検出します。
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
              <Link href="/articles/new-moped-2025" className="text-orange-600 underline text-sm">
                新基準原付（2025年11月〜）の走行ルール解説
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
