import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { PREFECTURES, slugToName } from "@/lib/prefectures";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slugToName(slug);
  if (!name) return {};
  return {
    title: `${name}のバイク通行禁止区間`,
    description: `${name}のバイク・原付の通行禁止区間一覧。自動車専用道路・二輪通行禁止区間など、車種ごとに通れない道を確認できます。`,
  };
}

export function generateStaticParams() {
  return PREFECTURES.map((p) => ({ slug: p.slug }));
}

async function getSegments(prefectureName: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("restricted_segments")
    .select(
      "id, applies_to, road_name, prefecture, description, status, verification_count, created_at, source"
    )
    .eq("status", "verified")
    .eq("prefecture", prefectureName)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return [];
  return data ?? [];
}

async function getTotalCount(prefectureName: string): Promise<number> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.rpc("get_prefecture_segment_count", {
    p_prefecture: prefectureName,
  });
  return Number(data ?? 0);
}

const VEHICLE_LABEL: Record<string, string> = {
  genki1: "原付一種",
  genki2: "原付二種",
  normal: "普通二輪以上",
};

export default async function PrefecturePage({ params }: Props) {
  const { slug } = await params;
  const prefectureName = slugToName(slug);
  if (!prefectureName) notFound();

  const [segments, totalCount] = await Promise.all([
    getSegments(prefectureName),
    getTotalCount(prefectureName),
  ]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <Link
          href="/prefectures"
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          ← 都道府県一覧
        </Link>
        <h1 className="mt-1 text-2xl font-black text-gray-900">
          {prefectureName}のバイク通行禁止区間
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {totalCount.toLocaleString()} 件の通行禁止区間を収録
          {totalCount > segments.length && `（上位 ${segments.length} 件を表示）`}
        </p>
      </div>

      {segments.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          <p>{prefectureName}の通行禁止区間データはまだ登録されていません。</p>
          <p className="mt-2">
            情報をお持ちの方は{" "}
            <Link href="/segments/new" className="text-orange-600 underline">
              投稿フォーム
            </Link>
            からご協力ください。
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 rounded-lg bg-orange-50 p-3 text-sm text-orange-800">
            ルート上の通行禁止区間を自動チェックするには{" "}
            <Link href="/" className="underline font-medium">
              ルート検索
            </Link>
            をお使いください。
          </div>

          <ul className="space-y-3">
            {segments.map((seg) => (
              <li
                key={seg.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap gap-1 mb-2">
                  {(seg.applies_to as string[]).map((vc) => (
                    <span
                      key={vc}
                      className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"
                    >
                      {VEHICLE_LABEL[vc] ?? vc}
                    </span>
                  ))}
                  {seg.source === "user" && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      ユーザー投稿
                    </span>
                  )}
                </div>

                {seg.road_name && (
                  <p className="font-medium text-gray-800 text-sm">{seg.road_name}</p>
                )}
                {seg.description && (
                  <p className="mt-1 text-sm text-gray-600">{seg.description}</p>
                )}

                <p className="mt-2 text-xs text-gray-400">
                  確認数: {seg.verification_count} ·{" "}
                  {new Date(seg.created_at).toLocaleDateString("ja-JP")}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* 関連解説記事 */}
      <div className="mt-10 border-t border-gray-100 pt-6">
        <p className="text-xs font-bold text-gray-500 mb-3">関連解説記事</p>
        <ul className="space-y-2">
          {[
            ...(slug === "tokyo" || slug === "kanagawa"
              ? [{ href: "/articles/shutoko-bike-restriction", label: "首都高バイク通行禁止区間まとめ" }]
              : []),
            { href: "/articles/bike-traffic-rules", label: "原付・125cc・二輪の通行ルール完全ガイド" },
            { href: "/articles/bike-no-entry-signs", label: "二輪通行禁止の標識の見分け方" },
            { href: "/articles/125cc-road-guide", label: "原付二種で通れる道・通れない道" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-sm text-orange-600 hover:underline">
                → {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700">
        <p className="font-bold text-gray-900 mb-1">データに誤りがある場合</p>
        <p>
          <a
            href="https://github.com/shibata-kento/bikeroute/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            GitHub Issues
          </a>
          までご報告ください。
        </p>
      </div>
    </main>
  );
}
