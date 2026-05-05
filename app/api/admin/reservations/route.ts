import { NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/adminApi";

export async function GET() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  return NextResponse.json({ reservations: [] });
}

export async function DELETE() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  return NextResponse.json(
    { error: "Reservations are handled by email only." },
    { status: 410 },
  );
}
