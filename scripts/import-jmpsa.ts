/**
 * JMPSAデータ取込スクリプト
 *
 * 使い方:
 *   # ① スクレイピング → CSV出力（精査用）
 *   npm run export:jmpsa -- jmpsa-YYYYMMDD.csv
 *
 *   # ② CSVを確認・編集後、ジオコーディング + DB挿入
 *   npm run import:jmpsa -- jmpsa-YYYYMMDD.csv --geocode
 *
 *   # ③ 座標を手動で入力済みのCSVをそのまま挿入
 *   npm run import:jmpsa -- jmpsa-YYYYMMDD.csv
 *
 *   # ④ スクレイピング + ジオコーディング + DB挿入（一括）
 *   npm run import:jmpsa
 *
 *   # ドライラン（DB挿入なし）
 *   npm run import:jmpsa -- --dry-run
 *   npm run import:jmpsa -- jmpsa.csv --geocode --dry-run
 *
 * CSVフォーマット（export:jmpsa が出力する新形式）:
 *   road_name,prefecture,segment_text,time_text,vehicle_text,applies_to,start_lat,start_lng,end_lat,end_lng
 *   applies_to は | 区切り: genki1|genki2|normal
 *   ※ start_lat〜end_lng は空欄のまま精査し、--geocode で自動補完
 *
 * 出典: 日本二輪車普及安全協会 (JMPSA) 公開Webサイト掲載情報
 *       同協会との提携・データ提供契約なし。公開HPの閲覧情報を活用。
 */

import { load as cheerioLoad } from "cheerio";
import { createHash } from "crypto";
import fs from "fs/promises";

// ---------------------------------------------------------------------------
// 環境変数
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------
type VehicleClass = "genki1" | "genki2" | "normal";
type CoordinateAccuracy = "exact" | "municipality";

interface JmpsaRecord {
  source_ref: string;
  road_name: string;
  prefecture: string;
  description: string;
  applies_to: VehicleClass[];
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  coordinate_accuracy: CoordinateAccuracy;
}

interface RawSegment {
  road_name: string;
  prefecture: string;
  segment_text: string;
  vehicle_text: string;
  time_text: string;
}

// ---------------------------------------------------------------------------
// JMPSA URL設定
// ---------------------------------------------------------------------------
const JMPSA_BASE = "https://www.jmpsa.or.jp";
const JMPSA_INDEX = `${JMPSA_BASE}/society/roadinfo/`;

// フォールバック都道府県URL（インデックスページのスクレイピングが失敗した場合に使用）
const FALLBACK_PREFECTURE_PAGES: Record<string, string> = {
  北海道: "/society/roadinfo/area-119-298.html",
  青森県: "/society/roadinfo/area-119-346.html",
  宮城県: "/society/roadinfo/area-119-141.html",
  東京都: "/society/roadinfo/area-119-123.html",
  茨城県: "/society/roadinfo/area-119-124.html",
  栃木県: "/society/roadinfo/area-119-125.html",
  群馬県: "/society/roadinfo/area-119-299.html",
  千葉県: "/society/roadinfo/area-119-300.html",
  埼玉県: "/society/roadinfo/area-119-127.html",
  神奈川県: "/society/roadinfo/area-119-129.html",
  新潟県: "/society/roadinfo/area-119-130.html",
  静岡県: "/society/roadinfo/area-119-143.html",
  富山県: "/society/roadinfo/area-119-144.html",
  石川県: "/society/roadinfo/area-119-132.html",
  愛知県: "/society/roadinfo/area-119-133.html",
  岐阜県: "/society/roadinfo/area-119-250.html",
  滋賀県: "/society/roadinfo/area-120-135.html",
  京都府: "/society/roadinfo/area-120-136.html",
  大阪府: "/society/roadinfo/area-120-137.html",
  兵庫県: "/society/roadinfo/area-120-138.html",
  奈良県: "/society/roadinfo/area-120-139.html",
  和歌山県: "/society/roadinfo/area-120-145.html",
  広島県: "/society/roadinfo/area-120-140.html",
  徳島県: "/society/roadinfo/area-120-347.html",
  福岡県: "/society/roadinfo/area-120-142.html",
  佐賀県: "/society/roadinfo/area-120-146.html",
  熊本県: "/society/roadinfo/area-120-149.html",
  大分県: "/society/roadinfo/area-120-148.html",
  宮崎県: "/society/roadinfo/area-120-150.html",
  鹿児島県: "/society/roadinfo/area-120-151.html",
  沖縄県: "/society/roadinfo/area-120-152.html",
};

