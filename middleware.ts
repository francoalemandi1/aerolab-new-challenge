import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    // Create response and supabase client once
    const response = NextResponse.next();
    const supabase = createSupabaseMiddlewareClient(request, response);

    // Get session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Special handling for root path
    if (pathname === "/") {
      if (session?.user) {
        // Authenticated users go to /games
        return NextResponse.redirect(new URL("/games", request.url));
      } else {
        // Unauthenticated users go to signin
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    }

    // Public routes - allow access without authentication
    const publicRoutes = [
      "/auth/signin",
      "/auth/signup",
      "/auth/callback",
      "/auth/callback-result",
    ];

    // Allow public access to individual game pages
    const isGameDetailPage = /^\/games\/[^\/]+$/.test(pathname);

    if (publicRoutes.includes(pathname) || isGameDetailPage) {
      return NextResponse.next();
    }

    // Protected routes - require authentication
    if (!session?.user) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return NextResponse.next();
  } catch {
    // If there's an error checking auth, redirect to signin to be safe
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
