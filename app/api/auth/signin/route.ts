import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { signInSchema } from "@/lib/validations";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    console.log("🔐 Signin API route called");

    // CSRF Protection
    const headersList = await headers();
    const origin = headersList.get("origin");
    const referer = headersList.get("referer");

    console.log("🌐 Origin:", origin, "Referer:", referer);

    if (!origin || !referer || !referer.startsWith(origin)) {
      console.log("❌ CSRF validation failed");
      return NextResponse.json(
        { error: "Invalid request origin" },
        { status: 403 }
      );
    }

    // Parse JSON with better error handling
    let body;
    try {
      const rawBody = await request.text();
      console.log("📝 Raw request body:", rawBody);

      if (!rawBody) {
        return NextResponse.json(
          { error: "Request body is empty" },
          { status: 400 }
        );
      }

      body = JSON.parse(rawBody);
      console.log("✅ Parsed body:", {
        email: body.email,
        hasPassword: !!body.password,
      });
    } catch (parseError) {
      console.error("❌ JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // Validate input
    console.log("🔍 Validating input with Zod schema");
    const validatedData = signInSchema.parse(body);

    console.log("🔗 Creating Supabase client");
    const supabase = await createSupabaseServerClient();

    console.log("🚀 Attempting signin with Supabase");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      console.error("❌ Supabase signin error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("✅ Signin successful for user:", data.user?.email);

    // Set secure session cookie
    const response = NextResponse.json({
      user: data.user,
      message: "Signed in successfully",
    });

    // Set security headers
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
  } catch (error) {
    console.error("💥 Signin error:", error);
    return NextResponse.json(
      {
        error: "Invalid input data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
