/**
 * 国土交通省 国土数値情報 道路データ (N01) 取込スクリプト
 *
 * データ:
 *   路線種別 0 = 高速自動車国道 → applies_to: genki1 + genki2
 *   路線種別 1 = 都市高速道路   → applies_to: genki1 + genki2
 *   ※ その他の路線種別はスキップ
 *
 * データソース:
 *   国土交通省 国土数値情報ダウンロードサービス (CC BY 4.0)
 *   https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N01-v2_3.html
 *
 * 事前準備:
 *   1. 上記サイトから都道府県別または全国のZIPファイルをダウンロード
 *      例: N01-22_GML.zip (全国) または N01-22_13_GML.zip (東京都)
 *   2. 以下コマンドで取込実行:
 *      npm run import:mlit -- path/to/N01-22_GML.zip [--dry-run]
 *      npm run import:mlit -- N01-22_01_GML.zip N01-22_02_GML.zip ...
 *
 * GML スキーマ (N01 v2.3):
 *   要素名: ksj:RoadSection
 *   路線種別: ksj:N01_002 (0=高速自動車国道, 1=都市高速道路, ...)
 *   路線番号: ksj:N01_003
 *   路線名:   ksj:N01_004
 *   行政区域: ksj:N01_001
 *   ジオメトリ: ksj:pos > gml:LineString > gml:posList (lat lon 順)
 */

import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";
import path from "path";
import fs from "fs/promises";

// ---------------------------------------------------------------------------
// 環境変数
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// 定数
// ---------------------------------------------------------------------------
// 取込対象の路線種別コード
const TARGET_ROAD_TYPES = new Set(["0", "1"]); // 高速自動車国道, 都市高速道路

