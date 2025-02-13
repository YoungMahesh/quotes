import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env.js";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/add")) {
    const adminKey = request.cookies.get("admin-key")?.value;
    if (adminKey !== env.ADMIN_KEY) {
      return NextResponse.redirect(new URL("/authenticate", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add/:path*"],
};
