"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { VEHICLES, type VehicleClass } from "@/lib/vehicle";
import type { LatLng } from "@/components/SegmentMapPicker";
import { PREFECTURES } from "@/lib/prefectures";

const SegmentMapPicker = dynamic(
  () => import("@/components/SegmentMapPicker").then((m) => m.SegmentMapPicker),
  { ssr: false, loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-gray-100 sm:h-80" /> }
);

export function SegmentForm() {
  const router = useRouter();
  const [roadName, setRoadName] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [description, setDescription] = useState("");
  const [appliesTo, setAppliesTo] = useState<VehicleClass[]>(["genki1", "genki2"]);
  const [start, setStart] = useState<LatLng | null>(null);
  const [end, setEnd] = useState<LatLng | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleVehicle(vc: VehicleClass) {
    setAppliesTo((prev) =>
      prev.includes(vc) ? prev.filter((v) => v !== vc) : [...prev, vc]
    );
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (appliesTo.length === 0) {
      setError("対象車種を1つ以上選択してください");
      return;
    }
    if (!start || !end) {
      setError("地図で始点と終点を指定してください");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/segments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          road_name: roadName || null,
          prefecture: prefecture || null,
          description: description || null,
          applies_to: appliesTo,
          start_lat: start.lat,
          start_lng: start.lng,
          end_lat: end.lat,
          end_lng: end.lng,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "投稿に失敗しました");
      }

      router.push("/segments");
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿に失敗しました");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 対象車種 */}
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">対象車種（複数選択可）</p>
        <div className="flex flex-wrap gap-2">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => toggleVehicle(v.id)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                appliesTo.includes(v.id)
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-orange-300",
              ].join(" ")}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* 道路情報 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-gray-700">道路名</label>
          <input
            type="text"
            value={roadName}
            onChange={(e) => setRoadName(e.target.value)}
            placeholder="例: ○○バイパス"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">都道府県</label>
          <select
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">選択してください</option>
            {PREFECTURES.map((p) => (
              <option key={p.slug} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="規制の詳細・標識の内容など（例: 入口に「自動車専用」の標識あり）"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      {/* 地図ピッカー */}
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">
          区間を地図で指定
          <span className="ml-1 font-normal text-gray-400">（始点→終点の順にクリック）</span>
        </p>
        <SegmentMapPicker
          start={start}
          end={end}
          onChange={(s, en) => { setStart(s); setEnd(en); }}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !start || !end}
        className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-600 disabled:bg-gray-300"
      >
        {submitting ? "投稿中…" : !start || !end ? "地図で始点・終点を指定してください" : "投稿する"}
      </button>
    </form>
  );
}
