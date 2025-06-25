import { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "../ui/organisms/reset-password-form";
import { H1, Body } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your account",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light p-4">
      <div className="w-full max-w-md">
        <Card className="space-y-6 p-8">
          <div className="space-y-2 text-center">
            <H1>Reset Password</H1>
            <Body className="text-gray">
              Create a new password for your account
            </Body>
          </div>

          <ResetPasswordForm />

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
        </Card>
      </div>
    </div>
  );
}
