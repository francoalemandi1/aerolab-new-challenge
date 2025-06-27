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
    handleError(error, "AuthPage");
  }, [error, handleError]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 text-5xl">🔐</div>

        <h1 className="mb-4 text-xl font-bold text-gray-900">
          Authentication Error
        </h1>

        <p className="mb-6 text-gray-600">
          There was an issue with the authentication process.
        </p>

        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="default" size="sm">
            Try Again
          </Button>

          <Button
            onClick={() => (window.location.href = "/auth/signin")}
            variant="outline"
            size="sm"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
