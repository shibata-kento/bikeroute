import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { CATEGORY_CONFIG, type RestrictionCategory } from "@/lib/restriction-categories";
import type { SegmentStatus, SegmentListItem } from "@/lib/supabase/types";

const VALID_STATUSES: SegmentStatus[] = ["pending", "verified", "rejected"];

// GET /api/segments?category=all_bikes&status=verified[&prefecture=東京都][&userOnly=1]
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawCategory = searchParams.get("category") as RestrictionCategory | null;
  const category: RestrictionCategory =
    rawCategory && rawCategory in CATEGORY_CONFIG ? rawCategory : "all_bikes";
  const prefecture = searchParams.get("prefecture");
  const userOnly = searchParams.get("userOnly") === "1";
  const rawStatus = searchParams.get("status") ?? "verified";
  const status: SegmentStatus = VALID_STATUSES.includes(rawStatus as SegmentStatus)
    ? (rawStatus as SegmentStatus)
    : "verified";

  const { appliesToExact, sources: categorySources, restrictionTags } = CATEGORY_CONFIG[category];
  // userOnly=1 のときは source を user のみに絞る
  const sources = userOnly ? ["user"] : categorySources;

  const supabase = await createServerSupabaseClient();

  const { data: rpcData, error: rpcError } = await supabase.rpc(
    "list_restricted_segments",
    {
      p_vehicle: null,
      p_status: status,
      p_limit: 2000,
      p_sources: sources,
      p_prefecture: prefecture ?? null,
      p_applies_to_exact: appliesToExact,
      p_restriction_tags: restrictionTags ?? null,
    }
  );

  if (!rpcError && rpcData) {
    return NextResponse.json(rpcData as SegmentListItem[]);
  }

  // fallback: 旧クエリ
  let query = supabase
    .from("restricted_segments")
    .select(
      "id, source, applies_to, road_name, prefecture, description, status, verification_count, created_at"
    )
    .eq("status", status)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .in("source", sources as any)
    .order("created_at", { ascending: false })
    .limit(2000);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query = (query as any).filter("applies_to", "eq", `{${appliesToExact.join(",")}}`);

  if (prefecture) {
    query = query.eq("prefecture", prefecture);
  }
  if (restrictionTags) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query = (query as any).or(
      `source.neq.osm,restriction_tag.in.(${restrictionTags.join(",")})`
    );
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []) as SegmentListItem[]);
}

// POST /api/segments
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const body = await request.json();
  const { road_name, prefecture, description, applies_to, start_lat, start_lng, end_lat, end_lng } =
    body;

  if (
    !applies_to?.length ||
    start_lat == null ||
    start_lng == null ||
    end_lat == null ||
    end_lng == null
  ) {
    return NextResponse.json({ error: "必須パラメータが不足しています" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("restricted_segments")
    .insert({
      source: "user",
      applies_to,
      road_name: road_name || null,
      prefecture: prefecture || null,
      description: description || null,
      status: "pending",
      created_by: user.id,
      start_point: `POINT(${start_lng} ${start_lat})`,
      end_point: `POINT(${end_lng} ${end_lat})`,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
