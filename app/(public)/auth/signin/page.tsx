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
    <div className="flex min-h-screen items-center justify-center bg-gray-light p-4">
      <div className="w-full max-w-md">
        <Card className="space-y-6 p-8">
          <div className="space-y-2 text-center">
            <H1>Welcome back</H1>
            <Body className="text-gray">
              Sign in to your account to continue
            </Body>
          </div>

          <SignInForm />

          <div className="text-center">
            <Link
              href="/auth/password-recovery"
              className="text-sm text-pink-600 transition-colors hover:text-pink-200"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="text-center">
            <Body className="text-sm text-gray">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-pink-600 transition-colors hover:text-pink-200"
              >
                Sign up
              </Link>
            </Body>
          </div>
        </Card>
      </div>
    </div>
  );
}
