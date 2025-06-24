import { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase";
import { LogoutButton } from "@/ui/organisms/logout-button";
import { H1, H2, Body } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home - Dashboard",
  description: "Welcome to your dashboard",
};

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-light p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <H1>Welcome to your Dashboard</H1>
            <Body className="mt-2 text-gray">
              You are successfully signed in with secure cookie-based
              authentication
            </Body>
          </div>
          <LogoutButton variant="outline" />
        </div>

        {/* User Info Card */}
        <Card className="p-6">
          <H2 className="mb-4">User Information</H2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Body className="font-medium text-gray-dark">Email:</Body>
              <Body className="text-gray">{user.email}</Body>
            </div>
            <div className="flex items-center justify-between">
              <Body className="font-medium text-gray-dark">User ID:</Body>
              <Body className="font-mono text-sm text-gray">{user.id}</Body>
            </div>
            <div className="flex items-center justify-between">
              <Body className="font-medium text-gray-dark">
                Email Confirmed:
              </Body>
              <Body
                className={`${user.email_confirmed_at ? "text-green-600" : "text-red-600"}`}
              >
                {user.email_confirmed_at ? "Yes" : "No"}
              </Body>
            </div>
            <div className="flex items-center justify-between">
              <Body className="font-medium text-gray-dark">Last Sign In:</Body>
              <Body className="text-gray">
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : "Never"}
              </Body>
            </div>
          </div>
        </Card>

        {/* Security Features Card */}
        <Card className="p-6">
          <H2 className="mb-4">Security Features</H2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <Body>
                Cookie-based authentication with secure httpOnly cookies
              </Body>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <Body>CSRF protection on all authentication endpoints</Body>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <Body>Automatic session refresh and token management</Body>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <Body>Middleware-based route protection</Body>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <Body>Secure password reset flow with email verification</Body>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
