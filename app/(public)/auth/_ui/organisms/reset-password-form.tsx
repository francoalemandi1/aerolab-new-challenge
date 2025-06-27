"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { Body } from "@/ui/atoms/typography";
import { AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";

export function ResetPasswordForm() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: authError } = await resetPassword(data);

      if (authError) {
        setError(authError.message);
        return;
      }

      setSuccess(true);
      // Redirect to signin after a delay
      setTimeout(() => {
        router.push("/auth/signin?message=Password updated successfully");
      }, 2000);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-3 rounded-secondary border border-green-600/20 bg-green-600/10 p-4">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
          <Body className="text-green-600">Password updated successfully!</Body>
        </div>
        <Body className="text-gray">
          Your password has been updated. You will be redirected to sign in
          shortly.
        </Body>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 rounded-secondary border border-red-600/20 bg-red-600/10 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <Body className="text-sm text-red-600">{error}</Body>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="password" className="block">
          <Body className="font-medium text-gray-dark">New Password</Body>
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
            className={`pr-12 ${errors.password ? "border-red-600 focus:border-red-600 focus:ring-red-600/20" : ""}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-gray hover:bg-gray-light/50 hover:text-gray-dark"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <Body className="text-sm text-red-600">
            {errors.password.message}
          </Body>
        )}
        <Body className="text-xs text-gray">
          Password must contain at least 8 characters, including uppercase,
          lowercase, and a number.
        </Body>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block">
          <Body className="font-medium text-gray-dark">
            Confirm New Password
          </Body>
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            className={`pr-12 ${errors.confirmPassword ? "border-red-600 focus:border-red-600 focus:ring-red-600/20" : ""}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-gray hover:bg-gray-light/50 hover:text-gray-dark"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <Body className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </Body>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading} size="lg">
        {isLoading ? "Updating Password..." : "Update Password"}
      </Button>
    </form>
  );
}
