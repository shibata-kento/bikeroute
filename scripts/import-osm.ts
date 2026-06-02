/**
 * OSM (OpenStreetMap) 道路制限データ取込スクリプト
 *
 * 取込対象:
 *   highway=motorway / motorway_link → 高速自動車国道・都市高速道路
 *     applies_to: genki1 (≤50cc) + genki2 (51-125cc) — 125cc以下通行禁止
 *   motorroad=yes (非motorway) → 自動車専用道路（バイパス等）
 *     applies_to: genki1 + genki2 — 道路法48条の7により125cc以下通行禁止
 *   motorcycle=no (非motorway/非motorroad) → 二輪通行禁止区間（トンネル等）
 *     applies_to: genki1 + genki2 + normal — 全二輪通行禁止
 *   moped=no (非motorroad/非motorcycle=no) → 原付通行禁止
 *     applies_to: genki1 (≤50cc) のみ通行禁止
 *
 * データソース: OpenStreetMap contributors (ODbL ライセンス)
 * Overpass API 経由で日本全国データを取得
 *
 * 使い方:
 *   npm run import:osm              # 取込実行
 *   npm run import:osm -- --dry-run # DB挿入なし、内容確認のみ
 */

// ---------------------------------------------------------------------------
// 環境変数
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// フォールバック付き Overpass API エンドポイント（kumi.systems を優先）
const OVERPASS_ENDPOINTS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
];

const OVERPASS_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
  "User-Agent": "BikeRoute/1.0 (https://github.com/vimallys/bikeroute; import-osm script)",
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------
type VehicleClass = "genki1" | "genki2" | "normal";

interface OsmWay {
  type: string;
  id: number;
  geometry: { lat: number; lon: number }[];
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OsmWay[];
}

interface OsmRecord {
  source_ref: string;
  road_name: string | null;
  description: string | null;
  applies_to: VehicleClass[];
  restriction_tag: string;
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  geometry_wkt: string;
}

// ---------------------------------------------------------------------------
// Overpass API 問い合わせ（フォールバック + リトライ付き）
// ---------------------------------------------------------------------------
const FETCH_TIMEOUT_MS = 180_000; // 3分

async function fetchOverpass(query: string, maxRetries = 3): Promise<OsmWay[]> {
  let lastErr: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (attempt > 0) {
      const delaySec = attempt * 15;
      process.stdout.write(`  ${delaySec}秒後にリトライ (${attempt}/${maxRetries - 1})... `);
      await sleep(delaySec * 1000);
    }
    process.stdout.write("  Overpass API 問い合わせ中... ");

    for (const endpoint of OVERPASS_ENDPOINTS) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      try {
        process.stdout.write(`(${new URL(endpoint).hostname}) `);
        const res = await fetch(endpoint, {
          method: "POST",
          headers: OVERPASS_HEADERS,
          body: `data=${encodeURIComponent(query)}`,
          signal: controller.signal,
        });
        if (!res.ok) {
          lastErr = new Error(`${endpoint}: ${res.status} ${res.statusText}`);
          process.stdout.write(`[${res.status}] `);
          continue;
        }
        const data = (await res.json()) as OverpassResponse;
        clearTimeout(timer);
        const ways = data.elements.filter(
          (e) => e.type === "way" && e.geometry && e.geometry.length >= 2
        );
        console.log(`${ways.length} ways`);
        return ways;
      } catch (err) {
        clearTimeout(timer);
        lastErr = err;
      }
    }
  }

  throw lastErr ?? new Error("Overpass API: 全エンドポイントで失敗");
}

// ---------------------------------------------------------------------------
// タグから道路名を抽出
// ---------------------------------------------------------------------------
function extractName(tags: Record<string, string> | undefined): string | null {
  if (!tags) return null;
  return tags["name:ja"] || tags["name"] || tags["ref"] || null;
}

// ---------------------------------------------------------------------------
// OSM Way → 挿入レコードに変換
// ---------------------------------------------------------------------------
function wayToRecord(way: OsmWay, appliesTo: VehicleClass[], restrictionTag: string): OsmRecord {
  const geom = way.geometry;
  const start = geom[0];
  const end = geom[geom.length - 1];

  // PostGIS WKT は POINT(lon lat) 順 (x y)
  const wktCoords = geom.map((n) => `${n.lon} ${n.lat}`).join(",");
  const geometry_wkt = `LINESTRING(${wktCoords})`;

  const tags = way.tags ?? {};
  const name = extractName(tags);
  const ref = tags["ref"] ?? null;

  let description: string | null = null;
  if (ref && name && !name.includes(ref)) {
    description = `${ref} ${name}`.trim();
  }

  return {
    source_ref: `way/${way.id}`,
    road_name: name,
    description,
    applies_to: appliesTo,
    restriction_tag: restrictionTag,
    start_lat: start.lat,
    start_lng: start.lon,
    end_lat: end.lat,
    end_lng: end.lon,
    geometry_wkt,
  };
}

