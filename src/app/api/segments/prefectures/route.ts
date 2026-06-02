import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { CATEGORY_CONFIG, type RestrictionCategory } from "@/lib/restriction-categories";

// GET /api/segments/prefectures?category=all_bikes
// verified セグメントの都道府県一覧を返す（null は除外）
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawCategory = searchParams.get("category") as RestrictionCategory | null;
  const category: RestrictionCategory =
    rawCategory && rawCategory in CATEGORY_CONFIG ? rawCategory : "all_bikes";

  const { appliesToExact, sources } = CATEGORY_CONFIG[category];

  const supabase = await createServerSupabaseClient();

  const baseQuery = supabase
    .from("restricted_segments")
    .select("prefecture")
    .eq("status", "verified")
    .not("prefecture", "is", null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .in("source", sources as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (baseQuery as any).filter(
    "applies_to", "eq", `{${appliesToExact.join(",")}}`
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const prefectures = Array.from(
    new Set(((data ?? []) as { prefecture: string }[]).map((r) => r.prefecture))
  ).sort();

  return NextResponse.json(prefectures);
}
