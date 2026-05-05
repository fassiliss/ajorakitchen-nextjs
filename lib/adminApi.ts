import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function ensureAdmin() {
  try {
    await requireAdmin();
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
