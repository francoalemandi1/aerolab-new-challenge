import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { signUpSchema } from "@/lib/validations";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection
    const headersList = await headers();
    const origin = headersList.get("origin");
    const referer = headersList.get("referer");

    if (!origin || !referer || !referer.startsWith(origin)) {
      return NextResponse.json(
        { error: "Invalid request origin" },
        { status: 403 }
      );
    }

    // Parse JSON with better error handling
    let body;
    try {
      const rawBody = await request.text();
      console.log("Raw request body:", rawBody);

      if (!rawBody) {
        return NextResponse.json(
          { error: "Request body is empty" },
          { status: 400 }
        );
      }

      body = JSON.parse(rawBody);
      console.log("Parsed body:", body);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // Validate input
    const validatedData = signUpSchema.parse(body);

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const response = NextResponse.json({
      user: data.user,
      session: data.session,
      message:
        "Account created successfully. Please check your email to confirm your account.",
    });

    // Set security headers
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error: "Invalid input data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
