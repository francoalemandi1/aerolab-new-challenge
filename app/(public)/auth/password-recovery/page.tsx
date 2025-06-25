import { Metadata } from "next";
import Link from "next/link";
import { PasswordRecoveryForm } from "../ui/organisms/password-recovery-form";
import { H1, Body } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";

export const metadata: Metadata = {
  title: "Password Recovery",
  description: "Reset your password to regain access to your account",
};

export default function PasswordRecoveryPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light p-4">
      <div className="w-full max-w-md">
        <Card className="space-y-6 p-8">
          <div className="space-y-2 text-center">
            <H1>Reset your password</H1>
            <Body className="text-gray">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </Body>
          </div>

          <PasswordRecoveryForm />

          <div className="text-center">
            <Body className="text-sm text-gray">
              Remember your password?{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-pink-600 transition-colors hover:text-pink-200"
              >
                Sign in
              </Link>
            </Body>
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
