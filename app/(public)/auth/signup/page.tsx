import { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "../_ui/organisms/signup-form";
import { H1, Body } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";
import { WasdKeycaps } from "@/ui/atoms";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Gaming Haven account to start building your ultimate game collection",
  openGraph: {
    title: "Sign Up | Gaming Haven",
    description:
      "Create your Gaming Haven account to start building your ultimate game collection",
    images: [
      {
        url: "/game-logo.svg",
        width: 512,
        height: 512,
        alt: "Gaming Haven - Sign Up",
        type: "image/svg+xml",
      },
    ],
    type: "website",
    siteName: "Gaming Haven",
  },
  twitter: {
    card: "summary",
    title: "Sign Up | Gaming Haven",
    description:
      "Create your Gaming Haven account to start building your ultimate game collection",
    images: [
      {
        url: "/game-logo.svg",
        alt: "Gaming Haven - Sign Up",
      },
    ],
  },
};

export default function SignUpPage() {
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
              <H1 className="animate-fade-in-from-bottom">
                Create your account
              </H1>
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
                  className="font-medium text-violet-600 transition-colors hover:text-violet-900"
                >
                  Sign in
                </Link>
              </Body>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