// ---------------------------------------------------------------------------
// ユーティリティ
// ---------------------------------------------------------------------------
function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function makeSourceRef(roadName: string, prefecture: string, segmentText: string): string {
  return createHash("md5")
    .update(`${roadName}|${prefecture}|${segmentText}`)
    .digest("hex")
    .slice(0, 12);
}

// ---------------------------------------------------------------------------
// スクレイピング
// ---------------------------------------------------------------------------
async function fetchHtml(url: string, retries = 3): Promise<string> {
  const UA = "BikeRoute/0.1 (+https://github.com/shibata-kento/bikeroute; non-commercial OSS)";
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Content-Type からエンコーディングを判定
      const ct = res.headers.get("content-type") ?? "";
      const isShiftJIS = /shift.?jis|x-sjis|shift_jis/i.test(ct);
      const buf = await res.arrayBuffer();
      return new TextDecoder(isShiftJIS ? "shift_jis" : "utf-8").decode(buf);
    } catch (e) {
      if (attempt === retries - 1) throw e;
      await sleep(2000 * (attempt + 1));
    }
  }
  throw new Error("fetchHtml: unreachable");
}

async function scrapePrefectureUrls(): Promise<Record<string, string>> {
  console.log("  都道府県URLを取得中...");
  try {
    const html = await fetchHtml(JMPSA_INDEX);
    const $ = cheerioLoad(html);
    const result: Record<string, string> = {};

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") ?? "";
      const text = $(el).text().trim();
      if (!text.endsWith("都") && !text.endsWith("道") && !text.endsWith("府") && !text.endsWith("県")) return;
      if (!href.includes("area-119-") && !href.includes("area-120-")) return;

      const fullUrl = href.startsWith("http")
        ? href
        : href.startsWith("/")
        ? `${JMPSA_BASE}${href}`
        : `${JMPSA_BASE}/society/roadinfo/${href}`;
      result[text] = fullUrl;
    });

    if (Object.keys(result).length === 0) {
      throw new Error("URLが見つかりませんでした");
    }
    console.log(`  ${Object.keys(result).length} 都道府県を発見`);
    return result;
  } catch (e) {
    console.warn(`  ⚠️ URLスクレイピング失敗 (${e})。フォールバックURLを使用します。`);
    return Object.fromEntries(
      Object.entries(FALLBACK_PREFECTURE_PAGES).map(([pref, path]) => [
        pref,
        `${JMPSA_BASE}${path}`,
      ])
    );
  }
}

async function scrapePrefecturePage(url: string, prefecture: string): Promise<RawSegment[]> {
  const html = await fetchHtml(url);
  const $ = cheerioLoad(html);
  const records: RawSegment[] = [];

  // テーブル構造: 通行規制路線 | 所在地・規制区間 | 規制対象 | 規制時間
  // 各セルにはリンク（「ご要望を送信する」）が含まれるため、先に除去してからテキストを取得する
  $("table tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 3) return; // ヘッダー行(th)や空行をスキップ

    const cellText = (i: number) => {
      const clone = cells.eq(i).clone();
      clone.find("a").remove(); // リンク除去
      return clone.text().replace(/\s+/g, " ").trim();
    };

    const road_name = cellText(0);
    const segment_text = cellText(1);
    const vehicle_text = cellText(2);
    const time_text = cells.length >= 4 ? cellText(3) : "終日";

    if (!road_name || !segment_text || !vehicle_text) return;
    if (/解除/.test(road_name) || /解除/.test(segment_text)) return; // 規制解除済みをスキップ

    records.push({ road_name, prefecture, segment_text, vehicle_text, time_text });
  });

  return records;
}