// ---------------------------------------------------------------------------
// source_ref ベースのハッシュで重複除去
// ---------------------------------------------------------------------------
function dedup(records: OsmRecord[]): OsmRecord[] {
  const seen = new Map<string, OsmRecord>();
  for (const r of records) {
    if (!seen.has(r.source_ref)) seen.set(r.source_ref, r);
  }
  return [...seen.values()];
}

// ---------------------------------------------------------------------------
// Supabase (PostgREST) へ挿入
// ---------------------------------------------------------------------------
async function insertRecords(records: OsmRecord[], dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] 挿入予定データ（先頭5件）:");
    records.slice(0, 5).forEach((r, i) => {
      console.log(`\n  [${i + 1}] ${r.road_name ?? "(名称なし)"}`);
      console.log(`    source_ref : ${r.source_ref}`);
      console.log(`    applies_to : ${r.applies_to.join(", ")}`);
      const nodeCount = r.geometry_wkt.split(",").length;
      console.log(`    nodes      : ${nodeCount} ノード`);
      console.log(`    start      : (${r.start_lat.toFixed(5)}, ${r.start_lng.toFixed(5)})`);
      console.log(`    end        : (${r.end_lat.toFixed(5)}, ${r.end_lng.toFixed(5)})`);
    });
    console.log(`\n合計 ${records.length} 件 (--dry-run のためDB挿入なし)`);
    return;
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を .env.local に設定してください"
    );
    process.exit(1);
  }

  const POSTGREST_URL = `${SUPABASE_URL}/rest/v1/restricted_segments`;
  const headers: Record<string, string> = {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "resolution=ignore-duplicates",
  };

  const BATCH = 50;
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH);
    const rows = batch.map((r) => ({
      source: "osm",
      source_ref: r.source_ref,
      license: "odbl",
      applies_to: r.applies_to,
      restriction_tag: r.restriction_tag,
      road_name: r.road_name ?? null,
      prefecture: null,
      description: r.description ?? null,
      status: "verified",
      start_point: `POINT(${r.start_lng} ${r.start_lat})`,
      end_point: `POINT(${r.end_lng} ${r.end_lat})`,
      geometry: r.geometry_wkt,
    }));

    const res = await fetch(POSTGREST_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(rows),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`\nバッチ ${Math.floor(i / BATCH) + 1} でエラー: ${res.status} ${body}`);
      skipped += batch.length;
    } else {
      inserted += batch.length;
      process.stdout.write(`\r  ${inserted} / ${records.length} 件挿入済み...`);
    }

    if (i + BATCH < records.length) await sleep(200);
  }

  console.log(`\n\n完了: ${inserted} 件挿入, ${skipped} 件スキップ`);
}

// ---------------------------------------------------------------------------
// 日本領域のみをカバーする bounding box 一覧
// area["name"="日本"] フィルタは Overpass インスタンスによって動作しないため bbox を使用。
// 韓国・中国が bbox に含まれないよう経度を絞り込み済み。
// 重複する way は source_ref (way/ID) で除去される。
// 各 bbox は motorway クエリでも ~2MB 以下になるよう細分化済み。
// ---------------------------------------------------------------------------
const JAPAN_BBOXES: [number, number, number, number][] = [
  // [minLat, minLon, maxLat, maxLon]
  [24.0, 122.8, 29.0, 130.5], // 沖縄・先島諸島
  [28.0, 129.0, 31.5, 132.0], // 奄美・鹿児島南部
  [30.5, 129.5, 32.5, 131.0], // 九州南部（熊本・鹿児島北・宮崎）
  [32.0, 130.0, 34.5, 132.5], // 九州北部（福岡・佐賀・長崎・大分）
  [32.5, 132.0, 34.5, 134.8], // 四国
  [33.5, 130.5, 35.5, 133.0], // 中国西部（山口・島根・広島西）
  [34.0, 132.5, 36.0, 135.0], // 中国東部・近畿西（岡山・鳥取・兵庫）
  [34.0, 134.5, 36.0, 137.0], // 近畿（大阪・京都・奈良・滋賀）
  [34.5, 136.5, 37.0, 139.5], // 中部・東海（愛知・三重・岐阜・静岡）
  [35.0, 138.5, 36.5, 140.5], // 南関東（東京・神奈川・千葉・埼玉）
  [36.0, 138.5, 38.0, 141.5], // 北関東・南東北（栃木・茨城・群馬・福島）
  [36.5, 136.5, 39.0, 139.5], // 甲信越・北陸（長野・新潟・富山・石川）
  [38.0, 139.0, 41.0, 142.5], // 東北北部（宮城・岩手・秋田・青森）
  [41.5, 140.0, 44.0, 143.5], // 北海道南部（道南・道央）
  [43.0, 141.5, 45.6, 146.0], // 北海道北部・道東
];

