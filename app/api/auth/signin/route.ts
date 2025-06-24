import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { signInSchema } from "@/lib/validations";
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

    const body = await request.json();

    // Validate input
    const validatedData = signInSchema.parse(body);

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

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
    console.error("Signin error:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}
