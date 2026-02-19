import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    await requireAdmin();

    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ messages: data ?? [] });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .delete()
      .eq("id", id);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status },
    );
  }
}
