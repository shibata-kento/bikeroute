"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { SegmentListItem } from "@/lib/supabase/types";
import { CATEGORY_CONFIG, CATEGORY_LIST, type RestrictionCategory } from "@/lib/restriction-categories";

const SegmentMap = dynamic(
  () => import("@/components/SegmentMap").then((m) => m.SegmentMap),
  { ssr: false, loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-gray-100 sm:h-80" /> }
);

const CATEGORY_BADGE: Record<RestrictionCategory, string> = {
  all_bikes:  "bg-red-100 text-red-700",
  under125:   "bg-orange-100 text-orange-700",
  moped_only: "bg-yellow-100 text-yellow-700",
};

const LIST_LIMIT = 200;

export function SegmentList() {
  const [category, setCategory] = useState<RestrictionCategory>("all_bikes");
  const [userOnly, setUserOnly] = useState(false);
  const [segments, setSegments] = useState<SegmentListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      category,
      status: "verified",
      ...(userOnly ? { userOnly: "1" } : {}),
    });
    fetch(`/api/segments?${params}`)
      .then((r) => r.json())
      .then((data) => setSegments(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [category, userOnly]);

  const hasCoords = !loading && segments.some((s) => s.start_lat != null);

  // 地図は全件表示、リストは road_name で重複除去（street_view_url ありを優先）
  const listItems = (() => {
    const sorted = [...segments].sort((a, b) =>
      (b.street_view_url ? 1 : 0) - (a.street_view_url ? 1 : 0)
    );
    const seen = new Set<string>();
    return sorted.filter((seg) => {
      const key = seg.road_name ?? seg.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, LIST_LIMIT);
  })();

  return (
    <div className="space-y-4">
      {/* フィルター行 */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_LIST.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              category === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            ].join(" ")}
          >
            {CATEGORY_CONFIG[cat].label}
          </button>
        ))}
        <div className="ml-auto">
          <button
            onClick={() => setUserOnly((v) => !v)}
            className={[
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              userOnly
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 bg-white text-gray-600 hover:border-blue-300",
            ].join(" ")}
          >
            <span>{userOnly ? "✓" : ""} ユーザー投稿のみ</span>
          </button>
        </div>
      </div>

      {/* 高速道路バナー（125cc以下カテゴリ時） */}
      {category === "under125" && (
        <div className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-blue-700">
          ℹ️ 高速道路全線（約85,000区間）は125cc以下通行禁止です。個別区間はルート検索で自動判定されます。
        </div>
      )}

      {/* 地図（全件を赤線で表示） */}
      {hasCoords && <SegmentMap segments={segments} />}

      {loading && (
        <p className="text-center text-sm text-gray-400">読み込み中…</p>
      )}

      {!loading && segments.length === 0 && (
        <p className="text-center text-sm text-gray-400">データがありません。</p>
      )}

      {!loading && segments.length > 0 && (
        <p className="text-xs text-gray-400">
          {segments.length > LIST_LIMIT
            ? `全 ${segments.length} 件中 ${LIST_LIMIT} 件表示（地図には全件表示）`
            : `${segments.length} 件`}
        </p>
      )}

      <ul className="space-y-3">
        {listItems.map((seg) => {
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
              {/* Street View サムネイル */}
              {seg.street_view_url && mapsUrl && (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={seg.street_view_url}
                    alt={seg.road_name ?? "通行禁止区間"}
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                </a>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-gray-500">{seg.prefecture ?? ""}</div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      seg.status === "verified"
                        ? "bg-green-100 text-green-800"
                        : seg.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {seg.status === "verified" ? "確認済" : seg.status === "pending" ? "審査中" : "却下"}
                  </span>
                </div>

                {/* 道路名 */}
                {seg.road_name && (
                  <p className="mt-1 font-bold text-gray-900 text-sm">{seg.road_name}</p>
                )}

                <div className="mt-1 flex flex-wrap gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_BADGE[category]}`}>
                    {CATEGORY_CONFIG[category].label}
                  </span>
                  {seg.source === "user" && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      ユーザー投稿
                    </span>
                  )}
                  {seg.coordinate_accuracy === "municipality" && (
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                      📍 位置概算
                    </span>
                  )}
                </div>

                {seg.description && (
                  <p className="mt-1 text-sm text-gray-700">{seg.description}</p>
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
    </div>
  );
}
