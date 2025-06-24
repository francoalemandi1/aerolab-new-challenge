import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = "https://khtofbsmyzytfmmwltqs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtodG9mYnNteXp5dGZtbXdsdHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODMzNzUsImV4cCI6MjA2NjM1OTM3NX0.LeakPUprXvn-9bJnL0fAGVpuElopi3ykcoDrgl-kYZg";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

// Client-side Supabase client for browser operations
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});

// Server-side Supabase client for API routes and server components
export const createSupabaseServerClient = async () => {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

// Server client for middleware
export const createSupabaseMiddlewareClient = (
  request: NextRequest,
  response: NextResponse
) => {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });
};

// For server-side operations with service role
export const supabaseAdmin = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtodG9mYnNteXp5dGZtbXdsdHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc4MzM3NSwiZXhwIjoyMDY2MzU5Mzc1fQ.w5l0m3NQ93AZFh4tdT_fqGRyzsZVPNvseZd39brUZOg",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
