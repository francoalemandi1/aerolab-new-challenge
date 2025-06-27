import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  // Simply redirect to the callback page with all parameters
  // The callback page will handle the authentication logic server-side
  const callbackUrl = new URL("/auth/callback", origin);

  // Pass through all query parameters
  searchParams.forEach((value, key) => {
    callbackUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(callbackUrl.toString());
}
