"use client";

import { useEffect } from "react";
import { GameErrorFallback } from "@/ui/atoms/error-fallback";
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
    handleError(error, "GameDetailPage");
  }, [error, handleError]);

  return <GameErrorFallback resetError={reset} />;
}