// 都道府県コード → 都道府県名
const PREF_CODES: Record<string, string> = {
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

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------
type VehicleClass = "genki1" | "genki2" | "normal";

interface MlitRecord {
  source_ref: string;
  road_name: string | null;
  prefecture: string | null;
  description: string | null;
  applies_to: VehicleClass[];
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  geometry_wkt: string;
}

// ---------------------------------------------------------------------------
// GML から路線名を取り出す（複数のスキーマバージョンに対応）
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getText(obj: any): string {
  if (typeof obj === "string") return obj;
  if (Array.isArray(obj)) return getText(obj[0]);
  if (obj && typeof obj === "object" && "_" in obj) return String(obj._);
  return String(obj ?? "");
}

// ---------------------------------------------------------------------------
// GML ファイル文字列を解析し MlitRecord[] を返す
// ---------------------------------------------------------------------------
async function parseGml(gmlContent: string, fileName: string): Promise<MlitRecord[]> {
  const records: MlitRecord[] = [];

  // ファイル名から都道府県コードを推測 (N01-22_13_GML.xml のような形式)
  const prefCodeMatch = fileName.match(/_(\d{2})_/);
  const prefCode = prefCodeMatch ? prefCodeMatch[1] : null;

  // xml2js でパース (ネームスペースを正規化)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsed: any;
  try {
    parsed = await parseStringPromise(gmlContent, {
      explicitArray: true,
      tagNameProcessors: [
        // "ksj:N01_002" → "N01_002", "gml:posList" → "posList" に正規化
        (name: string) => name.replace(/^[^:]+:/, "") as string,
      ],
    });
  } catch (err) {
    console.error(`  GML パースエラー (${fileName}):`, err);
    return [];
  }

  // ルート要素配下の RoadSection 要素を探す
  // GML スキーマにより Dataset > RoadSection または FeatureCollection > featureMember > RoadSection
  const root = parsed?.Dataset ?? parsed?.FeatureCollection ?? parsed;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sections: any[] = [];

  if (root?.RoadSection) {
    sections = Array.isArray(root.RoadSection) ? root.RoadSection : [root.RoadSection];
  } else if (root?.featureMember) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const members: any[] = Array.isArray(root.featureMember)
      ? root.featureMember
      : [root.featureMember];
    for (const m of members) {
      if (m?.RoadSection) {
        const rs = m.RoadSection;
        sections.push(...(Array.isArray(rs) ? rs : [rs]));
      }
    }
  }

  if (sections.length === 0) {
    console.warn(
      `  ⚠️ RoadSection 要素が見つかりません (${fileName})\n` +
        "  → スキーマが異なる可能性があります。--inspect オプションで構造を確認してください。"
    );
    return [];
  }

  let skippedType = 0;
  let skippedGeom = 0;

  for (const section of sections) {
    // 路線種別 (N01_002)
    const lrtRaw = getText(section?.N01_002);
    if (!TARGET_ROAD_TYPES.has(lrtRaw)) {
      skippedType++;
      continue;
    }

    // 路線名 (N01_004) と路線番号 (N01_003)
    const roadName = getText(section?.N01_004) || null;
    const routeRef = getText(section?.N01_003) || null;

    // 行政区域コード (N01_001)
    const admCodeRaw = getText(section?.N01_001);
    const admCode = admCodeRaw.padStart(2, "0").slice(0, 2);
    const prefecture = PREF_CODES[admCode] ?? PREF_CODES[prefCode ?? ""] ?? null;

    // ジオメトリ (gml:posList — lat lon lat lon ... の空白区切り)
    let posListStr: string | null = null;
    const pos = section?.pos ?? section?.position;
    const lineString = pos?.[0]?.LineString ?? pos?.[0]?.lineString;
    if (lineString) {
      posListStr = getText(lineString?.[0]?.posList);
    }

    if (!posListStr || posListStr.trim() === "") {
      skippedGeom++;
      continue;
    }

    // lat lon ペアの配列に変換
    const nums = posListStr.trim().split(/\s+/).map(Number);
    if (nums.length < 4 || nums.length % 2 !== 0) {
      skippedGeom++;
      continue;
    }

    // GML は lat lon 順。WKT は lon lat (x y) 順。
    const coords: [number, number][] = [];
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const lat = nums[i];
      const lon = nums[i + 1];
      coords.push([lon, lat]); // WKT 用に lon lat に入替
    }

    const geometry_wkt = `LINESTRING(${coords.map((c) => `${c[0]} ${c[1]}`).join(",")})`;
    const [startLon, startLat] = coords[0];
    const [endLon, endLat] = coords[coords.length - 1];

    // 路線種別コードから applies_to を決定
    const applies_to: VehicleClass[] = lrtRaw === "0" || lrtRaw === "1"
      ? ["genki1", "genki2"]
      : ["genki1"];

    const description =
      routeRef && roadName && !roadName.includes(routeRef)
        ? `${routeRef} ${roadName}`
        : null;

    // source_ref: ファイル名ベースのユニークID
    const gmlId = getText(section?.$?.["gml:id"] ?? section?.["$"]?.id ?? "");
    const ref = gmlId || `${fileName}:${records.length + skippedType + skippedGeom}`;

    records.push({
      source_ref: `mlit:${ref}`,
      road_name: roadName,
      prefecture,
      description,
      applies_to,
      start_lat: startLat,
      start_lng: startLon,
      end_lat: endLat,
      end_lng: endLon,
      geometry_wkt,
    });
  }

  const total = sections.length;
  console.log(
    `  ${fileName}: ${records.length} 件取込 ` +
      `(スキップ: 路線種別対象外 ${skippedType}, ジオメトリなし ${skippedGeom}, 合計 ${total} 件中)`
  );

  return records;
}

// ---------------------------------------------------------------------------
// ZIP ファイルからGMLを抽出して解析
// ---------------------------------------------------------------------------
async function processZip(zipPath: string): Promise<MlitRecord[]> {
  console.log(`\nZIP ファイル処理中: ${path.basename(zipPath)}`);

  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries().filter((e) => !e.isDirectory);
  const gmlEntries = entries.filter(
    (e) => e.entryName.toLowerCase().endsWith(".xml") || e.entryName.toLowerCase().endsWith(".gml")
  );

  if (gmlEntries.length === 0) {
    console.warn(`  ⚠️ GML/XMLファイルが見つかりません: ${zipPath}`);
    return [];
  }

  console.log(`  GML/XML ファイル ${gmlEntries.length} 件を検出`);

  const all: MlitRecord[] = [];
  for (const entry of gmlEntries) {
    const content = zip.readAsText(entry);
    const records = await parseGml(content, path.basename(entry.entryName));
    all.push(...records);
  }

  return all;
}

