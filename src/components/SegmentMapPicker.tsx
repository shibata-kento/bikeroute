"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

export type LatLng = { lat: number; lng: number };

type Props = {
  start: LatLng | null;
  end: LatLng | null;
  onChange: (start: LatLng | null, end: LatLng | null) => void;
};

export function SegmentMapPicker({ start, end, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Store Leaflet instances in refs so we don't recreate on every render
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const startMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const endMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const lineRef = useRef<import("leaflet").Polyline | null>(null);
  // Track current state inside the click handler without a closure trap
  const stateRef = useRef<{ start: LatLng | null; end: LatLng | null }>({ start, end });

  useEffect(() => {
    stateRef.current = { start, end };
  }, [start, end]);

  // Initialize map once
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    let L: typeof import("leaflet");
    let destroyed = false;

    import("leaflet").then((mod) => {
      if (destroyed) return;
      L = mod.default ?? mod;

      // Fix default icon paths for Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, { zoomControl: true }).setView(
        [36.5, 137.0],
        5
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);
      mapRef.current = map;

      const startIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      const endIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      map.on("click", (e: import("leaflet").LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const cur = stateRef.current;

        if (!cur.start) {
          // 1クリック目: 始点
          if (startMarkerRef.current) startMarkerRef.current.remove();
          startMarkerRef.current = L.marker([lat, lng], { icon: startIcon })
            .bindPopup("始点")
            .addTo(map);
          onChange({ lat, lng }, null);
        } else if (!cur.end) {
          // 2クリック目: 終点
          if (endMarkerRef.current) endMarkerRef.current.remove();
          endMarkerRef.current = L.marker([lat, lng], { icon: endIcon })
            .bindPopup("終点")
            .addTo(map);
          if (lineRef.current) lineRef.current.remove();
          lineRef.current = L.polyline(
            [[cur.start.lat, cur.start.lng], [lat, lng]],
            { color: "orange", weight: 3 }
          ).addTo(map);
          onChange(cur.start, { lat, lng });
        } else {
          // 3クリック目: リセットして始点からやり直し
          if (startMarkerRef.current) startMarkerRef.current.remove();
          if (endMarkerRef.current) endMarkerRef.current.remove();
          if (lineRef.current) lineRef.current.remove();
          endMarkerRef.current = null;
          lineRef.current = null;
          startMarkerRef.current = L.marker([lat, lng], { icon: startIcon })
            .bindPopup("始点")
            .addTo(map);
          onChange({ lat, lng }, null);
        }
      });
    });

    return () => {
      destroyed = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        startMarkerRef.current = null;
        endMarkerRef.current = null;
        lineRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = !start ? "始点" : !end ? "終点" : "完了";
  const stepColor = !start
    ? "bg-blue-50 text-blue-700 border-blue-200"
    : !end
    ? "bg-orange-50 text-orange-700 border-orange-200"
    : "bg-green-50 text-green-700 border-green-200";

  return (
    <div className="space-y-2">
      <div className={`rounded-lg border px-3 py-2 text-xs ${stepColor}`}>
        {step === "始点" && "地図をクリックして通行禁止区間の「始点（入口）」を指定してください"}
        {step === "終点" && "次に「終点（出口）」をクリックしてください"}
        {step === "完了" && (
          <span>
            区間を指定しました。
            <button
              type="button"
              className="ml-2 underline"
              onClick={() => {
                if (startMarkerRef.current) startMarkerRef.current.remove();
                if (endMarkerRef.current) endMarkerRef.current.remove();
                if (lineRef.current) lineRef.current.remove();
                startMarkerRef.current = null;
                endMarkerRef.current = null;
                lineRef.current = null;
                onChange(null, null);
              }}
            >
              やり直す
            </button>
          </span>
        )}
      </div>

      <div ref={containerRef} className="h-64 w-full rounded-xl border border-gray-200 sm:h-80" />

      {(start || end) && (
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div className="rounded bg-gray-50 px-2 py-1">
            <span className="font-medium text-green-700">始点</span>{" "}
            {start ? `${start.lat.toFixed(5)}, ${start.lng.toFixed(5)}` : "未指定"}
          </div>
          <div className="rounded bg-gray-50 px-2 py-1">
            <span className="font-medium text-red-600">終点</span>{" "}
            {end ? `${end.lat.toFixed(5)}, ${end.lng.toFixed(5)}` : "未指定"}
          </div>
        </div>
      )}
    </div>
  );
}
