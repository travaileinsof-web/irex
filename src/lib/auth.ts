/**
 * Simple JWT-based admin auth — works serverless, no session DB needed
 */
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const secret = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "irex-mining-secret-change-in-production-please-use-a-strong-random-string"
);

const COOKIE_NAME = "irex_admin_token";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export async function createToken(userId: string, email: string) {
  return await new SignJWT({ userId, email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function getAdminFromRequest(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const tokenMatch = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!tokenMatch) return null;
  const payload = await verifyToken(tokenMatch[1]);
  if (!payload) return null;
  const admin = await db.adminUser.findUnique({ where: { id: payload.userId } });
  return admin;
}

export async function requireAdmin(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return { admin: null, error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { admin, error: null };
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