// ---------------------------------------------------------------------------
// 解析
// ---------------------------------------------------------------------------
function parseAppliesTo(vehicleText: string): VehicleClass[] {
  const t = vehicleText.trim();
  const classes = new Set<VehicleClass>();

  // "126cc以上を除く": ≤125ccのみ（normalを除外）
  const excludeNormal = /126cc以上を除く|126ｃｃ以上を除く/.test(t);

  // 第1種原動機付自転車 (≤50cc) → genki1
  if (/第[1一]種/.test(t)) classes.add("genki1");
  // 第2種原動機付自転車 (51-125cc) → genki2
  if (/第[2二]種/.test(t)) classes.add("genki2");
  // 一般原付 / 特定原付 / 一般原動機付自転車 / 特定小型 / 50cc未満 → genki1
  if (/一般原付|特定原付|一般原動機付自転車|特定小型|50cc未満/.test(t)) classes.add("genki1");

  // 原動機付自転車 (総称): genki1がまだなければ genki1+genki2 を追加
  // ※第1種/一般 など特定済みの場合はスキップ
  if (/原動機付自転車|原付/.test(t) && !classes.has("genki1")) {
    classes.add("genki1");
    classes.add("genki2");
  }

  // 原付二種 / 125cc → genki2
  if (/原付二種|125cc|125ｃｃ/.test(t)) classes.add("genki2");

  // 二輪の自動車 → genki2 + normal
  if (t.includes("二輪の自動車")) {
    classes.add("genki2");
    if (!excludeNormal) classes.add("normal");
  }
  // 自動二輪 → genki2 + normal
  if (t.includes("自動二輪")) {
    classes.add("genki2");
    if (!excludeNormal) classes.add("normal");
  }
  // 二輪車 → genki1 + genki2 + normal
  if (t.includes("二輪車")) {
    classes.add("genki1");
    classes.add("genki2");
    if (!excludeNormal) classes.add("normal");
  }
  // 「二輪」単独（二輪の自動車・自動二輪・二輪車 とは別）→ 全クラス
  // 「二輪(126cc以上を除く)」なら excludeNormal が true なので normal は除外される
  if (
    /[12２二]輪/.test(t) &&
    !t.includes("二輪の自動車") &&
    !t.includes("自動二輪") &&
    !t.includes("二輪車")
  ) {
    classes.add("genki1");
    classes.add("genki2");
    if (!excludeNormal) classes.add("normal");
  }
  // 全車両（自動車を含む表記）→ 全クラス
  if (/自動車（二輪を除く）|自動車.*二輪.*を除く/.test(t)) {
    classes.add("genki1");
    classes.add("genki2");
    if (!excludeNormal) classes.add("normal");
  }

  if (classes.size === 0) {
    console.warn(`    ⚠️ 未知の規制対象: "${t}" → 全クラスとして処理`);
    return ["genki1", "genki2", "normal"];
  }

  const out: VehicleClass[] = [];
  if (classes.has("genki1")) out.push("genki1");
  if (classes.has("genki2")) out.push("genki2");
  if (classes.has("normal")) out.push("normal");
  return out;
}

function parseSegmentLocations(segmentText: string): { startText: string; endText: string } {
  // 全角括弧の注釈を除去: （...）
  const clean = segmentText.replace(/（[^）]*）/g, "").trim();

  // 〜 または ～ (各種チルダ表現) で分割
  const match = clean.match(/^(.+?)[〜～〜～](.+)$/);
  if (!match) {
    return { startText: clean, endText: clean };
  }

  const startText = match[1].replace(/から$|より$/u, "").trim();
  const endText = match[2].replace(/まで$|に至る$/u, "").trim();
  return { startText, endText };
}

