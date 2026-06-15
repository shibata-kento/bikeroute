"use client";

import dynamic from "next/dynamic";
import type { SegmentListItem } from "@/lib/supabase/types";

const SegmentMap = dynamic(
  () => import("@/components/SegmentMap").then((m) => m.SegmentMap),
  { ssr: false, loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-gray-100 sm:h-80" /> }
);

export function PrefectureSegmentMap({ segments }: { segments: SegmentListItem[] }) {
  const hasCoords = segments.some((s) => s.start_lat != null);
  if (!hasCoords) return null;
  return (
    <div className="mb-4">
      <SegmentMap segments={segments} />
    </div>
  );
}
