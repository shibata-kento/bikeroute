import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { TagPills } from "@/components/TagPills";

export const metadata: Metadata = {
  alternates: { canonical: "/articles" },
  title: "バイク・原付の道路通行ルール解説",
  description:
    "原付一種・原付二種・普通二輪の通行禁止ルール、自動車専用道路、新基準原付など、バイクの道路通行に関する記事をまとめています。",
};

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function ArticlesPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  // 実在するタグのときだけ有効にする
  const active = tag && articles.some((a) => a.tags.includes(tag)) ? tag : null;

  // タグ別の記事数
  const counts = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  // フィルタバーは「2記事以上に付くタグ」を頻度順（＋選択中タグは必ず表示）
  const barTags = [...counts.entries()]
    .filter(([t, n]) => n >= 2 || t === active)
    .sort((a, b) => b[1] - a[1]);

  const list = active ? articles.filter((a) => a.tags.includes(active)) : articles;

  const pill = (on: boolean) =>
    `rounded-full px-3 py-1 text-xs font-medium transition-colors ${
      on ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-700"
    }`;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-black text-gray-900">解説記事</h1>
      <p className="mb-6 text-sm text-gray-500">
        バイク・原付の道路通行ルールをわかりやすく解説します。タグをタップすると、そのテーマの記事に絞り込めます。
      </p>

      {/* タグで絞り込み */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold text-gray-500">タグで絞り込む</p>
        <div className="flex flex-wrap gap-1.5">
          <Link href="/articles" className={pill(!active)}>すべて</Link>
          {barTags.map(([t, n]) => (
            <Link key={t} href={`/articles?tag=${encodeURIComponent(t)}`} className={pill(t === active)}>
              {t}
              <span className="ml-1 opacity-60 tabular-nums">{n}</span>
            </Link>
          ))}
        </div>
      </div>

      {active && (
        <p className="mb-4 text-sm text-gray-600">
          「<strong className="text-gray-900">{active}</strong>」の記事：{list.length}件
          <Link href="/articles" className="ml-2 text-orange-600 underline">絞り込みをクリア</Link>
        </p>
      )}

      <ul className="space-y-4">
        {list.map((a) => (
          <li
            key={a.slug}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-orange-300 hover:shadow-md transition-all"
          >
            <div className="mb-2">
              <TagPills tags={a.tags} active={active ?? undefined} />
            </div>
            <Link href={`/articles/${a.slug}`} className="group block">
              <h2 className="font-bold text-gray-900 leading-snug group-hover:text-orange-600">{a.title}</h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a.description}</p>
            </Link>
            <p className="mt-3 text-xs text-gray-400">
              {new Date(a.date).toLocaleDateString("ja-JP")}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
