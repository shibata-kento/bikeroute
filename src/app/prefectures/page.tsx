import type { Metadata } from "next";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { PREFECTURES, nameToSlug } from "@/lib/prefectures";

export const metadata: Metadata = {
  title: "都道府県別 通行禁止区間",
  description:
    "都道府県ごとのバイク通行禁止区間をまとめました。東京・神奈川・大阪など各都道府県の自動車専用道路・二輪通行禁止区間を確認できます。",
};

async function getPrefectureCounts(): Promise<Map<string, number>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_prefecture_segment_counts");
  if (error || !data) return new Map();
  return new Map(data.map((r) => [r.prefecture, Number(r.cnt)]));
}

export default async function PrefecturesPage() {
  const countMap = await getPrefectureCounts();

  const regions = [...new Set(PREFECTURES.map((p) => p.region))];

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-black text-gray-900">
        都道府県別 通行禁止区間
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        バイクの通行禁止区間を都道府県ごとに確認できます。
      </p>

      <div className="space-y-8">
        {regions.map((region) => {
          const prefs = PREFECTURES.filter((p) => p.region === region);
          return (
            <section key={region}>
              <h2 className="mb-3 text-sm font-bold text-gray-500 uppercase tracking-wide">
                {region}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {prefs.map((pref) => {
                  const count = countMap.get(pref.name) ?? 0;
                  const slug = nameToSlug(pref.name) ?? pref.slug;
                  return (
                    <Link
                      key={pref.slug}
                      href={`/prefectures/${slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:border-orange-300 hover:bg-orange-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800">{pref.name}</span>
                      {count > 0 ? (
                        <span className="ml-2 shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                          {count}
                        </span>
                      ) : (
                        <span className="ml-2 shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
                          0
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
