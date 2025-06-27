import Link from "next/link";
import { Suspense } from "react";
import { SignInForm } from "./signin-form";
import { H1, Paragraph } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";
import { LoadingSpinner } from "@/ui/atoms/loading-spinner";
import { WasdKeycaps } from "@/ui/atoms";

export function SignInContent() {
  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Pattern similar to private layout */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage:
              "url('/mobile-background.svg'), url('/mobile-background.svg')",
            backgroundSize: "100vw auto, 100vw auto",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top left, top 100vw",
          }}
        />

        {/* Desktop Background */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/desktop-background.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      {/* Animated WASD Keys - For mobile and desktop */}
      <WasdKeycaps className="right-0 top-0 z-20" />

      {/* Content with overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="space-y-6 p-8 backdrop-blur-sm">
            <div className="space-y-2 text-center">
              <H1 className="animate-fade-in-from-bottom">Welcome back</H1>
              <Paragraph className="text-gray">
                Sign in to your account to continue
              </Paragraph>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
              <SignInForm />
            </Suspense>

            <div className="text-center">
              <Paragraph className="text-sm text-gray">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-violet-600 transition-colors hover:text-violet-900"
                >
                  Sign up
                </Link>
              </Paragraph>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
