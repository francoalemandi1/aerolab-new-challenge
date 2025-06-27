import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { signInSchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Basic CSRF protection - ensure request comes from our domain
  if (!origin || !referer || !referer.startsWith(origin)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 }
    );
  }

  let body;
  try {
    // Get the raw body as text first for debugging
    const rawBody = await request.text();

    // Check if body is empty
    if (!rawBody.trim()) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    // Parse the JSON
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  try {
    // Validate input with Zod schema
    const validatedData = signInSchema.parse(body);

    // Create Supabase client
    const supabase = await createSupabaseServerClient();

    // Attempt signin with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (data.user && data.session) {
      return NextResponse.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      });
    } else {
      return NextResponse.json(
        { error: "No user returned from signin" },
        { status: 401 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
