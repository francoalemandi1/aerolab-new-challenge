export enum ErrorType {
  // HTTP Errors (más comunes)
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",

  // Application Errors (esenciales)
  NETWORK_ERROR = "NETWORK_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",

  // Component Errors
  COMPONENT_ERROR = "COMPONENT_ERROR",

  // External Service Errors
  IGDB_ERROR = "IGDB_ERROR",
  SUPABASE_ERROR = "SUPABASE_ERROR",

  // Generic
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export enum ErrorSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface AppError {
  id: string;
  type: ErrorType;
  message: string;
  userMessage?: string;
  statusCode?: number;
  timestamp: Date;
  component?: string;
  retryable?: boolean;
}

export interface ErrorContextValue {
  reportError: (error: AppError) => void;
  clearErrors: () => void;
}

export interface ErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: AppError; retry: () => void }>;
  onError?: (error: AppError, errorInfo: React.ErrorInfo) => void;
  children: React.ReactNode;
  isolate?: boolean;
  maxRetries?: number;
  retryDelay?: number;
}
