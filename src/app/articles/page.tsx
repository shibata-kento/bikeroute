import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "バイク・原付の道路通行ルール解説",
  description:
    "原付一種・原付二種・普通二輪の通行禁止ルール、自動車専用道路、新基準原付など、バイクの道路通行に関する記事をまとめています。",
};

const articles = [
  {
    slug: "bike-restriction-map",
    title: "50cc・バイクの通行禁止区間マップの見方と使い方【BikeRoute】",
    description:
      "原付50cc・125cc・二輪車が通れない道をマップで確認する方法を解説。禁止区間の種類と車種別の影響、BikeRouteの使い方まで。ツーリング前の事前確認に。",
    tags: ["通行禁止マップ", "50cc", "ルート確認"],
    date: "2026-06-08",
  },
  {
    slug: "shutoko-bike-restriction",
    title: "首都高速道路 バイク通行禁止区間まとめ【原付・二輪別】",
    description:
      "原付一種・二種は首都高全線が通行禁止。普通二輪も山手トンネル・川崎トンネルは二輪禁止。主要路線の通行可否早見表と出発前チェックのポイントをまとめました。",
    tags: ["首都高速", "通行禁止", "関東"],
    date: "2026-06-04",
  },
  {
    slug: "moped-expressway-reason",
    title: "有料道路・バイパスで原付が通れないのはなぜ？【法律の仕組みを解説】",
    description:
      "道路交通法と道路法、2つの法律から原付の通行制限を解説。有料道路＝通れないは誤解。「自動車専用」の指定があるかどうかが唯一の判断基準です。",
    tags: ["法律解説", "自動車専用道路", "原付"],
    date: "2026-06-04",
  },
  {
    slug: "bike-no-entry-signs",
    title: "二輪通行禁止の標識の見分け方【原付・バイク別に解説】",
    description:
      "「自動二輪車通行禁止」「原動機付自転車通行禁止」「自動車専用」など、バイクに関係する5種類の標識を車種別の通行可否一覧表つきで解説します。",
    tags: ["標識", "通行禁止", "見分け方"],
    date: "2026-06-04",
  },
  {
    slug: "125cc-road-guide",
    title: "原付二種（125cc以下）で通れる道・通れない道ガイド【バイパス・専用道路】",
    description:
      "高速道路・自動車専用道路は禁止。でも自動車専用指定のないバイパスは通行できます。標識の見分け方とよくある誤解を整理した、125ccライダー必読のガイドです。",
    tags: ["原付二種", "125cc", "バイパス"],
    date: "2026-06-04",
  },
  {
    slug: "bike-traffic-rules",
    title: "原付一種・原付二種・普通二輪の通行ルール完全ガイド【車種別】",
    description:
      "50cc・125cc・それ以上のバイクで「通れない道」が違う理由を、法律の仕組みからわかりやすく解説します。自動車専用道路・高速道路・バイパスごとに整理。",
    tags: ["通行ルール", "車種別", "自動車専用道路"],
    date: "2026-06-03",
  },
  {
    slug: "new-moped-2025",
    title: "新基準原付（2025年11月〜）の走行ルール解説 — 125ccでも原付一種扱い？",
    description:
      "2025年11月から導入された新基準原付の通行ルールをわかりやすく解説。高速道路は？自動車専用道路は？従来の原付一種・二種との違いも比較します。",
    tags: ["新基準原付", "125cc", "2025年改正"],
    date: "2026-06-03",
  },
];

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-black text-gray-900">解説記事</h1>
      <p className="mb-8 text-sm text-gray-500">
        バイク・原付の道路通行ルールをわかりやすく解説します。
      </p>

      <ul className="space-y-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className="flex flex-wrap gap-1 mb-2">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-bold text-gray-900 leading-snug">{a.title}</h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a.description}</p>
              <p className="mt-3 text-xs text-gray-400">
                {new Date(a.date).toLocaleDateString("ja-JP")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
