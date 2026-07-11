// Search Console の URL Inspection API で sitemap 内全URLのインデックス状況を確認し、
// 未登録ページ一覧をレポートするスクリプト（GitHub Actions から定期実行する想定）。
//
// 必要な環境変数:
//   GCP_SA_KEY   … サービスアカウントの JSON キー。
//                  そのままの JSON でも、base64 化した JSON でも可（自動判別）。
//                  .env.local に1行で書く場合は base64 を推奨。
//   GSC_SITE_URL … Search Console のプロパティ URL
//                  URLプレフィックス型: "https://www.bikeroutemap.com/"
//                  ドメイン型:          "sc-domain:bikeroutemap.com"
//   SITEMAP_URL  … 省略時は https://www.bikeroutemap.com/sitemap.xml
//
// ローカル実行: .env.local に上記を記載して `npm run check:index`
//
// 注意: URL Inspection API はプロパティの「オーナー」または「フル」権限が必要。
//       サービスアカウントのメールを Search Console のユーザーに追加しておくこと。

import { GoogleAuth } from "google-auth-library";

const SITE_URL = process.env.GSC_SITE_URL;
const SITEMAP_URL = process.env.SITEMAP_URL ?? "https://www.bikeroutemap.com/sitemap.xml";
const INSPECT_ENDPOINT = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

// レート制御用の待機（600 req/min 上限に余裕を持たせる）
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function assertEnv() {
  const missing = [];
  if (!process.env.GCP_SA_KEY) missing.push("GCP_SA_KEY");
  if (!SITE_URL) missing.push("GSC_SITE_URL");
  if (missing.length) {
    console.error(`環境変数が不足しています: ${missing.join(", ")}`);
    process.exit(1);
  }
}

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`sitemap 取得失敗: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

// GCP_SA_KEY は「生の JSON」または「base64 化した JSON」のどちらでも受け付ける。
// .env.local に多行 JSON をそのまま書くのは扱いづらいため、base64 も許容する。
function parseServiceAccount(raw) {
  const val = raw.trim();
  const json = val.startsWith("{") ? val : Buffer.from(val, "base64").toString("utf8");
  try {
    return JSON.parse(json);
  } catch {
    throw new Error(
      "GCP_SA_KEY を解析できません。サービスアカウントの JSON、または base64 化した JSON を指定してください。"
    );
  }
}

async function getAccessToken() {
  const credentials = parseServiceAccount(process.env.GCP_SA_KEY);
  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("アクセストークンの取得に失敗しました");
  return token;
}

async function inspect(url, token) {
  const res = await fetch(INSPECT_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
  });
  if (res.status === 429) return { url, error: "rate_limited" };
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { url, error: `${res.status} ${text.slice(0, 200)}` };
  }
  const data = await res.json();
  const r = data.inspectionResult?.indexStatusResult ?? {};
  return {
    url,
    verdict: r.verdict ?? "UNKNOWN", // PASS = インデックス済み
    coverageState: r.coverageState ?? "不明",
    lastCrawl: r.lastCrawlTime ?? null,
  };
}

function isIndexed(r) {
  return r.verdict === "PASS";
}

async function main() {
  assertEnv();
  const urls = await fetchSitemapUrls();
  console.log(`対象URL: ${urls.length} 件`);

  const token = await getAccessToken();
  const results = [];
  for (const url of urls) {
    results.push(await inspect(url, token));
    await sleep(150); // 約 400 req/min に抑える
  }

  const errored = results.filter((r) => r.error);
  const indexed = results.filter((r) => !r.error && isIndexed(r));
  const notIndexed = results.filter((r) => !r.error && !isIndexed(r));

  // ---- レポート生成（GitHub Step Summary があればそちらにも出力） ----
  const lines = [];
  lines.push(`# インデックス状況レポート`);
  lines.push("");
  lines.push(`- 対象: **${urls.length}** ページ`);
  lines.push(`- ✅ インデックス済み: **${indexed.length}**`);
  lines.push(`- ⚠️ 未登録: **${notIndexed.length}**`);
  if (errored.length) lines.push(`- ❗ 取得エラー: **${errored.length}**`);
  lines.push("");

  if (notIndexed.length) {
    lines.push(`## ⚠️ 未登録ページ（手動でインデックス登録をリクエストする候補）`);
    lines.push("");
    lines.push(`| URL | 状態 | 最終クロール |`);
    lines.push(`| --- | --- | --- |`);
    for (const r of notIndexed) {
      const crawl = r.lastCrawl ? r.lastCrawl.slice(0, 10) : "未クロール";
      lines.push(`| ${r.url} | ${r.coverageState} | ${crawl} |`);
    }
    lines.push("");
  } else {
    lines.push(`🎉 未登録ページはありません。`);
    lines.push("");
  }

  if (errored.length) {
    lines.push(`## ❗ 取得エラー`);
    for (const r of errored) lines.push(`- ${r.url} … ${r.error}`);
    lines.push("");
  }

  const report = lines.join("\n");
  console.log("\n" + report);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const { appendFileSync } = await import("node:fs");
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
