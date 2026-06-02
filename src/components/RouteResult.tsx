"use client";

import dynamic from "next/dynamic";
import type { RouteCheckResult } from "@/app/api/route/route";

const RouteMap = dynamic(
  () => import("@/components/RouteMap").then((m) => m.RouteMap),
  { ssr: false, loading: () => <div className="h-56 w-full animate-pulse rounded-xl bg-gray-100 sm:h-72" /> }
);

const SOURCE_LABELS: Record<string, string> = {
  jmpsa: "JMPSA公式",
  mlit: "国土数値情報",
  osm: "OpenStreetMap",
  user: "ユーザー投稿",
};

const VEHICLE_LABELS: Record<string, string> = {
  genki1: "原付一種",
  genki2: "原付二種",
  normal: "普通二輪以上",
};

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}時間${m}分` : `${m}分`;
}

function formatDistance(meters: number): string {
  return meters >= 1000
    ? `${(meters / 1000).toFixed(1)} km`
    : `${meters} m`;
}

interface Props {
  result: RouteCheckResult;
  onOpenMaps: () => void;
}

export function RouteResult({ result, onOpenMaps }: Props) {
  const hasRestrictions = result.restrictions.length > 0;

  return (
    <div className="space-y-4">
      {/* ルート概要 */}
      <div className="flex items-center gap-4 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
        <span>🛣️ {formatDistance(result.distanceMeters)}</span>
        <span>⏱️ {formatDuration(result.durationSeconds)}</span>
      </div>

      {/* ルート地図（青=ルート、赤=規制区間） */}
      <RouteMap result={result} />

      {/* 警告バナー */}
      {hasRestrictions ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 font-bold text-red-700">
            <span>⚠️</span>
            <span>通行禁止区間が {result.restrictions.length} 件含まれています</span>
          </div>
          <p className="mt-1 text-sm text-red-600">
            このルートにはあなたの車種が通行できない区間が含まれる可能性があります。
            Googleマップを開く前に必ず下記の区間を確認してください。
          </p>

          <ul className="mt-3 space-y-2">
            {result.restrictions.map((seg) => {
              const isApproximate = seg.coordinate_accuracy === "municipality";
              return (
                <li
                  key={seg.id}
                  className={[
                    "rounded-lg p-3 text-sm shadow-sm",
                    isApproximate ? "bg-orange-50 border border-orange-200" : "bg-white",
                  ].join(" ")}
                >
                  <div className="font-semibold text-gray-900">
                    {seg.road_name ?? "道路名未設定"}
                    {seg.prefecture && (
                      <span className="ml-1 font-normal text-gray-500">
                        ({seg.prefecture})
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-1">
                    {seg.applies_to.map((vc: string) => (
                      <span
                        key={vc}
                        className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                      >
                        {VEHICLE_LABELS[vc] ?? vc}
                      </span>
                    ))}
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      出典: {SOURCE_LABELS[seg.source] ?? seg.source}
                    </span>
                    {isApproximate && (
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                        📍 位置概算
                      </span>
                    )}
                  </div>
                  {seg.description && (
                    <p className="mt-1 text-xs text-gray-600">{seg.description}</p>
                  )}
                  {isApproximate && (
                    <p className="mt-1.5 text-xs text-orange-600">
                      ⚠️ この区間は市区町村レベルの概算位置です。正確な位置は道路標識で確認してください。
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 font-bold text-green-700">
            <span>✅</span>
            <span>既知の通行禁止区間は検出されませんでした</span>
          </div>
          <p className="mt-1 text-sm text-green-600">
            データベースに登録された区間との照合結果です。走行時は必ず道路標識を確認してください。
          </p>
        </div>
      )}

      {/* Google Maps ボタン */}
      <button
        onClick={onOpenMaps}
        className={[
          "w-full rounded-xl py-4 text-base font-bold text-white shadow-md transition-colors",
          hasRestrictions
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-orange-500 hover:bg-orange-600",
        ].join(" ")}
      >
        {hasRestrictions
          ? "⚠️ 注意してGoogleマップで開く →"
          : "Googleマップで開く →"}
      </button>
    </div>
  );
}
