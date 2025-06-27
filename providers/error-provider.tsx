"use client";

import React, { createContext, useCallback, ReactNode } from "react";
import { AppError, ErrorContextValue } from "@/types/errors";

export const ErrorContext = createContext<ErrorContextValue | null>(null);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const reportError = useCallback((error: AppError) => {
    console.error("Error reported:", error);
  }, []);

  const clearErrors = useCallback(() => {
    // Clear errors if needed
  }, []);

  const contextValue: ErrorContextValue = {
    reportError,
    clearErrors,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
