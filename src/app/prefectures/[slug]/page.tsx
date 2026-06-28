import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { PREFECTURES, slugToName } from "@/lib/prefectures";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PrefectureSegmentMap } from "@/components/PrefectureSegmentMap";
import type { SegmentListItem } from "@/lib/supabase/types";

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

async function getSegments(prefectureName: string): Promise<SegmentListItem[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("list_restricted_segments", {
    p_prefecture: prefectureName,
    p_status: "verified",
    p_limit: 200,
  });

  if (error) return [];
  return (data ?? []) as SegmentListItem[];
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

const PREFECTURE_INFO: Record<string, { summary: string; roads: { name: string; note: string }[]; articleHref?: string; articleLabel?: string }> = {
  tokyo: {
    summary: "東京都内では首都高速道路（全線）が自動車専用道路に指定されており、原付一種・原付二種は通行できません。また、C2中央環状線の山手トンネルは普通二輪以上も通行禁止です。",
    roads: [
      { name: "首都高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "C2山手トンネル", note: "二輪車全車種 通行禁止" },
      { name: "東京外環自動車道", note: "原付一種・二種 通行禁止" },
    ],
    articleHref: "/articles/shutoko-bike-restriction",
    articleLabel: "首都高バイク通行禁止区間まとめ",
  },
  kanagawa: {
    summary: "神奈川県では首都高速神奈川線（横羽線・湾岸線）・第三京浜・横浜横須賀道路・横浜新道・小田原厚木道路などが自動車専用道路に指定されており、原付は通行できません。",
    roads: [
      { name: "首都高 横羽線（K1）", note: "原付一種・二種 通行禁止" },
      { name: "首都高 湾岸線（K3・K5）", note: "原付一種・二種 通行禁止" },
      { name: "第三京浜道路", note: "原付一種・二種 通行禁止" },
      { name: "横浜横須賀道路", note: "原付一種・二種 通行禁止" },
    ],
    articleHref: "/articles/kanagawa-bike-restriction",
    articleLabel: "神奈川のバイク通行禁止区間まとめ",
  },
  osaka: {
    summary: "大阪府では阪神高速道路（全線）が自動車専用道路に指定されており、原付一種・原付二種は通行できません。大阪港トンネル・夢咲トンネルは普通二輪以上も通行禁止です。",
    roads: [
      { name: "阪神高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "大阪港トンネル", note: "二輪車全車種 通行禁止" },
      { name: "夢咲トンネル", note: "二輪車全車種 通行禁止" },
      { name: "近畿自動車道", note: "原付一種・二種 通行禁止" },
    ],
    articleHref: "/articles/osaka-bike-restriction",
    articleLabel: "大阪のバイク通行禁止区間まとめ",
  },
  aichi: {
    summary: "愛知県では名古屋高速道路（全線）・東名高速・新東名高速・伊勢湾岸自動車道などが自動車専用道路に指定されており、原付一種・原付二種は通行できません。",
    roads: [
      { name: "名古屋高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "東名高速道路", note: "原付一種・二種 通行禁止" },
      { name: "伊勢湾岸自動車道", note: "原付一種・二種 通行禁止" },
    ],
  },
  fukuoka: {
    summary: "福岡県では福岡都市高速道路（全線）が自動車専用道路に指定されています。また若戸トンネルは126cc以上の二輪車も通行禁止となる区間として知られています。",
    roads: [
      { name: "福岡都市高速道路（全線）", note: "原付一種・二種 通行禁止" },
      { name: "若戸トンネル", note: "二輪車全車種 通行禁止" },
      { name: "九州自動車道", note: "原付一種・二種 通行禁止" },
    ],
  },
  hyogo: {
    summary: "兵庫県では阪神高速道路（全線）と播但連絡道路・姫路バイパスなどが自動車専用道路に指定されており、原付は通行できません。",
    roads: [
      { name: "阪神高速道路（神戸線・湾岸線）", note: "原付一種・二種 通行禁止" },
      { name: "播但連絡道路", note: "原付一種・二種 通行禁止" },
      { name: "姫路バイパス（自動車専用区間）", note: "原付一種・二種 通行禁止" },
    ],
  },
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
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "都道府県別", path: "/prefectures" },
        { name: prefectureName, path: `/prefectures/${slug}` },
      ]} />
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

      {PREFECTURE_INFO[slug] && (
        <div className="mb-6 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm text-gray-700">
          <p className="mb-3">{PREFECTURE_INFO[slug].summary}</p>
          <ul className="space-y-1">
            {PREFECTURE_INFO[slug].roads.map((r) => (
              <li key={r.name} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">禁止</span>
                <span><span className="font-medium">{r.name}</span> — {r.note}</span>
              </li>
            ))}
          </ul>
          {PREFECTURE_INFO[slug].articleHref && (
            <Link
              href={PREFECTURE_INFO[slug].articleHref!}
              className="mt-3 inline-block text-xs text-orange-600 underline"
            >
              → {PREFECTURE_INFO[slug].articleLabel}
            </Link>
          )}
        </div>
      )}

      <PrefectureSegmentMap segments={segments} />

      {/* 全都道府県共通の通行禁止解説 */}
      <section className="mb-6 space-y-4 text-sm leading-relaxed text-gray-700">
        <h2 className="text-base font-bold text-gray-900">{prefectureName}でバイク・原付が走る前に知っておくべきこと</h2>
        <p>
          {prefectureName}を走るバイク・原付ライダーは、道路の種別によって通行できるかどうかが車種ごとに異なります。
          Googleマップは車種を考慮しないため、原付が通れない自動車専用道路を案内してしまうケースがあります。
          出発前にルートを確認する習慣をつけましょう。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-800">道路の種類</th>
                <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付一種（〜50cc）</th>
                <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">原付二種（〜125cc）</th>
                <th className="border border-gray-200 px-3 py-2 text-center font-bold text-gray-800">普通二輪以上（126cc〜）</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["高速道路", "禁止", "禁止", "通行可"],
                ["自動車専用道路（首都高・都市高速など）", "禁止", "禁止", "通行可"],
                ["自動車専用指定のないバイパス", "禁止", "通行可", "通行可"],
                ["二輪車通行禁止区間（トンネルなど）", "禁止", "禁止", "禁止"],
                ["一般道", "通行可", "通行可", "通行可"],
              ].map(([road, v1, v2, normal]) => (
                <tr key={road}>
                  <td className="border border-gray-200 px-3 py-2 font-medium">{road}</td>
                  {[v1, v2, normal].map((val, i) => (
                    <td key={i} className={`border border-gray-200 px-3 py-2 text-center text-xs font-bold ${val === "禁止" ? "text-red-600 bg-red-50" : "text-green-700"}`}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-xs text-yellow-800">
          <strong>注意：</strong> 2025年11月以降の新基準原付（125cc以下・最高出力4kW以下）は原付一種と同じ扱いです。自動車専用道路・高速道路は通行できません。
        </div>

        <p>
          BikeRoute では出発地・目的地・車種を入力するだけで、ルート上に通行禁止区間が含まれていないかを自動判定します。
          {prefectureName}内のルートも事前確認にご活用ください。
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600"
        >
          {prefectureName}のルートをチェックする →
        </Link>
      </section>

      {segments.length === 0 ? (
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-5 text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-1">{prefectureName}の個別区間データ</p>
          <p>
            現在、{prefectureName}の個別通行禁止区間データは収録中です。
            全国の高速道路・自動車専用道路はルート検索で自動判定されます。
          </p>
          <p className="mt-2">
            地域の二輪禁止トンネル・原付通行禁止区間をご存知の方は{" "}
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
            {segments.map((seg, i) => {
              const midLat = seg.start_lat != null && seg.end_lat != null
                ? (seg.start_lat + seg.end_lat) / 2 : null;
              const midLng = seg.start_lng != null && seg.end_lng != null
                ? (seg.start_lng + seg.end_lng) / 2 : null;
              const mapsUrl = midLat != null && midLng != null
                ? `https://maps.google.com/?cbll=${midLat},${midLng}&layer=c`
                : null;

              return (
              <li
                key={seg.id}
                className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Street View サムネイル — 最初の3枚は eager、以降は lazy */}
                {seg.street_view_url && mapsUrl && (
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={seg.street_view_url}
                      alt={seg.road_name ?? "通行禁止区間"}
                      className="w-full h-36 object-cover"
                      loading={i < 3 ? "eager" : "lazy"}
                      fetchPriority={i < 3 ? "high" : "low"}
                    />
                  </a>
                )}

                <div className="p-4">
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

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      確認数: {seg.verification_count} ·{" "}
                      {new Date(seg.created_at).toLocaleDateString("ja-JP")}
                    </p>
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-orange-500 hover:underline"
                      >
                        地図で見る →
                      </a>
                    )}
                  </div>
                </div>
              </li>
              );
            })}
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
