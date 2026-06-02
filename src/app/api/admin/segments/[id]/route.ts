import { NextRequest, NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  createServiceRoleClient,
} from "@/lib/supabase/server";

function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  return (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
    .includes(email);
}

// PATCH /api/admin/segments/[id]
// Body: { action: 'approve' | 'reject' }
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const action = body.action as string;
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json(
      { error: "action は approve か reject のみ有効です" },
      { status: 400 }
    );
  }

  const newStatus = action === "approve" ? "verified" : "rejected";
  const serviceClient = await createServiceRoleClient();
  const { error } = await serviceClient
    .from("restricted_segments")
    .update({
      status: newStatus,
      ...(newStatus === "verified" ? { verified_at: new Date().toISOString() } : {}),
    })
    .eq("id", id)
    .eq("source", "user");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