function buildBboxQuery(tags: string, bbox: [number, number, number, number]): string {
  const [s, w, n, e] = bbox;
  const bboxStr = `${s},${w},${n},${e}`;
  return [
    `[out:json][timeout:120];`,
    `(`,
    ...tags.split("\n").map((t) => `  ${t}(${bboxStr});`),
    `);`,
    `out geom;`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// メイン
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  // --from-qi Q --from-bi B で途中から再開（失敗した地点を指定）
  const fromQiIdx = args.indexOf("--from-qi");
  const fromBiIdx = args.indexOf("--from-bi");
  const startQi = fromQiIdx >= 0 ? parseInt(args[fromQiIdx + 1] ?? "0", 10) : 0;
  const startBi = fromBiIdx >= 0 ? parseInt(args[fromBiIdx + 1] ?? "0", 10) : 0;

  console.log("=== OSM道路制限データ取込スクリプト ===");
  console.log("出典: OpenStreetMap contributors (ODbL ライセンス)");
  if (startQi > 0 || startBi > 0) {
    console.log(`再開: クエリ ${startQi + 1} 地域 ${startBi + 1} から`);
  }
  console.log("");

  const allRecords: OsmRecord[] = [];
  const failedRegions: string[] = [];

  // --with-motorway を指定した場合のみ highway=motorway を取込
  // 通常は不要: genki1/genki2 ルートは avoid=highways で高速を回避済みのため
  // 失敗する場合: Overpass インスタンスの応答サイズ上限に達している
  const withMotorway = args.includes("--with-motorway");

  const queries: { label: string; tags: string; appliesTo: VehicleClass[]; restrictionTag: string }[] = [
    ...(withMotorway ? [{
      label: '高速道路 (highway=motorway / motorway_link)',
      tags: 'way["highway"="motorway"]\nway["highway"="motorway_link"]',
      appliesTo: ["genki1", "genki2"] as VehicleClass[],
      restrictionTag: "motorway",
    }] : []),
    {
      label: '自動車専用道路 (motorroad=yes, 非motorway)',
      tags: 'way["motorroad"="yes"]["highway"!="motorway"]["highway"!="motorway_link"]',
      appliesTo: ["genki1", "genki2"],
      restrictionTag: "motorroad",
    },
    {
      // motorway/motorroad は上記クエリで取込済みのため除外
      label: '二輪通行禁止区間 (motorcycle=no)',
      tags: 'way["motorcycle"="no"]["highway"!="motorway"]["highway"!="motorway_link"]["motorroad"!="yes"]',
      appliesTo: ["genki1", "genki2", "normal"],
      restrictionTag: "motorcycle_no",
    },
    {
      // motorroad・motorcycle=no は上記クエリで取込済みのため除外
      label: '原付通行禁止 (moped=no)',
      tags: 'way["moped"="no"]["motorroad"!="yes"]["motorcycle"!="no"]',
      appliesTo: ["genki1"],
      restrictionTag: "moped_no",
    },
  ];

  for (let qi = 0; qi < queries.length; qi++) {
    if (qi < startQi) continue;
    const { label, tags, appliesTo, restrictionTag } = queries[qi];
    console.log(`${qi + 1}/${queries.length} ${label} を取得...`);

    for (let bi = 0; bi < JAPAN_BBOXES.length; bi++) {
      if (qi === startQi && bi < startBi) continue;
      const bbox = JAPAN_BBOXES[bi];
      const [s, , n, e] = bbox;
      process.stdout.write(`  地域 ${bi + 1}/${JAPAN_BBOXES.length} (${s}°N-${n}°N, ~${e}°E)... `);
      const query = buildBboxQuery(tags, bbox);
      try {
        const ways = await fetchOverpass(query);
        for (const way of ways) {
          allRecords.push(wayToRecord(way, appliesTo, restrictionTag));
        }
      } catch (err) {
        const regionKey = `qi=${qi} bi=${bi} (クエリ${qi + 1} 地域${bi + 1})`;
        console.warn(`\n  ⚠ スキップ: ${regionKey} — ${(err as Error).message}`);
        failedRegions.push(regionKey);
      }
      // 連続リクエストの間隔
      if (bi + 1 < JAPAN_BBOXES.length) await sleep(2000);
    }

    if (qi + 1 < queries.length) {
      console.log("  次のクエリセットまで 5 秒待機...");
      await sleep(5000);
    }
  }

  if (failedRegions.length > 0) {
    console.warn(`\n⚠ 失敗した地域 ${failedRegions.length} 件:`);
    failedRegions.forEach((r) => console.warn(`  ${r}`));
    console.warn("再実行例: npm run import:osm -- --from-qi 0 --from-bi 2");
  }

  // 重複除去（同一 source_ref）
  const records = dedup(allRecords);
  const dupCount = allRecords.length - records.length;
  console.log(`\n取得合計: ${allRecords.length} 件 (重複 ${dupCount} 件除去後: ${records.length} 件)`);

  console.log("");
  await insertRecords(records, dryRun);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
