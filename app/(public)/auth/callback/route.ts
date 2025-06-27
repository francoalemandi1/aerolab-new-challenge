import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");

  console.log("Auth callback route:", { code: !!code, error, errorCode });

  // Handle error cases
  if (error) {
    console.log("Error in callback:", { error, errorCode });
    let redirectPath = "/auth/callback-result";
    
    if (errorCode === "otp_expired") {
      redirectPath += "?status=expired";
    } else if (error === "access_denied") {
      redirectPath += "?status=invalid";
    } else {
      redirectPath += "?status=error";
    }
    
    return NextResponse.redirect(new URL(redirectPath, origin));
  }

  // Handle success case
  if (code) {
    console.log("Processing auth code");
    
    try {
      const supabase = await createSupabaseServerClient();
      
      // Exchange code for session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      console.log("Exchange result:", {
        user: !!data?.user,
        session: !!data?.session,
        error: exchangeError?.message
      });

      if (exchangeError) {
        console.error("Exchange error:", exchangeError);
        return NextResponse.redirect(new URL("/auth/callback-result?status=error", origin));
      }

      if (data?.user && data?.session) {
        console.log("Success! Redirecting to success page");
        return NextResponse.redirect(new URL("/auth/callback-result?status=success", origin));
      } else {
        console.log("No user or session in response");
        return NextResponse.redirect(new URL("/auth/callback-result?status=error", origin));
      }
    } catch (error) {
      console.error("Unexpected error during exchange:", error);
      return NextResponse.redirect(new URL("/auth/callback-result?status=error", origin));
    }
  }

  // No code and no error - invalid callback
  console.log("No code found in callback");
  return NextResponse.redirect(new URL("/auth/callback-result?status=invalid", origin));
} 