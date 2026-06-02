"use client";

import { useEffect, useState } from "react";
import type { VehicleClass, SegmentListItem } from "@/lib/supabase/types";

const VEHICLE_LABELS: Record<VehicleClass, string> = {
  genki1: "原付一種",
  genki2: "原付二種",
  normal: "普通二輪以上",
};

export function AdminList() {
  const [segments, setSegments] = useState<SegmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/segments");
    const data = await res.json();
    setSegments(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function act(id: string, action: "approve" | "reject") {
    setActing(id);
    await fetch(`/api/admin/segments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setActing(null);
    setSegments((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) {
    return <p className="text-sm text-gray-400">読み込み中…</p>;
  }

  if (segments.length === 0) {
    return (
      <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-400">
        審査待ちの投稿はありません
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {segments.map((seg) => {
        const mapUrl =
          seg.start_lat != null && seg.start_lng != null
            ? `https://www.google.com/maps?q=${seg.start_lat},${seg.start_lng}`
            : null;

        return (
          <li
            key={seg.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="font-semibold text-gray-900">
                  {seg.road_name ?? "道路名未設定"}
                </span>
                {seg.prefecture && (
                  <span className="ml-2 text-sm text-gray-500">{seg.prefecture}</span>
                )}
              </div>
              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                審査待ち
              </span>
            </div>

            <div className="mt-1 flex flex-wrap gap-1">
              {seg.applies_to.map((vc) => (
                <span
                  key={vc}
                  className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
                >
                  {VEHICLE_LABELS[vc]}
                </span>
              ))}
            </div>

            {seg.description && (
              <p className="mt-2 text-sm text-gray-600">{seg.description}</p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span>確認票: {seg.verification_count}</span>
              <span>{new Date(seg.created_at).toLocaleDateString("ja-JP")}</span>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  地図で確認
                </a>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => act(seg.id, "approve")}
                disabled={acting === seg.id}
                className="rounded-lg bg-green-500 px-4 py-1.5 text-sm font-bold text-white hover:bg-green-600 disabled:opacity-50"
              >
                承認
              </button>
              <button
                onClick={() => act(seg.id, "reject")}
                disabled={acting === seg.id}
                className="rounded-lg border border-red-300 px-4 py-1.5 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                却下
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