// ---------------------------------------------------------------------------
// ジオコーディング (Nominatim / OpenStreetMap)
// 利用規約: https://operations.osmfoundation.org/policies/nominatim/
// レート制限: 1リクエスト/秒
// ---------------------------------------------------------------------------

// JMPSA住所は「○番先」「国有林28林班地先」など Nominatim が解釈できないサフィックスを含む。
// 丁目/地名レベルまで切り詰めて検索精度を上げる。
function normalizeJpAddress(text: string): string {
  return text
    .replace(/国有林.*$/u, "")        // 「国有林28林班地先」を除去
    .replace(/\d+番地\d+先.*$/u, "")  // 「100番地2先」（番地N先パターン）
    .replace(/\d+番地先.*$/u, "")     // 「10番地先」以降
    .replace(/\d+号先.*$/u, "")       // 「1号先」以降
    .replace(/\d+番先.*$/u, "")       // 「2番先南側」など以降
    .replace(/\d+番地\d*$/u, "")      // 「2535番地2」
    .replace(/\d+番$/u, "")           // 残った「10番」
    .replace(/[ぁ-んァ-ン]+$/u, "")   // イロハ地番符号（字能瀬ワ → 字能瀬）
    .trim();
}

// 広域化: 丁目・字レベルを除去して市区町村レベルに絞る（フォールバック用）
function toAreaAddress(normalized: string): string {
  const withoutChome = normalized.replace(/\d+丁目.*$/u, "");
  const withoutAza = withoutChome.replace(/[大]?字.*$/u, "");
  return (withoutAza || withoutChome).trim();
}

// 市区町村名を抽出する（さらに広域のフォールバック用）
function extractMunicipality(normalized: string): string | null {
  const match = normalized.match(/^(.*?[市区町村])/u);
  return match?.[1] ?? null;
}

// 道路名に含まれる括弧注釈（都道・国道等）を除去して Nominatim クエリを簡潔にする
function normalizeRoadName(roadName: string): string {
  return roadName
    .replace(/（[^）]*）/g, "")
    .replace(/\([^)]*\)/g, "")
    .trim();
}

// Nominatim / GSI 共用レート制限（1.1秒/リクエスト）
let lastGeocodingRequest = 0;

async function throttle() {
  const elapsed = Date.now() - lastGeocodingRequest;
  if (elapsed < 1100) await sleep(1100 - elapsed);
  lastGeocodingRequest = Date.now();
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  await throttle();
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", address);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("accept-language", "ja");
    url.searchParams.set("countrycodes", "jp");

    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "BikeRoute/0.1 (+https://github.com/shibata-kento/bikeroute; non-commercial OSS)",
        Accept: "application/json",
      },
    });

    if (!res.ok) return null;
    const results = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (results.length === 0) return null;
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
  } catch {
    return null;
  }
}

// 国土地理院 住所検索 API（日本語住所に強い無料サービス）
async function geocodeGsi(address: string): Promise<{ lat: number; lng: number } | null> {
  await throttle();
  try {
    const url = new URL("https://msearch.gsi.go.jp/address-search/AddressSearch");
    url.searchParams.set("q", address);

    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "BikeRoute/0.1 (+https://github.com/shibata-kento/bikeroute; non-commercial OSS)",
        Accept: "application/json",
      },
    });

    if (!res.ok) return null;
    const results = (await res.json()) as Array<{
      geometry: { coordinates: [number, number] };
    }>;
    if (results.length === 0) return null;
    const [lng, lat] = results[0].geometry.coordinates;
    return { lat, lng };
  } catch {
    return null;
  }
}

type GeocodeResult = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  accuracy: CoordinateAccuracy;
};

