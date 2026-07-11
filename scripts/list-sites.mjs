// Search Console でこのサービスアカウントがアクセスできるプロパティ一覧を表示する診断用スクリプト。
//   npm run check:sites
// ここで表示された siteUrl を GSC_SITE_URL に設定する。

import { GoogleAuth } from "google-auth-library";

function credentials() {
  const raw = process.env.GCP_SA_KEY;
  if (raw) {
    const v = raw.trim();
    const json = v.startsWith("{") ? v : Buffer.from(v, "base64").toString("utf8");
    return { credentials: JSON.parse(json) };
  }
  const keyFile = process.env.GCP_SA_KEY_FILE || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyFile) return { keyFile };
  console.error("GCP_SA_KEY または GCP_SA_KEY_FILE を設定してください");
  process.exit(1);
}

const auth = new GoogleAuth({
  ...credentials(),
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});
const client = await auth.getClient();
const { token } = await client.getAccessToken();

const res = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
console.log("HTTP", res.status);

const entries = data.siteEntry ?? [];
if (!entries.length) {
  console.log(
    "アクセスできるプロパティがありません。\n" +
      "→ Search Console の「設定 → ユーザーと権限」でこのサービスアカウントを追加してください。"
  );
} else {
  console.log("アクセス可能なプロパティ:");
  for (const e of entries) {
    console.log(`  siteUrl=${e.siteUrl}  権限=${e.permissionLevel}`);
  }
  console.log(
    "\n→ 上記の siteUrl を GSC_SITE_URL に設定してください（権限は siteOwner か siteFullUser が必要）。"
  );
}
