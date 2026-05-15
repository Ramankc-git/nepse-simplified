import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hash = url.hash || "";

  // If there's an invite/confirmation/recovery token in the URL,
  // redirect to /admin/ where the Identity widget can process it
  if (
    hash.includes("invite_token") ||
    hash.includes("confirmation_token") ||
    hash.includes("recovery_token") ||
    url.search.includes("invite_token") ||
    url.search.includes("confirmation_token") ||
    url.search.includes("recovery_token")
  ) {
    const adminUrl = url.toString().replace(url.pathname, "/admin/");
    // Replace the hostname+path but preserve hash/search params
    const redirectUrl = new URL("/admin/", request.url);
    redirectUrl.hash = hash;
    redirectUrl.search = url.search;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!admin|api|_next|static|fonts|favicon).*)"],
};
