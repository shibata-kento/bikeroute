"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VEHICLES, type VehicleClass } from "@/lib/vehicle";

export function SegmentForm() {
  const router = useRouter();
  const [roadName, setRoadName] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [description, setDescription] = useState("");
  const [appliesTo, setAppliesTo] = useState<VehicleClass[]>(["genki1", "genki2"]);
  const [startLat, setStartLat] = useState("");
  const [startLng, setStartLng] = useState("");
  const [endLat, setEndLat] = useState("");
  const [endLng, setEndLng] = useState("");
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
          start_lat: parseFloat(startLat),
          start_lng: parseFloat(startLng),
          end_lat: parseFloat(endLat),
          end_lng: parseFloat(endLng),
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
          <input
            type="text"
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            placeholder="例: 神奈川県"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="規制の詳細・標識の内容など"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      {/* 座標入力 */}
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">
          区間の座標
          <span className="ml-1 font-normal text-gray-400">
            (Googleマップで右クリック → 「この場所について」で確認)
          </span>
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2 rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-500">始点</p>
            <input
              type="number"
              step="any"
              value={startLat}
              onChange={(e) => setStartLat(e.target.value)}
              placeholder="緯度 例: 35.6812"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
            <input
              type="number"
              step="any"
              value={startLng}
              onChange={(e) => setStartLng(e.target.value)}
              placeholder="経度 例: 139.7671"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2 rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-500">終点</p>
            <input
              type="number"
              step="any"
              value={endLat}
              onChange={(e) => setEndLat(e.target.value)}
              placeholder="緯度 例: 35.2325"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
            <input
              type="number"
              step="any"
              value={endLng}
              onChange={(e) => setEndLng(e.target.value)}
              placeholder="経度 例: 139.1069"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-600 disabled:bg-gray-300"
      >
        {submitting ? "投稿中…" : "投稿する"}
      </button>
    </form>
  );
}
