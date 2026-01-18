import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* -----------------------------
     1. Always allow NextAuth
  --------------------------------*/
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  /* -----------------------------
     2. Public routes (no auth)
  --------------------------------*/
  const publicRoutes = [
    "/api/contact",
    "/api/skills",
    "/api/projects",
    "/api/blogs",
    "/api/about",
    "/api/hero",
    "/api/admin-login",
    "/admin/login",
  ];

  const isPublic = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isPublic) {
    return NextResponse.next();
  }

  /* -----------------------------
     3. Check Google / NextAuth admin
  --------------------------------*/
  let isGoogleAdmin = false;

  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (session?.email === process.env.ALLOWED_GOOGLE_ADMIN) {
      isGoogleAdmin = true;
    }
  } catch {
    // ignore — Edge-safe
  }

  /* -----------------------------
     4. Check ENV admin JWT cookie
  --------------------------------*/
  let isEnvAdmin = false;
  const jwtToken = req.cookies.get("admin_token")?.value;

  if (jwtToken && process.env.ADMIN_JWT_SECRET) {
    try {
      const secret = new TextEncoder().encode(
        process.env.ADMIN_JWT_SECRET
      );
      await jwtVerify(jwtToken, secret);
      isEnvAdmin = true;
    } catch {
      // invalid token → treated as unauthenticated
    }
  }

  /* -----------------------------
     5. Block unauthorized access
  --------------------------------*/
  if (!isGoogleAdmin && !isEnvAdmin) {
    // API → 401 JSON
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Pages → redirect (NO JSON!)
    if (pathname.startsWith("/admin")) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/* -----------------------------
   6. Matcher (precise & safe)
--------------------------------*/
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
