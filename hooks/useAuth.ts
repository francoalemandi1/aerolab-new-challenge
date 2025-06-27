"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type User, type Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type {
  SignInFormData,
  SignUpFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from "@/lib/validations";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

interface AuthError {
  message: string;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        // Handle error silently
      }

      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
      });

      // Handle redirections based on auth state changes
      if (event === "SIGNED_OUT") {
        // Check if we're on a protected page and redirect to signin
        const currentPath = window.location.pathname;
        const isProtectedRoute =
          currentPath.startsWith("/games") ||
          currentPath.startsWith("/dashboard") ||
          currentPath === "/";

        if (isProtectedRoute) {
          router.push("/auth/signin");
        } else {
          router.refresh();
        }
      } else {
        // For other events (including SIGNED_IN), just refresh to let middleware handle redirects
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const signIn = async (
    data: SignInFormData
  ): Promise<{ error?: AuthError }> => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: { message: result.error || "Sign in failed" } };
      }

      // Force a session refresh to trigger auth state change
      await supabase.auth.refreshSession();

      return {};
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  const signUp = async (
    data: SignUpFormData
  ): Promise<{ error?: AuthError }> => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: { message: result.error || "Sign up failed" } };
      }

      return {};
    } catch (error) {
      console.error("Sign up error:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  const signOut = async (): Promise<{ error?: AuthError }> => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: { message: result.error || "Sign out failed" } };
      }

      // Clear the session locally to trigger auth state change
      await supabase.auth.signOut();

      return {};
    } catch (error) {
      console.error("Sign out error:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  const forgotPassword = async (
    data: ForgotPasswordFormData
  ): Promise<{ error?: AuthError }> => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: { message: result.error || "Password reset failed" } };
      }

      return {};
    } catch (error) {
      console.error("Forgot password error:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  const resetPassword = async (
    data: ResetPasswordFormData
  ): Promise<{ error?: AuthError }> => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: { message: result.error || "Password reset failed" } };
      }

      return {};
    } catch (error) {
      console.error("Reset password error:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
  };
}
