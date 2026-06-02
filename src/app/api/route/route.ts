import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { computeRoute } from "@/lib/routes-api";
import { decodePolyline, toLineStringWKT } from "@/lib/polyline";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildGoogleMapsUrl } from "@/lib/vehicle";
import type { VehicleClass } from "@/lib/vehicle";
import type { SegmentRow } from "@/lib/supabase/types";

export interface RouteCheckResult {
  mapsUrl: string;
  distanceMeters: number;
  durationSeconds: number;
  encodedPolyline: string;
  restrictions: Pick<
    SegmentRow,
    "id" | "road_name" | "prefecture" | "description" | "applies_to" | "source" | "coordinate_accuracy" | "start_lat" | "start_lng" | "end_lat" | "end_lng"
  >[];
}

// POST /api/route
export async function POST(request: NextRequest) {
  // レートリミット (IPベース)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。1分後に再試行してください。" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const body = await request.json();
  const { origin, destination, vehicleClass } = body as {
    origin: string;
    destination: string;
    vehicleClass: VehicleClass;
  };

  if (!origin || !destination || !vehicleClass) {
    return NextResponse.json({ error: "origin・destination・vehicleClass は必須です" }, { status: 400 });
  }

  try {
    // 1. Google Routes API でルート計算
    const routeResult = await computeRoute({ origin, destination, vehicleClass });

    // 2. Polylineをデコード → WKT
    const points = decodePolyline(routeResult.encodedPolyline);
    const lineStringWKT = toLineStringWKT(points);

    // 3. PostGIS空間照合 (RPC)
    const supabase = await createServerSupabaseClient();
    const { data: restrictions, error } = await supabase.rpc("check_route_restrictions", {
      route_wkt: lineStringWKT,
      vehicle: vehicleClass,
    });

    if (error) {
      console.error("PostGIS照合エラー:", error);
      // 照合に失敗してもルートURLは返す
    }

    // 4. Google Maps URLを生成
    const mapsUrl = buildGoogleMapsUrl({ origin, destination, vehicleClass });

    const result: RouteCheckResult = {
      mapsUrl,
      distanceMeters: routeResult.distanceMeters,
      durationSeconds: routeResult.durationSeconds,
      encodedPolyline: routeResult.encodedPolyline,
      restrictions: (restrictions as SegmentRow[] | null) ?? [],
    };

    return NextResponse.json(result, {
      headers: { "X-RateLimit-Remaining": String(rateLimit.remaining) },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "ルート計算に失敗しました";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