async function geocodeSegment(
  startText: string,
  endText: string,
  roadName: string,
  prefecture: string
): Promise<GeocodeResult | null> {
  const startNorm = normalizeJpAddress(startText);
  const endNorm = normalizeJpAddress(endText);
  const roadNorm = normalizeRoadName(roadName);

  // 1点をジオコード: Nominatim(3段階) → GSI(2段階) → 市区町村代表点
  async function resolveCoord(
    norm: string
  ): Promise<{ coord: { lat: number; lng: number }; accuracy: CoordinateAccuracy } | null> {
    const areaAddr = toAreaAddress(norm);

    // Nominatim
    const nominatim =
      (await geocodeAddress(`${prefecture} ${norm}`)) ??
      (await geocodeAddress(`${prefecture} ${roadNorm} ${norm}`)) ??
      (await geocodeAddress(`${prefecture} ${areaAddr}`));
    if (nominatim) return { coord: nominatim, accuracy: "exact" };

    // GSI（国土地理院）
    const gsi =
      (await geocodeGsi(`${prefecture} ${norm}`)) ??
      (await geocodeGsi(`${prefecture} ${areaAddr}`));
    if (gsi) return { coord: gsi, accuracy: "exact" };

    // 市区町村代表点（最終手段）
    const muni = extractMunicipality(norm);
    const muniCoord = muni
      ? ((await geocodeAddress(`${prefecture} ${muni}`)) ?? (await geocodeGsi(`${prefecture} ${muni}`)))
      : ((await geocodeAddress(prefecture)) ?? (await geocodeGsi(prefecture)));
    if (muniCoord) return { coord: muniCoord, accuracy: "municipality" };

    return null;
  }

  const startResult = await resolveCoord(startNorm);
  if (!startResult) return null;

  const endResult = (await resolveCoord(endNorm)) ?? startResult;
  if (!endResult || endResult === startResult) {
    console.warn(`    ⚠️ 終点ジオコーディング失敗 → 起点座標を代用`);
  }

  const accuracy: CoordinateAccuracy =
    startResult.accuracy === "municipality" || endResult.accuracy === "municipality"
      ? "municipality"
      : "exact";

  return {
    startLat: startResult.coord.lat,
    startLng: startResult.coord.lng,
    endLat: endResult.coord.lat,
    endLng: endResult.coord.lng,
    accuracy,
  };
}

// ---------------------------------------------------------------------------
// スクレイピング + ジオコーディング
// ---------------------------------------------------------------------------
async function fetchJmpsaData(): Promise<JmpsaRecord[]> {
  const prefectureUrls = await scrapePrefectureUrls();
  const records: JmpsaRecord[] = [];
  const failedRows: string[] = [];

  const prefectures = Object.entries(prefectureUrls);
  for (let i = 0; i < prefectures.length; i++) {
    const [prefecture, url] = prefectures[i];
    console.log(`  [${i + 1}/${prefectures.length}] ${prefecture} ...`);

    try {
      const rawSegments = await scrapePrefecturePage(url, prefecture);
      console.log(`    → ${rawSegments.length} 件`);

      for (const raw of rawSegments) {
        const { startText, endText } = parseSegmentLocations(raw.segment_text);
        const coords = await geocodeSegment(startText, endText, raw.road_name, prefecture);

        if (!coords) {
          console.warn(`    ⚠️ ジオコーディング失敗: ${raw.road_name} ${startText}`);
          const description = `${raw.segment_text}（${raw.time_text}）`;
          const appliesTo = parseAppliesTo(raw.vehicle_text).join("|");
          failedRows.push(
            [
              csvEscape(raw.road_name),
              csvEscape(prefecture),
              csvEscape(description),
              csvEscape(appliesTo),
              "", // start_lat（手動入力）
              "", // start_lng
              "", // end_lat
              "", // end_lng
            ].join(",")
          );
          continue;
        }

        if (coords.accuracy === "municipality") {
          console.warn(`    ⚠️ 市区町村代表点を使用: ${raw.road_name} ${startText}`);
        }
        records.push({
          source_ref: makeSourceRef(raw.road_name, prefecture, raw.segment_text),
          road_name: raw.road_name,
          prefecture,
          description: `${raw.segment_text}（${raw.time_text}）`,
          applies_to: parseAppliesTo(raw.vehicle_text),
          start_lat: coords.startLat,
          start_lng: coords.startLng,
          end_lat: coords.endLat,
          end_lng: coords.endLng,
          coordinate_accuracy: coords.accuracy,
        });
      }

      if (i < prefectures.length - 1) await sleep(1500);
    } catch (e) {
      console.error(`    ${prefecture} のスクレイピングに失敗: ${e}`);
    }
  }

  if (failedRows.length > 0) {
    const date = new Date().toISOString().slice(0, 10);
    const failPath = `jmpsa-geocode-failed-${date}.csv`;
    const HEADER = "road_name,prefecture,description,applies_to,start_lat,start_lng,end_lat,end_lng";
    await fs.writeFile(failPath, "﻿" + [HEADER, ...failedRows].join("\r\n"), "utf-8");
    console.warn(`\n⚠️ ${failedRows.length} 件はジオコーディング失敗でスキップ`);
    console.warn(`   座標を手動入力後にインポートできます: ${failPath}`);
    console.warn(`   npm run import:jmpsa -- ${failPath}`);
  }

  return records;
}

