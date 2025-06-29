"use client";

import { useEffect } from "react";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Card } from "@/ui/molecules/card";
import { H1, Paragraph } from "@/ui/atoms/typography";
import { Button } from "@/ui/atoms/button";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { handleError } = useErrorHandler();

  useEffect(() => {
    handleError(error, "AuthCallbackPage");
  }, [error, handleError]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="mx-auto max-w-md space-y-6 p-8 text-center">
        <div className="space-y-2">
          <H1 className="text-violet-600">Authentication Error</H1>
          <Paragraph className="text-gray">
            We encountered an error during the authentication process. This
            could be due to an expired session or invalid credentials.
          </Paragraph>
        </div>

        <div className="space-y-3">
          <Link href="/auth/signin">
            <Button className="w-full border-0 bg-gradient-violet text-white hover:opacity-90">
              Back to Sign In
            </Button>
          </Link>

          <Link href="/auth/signup">
            <Button
              variant="outline"
              className="w-full border-violet-600 text-violet-600 hover:bg-violet-50"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
