import { NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/adminApi";

export async function GET() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  return NextResponse.json({ orders: [] });
}

export async function DELETE() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  return NextResponse.json(
    { error: "Orders are handled by email only." },
    { status: 410 },
  );
}

export async function PATCH() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  return NextResponse.json(
    { error: "Order statuses are not stored without a database." },
    { status: 410 },
  );
}
