"use client";

import { useEffect } from "react";
import { Button } from "@/ui/atoms/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { handleError } = useErrorHandler();

  useEffect(() => {
    handleError(error, "RootLayout");
  }, [error, handleError]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 text-6xl">💥</div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>

        <p className="mb-6 text-gray-600">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="mb-2 cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details
            </summary>
            <div className="rounded bg-gray-100 p-3 font-mono text-xs text-gray-700">
              <div>
                <strong>Message:</strong> {error.message}
              </div>
              {error.digest && (
                <div>
                  <strong>Digest:</strong> {error.digest}
                </div>
              )}
            </div>
          </details>
        )}

        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="default">
            Try Again
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