// ---------------------------------------------------------------------------
// --inspect: GML構造を出力（スキーマ確認用）
// ---------------------------------------------------------------------------
async function inspectZip(zipPath: string): Promise<void> {
  const zip = new AdmZip(zipPath);
  const entry = zip.getEntries().find(
    (e) => !e.isDirectory && (e.entryName.endsWith(".xml") || e.entryName.endsWith(".gml"))
  );
  if (!entry) {
    console.log("GMLファイルが見つかりません");
    return;
  }

  const content = zip.readAsText(entry);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = await parseStringPromise(content, {
    explicitArray: true,
    tagNameProcessors: [(name: string) => name.replace(/^[^:]+:/, "") as string],
  });

  // 最初の RoadSection だけ表示
  const root = parsed?.Dataset ?? parsed?.FeatureCollection ?? parsed;
  const section = root?.RoadSection?.[0]
    ?? root?.featureMember?.[0]?.RoadSection?.[0]
    ?? null;

  console.log("=== GML 構造サンプル (先頭1要素) ===");
  console.log(JSON.stringify(section, null, 2).slice(0, 3000));
}

// ---------------------------------------------------------------------------
// Supabase (PostgREST) へ挿入
// ---------------------------------------------------------------------------
async function insertRecords(records: MlitRecord[], dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] 挿入予定データ（先頭5件）:");
    records.slice(0, 5).forEach((r, i) => {
      console.log(`\n  [${i + 1}] ${r.prefecture ?? "-"} / ${r.road_name ?? "(名称なし)"}`);
      console.log(`    source_ref : ${r.source_ref}`);
      console.log(`    applies_to : ${r.applies_to.join(", ")}`);
      const nodeCount = r.geometry_wkt.split(",").length;
      console.log(`    nodes      : ${nodeCount} ノード`);
      console.log(`    start      : (${r.start_lat.toFixed(5)}, ${r.start_lng.toFixed(5)})`);
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
      source: "mlit",
      source_ref: r.source_ref,
      license: "cc-by",
      restriction_tag: "motorway",
      applies_to: r.applies_to,
      road_name: r.road_name ?? null,
      prefecture: r.prefecture ?? null,
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
// メイン
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const inspect = args.includes("--inspect");
  const zipPaths = args.filter((a) => !a.startsWith("--"));

  console.log("=== 国土数値情報 道路データ取込スクリプト ===");
  console.log("出典: 国土交通省 国土数値情報 N01 道路データ (CC BY 4.0)");
  console.log("");

  if (zipPaths.length === 0) {
    console.error("使い方: npm run import:mlit -- <ZIPファイルパス> [<ZIPファイルパス2> ...] [--dry-run]");
    console.error("");
    console.error("事前にMLIT KSJダウンロードサービスからN01データをダウンロードしてください:");
    console.error("  https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N01-v2_3.html");
    console.error("");
    console.error("オプション:");
    console.error("  --dry-run   DB挿入なし、内容確認のみ");
    console.error("  --inspect   GMLの構造をJSONで出力（パースデバッグ用）");
    process.exit(1);
  }

  // --inspect: 構造確認モード
  if (inspect) {
    await inspectZip(zipPaths[0]);
    return;
  }

  const allRecords: MlitRecord[] = [];

  for (const zipPath of zipPaths) {
    try {
      await fs.access(zipPath);
    } catch {
      console.error(`ファイルが見つかりません: ${zipPath}`);
      process.exit(1);
    }
    const records = await processZip(zipPath);
    allRecords.push(...records);
  }

  // 重複除去 (同一 source_ref)
  const seen = new Map<string, MlitRecord>();
  for (const r of allRecords) {
    if (!seen.has(r.source_ref)) seen.set(r.source_ref, r);
  }
  const records = [...seen.values()];
  console.log(`\n取得合計: ${records.length} 件`);

  if (records.length === 0) {
    console.log("取込対象がありませんでした。--inspect でGML構造を確認してください。");
    return;
  }

  console.log("");
  await insertRecords(records, dryRun);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
