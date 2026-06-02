"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Polyline } from "leaflet";
import type { SegmentListItem } from "@/lib/supabase/types";

interface Props {
  segments: SegmentListItem[];
}

export function SegmentMap({ segments }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const polylinesRef = useRef<Record<string, Polyline>>({});

  // セグメントが変わったときに地図を再描画
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current) return;

      mapRef.current?.remove();
      mapRef.current = null;
      polylinesRef.current = {};

      const map = L.map(containerRef.current, { zoomControl: true });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      const withCoords = segments.filter(
        (s) => s.start_lat != null && s.start_lng != null && s.end_lat != null && s.end_lng != null
      );

      const bounds = L.latLngBounds([]);

      for (const seg of withCoords) {
        const start = L.latLng(seg.start_lat!, seg.start_lng!);
        const end = L.latLng(seg.end_lat!, seg.end_lng!);
        const isApprox =
          (seg as SegmentListItem & { coordinate_accuracy?: string }).coordinate_accuracy === "municipality";
        const color = isApprox ? "#f97316" : "#ef4444";
        const line = L.polyline([start, end], {
          color,
          weight: 5,
          opacity: 0.85,
        }).addTo(map);
        line.bindPopup(
          `<strong>${seg.road_name ?? "道路名未設定"}</strong>${seg.prefecture ? `<br>${seg.prefecture}` : ""}${seg.description ? `<br><span style="font-size:0.85em;color:#555">${seg.description}</span>` : ""}`
        );
        polylinesRef.current[seg.id] = line;
        bounds.extend(start);
        bounds.extend(end);
      }

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [24, 24] });
      } else {
        map.setView([36.2, 138.0], 5);
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      polylinesRef.current = {};
    };
  }, [segments]);

  return (
    <div
      ref={containerRef}
      className="h-64 w-full rounded-xl border border-gray-200 sm:h-80"
      aria-label="通行禁止区間地図"
    />
  );
}
