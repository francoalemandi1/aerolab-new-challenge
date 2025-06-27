"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { H1, H2, Body } from "@/ui/atoms/typography";
import { Button } from "@/ui/atoms/button";
import { Card } from "@/ui/molecules/card";
import { CheckCircle, XCircle, Clock, ArrowRight, RefreshCw } from "lucide-react";

type CallbackStatus = "loading" | "success" | "expired" | "invalid" | "error";

export default function AuthCallbackResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<CallbackStatus>("loading");

  useEffect(() => {
    const statusParam = searchParams.get("status") as CallbackStatus;
    if (statusParam && ["success", "expired", "invalid", "error"].includes(statusParam)) {
      setStatus(statusParam);
      
      // Auto-redirect on success
      if (statusParam === "success") {
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    } else {
      // If no valid status param, default to error
      setStatus("error");
    }
  }, [searchParams, router]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/10">
                <RefreshCw className="h-8 w-8 text-violet-600 animate-spin" />
              </div>
              <H2>Processing confirmation...</H2>
              <Body className="text-gray">Please wait while we verify your email.</Body>
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
              <Body className="text-gray">Your account is now active and ready to use.</Body>
            </div>

            <div className="rounded-secondary border border-green-600 bg-white p-4">
              <Body className="text-sm text-green-600 font-medium">
                ✅ Redirecting you to your dashboard in a few seconds...
              </Body>
            </div>

            <Button 
              onClick={() => router.push("/home")} 
              className="w-full bg-gradient-violet hover:opacity-90 text-white border-0" 
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
              <Body className="text-gray">
                This email confirmation link has expired. Please request a new one.
              </Body>
            </div>

            <div className="rounded-secondary border border-yellow-600 bg-white p-4">
              <Body className="text-sm text-yellow-600 font-medium">
                ⏰ Confirmation links expire after 24 hours for security
              </Body>
            </div>

            <div className="space-y-3">
              <Link href="/auth/signup">
                <Button 
                  className="w-full bg-gradient-violet hover:opacity-90 text-white border-0"
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
              <Body className="text-gray">
                This confirmation link is invalid or has already been used.
              </Body>
            </div>

            <div className="rounded-secondary border border-red-600 bg-white p-4">
              <Body className="text-sm text-red-600 font-medium">
                ❌ Please check your email for the correct confirmation link
              </Body>
            </div>

            <div className="space-y-3">
              <Link href="/auth/signin">
                <Button 
                  className="w-full bg-gradient-violet hover:opacity-90 text-white border-0"
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
              <Body className="text-gray">
                We encountered an error while confirming your email. Please try again.
              </Body>
            </div>

            <div className="rounded-secondary border border-red-600 bg-white p-4">
              <Body className="text-sm text-red-600 font-medium">
                🔄 If the problem persists, please contact support
              </Body>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-violet hover:opacity-90 text-white border-0"
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
  };

  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Pattern */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage:
              "url('/home-absolute-bg.svg'), url('/home-absolute-bg.svg')",
            backgroundSize: "100vw auto, 100vw auto",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top left, top 100vw",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/desktop-home-bg.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="space-y-6 p-8 backdrop-blur-sm">
            <H1 className="text-center animate-fade-in-from-bottom">Email Confirmation</H1>
            {renderContent()}
          </Card>
        </div>
      </div>
    </div>
  );
} 