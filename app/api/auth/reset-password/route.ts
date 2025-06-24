import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { resetPasswordSchema } from "@/lib/validations";
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
    const validatedData = resetPasswordSchema.parse(body);

    const supabase = await createSupabaseServerClient();

    // Check if user has a valid session for password reset
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 401 }
      );
    }

    const { error } = await supabase.auth.updateUser({
      password: validatedData.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const response = NextResponse.json({
      message: "Password updated successfully",
    });

    // Set security headers
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}
