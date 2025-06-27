import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  const supabase = createSupabaseMiddlewareClient(request, response);

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Define protected and public routes
  const isProtectedRoute =
    pathname.startsWith("/home") ||
    pathname.startsWith("/dashboard") ||
    pathname === "/";

  const isAuthRoute =
    pathname.startsWith("/auth/") && !pathname.startsWith("/auth/callback");

  // If user is authenticated
  if (user) {
    // Redirect authenticated users away from auth pages to home
    if (isAuthRoute) {
      console.log(
        `🔄 Redirecting authenticated user from ${pathname} to /home`
      );
      return NextResponse.redirect(new URL("/home", request.url));
    }

    // Redirect authenticated users from root to home
    if (pathname === "/") {
      console.log(`🔄 Redirecting authenticated user from root to /home`);
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else {
    // If user is not authenticated and trying to access protected routes
    if (isProtectedRoute) {
      console.log(
        `🔒 Redirecting unauthenticated user from ${pathname} to /auth/signin`
      );
      const redirectUrl = new URL("/auth/signin", request.url);
      // Only add redirectTo if it's not the root path
      if (pathname !== "/") {
        redirectUrl.searchParams.set("redirectTo", pathname);
      }
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Special handling for password reset
  if (pathname === "/auth/reset-password") {
    // Allow access for password reset, but check for valid session in the component
    return response;
  }

  // Log successful middleware execution for debugging
  console.log(
    `✅ Middleware passed for ${pathname} - User: ${user ? "authenticated" : "anonymous"}`
  );

  return response;
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
