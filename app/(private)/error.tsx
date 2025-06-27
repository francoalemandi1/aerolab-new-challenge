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
    handleError(error, "PrivateLayout");
  }, [error, handleError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-white p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 text-5xl">🎮</div>

        <h1 className="mb-4 text-xl font-bold text-gray-900">Gaming Error</h1>

        <p className="mb-6 text-gray-600">
          There was an issue loading your gaming experience.
        </p>

        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="default" size="sm">
            Retry
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            size="sm"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