// ---------------------------------------------------------------------------
// CSVエクスポート (スクレイピング結果を座標なしで出力)
// ---------------------------------------------------------------------------
function csvEscape(value: string): string {
  if (/[,"\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

async function scrapeAndExportCsv(outputPath: string): Promise<void> {
  console.log("スクレイピング開始（ジオコーディングなし）...\n");
  const prefectureUrls = await scrapePrefectureUrls();
  const rows: string[] = [];
  // 新形式: segment_text / time_text / vehicle_text を分離して出力
  const HEADER =
    "road_name,prefecture,segment_text,time_text,vehicle_text,applies_to,start_lat,start_lng,end_lat,end_lng";
  rows.push(HEADER);

  const prefectures = Object.entries(prefectureUrls);
  for (let i = 0; i < prefectures.length; i++) {
    const [prefecture, url] = prefectures[i];
    console.log(`  [${i + 1}/${prefectures.length}] ${prefecture}`);

    try {
      const rawSegments = await scrapePrefecturePage(url, prefecture);
      for (const raw of rawSegments) {
        const appliesTo = parseAppliesTo(raw.vehicle_text).join("|");
        rows.push(
          [
            csvEscape(raw.road_name),
            csvEscape(prefecture),
            csvEscape(raw.segment_text),  // 〜 区切りのまま
            csvEscape(raw.time_text),
            csvEscape(raw.vehicle_text),  // 元テキスト（確認・修正用）
            csvEscape(appliesTo),         // 解析済み車種（修正可）
            "",                           // start_lat（空欄 → --geocode で補完）
            "",                           // start_lng
            "",                           // end_lat
            "",                           // end_lng
          ].join(",")
        );
      }
      if (i < prefectures.length - 1) await sleep(1500);
    } catch (e) {
      console.error(`  ${prefecture} 失敗: ${e}`);
    }
  }

  // BOM付きUTF-8 (Excelで開いても文字化けしない)
  await fs.writeFile(outputPath, "﻿" + rows.join("\r\n"), "utf-8");
  console.log(`\n✅ ${rows.length - 1} 件をCSVに出力: ${outputPath}`);
  console.log("   内容を確認・編集後、以下でジオコーディング + DB挿入:");
  console.log(`   npm run import:jmpsa -- ${outputPath} --geocode`);
}

// ---------------------------------------------------------------------------
// CSV読み込み (改良版: quoted fields・BOM対応)
// ---------------------------------------------------------------------------
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let cur = "";
  let inQ = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQ = !inQ;
      }
    } else if (ch === "," && !inQ) {
      fields.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

async function loadFromCsv(filePath: string, withGeocode = false): Promise<JmpsaRecord[]> {
  let content = await fs.readFile(filePath, "utf-8");
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1); // BOM除去

  const lines = content.split(/\r?\n/);
  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const col = (name: string) => headers.indexOf(name);

  // 新形式（segment_text あり）と旧形式（description あり）を自動判定
  const C = {
    road_name:    col("road_name"),
    prefecture:   col("prefecture"),
    segment_text: col("segment_text"),  // 新形式
    time_text:    col("time_text"),     // 新形式
    description:  col("description"),   // 旧形式
    applies_to:   col("applies_to"),
    start_lat:    col("start_lat"),
    start_lng:    col("start_lng"),
    end_lat:      col("end_lat"),
    end_lng:      col("end_lng"),
  };
  const isNewFormat = C.segment_text >= 0;

  // 必須カラムチェック
  const required = isNewFormat
    ? ["road_name", "prefecture", "segment_text", "applies_to", "start_lat", "start_lng", "end_lat", "end_lng"] as const
    : ["road_name", "prefecture", "description",  "applies_to", "start_lat", "start_lng", "end_lat", "end_lng"] as const;
  const missing = required.filter((k) => C[k as keyof typeof C] < 0);
  if (missing.length > 0) {
    console.error(`CSVに必須カラムがありません: ${missing.join(", ")}`);
    process.exit(1);
  }

  console.log(`  形式: ${isNewFormat ? "新形式 (segment_text/time_text)" : "旧形式 (description)"}`);

  const records: JmpsaRecord[] = [];
  let geocodeFailed = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const f = parseCsvLine(line);
    const get = (idx: number) => f[idx]?.trim() ?? "";

    const road_name  = get(C.road_name);
    const prefecture = get(C.prefecture);

    // 区間テキストと description を形式に応じて構築
    let segmentText: string;
    let description: string;
    if (isNewFormat) {
      segmentText = get(C.segment_text);
      const timeText = C.time_text >= 0 ? get(C.time_text) : "終日";
      description = timeText ? `${segmentText}（${timeText}）` : segmentText;
    } else {
      const desc = get(C.description);
      // 旧形式: "startText〜endText（time）" → 末尾の（...）を除いて区間テキストを復元
      segmentText = desc.replace(/（[^）]*）\s*$/, "").trim();
      description = desc;
    }

    const appliesToRaw = get(C.applies_to);
    const applies_to = appliesToRaw
      .split(/[|,]/)
      .map((v) => v.trim())
      .filter((v): v is VehicleClass => ["genki1", "genki2", "normal"].includes(v));

    if (applies_to.length === 0) {
      console.warn(`  行 ${i + 1}: applies_to が無効 ("${appliesToRaw}") → スキップ`);
      continue;
    }

    let start_lat = parseFloat(get(C.start_lat));
    let start_lng = parseFloat(get(C.start_lng));
    let end_lat   = parseFloat(get(C.end_lat));
    let end_lng   = parseFloat(get(C.end_lng));
    let coordinate_accuracy: CoordinateAccuracy = "exact";

    const hasCoords = ![start_lat, start_lng, end_lat, end_lng].some(isNaN);

    if (!hasCoords) {
      if (!withGeocode) {
        console.warn(`  行 ${i + 1}: 座標が空欄 → スキップ (--geocode で自動取得)`);
        continue;
      }

      const { startText, endText } = parseSegmentLocations(segmentText);
      console.log(`  行 ${i + 1}: ジオコーディング中... ${road_name} ${startText}`);

      const coords = await geocodeSegment(startText, endText, road_name, prefecture);
      if (!coords) {
        console.warn(`  行 ${i + 1}: ジオコーディング失敗 → スキップ`);
        geocodeFailed++;
        continue;
      }

      ({ startLat: start_lat, startLng: start_lng, endLat: end_lat, endLng: end_lng } = coords);
      coordinate_accuracy = coords.accuracy;
      if (coordinate_accuracy === "municipality") {
        console.warn(`  行 ${i + 1}: 市区町村代表点を使用`);
      }
    }

    records.push({
      source_ref: makeSourceRef(road_name, prefecture, segmentText), // fetchJmpsaData と同じ計算式
      road_name,
      prefecture,
      description,
      applies_to,
      start_lat,
      start_lng,
      end_lat,
      end_lng,
      coordinate_accuracy,
    });
  }

  if (geocodeFailed > 0) console.warn(`⚠️ ${geocodeFailed} 件はジオコーディング失敗でスキップ`);
  return records;
}

