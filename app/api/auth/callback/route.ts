import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/home";

  if (code) {
    const supabase = await createSupabaseServerClient();

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          new URL("/auth/signin?error=Authentication failed", requestUrl.origin)
        );
      }
    } catch (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(
        new URL("/auth/signin?error=Authentication failed", requestUrl.origin)
      );
    }
  }

  // Redirect to the intended page or home
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
