import { NextRequest, NextResponse } from "next/server";

// 短縮URL解決用に許可するホストのみ（SSRF対策: 任意URLへの fetch を防ぐ）
const ALLOWED_HOSTS = new Set([
  "maps.app.goo.gl",
  "goo.gl",
  "www.google.com",
  "google.com",
  "maps.google.com",
]);

function isAllowedUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    return ALLOWED_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  // 許可ホスト以外は拒否（内部ネットワーク・メタデータエンドポイントへのアクセスを防止）
  if (!isAllowedUrl(url)) {
    return NextResponse.json({ error: "対応していないURLです" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(5000),
    });
    // リダイレクト追跡先も許可ホスト内かを再検証
    if (!isAllowedUrl(res.url)) {
      return NextResponse.json({ error: "対応していないURLです" }, { status: 400 });
    }
    return NextResponse.json({ resolvedUrl: res.url });
  } catch {
    return NextResponse.json({ error: "URL解決に失敗しました" }, { status: 422 });
  }
}
