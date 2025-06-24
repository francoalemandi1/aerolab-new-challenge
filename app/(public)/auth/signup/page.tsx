import { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "../ui/organisms/signup-form";
import { H1, Body } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your account to get started",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light p-4">
      <div className="w-full max-w-md">
        <Card className="space-y-6 p-8">
          <div className="space-y-2 text-center">
            <H1>Create your account</H1>
            <Body className="text-gray">
              Sign up to get started with your journey
            </Body>
          </div>

          <SignUpForm />

          <div className="text-center">
            <Body className="text-sm text-gray">
              Already have an account?{" "}
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
