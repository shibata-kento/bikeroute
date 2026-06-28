/**
 * 通行禁止区間の road_name 補完と Street View 画像生成スクリプト
 *
 * 使い方:
 *   npm run fill:segments
 *
 * 必要な環境変数 (.env.local):
 *   GOOGLE_MAPS_API_KEY   — Geocoding API + Street View Static API が有効なキー
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { WebSocket as NodeWebSocket } from "ws";

// Node.js 20 はネイティブ WebSocket を持たないため polyfill
if (!("WebSocket" in globalThis)) {
  (globalThis as Record<string, unknown>).WebSocket = NodeWebSocket;
}

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing env: GOOGLE_MAPS_API_KEY / NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Geocoding API で座標から道路名を取得
 *  日本の高速道路は "route" タイプを持たないため、複数タイプと
 *  formatted_address をフォールバックとして使用する
 */
async function getRoadName(lat: number, lng: number): Promise<string | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ja&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = (await res.json()) as {
    status: string;
    results: Array<{
      formatted_address: string;
      address_components: Array<{ long_name: string; types: string[] }>;
    }>;
  };

  if (data.status !== "OK" || data.results.length === 0) return null;

  // 優先度順にタイプを探す
  const PRIORITY_TYPES = ["route", "establishment", "point_of_interest", "premise"];
  for (const result of data.results) {
    for (const type of PRIORITY_TYPES) {
      for (const comp of result.address_components) {
        if (comp.types.includes(type)) return comp.long_name;
      }
    }
  }

  // フォールバック: formatted_address の先頭部分（住所番号を除いた道路名部分）
  const addr = data.results[0].formatted_address;
  // 「日本、〒xxx-xxxx 北海道...」形式から道名部分を抽出
  const match = addr.match(/[　-鿿＀-￯A-Za-z][^\d,]+(?:道路?|高速|自動車道|街道|国道\d+号)/);
  return match ? match[0].trim() : null;
}

/** Street View が存在するか確認し、あれば画像バイト列を返す */
async function fetchStreetViewImage(lat: number, lng: number): Promise<Uint8Array | null> {
  const metaUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&radius=50&key=${GOOGLE_API_KEY}`;
  const meta = await (await fetch(metaUrl)).json() as { status: string };

  if (meta.status !== "OK") return null;

  const imgUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x360&location=${lat},${lng}&fov=80&key=${GOOGLE_API_KEY}`;
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) return null;

  return new Uint8Array(await imgRes.arrayBuffer());
}

/** Supabase Storage にアップロードして public URL を返す */
async function uploadImage(segmentId: string, img: Uint8Array): Promise<string | null> {
  const path = `${segmentId}.jpg`;
  const { error } = await supabase.storage
    .from("segment-images")
    .upload(path, img, { contentType: "image/jpeg", upsert: true });

  if (error) {
    console.error(`  upload error: ${error.message}`);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from("segment-images")
    .getPublicUrl(path);

  return publicUrl;
}

async function main() {
  // CLI 引数: --offset N --limit N
  const argv = process.argv.slice(2);
  const getArg = (flag: string, def: number) => {
    const i = argv.indexOf(flag);
    return i !== -1 ? parseInt(argv[i + 1], 10) : def;
  };
  const offset = getArg("--offset", 0);
  const limit  = getArg("--limit", 1000);

  console.log(`Fetching verified segments (offset=${offset}, limit=${limit})...`);

  const { data: segments, error } = await supabase.rpc("list_restricted_segments", {
    p_status: "verified",
    p_limit: limit,
    p_offset: offset,
  });

  if (error) throw error;

  type Seg = {
    id: string;
    road_name: string | null;
    street_view_url: string | null;
    start_lat: number;
    start_lng: number;
    end_lat: number;
    end_lng: number;
  };

  const toUpdate = (segments as Seg[]).filter(
    (s) => !s.road_name || !s.street_view_url
  );

  console.log(`${toUpdate.length} / ${(segments as Seg[]).length} segments need update\n`);

  let done = 0;
  for (const seg of toUpdate) {
    const midLat = (seg.start_lat + seg.end_lat) / 2;
    const midLng = (seg.start_lng + seg.end_lng) / 2;
    const updates: Record<string, string> = {};

    // road_name 補完
    if (!seg.road_name) {
      const name = await getRoadName(midLat, midLng);
      if (name) updates.road_name = name;
      await sleep(200);
    }

    // Street View 画像
    if (!seg.street_view_url) {
      const img = await fetchStreetViewImage(midLat, midLng);
      if (img) {
        const url = await uploadImage(seg.id, img);
        if (url) updates.street_view_url = url;
      }
      await sleep(200);
    }

    if (Object.keys(updates).length > 0) {
      await supabase.from("restricted_segments").update(updates).eq("id", seg.id);
      done++;
      console.log(
        `[${done}/${toUpdate.length}] ${updates.road_name ?? seg.road_name ?? "（名称なし）"}` +
        (updates.street_view_url ? " + 📷" : "")
      );
    }
  }

  console.log(`\nDone: ${done} segments updated`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
