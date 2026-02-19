import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is not set");

const JWT_SECRET = new TextEncoder().encode(secret);

export async function requireAdmin() {
  const cookieStore = await cookies(); // ✅ await cookies()
  const token = cookieStore.get("admin-token")?.value;

  if (!token) throw new Error("UNAUTHORIZED");

  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}
