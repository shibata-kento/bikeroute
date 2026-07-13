import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { prefectureArticles, prefectureArticleMap } from "@/lib/prefecture-articles";
import { articles } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return prefectureArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = articles.find((a) => a.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: { url: `/articles/${slug}`, title: meta.title, description: meta.description },
  };
}

export default async function PrefectureBikeRestrictionPage({ params }: Props) {
  const { slug } = await params;
  const art = prefectureArticleMap.get(slug);
  const meta = articles.find((a) => a.slug === slug);
  if (!art || !meta) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "解説記事", path: "/articles" },
        { name: meta.title, path: `/articles/${slug}` },
      ]} />
      <ArticleJsonLd
        headline={meta.title}
        description={meta.description}
        slug={slug}
        datePublished={meta.date}
      />

      <div className="mb-2">
        <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-600">
          ← 解説記事一覧
        </Link>
      </div>

      <div className="mb-2 flex flex-wrap gap-1">
        {meta.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-1 text-2xl font-black text-gray-900 leading-snug">{meta.title}</h1>
      <p className="mb-8 text-xs text-gray-400">
        公開: {new Date(meta.date).toLocaleDateString("ja-JP")}
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <p dangerouslySetInnerHTML={{ __html: art.intro }} />
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">通行制限・基本ルール</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">車種</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">排気量</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">{art.tableHeaders[0]}</th>
                  <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">{art.tableHeaders[1]}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付一種</td>
                  <td className="border border-gray-200 px-3 py-2">50cc以下</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">原付二種</td>
                  <td className="border border-gray-200 px-3 py-2">51〜125cc</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-red-600 font-bold">全線禁止</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">普通二輪・大型二輪</td>
                  <td className="border border-gray-200 px-3 py-2">126cc以上</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                  <td className="border border-gray-200 px-3 py-2 text-center text-green-600 font-bold">基本可</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">主要高速道路の通行禁止区間</h2>
          <div className="space-y-3">
            {art.highways.map(({ label, name, detail }) => (
              <div key={name} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{label}</span>
                  <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">一般道での注意点</h2>
          <p className="mb-3">{art.generalNotesPara}</p>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
            <strong>注意：</strong>{art.warningBox}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">代替ルートのヒント</h2>
          <p className="mb-2">高速道路が使えない原付の場合の主な代替ルートです。</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {art.altRoutes.map((r, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: r }} />
            ))}
          </ul>
          <p className="mt-3">
            BikeRoute のルートチェック機能を使えば、出発地・目的地と車種を入力するだけで
            自動車専用区間を含まない安全なルートを確認できます。
          </p>
        </section>

        <section className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
          <p>
            標識の見分け方やよくある質問は、専用ページで詳しく解説しています：{" "}
            <Link href="/articles/bike-no-entry-signs" className="text-orange-600 underline">
              二輪通行禁止の標識の見分け方
            </Link>
            {" ・ "}
            <Link href="/faq" className="text-orange-600 underline">
              よくある質問
            </Link>
          </p>
        </section>

        <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
          <p className="font-bold text-gray-900 mb-1">{art.ctaTitle}</p>
          <p className="text-sm text-gray-700 mb-3">{art.ctaBody}</p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            ルートをチェックする →
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">関連情報</h2>
          <ul className="space-y-2">
            {art.relatedLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-orange-600 underline text-sm">
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}