// ---------------------------------------------------------------------------
// Supabase挿入
// ---------------------------------------------------------------------------
async function insertSegments(records: JmpsaRecord[], dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] 挿入予定データ（先頭5件）:");
    records.slice(0, 5).forEach((r, i) => {
      console.log(`\n  [${i + 1}] ${r.prefecture} / ${r.road_name}`);
      console.log(`    source_ref : ${r.source_ref}`);
      console.log(`    applies_to : ${r.applies_to.join(", ")}`);
      console.log(`    description: ${r.description.slice(0, 60)}`);
      console.log(`    start      : (${r.start_lat}, ${r.start_lng})`);
      console.log(`    end        : (${r.end_lat}, ${r.end_lng})`);
    });
    console.log(`\n合計 ${records.length} 件 (--dry-run のためDB挿入なし)`);
    return;
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を .env.local に設定してください");
    process.exit(1);
  }

  // Supabase クライアントは Node.js 20 では WebSocket 初期化に失敗するため
  // PostgREST REST API を fetch で直接呼び出す
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
      source: "jmpsa",
      source_ref: r.source_ref,
      license: "jmpsa-public",
      applies_to: r.applies_to,
      road_name: r.road_name || null,
      prefecture: r.prefecture || null,
      description: r.description || null,
      status: "verified",
      coordinate_accuracy: r.coordinate_accuracy,
      start_point: `POINT(${r.start_lng} ${r.start_lat})`,
      end_point: `POINT(${r.end_lng} ${r.end_lat})`,
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

    if (i + BATCH < records.length) await sleep(500);
  }

  console.log(`\n\n完了: ${inserted} 件挿入, ${skipped} 件スキップ`);
}

