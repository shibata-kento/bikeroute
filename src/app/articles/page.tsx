import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "バイク・原付の道路通行ルール解説",
  description:
    "原付一種・原付二種・普通二輪の通行禁止ルール、自動車専用道路、新基準原付など、バイクの道路通行に関する記事をまとめています。",
};

const articles = [
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
