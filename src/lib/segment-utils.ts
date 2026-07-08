import type { SegmentListItem } from "@/lib/supabase/types";

/**
 * セグメント中点の Google ストリートビュー URL を返す。
 * 始点・終点の座標が揃っていない場合は null。
 */
export function streetViewMapsUrl(seg: SegmentListItem): string | null {
  if (
    seg.start_lat == null ||
    seg.end_lat == null ||
    seg.start_lng == null ||
    seg.end_lng == null
  ) {
    return null;
  }
  const midLat = (seg.start_lat + seg.end_lat) / 2;
  const midLng = (seg.start_lng + seg.end_lng) / 2;
  return `https://maps.google.com/?cbll=${midLat},${midLng}&layer=c`;
}

/**
 * road_name で重複除去する（street_view_url を持つものを優先して残す）。
 * road_name が無いものは id をキーにするため除去されない。
 */
export function dedupeByRoadName(segments: SegmentListItem[]): SegmentListItem[] {
  const sorted = [...segments].sort(
    (a, b) => (b.street_view_url ? 1 : 0) - (a.street_view_url ? 1 : 0)
  );
  const seen = new Set<string>();
  return sorted.filter((seg) => {
    const key = seg.road_name ?? seg.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
