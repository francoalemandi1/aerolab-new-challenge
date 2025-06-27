import React from "react";
import { Button } from "@/ui/atoms/button";
// Typography component will be used from existing components
import { AppError } from "@/types/errors";
import { getErrorMessage } from "@/lib/error-utils";

interface ErrorFallbackProps {
  error: AppError;
  resetError?: () => void;
  className?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  className = "",
}) => {
  const userMessage = getErrorMessage(error);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 ${className}`}
    >
      <div className="mb-4 text-4xl">❌</div>

      <h3 className="mb-2 text-center text-xl font-semibold text-gray-700">
        Something went wrong
      </h3>

      <p className="mb-4 max-w-md text-center text-gray-600">{userMessage}</p>

      {process.env.NODE_ENV === "development" && (
        <details className="mb-4 w-full max-w-md text-sm">
          <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
            Debug Info
          </summary>
          <div className="mt-2 rounded bg-gray-100 p-3 font-mono text-xs text-gray-700">
            <div>
              <strong>Type:</strong> {error.type}
            </div>
            <div>
              <strong>Message:</strong> {error.message}
            </div>
            <div>
              <strong>Component:</strong> {error.component || "Unknown"}
            </div>
          </div>
        </details>
      )}

      <div className="flex gap-3">
        {resetError && (
          <Button onClick={resetError} variant="default" size="sm">
            Try Again
          </Button>
        )}

        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          size="sm"
        >
          Reload Page
        </Button>
      </div>
    </div>
  );
};

// Specialized error fallbacks
export const NetworkErrorFallback: React.FC<ErrorFallbackProps> = props => (
  <ErrorFallback {...props} />
);

export const AuthErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
}) => (
  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-red-300 bg-red-50 p-6">
    <div className="mb-4 text-4xl">🔒</div>

    <h3 className="mb-2 text-center text-xl font-semibold text-red-600">
      Authentication Error
    </h3>

    <p className="mb-4 max-w-md text-center text-gray-600">
      {getErrorMessage(error)}
    </p>

    <div className="flex gap-3">
      <Button
        onClick={() => (window.location.href = "/auth/signin")}
        variant="default"
        size="sm"
      >
        Sign In
      </Button>

      {resetError && (
        <Button onClick={resetError} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </div>
  </div>
);

export const NotFoundErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
}) => (
  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
    <div className="mb-4 text-4xl">🔍</div>

    <h3 className="mb-2 text-center text-xl font-semibold text-gray-600">
      Not Found
    </h3>

    <p className="mb-4 max-w-md text-center text-gray-600">
      {getErrorMessage(error)}
    </p>

    <div className="flex gap-3">
      <Button onClick={() => window.history.back()} variant="default" size="sm">
        Go Back
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
);

export const GameErrorFallback: React.FC<{ resetError?: () => void }> = ({
  resetError,
}) => (
  <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4">
    <div className="mb-3 text-3xl">🎮</div>
    <h4 className="mb-2 text-center text-lg font-medium text-gray-600">
      Game Load Error
    </h4>
    <p className="mb-3 max-w-sm text-center text-sm text-gray-500">
      Unable to load game data
    </p>
    {resetError && (
      <Button onClick={resetError} variant="outline" size="sm">
        Retry
      </Button>
    )}
  </div>
);
