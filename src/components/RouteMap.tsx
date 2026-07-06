"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { RouteCheckResult } from "@/app/api/route/route";
import { decodePolyline } from "@/lib/polyline";

interface Props {
  result: RouteCheckResult;
}

export function RouteMap({ result }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, { zoomControl: true });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      const bounds = L.latLngBounds([]);

      // ルートポリライン（青）
      const routePoints = decodePolyline(result.encodedPolyline);
      if (routePoints.length >= 2) {
        const latlngs = routePoints.map(([lat, lng]) => L.latLng(lat, lng));
        L.polyline(latlngs, { color: "#3b82f6", weight: 4, opacity: 0.8 }).addTo(map);
        latlngs.forEach((p) => bounds.extend(p));
      }

      // 規制区間（赤）
      for (const seg of result.restrictions) {
        const start = L.latLng(seg.start_lat, seg.start_lng);
        const end = L.latLng(seg.end_lat, seg.end_lng);
        const line = L.polyline([start, end], {
          color: "#ef4444",
          weight: 6,
          opacity: 0.9,
        }).addTo(map);
        line.bindPopup(
          `<strong>${seg.road_name ?? "道路名未設定"}</strong><br>${seg.description ?? ""}`
        );
        bounds.extend(start);
        bounds.extend(end);
      }

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [24, 24] });
      } else {
        map.setView([35.68, 139.69], 10);
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [result]);

  return (
    <div
      ref={containerRef}
      className="h-56 w-full rounded-xl border border-gray-200 sm:h-72"
      aria-label="ルート地図"
    />
  );
}
