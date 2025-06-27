import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");

  // If there's an error, redirect to callback page with error parameters
  if (error || errorCode) {
    const callbackUrl = new URL("/auth/callback", origin);
    callbackUrl.searchParams.set("error", error || "unknown_error");
    if (errorCode) {
      callbackUrl.searchParams.set("error_code", errorCode);
    }
    return NextResponse.redirect(callbackUrl.toString());
  }

  // If we have a code, try to exchange it for a session
  if (code) {
    const supabase = await createSupabaseServerClient();

    try {
      const { data, error: supabaseError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (supabaseError) {
        console.error("Error exchanging code for session:", supabaseError);
        // Redirect to callback page with error
        const callbackUrl = new URL("/auth/callback", origin);
        callbackUrl.searchParams.set("error", "exchange_failed");
        return NextResponse.redirect(callbackUrl.toString());
      }

      if (data.user && data.session) {
        // Success! Redirect to callback page with success status
        console.log("Email confirmation successful, showing success page");
        const callbackUrl = new URL("/auth/callback", origin);
        callbackUrl.searchParams.set("success", "true");
        return NextResponse.redirect(callbackUrl.toString());
      } else {
        // No session created, redirect to callback page with error
        const callbackUrl = new URL("/auth/callback", origin);
        callbackUrl.searchParams.set("error", "no_session");
        return NextResponse.redirect(callbackUrl.toString());
      }
    } catch (error) {
      console.error("Exception during code exchange:", error);
      // Redirect to callback page with error
      const callbackUrl = new URL("/auth/callback", origin);
      callbackUrl.searchParams.set("error", "server_error");
      return NextResponse.redirect(callbackUrl.toString());
    }
  }

  // No code found, redirect to callback page with error
  const callbackUrl = new URL("/auth/callback", origin);
  callbackUrl.searchParams.set("error", "no_code");
  return NextResponse.redirect(callbackUrl.toString());
}
