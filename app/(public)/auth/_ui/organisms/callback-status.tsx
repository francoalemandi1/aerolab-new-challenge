"use client";

import { useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { H2, Paragraph } from "@/ui/atoms/typography";
import { Button } from "@/ui/atoms/button";
import type { CallbackStatus } from "@/hooks/useCallbackStatus";

interface CallbackStatusProps {
  status: CallbackStatus;
}

export function CallbackStatus({ status }: CallbackStatusProps) {
  const router = useRouter();

  // Auto-redirect on success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        router.push("/games");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  switch (status) {
    case "loading":
      return (
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/10">
              <RefreshCw className="h-8 w-8 animate-spin text-violet-600" />
            </div>
            <H2>Processing confirmation...</H2>
            <Paragraph className="text-gray">
              Please wait while we verify your email.
            </Paragraph>
          </div>
        </div>
      );

    case "success":
      return (
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <H2 className="text-green-600">Email Confirmed Successfully!</H2>
            <Paragraph className="text-gray">
              Your account is now active and ready to use.
            </Paragraph>
          </div>

          <div className="rounded-secondary border border-green-600 bg-white p-4">
            <Paragraph className="text-sm font-medium text-green-600">
              ✅ Redirecting you to your dashboard in a few seconds...
            </Paragraph>
          </div>

          <Button
            onClick={() => router.push("/games")}
            className="w-full border-0 bg-gradient-violet text-white hover:opacity-90"
            size="lg"
          >
            Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );

    case "expired":
      return (
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600/10">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <H2 className="text-yellow-600">Confirmation Link Expired</H2>
            <Paragraph className="text-gray">
              This email confirmation link has expired. Please request a new
              one.
            </Paragraph>
          </div>

          <div className="rounded-secondary border border-yellow-600 bg-white p-4">
            <Paragraph className="text-sm font-medium text-yellow-600">
              ⏰ Confirmation links expire after 24 hours for security
            </Paragraph>
          </div>

          <div className="space-y-3">
            <Link href="/auth/signup">
              <Button
                className="w-full border-0 bg-gradient-violet text-white hover:opacity-90"
                size="lg"
              >
                Request New Confirmation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/auth/signin">
              <Button
                variant="outline"
                className="w-full border-violet-600 text-violet-600 hover:bg-violet-50"
                size="lg"
              >
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      );

    case "invalid":
      return (
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/10">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <H2 className="text-red-600">Invalid Confirmation Link</H2>
            <Paragraph className="text-gray">
              This confirmation link is invalid or has already been used.
            </Paragraph>
          </div>

          <div className="rounded-secondary border border-red-600 bg-white p-4">
            <Paragraph className="text-sm font-medium text-red-600">
              ❌ Please check your email for the correct confirmation link
            </Paragraph>
          </div>

          <div className="space-y-3">
            <Link href="/auth/signin">
              <Button
                className="w-full border-0 bg-gradient-violet text-white hover:opacity-90"
                size="lg"
              >
                Try Signing In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/auth/signup">
              <Button
                variant="outline"
                className="w-full border-violet-600 text-violet-600 hover:bg-violet-50"
                size="lg"
              >
                Create New Account
              </Button>
            </Link>
          </div>
        </div>
      );

    case "error":
    default:
      return (
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/10">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <H2 className="text-red-600">Something Went Wrong</H2>
            <Paragraph className="text-gray">
              We encountered an error while confirming your email. Please try
              again.
            </Paragraph>
          </div>

          <div className="rounded-secondary border border-red-600 bg-white p-4">
            <Paragraph className="text-sm font-medium text-red-600">
              🔄 If the problem persists, please contact support
            </Paragraph>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full border-0 bg-gradient-violet text-white hover:opacity-90"
              size="lg"
            >
              Try Again <RefreshCw className="ml-2 h-4 w-4" />
            </Button>

            <Link href="/auth/signin">
              <Button
                variant="outline"
                className="w-full border-violet-600 text-violet-600 hover:bg-violet-50"
                size="lg"
              >
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      );
  }
}
