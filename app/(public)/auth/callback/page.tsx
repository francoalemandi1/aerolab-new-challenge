"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function AuthCallbackPage() {
  useEffect(() => {
    // Redirect to API route with all current search parameters
    const currentUrl = new URL(window.location.href);
    const apiUrl = new URL("/api/auth/callback", window.location.origin);

    // Copy all search parameters to the API URL
    currentUrl.searchParams.forEach((value, key) => {
      apiUrl.searchParams.set(key, value);
    });

    console.log("Redirecting to API callback:", apiUrl.toString());
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
              "url('/home-absolute-bg.svg'), url('/home-absolute-bg.svg')",
            backgroundSize: "100vw auto, 100vw auto",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top left, top 100vw",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/desktop-home-bg.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="space-y-6 rounded-secondary border border-gray-light bg-white/80 p-8 text-center backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/10">
                <RefreshCw className="h-8 w-8 animate-spin text-violet-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-dark">
                Processing Authentication...
              </h2>
              <p className="text-gray">
                Please wait while we complete your sign in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
