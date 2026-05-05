import { NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/adminApi";

export async function GET() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  return NextResponse.json({ cateringRequests: [] });
}

export async function DELETE() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  return NextResponse.json(
    { error: "Catering requests are handled by email only." },
    { status: 410 },
  );
}
