import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { PREFECTURES } from "@/lib/prefectures";
import { createStaticSupabaseClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bikeroutemap.com";

// サイト構造・テンプレート・都道府県データを最後に更新した日。
// 内容を実際に更新したときだけこの日付を更新する。
// （毎リクエスト now を返すと lastmod が常に変動し、Google に信頼されにくくなるため固定値にする）
const CONTENT_LAST_UPDATED = new Date("2026-07-09");

// PREFECTURE_INFO を持つ主要な都道府県
const PREFECTURE_INFO_SLUGS = new Set([
  "tokyo",
  "kanagawa",
  "osaka",
  "aichi",
  "fukuoka",
  "hyogo",
]);

async function getIndexedPrefectureSlugs(): Promise<Set<string>> {
  const indexedSlugs = new Set<string>(PREFECTURE_INFO_SLUGS);
  try {
    const supabase = createStaticSupabaseClient();
    const { data, error } = await supabase.rpc("get_prefecture_segment_counts");
    if (!error && data) {
      for (const row of data) {
        if (Number(row.cnt) > 0) {
          const pref = PREFECTURES.find((p) => p.name === row.prefecture);
          if (pref) indexedSlugs.add(pref.slug);
        }
      }
    }
  } catch {
    // DBエラー時は情報のある都道府県のみ対象とする
  }
  return indexedSlugs;
}

// 記事・有効な都道府県データから自動生成する。
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/segments`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/articles`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/prefectures`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/guide`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 記事は公開日（articles の date）を lastmod に使う
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const indexedSlugs = await getIndexedPrefectureSlugs();

  // noindex（データ0件かつ固有情報なし）の都道府県ページは sitemap から除外してインデックス品質を保つ
  const prefecturePages: MetadataRoute.Sitemap = PREFECTURES
    .filter((p) => indexedSlugs.has(p.slug))
    .map((p) => ({
      url: `${BASE_URL}/prefectures/${p.slug}`,
      lastModified: CONTENT_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...articlePages, ...prefecturePages];
}
