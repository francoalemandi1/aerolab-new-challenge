"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { Body } from "@/ui/atoms/typography";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";

export function PasswordRecoveryForm() {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: authError } = await forgotPassword(data);

      if (authError) {
        setError(authError.message);
        return;
      }

      setSuccess(true);
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
          <Body className="text-green-600">Reset link sent successfully!</Body>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-pink-600/10 p-3">
              <Mail className="h-6 w-6 text-pink-600" />
            </div>
          </div>
          <Body className="text-gray">
            We&apos;ve sent a password reset link to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </Body>
          <Body className="text-sm text-gray">
            Don&apos;t see the email? Check your spam folder or try again.
          </Body>
        </div>
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
        <label htmlFor="email" className="block">
          <Body className="font-medium text-gray-dark">Email</Body>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          className={
            errors.email
              ? "border-red-600 focus:border-red-600 focus:ring-red-600/20"
              : ""
          }
        />
        {errors.email && (
          <Body className="text-sm text-red-600">{errors.email.message}</Body>
        )}
        <Body className="text-xs text-gray">
          We&apos;ll send a password reset link to this email address.
        </Body>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading} size="lg">
        {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
