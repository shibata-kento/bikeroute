import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  return (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
    .includes(email);
}

// GET /api/admin/segments — 審査待ちユーザー投稿一覧（管理者のみ）
export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase.rpc("list_restricted_segments", {
    p_vehicle: null,
    p_status: "pending",
    p_limit: 200,
    p_sources: ["user"],
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const userSegments = (data ?? []).filter((s) => s.source === "user");
  return NextResponse.json(userSegments);
}
