import { ErrorType, AppError } from "@/types/errors";

export const createError = (
  type: ErrorType,
  message: string,
  options: Partial<AppError> = {}
): AppError => ({
  id: crypto.randomUUID(),
  type,
  message,
  timestamp: new Date(),
  retryable: isRetryable(type),
  ...options,
});

export const createHttpError = (
  statusCode: number,
  message: string,
  options: Partial<AppError> = {}
): AppError => {
  const type = getErrorTypeFromStatus(statusCode);
  return createError(type, message, { statusCode, ...options });
};

const getErrorTypeFromStatus = (statusCode: number): ErrorType => {
  switch (statusCode) {
    case 401:
      return ErrorType.UNAUTHORIZED;
    case 403:
      return ErrorType.FORBIDDEN;
    case 404:
      return ErrorType.NOT_FOUND;
    case 500:
      return ErrorType.INTERNAL_SERVER_ERROR;
    default:
      return ErrorType.UNKNOWN_ERROR;
  }
};

const isRetryable = (type: ErrorType): boolean => {
  const retryableTypes = [
    ErrorType.NETWORK_ERROR,
    ErrorType.INTERNAL_SERVER_ERROR,
    ErrorType.IGDB_ERROR,
  ];
  return retryableTypes.includes(type);
};

export const getErrorMessage = (error: AppError): string => {
  if (error.userMessage) {
    return error.userMessage;
  }

  const messages: Record<ErrorType, string> = {
    [ErrorType.UNAUTHORIZED]: "You need to sign in to access this content.",
    [ErrorType.FORBIDDEN]: "You don't have permission to access this resource.",
    [ErrorType.NOT_FOUND]: "The requested resource was not found.",
    [ErrorType.INTERNAL_SERVER_ERROR]:
      "Something went wrong. Please try again later.",
    [ErrorType.NETWORK_ERROR]: "Network error. Please check your connection.",
    [ErrorType.VALIDATION_ERROR]: "Please check your input and try again.",
    [ErrorType.COMPONENT_ERROR]: "Something went wrong loading this content.",
    [ErrorType.IGDB_ERROR]: "Unable to load game data. Please try again later.",
    [ErrorType.SUPABASE_ERROR]: "Database error. Please try again later.",
    [ErrorType.UNKNOWN_ERROR]: "An unexpected error occurred.",
  };

  return messages[error.type] || "An unexpected error occurred.";
};
