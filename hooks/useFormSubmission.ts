import { useState, useCallback } from "react";

interface UseFormSubmissionOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UseFormSubmissionReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  submitForm: <T>(
    submitFn: (data: T) => Promise<{ error?: { message: string } | null }>
  ) => (data: T) => Promise<void>;
  reset: () => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
}

export function useFormSubmission(
  options: UseFormSubmissionOptions = {}
): UseFormSubmissionReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { onSuccess, onError } = options;

  const submitForm = useCallback(
    <T>(
      submitFn: (data: T) => Promise<{ error?: { message: string } | null }>
    ) =>
      async (data: T) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
          const result = await submitFn(data);

          if (result.error) {
            setError(result.error.message);
            onError?.(result.error.message);
            return;
          }

          setSuccess(true);
          onSuccess?.();
        } catch {
          const errorMessage =
            "An unexpected error occurred. Please try again.";
          setError(errorMessage);
          onError?.(errorMessage);
        } finally {
          setIsLoading(false);
        }
      },
    [onSuccess, onError]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    isLoading,
    error,
    success,
    submitForm,
    reset,
    setError,
    setSuccess,
  };
}
