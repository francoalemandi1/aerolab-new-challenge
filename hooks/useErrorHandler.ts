"use client";

import { useCallback, useContext } from "react";
import { createError, createHttpError } from "@/lib/error-utils";
import { ErrorType, AppError } from "@/types/errors";
import { ErrorContext } from "@/providers/error-provider";

export const useErrorHandler = () => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw new Error("useErrorHandler must be used within an ErrorProvider");
  }

  const { reportError } = errorContext;

  const handleError = useCallback(
    (error: unknown, component?: string): AppError => {
      let appError: AppError;

      if (error instanceof Error) {
        appError = createError(ErrorType.COMPONENT_ERROR, error.message, {
          component,
        });
      } else if (typeof error === "string") {
        appError = createError(ErrorType.UNKNOWN_ERROR, error, { component });
      } else {
        appError = createError(
          ErrorType.UNKNOWN_ERROR,
          "An unknown error occurred",
          { component }
        );
      }

      reportError(appError);
      return appError;
    },
    [reportError]
  );

  const handleHttpError = useCallback(
    async (response: Response): Promise<AppError> => {
      let message = `HTTP ${response.status}`;

      try {
        const text = await response.text();
        if (text) {
          try {
            const json = JSON.parse(text);
            message = json.message || json.error || message;
          } catch {
            message = text;
          }
        }
      } catch {
        // Use default message
      }

      const appError = createHttpError(response.status, message);
      reportError(appError);
      return appError;
    },
    [reportError]
  );

  return {
    handleError,
    handleHttpError,
  };
};
