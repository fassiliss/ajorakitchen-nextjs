import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is not set");
const JWT_SECRET = new TextEncoder().encode(secret);

export async function requireAdmin() {
  const token = (await cookies()).get("admin-token")?.value;
  if (!token) throw new Error("UNAUTHORIZED");

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Optional hardening if you store a claim like { role: "admin" }:
    // if (payload.role !== "admin") throw new Error("FORBIDDEN");

    return payload;
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}
