/**
 * prefecture カラム一括埋めスクリプト
 *
 * prefecture が NULL の restricted_segments を対象に、
 * start_point の座標から GSI リバースジオコーダで都道府県を取得して更新する。
 *
 * 座標を 0.05° グリッドで丸めてデデュープすることで API 呼び出し数を削減。
 *
 * 使い方:
 *   npx tsx scripts/fill-prefecture.ts              # 本番実行
 *   npx tsx scripts/fill-prefecture.ts --dry-run    # 更新なし、確認のみ
 */

export {};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const DRY_RUN = process.argv.includes("--dry-run");
const FORCE  = process.argv.includes("--force"); // 既存値も上書き
const GRID = 0.02; // ~2km グリッド（都道府県境での誤判定を減らす）
const CONCURRENCY = 5; // 同時 API 呼び出し数
const BATCH_SIZE = 500; // DB 更新バッチサイズ

// 都道府県コード → 都道府県名マッピング
const PREF_CODE: Record<string, string> = {
  "01": "北海道", "02": "青森県", "03": "岩手県", "04": "宮城県",
  "05": "秋田県", "06": "山形県", "07": "福島県", "08": "茨城県",
  "09": "栃木県", "10": "群馬県", "11": "埼玉県", "12": "千葉県",
  "13": "東京都", "14": "神奈川県", "15": "新潟県", "16": "富山県",
  "17": "石川県", "18": "福井県", "19": "山梨県", "20": "長野県",
  "21": "岐阜県", "22": "静岡県", "23": "愛知県", "24": "三重県",
  "25": "滋賀県", "26": "京都府", "27": "大阪府", "28": "兵庫県",
  "29": "奈良県", "30": "和歌山県", "31": "鳥取県", "32": "島根県",
  "33": "岡山県", "34": "広島県", "35": "山口県", "36": "徳島県",
  "37": "香川県", "38": "愛媛県", "39": "高知県", "40": "福岡県",
  "41": "佐賀県", "42": "長崎県", "43": "熊本県", "44": "大分県",
  "45": "宮崎県", "46": "鹿児島県", "47": "沖縄県",
};

function gridKey(lat: number, lon: number): string {
  return `${(Math.round(lat / GRID) * GRID).toFixed(2)},${(Math.round(lon / GRID) * GRID).toFixed(2)}`;
}

async function gsiReverse(lat: number, lon: number): Promise<string | null> {
  try {
    const url = `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lon=${lon}&lat=${lat}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const json = (await res.json()) as { results?: { muniCd?: string } };
    const muniCd = json.results?.muniCd;
    if (!muniCd) return null;
    const code = muniCd.slice(0, 2).padStart(2, "0");
    return PREF_CODE[code] ?? null;
  } catch {
    return null;
  }
}

async function dbFetch(path: string, body?: unknown) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method: body ? "PATCH" : "GET",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: body ? "return=minimal" : "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DB error ${res.status}: ${text}`);
  }
  return body ? null : res.json();
}

type SegRow = { id: string; start_lat: number | null; start_lng: number | null; prefecture: string | null };

async function getSegmentsWithCoords(): Promise<SegRow[]> {
  const results: SegRow[] = [];
  const PAGE = 1000;

  for (const status of ["verified", "pending"]) {
    let offset = 0;
    while (true) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/list_restricted_segments`, {
        method: "POST",
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_vehicle: null,
          p_status: status,
          p_limit: PAGE,
          p_offset: offset,
          p_sources: null,
          p_prefecture: null,
          p_applies_to_exact: null,
          p_restriction_tags: null,
        }),
      });
      if (!res.ok) throw new Error(`RPC error (${status} offset=${offset}): ${await res.text()}`);
      const data = (await res.json()) as SegRow[];
      const nullPref = data.filter((r) => (FORCE || r.prefecture === null) && r.start_lat != null && r.start_lng != null);
      results.push(...nullPref);
      process.stdout.write(`\r  取得中 (${status}): ${results.length} 件...`);
      if (data.length < PAGE) break; // 最終ページ
      offset += PAGE;
    }
  }
  console.log();
  return results;
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が未設定");
    process.exit(1);
  }

  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}prefecture 埋め作業開始`);

  // 1. prefecture が null のレコードを取得
  console.log("prefecture=NULL のレコードを取得中...");
  const segments = await getSegmentsWithCoords();
  console.log(`  対象: ${segments.length} 件`);
  if (segments.length === 0) {
    console.log("更新対象なし。終了します。");
    return;
  }

  // 2. グリッドでデデュープ: gridKey → {prefecture, ids[]}
  const gridMap = new Map<string, { lat: number; lon: number; ids: string[] }>();
  for (const seg of segments) {
    const key = gridKey(seg.start_lat!, seg.start_lng!);
    if (!gridMap.has(key)) {
      // 最初のセグメント座標ではなくグリッド中心を使う（都道府県境での誤判定防止）
      const gLat = Math.round(seg.start_lat! / GRID) * GRID;
      const gLon = Math.round(seg.start_lng! / GRID) * GRID;
      gridMap.set(key, { lat: gLat, lon: gLon, ids: [] });
    }
    gridMap.get(key)!.ids.push(seg.id);
  }
  const buckets = [...gridMap.values()];
  console.log(`  ユニーク座標バケット: ${buckets.length} 個（GRID=${GRID}°）`);

  // 3. GSI API で都道府県を取得
  const prefMap = new Map<string, string | null>(); // gridKey → prefecture
  let done = 0;
  for (let i = 0; i < buckets.length; i += CONCURRENCY) {
    const chunk = buckets.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map(async (b) => {
        const key = gridKey(b.lat, b.lon);
        const pref = await gsiReverse(b.lat, b.lon);
        return { key, pref };
      })
    );
    for (const r of results) prefMap.set(r.key, r.pref);
    done += chunk.length;
    if (done % 100 === 0 || done === buckets.length) {
      process.stdout.write(`\r  GSI API: ${done}/${buckets.length} バケット完了`);
    }
  }
  console.log();

  // 4. DB 更新（idリスト × prefecture ごとにバッチ PATCH）
  const updateGroups = new Map<string, string[]>(); // prefecture → ids[]
  for (const bucket of buckets) {
    const key = gridKey(bucket.lat, bucket.lon);
    const pref = prefMap.get(key);
    if (!pref) continue;
    if (!updateGroups.has(pref)) updateGroups.set(pref, []);
    updateGroups.get(pref)!.push(...bucket.ids);
  }

  let updated = 0;
  let skipped = 0;
  for (const [pref, ids] of updateGroups.entries()) {
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      const batch = ids.slice(i, i + BATCH_SIZE);
      if (!DRY_RUN) {
        await dbFetch(
          `/restricted_segments?id=in.(${batch.map((id) => `"${id}"`).join(",")})`,
          { prefecture: pref }
        );
      }
      updated += batch.length;
    }
    console.log(`  ${pref}: ${ids.length} 件 ${DRY_RUN ? "(skipped)" : "更新"}`);
  }

  // GSI API が null を返したレコード数
  for (const bucket of buckets) {
    const key = gridKey(bucket.lat, bucket.lon);
    if (!prefMap.get(key)) skipped += bucket.ids.length;
  }

  console.log(`\n完了: ${updated} 件更新, ${skipped} 件スキップ（GSI 取得失敗）`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
