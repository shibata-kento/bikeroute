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
  return { title: meta.title, description: meta.description };
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

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">道路標識の見分け方</h2>
          <p className="mb-3">
            原付ライダーが特に注意すべき標識は「<strong>自動車専用</strong>」（青地に白文字で「自動車専用」と書かれた標識）です。
            この標識がある道路は、原付一種・原付二種を含むすべての原動機付自転車が通行禁止です。
            高速道路の本線入口や、バイパスの一部区間に設置されています。
          </p>
          <p className="mb-3">
            これとは別に「<strong>二輪の自動車以外の自動車通行止め</strong>」という標識もあります。
            こちらはトラックなどの大型車を規制するもので、バイクは通行可能です。
            似た見た目でも意味が異なるため、標識の文字を必ず確認してください。
          </p>
          <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
            <strong>ポイント：</strong>
            「自動車専用」標識のある道路への原付の進入は、道路交通法違反（違反点数2点・反則金あり）となります。
            知らずに進入した場合でも罰則が適用されます。出発前のルート確認が重要です。
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">よくある質問</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">Q. 原付二種（125cc以下）は高速道路に乗れますか？</p>
              <p className="text-sm text-gray-700">
                乗れません。原付二種（51〜125cc）は法律上「原動機付自転車」に分類されるため、
                高速自動車国道および自動車専用道路はすべて通行禁止です。
                排気量が50ccを超えていても、125cc以下であれば同様の規制が適用されます。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">Q. Google マップのナビが高速道路を案内してきた場合はどうすればいいですか？</p>
              <p className="text-sm text-gray-700">
                Google マップは車種の排気量を考慮しないため、原付でも高速道路を含むルートを案内することがあります。
                案内に従わず、一般道のみのルートを自分で設定し直すか、
                BikeRoute を使って車種に合った安全なルートを事前に確認してください。
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-bold text-gray-900 text-sm mb-1">Q. 「自動車専用道路」と「高速自動車国道」は何が違いますか？</p>
              <p className="text-sm text-gray-700">
                高速自動車国道（東名・中央道・東北道など）は国が指定した高速道路で、原付・軽車両は全線通行禁止です。
                自動車専用道路はそれ以外の道路でも「自動車専用」の標識がある区間を指し、バイパスや都市高速の一部が該当します。
                どちらも原付一種・二種は通行できません。
              </p>
            </div>
          </div>
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
