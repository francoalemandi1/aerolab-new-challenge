"use client";

import { useEffect } from "react";
import { WasdKeycaps } from "@/ui/atoms";

export default function AuthCallbackPage() {
  useEffect(() => {
    // Create API URL for callback handling
    const apiUrl = new URL("/api/auth/callback", window.location.origin);

    // Pass through all query parameters to the API
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
      apiUrl.searchParams.set(key, value);
    });

    // Redirect to API callback handler which will handle the logic
    // and then redirect to the appropriate result page
    window.location.href = apiUrl.toString();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Pattern */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage:
              "url('/mobile-background.svg'), url('/mobile-background.svg')",
            backgroundSize: "100vw auto, 100vw auto",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top left, top 100vw",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/desktop-background.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      {/* Animated WASD Keys - For mobile and desktop */}
      <WasdKeycaps className="right-0 top-0 z-20" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
          <p className="text-gray-600">Processing authentication...</p>
        </div>
      </div>
    </div>
  );
}
