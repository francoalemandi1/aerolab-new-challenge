import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");

  if (error || errorCode) {
    return NextResponse.redirect(
      `${origin}/auth/callback-result?error=${encodeURIComponent(
        error || "Unknown error"
      )}&error_code=${encodeURIComponent(errorCode || "unknown")}`
    );
  }

  if (code) {
    const supabase = await createSupabaseServerClient();

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        throw error;
      }

      if (data.user && data.session) {
        // Success! Redirect to success page
        return NextResponse.redirect(
          `${origin}/auth/callback-result?success=true`
        );
      } else {
        // No user or session in response
        return NextResponse.redirect(
          `${origin}/auth/callback-result?error=${encodeURIComponent(
            "No user session created"
          )}`
        );
      }
    } catch (error) {
      return NextResponse.redirect(
        `${origin}/auth/callback-result?error=${encodeURIComponent(
          error instanceof Error ? error.message : "Authentication failed"
        )}`
      );
    }
  } else {
    // No code found in callback
    return NextResponse.redirect(
      `${origin}/auth/callback-result?error=${encodeURIComponent(
        "No authorization code received"
      )}`
    );
  }
}