// ---------------------------------------------------------------------------
// メイン
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const withGeocode = args.includes("--geocode");
  const exportIdx = args.indexOf("--export");
  const exportPath = exportIdx >= 0 ? args[exportIdx + 1] : undefined;
  const csvPath = args.find((a) => !a.startsWith("--"));

  console.log("=== JMPSAデータ取込スクリプト ===");
  console.log("出典: 日本二輪車普及安全協会 公開Webサイト情報 (提携・契約なし)");
  console.log("");

  if (exportPath) {
    await scrapeAndExportCsv(exportPath);
    return;
  }

  let records: JmpsaRecord[];

  if (csvPath) {
    console.log(`CSVファイルから読み込み: ${csvPath}${withGeocode ? " (--geocode: 座標なし行をジオコーディング)" : ""}`);
    records = await loadFromCsv(csvPath, withGeocode);
  } else {
    console.log("JMPSAサイトからスクレイピング + Nominatim ジオコーディング...");
    console.log("※ Nominatim レート制限: 1件/秒。500件で約15〜20分かかります。\n");
    records = await fetchJmpsaData();
  }

  console.log(`\n取得レコード数: ${records.length} 件`);
  if (records.length === 0) {
    console.log("データがありません。終了します。");
    return;
  }

  console.log(`\nSupabaseに挿入中${dryRun ? " (DRY RUN)" : ""}...`);
  await insertSegments(records, dryRun);
}

main().catch((err) => {
  console.error("エラー:", err);
  process.exit(1);
});
