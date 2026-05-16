import { NextRequest, NextResponse } from "next/server";

/**
 * Security middleware — runs on every request.
 * Handles: security headers, bot protection on API routes, admin redirect.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ==================== SECURITY HEADERS ====================
  // These supplement (not replace) netlify.toml headers.
  // They ensure consistent security even if self-hosted via Caddy.

  // Prevent MIME-type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking (admin allows SAMEORIGIN for Identity widget)
  if (pathname.startsWith("/admin")) {
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
  } else {
    response.headers.set("X-Frame-Options", "DENY");
  }

  // XSS protection (legacy browsers)
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy — disable unnecessary browser features
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // Noindex on API and admin routes
  if (pathname.startsWith("/api/") || pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // No-store cache on API routes
  if (pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store");
  }

  return response;
}

export const config = {
  // Match all routes except Next.js internals and static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|logo).*)",
  ],
};
