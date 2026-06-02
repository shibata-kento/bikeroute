import type { MetadataRoute } from "next";
import { PREFECTURES } from "@/lib/prefectures";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bikeroute.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/segments`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles/bike-traffic-rules`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles/new-moped-2025`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guide`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/prefectures`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...PREFECTURES.map((p) => ({
      url: `${BASE_URL}/prefectures/${p.slug}`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-06-02"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
