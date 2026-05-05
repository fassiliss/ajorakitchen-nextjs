import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const jwtSecret = process.env.JWT_SECRET;

function getEncodedSecret() {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set");
  }

  return new TextEncoder().encode(jwtSecret);
}

async function isValidPassword(password: string) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  return Boolean(plainPassword) && password === plainPassword;
}

export async function POST(request: Request) {
  try {
    const { username, password } = (await request.json()) as {
      username?: string;
      password?: string;
    };

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";

    if (
      !username ||
      !password ||
      username !== expectedUsername ||
      !(await isValidPassword(password))
    ) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(getEncodedSecret());

    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: { username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
