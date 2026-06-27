import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host === "bikeroute.vercel.app") {
    const url = request.nextUrl.clone();
    url.host = "www.bikeroutemap.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, { status: 301 });
  }

  const { supabase, response } = createMiddlewareClient(request);
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
