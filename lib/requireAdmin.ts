import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

export async function requireAdmin() {
  if (!secret) throw new Error("UNAUTHORIZED");

  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) throw new Error("UNAUTHORIZED");

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}
