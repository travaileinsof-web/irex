import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "irex_admin_token";

function getSecret(): Uint8Array {
  return new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET ||
      "irex-mining-secret-change-in-production-please-use-a-strong-random-string"
  );
}

async function isValidAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return Boolean(payload?.userId && payload?.role === "admin");
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin pages except the login page itself.
  // The API routes already enforce auth via requireAdmin(); this middleware
  // adds a defence-in-depth layer so a missing/invalid cookie redirects to
  // login before the page even starts rendering.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const ok = token ? await isValidAdminToken(token) : false;
    if (!ok) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run the middleware on admin pages (Next.js handles matcher ordering).
  matcher: ["/admin/:path*"],
};
