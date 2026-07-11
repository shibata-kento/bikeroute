import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { PREFECTURES } from "@/lib/prefectures";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bikeroutemap.com";

// サイト構造・テンプレート・都道府県データを最後に更新した日。
// 内容を実際に更新したときだけこの日付を更新する。
// （毎リクエスト now を返すと lastmod が常に変動し、Google に信頼されにくくなるため固定値にする）
const CONTENT_LAST_UPDATED = new Date("2026-07-09");

// 記事・都道府県データから自動生成する。ページを増やしても sitemap への追加漏れが起きない。
export default function sitemap(): MetadataRoute.Sitemap {
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

  const prefecturePages: MetadataRoute.Sitemap = PREFECTURES.map((p) => ({
    url: `${BASE_URL}/prefectures/${p.slug}`,
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...prefecturePages];
}
