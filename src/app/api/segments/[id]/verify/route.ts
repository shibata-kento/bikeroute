import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { VoteType } from "@/lib/supabase/types";

// POST /api/segments/[id]/verify
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const body = await request.json();
  const vote = body.vote as VoteType;
  if (vote !== "confirm" && vote !== "dispute") {
    return NextResponse.json({ error: "vote は confirm か dispute のみ有効です" }, { status: 400 });
  }

  const { error } = await supabase
    .from("verifications")
    .upsert(
      { segment_id: id, user_id: user.id, vote, comment: body.comment ?? null },
      { onConflict: "segment_id,user_id" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
