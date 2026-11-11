import { auth } from "./auth";
import { NextResponse } from "next/server";
import { OPEN_GAMES_ENABLED } from "./lib/features";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isAdmin =
    !!req.auth?.user && (req.auth.user as { role?: string }).role === "admin";

  if (
    !OPEN_GAMES_ENABLED &&
    (pathname === "/games" || pathname === "/admin/open-games")
  ) {
    return NextResponse.redirect(
      new URL(pathname.startsWith("/admin") ? "/admin" : "/book", req.nextUrl.origin),
    );
  }

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/games"],
};
