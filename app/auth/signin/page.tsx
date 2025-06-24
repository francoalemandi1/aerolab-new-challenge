import { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "../ui/organisms/signin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account to access the dashboard",
};

export default function SignInPage() {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <SignInForm />

        <div className="text-center text-sm">
          <Link
            href="/auth/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 