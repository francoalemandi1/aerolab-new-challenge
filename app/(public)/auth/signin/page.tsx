import { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "../ui/organisms/signin-form";
import { H1, Body } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account to access the dashboard",
};

export default function SignInPage() {
  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Pattern similar to private layout */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        {/* Mobile Background */}
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

        {/* Desktop Background */}
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

      {/* Content with overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="space-y-6 p-8 backdrop-blur-sm">
            <div className="space-y-2 text-center">
              <H1 className="animate-fade-in-from-bottom">Welcome back</H1>
              <Body className="text-gray">
                Sign in to your account to continue
              </Body>
            </div>

            <SignInForm />

            <div className="text-center">
              <Link
                href="/auth/password-recovery"
                className="text-sm text-violet-600 transition-colors hover:text-violet-900"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center">
              <Body className="text-sm text-gray">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-violet-600 transition-colors hover:text-violet-900"
                >
                  Sign up
                </Link>
              </Body>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
