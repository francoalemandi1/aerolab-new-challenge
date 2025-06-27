"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { signUpSchema, type SignUpFormData } from "@/lib/validations";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { Body, H2 } from "@/ui/atoms/typography";
import { AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";

export function SignUpForm() {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: authError } = await signUp(data);

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
      <div className="space-y-6 text-center">
        {/* Success Icon and Message */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <H2 className="text-green-600">Account Created Successfully!</H2>
            <Body className="text-gray">
              Please check your email to confirm your account.
            </Body>
          </div>
        </div>

                {/* Success Card */}
        <div className="rounded-secondary border border-green-600 bg-white p-4">
          <Body className="text-sm text-green-600 font-medium">
            📧 We&apos;ve sent a confirmation email to your inbox
          </Body>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          
          
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
          <Body className="font-medium text-violet-600">Email</Body>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          className={
            errors.email
              ? "border-red-600 focus:border-red-600 focus:ring-red-600/20"
              : "focus:border-violet-600 focus:ring-violet-600/20"
          }
        />
        {errors.email && (
          <Body className="text-sm text-red-600">{errors.email.message}</Body>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block">
          <Body className="font-medium text-violet-600">Password</Body>
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
            className={`pr-12 ${errors.password ? "border-red-600 focus:border-red-600 focus:ring-red-600/20" : "focus:border-violet-600 focus:ring-violet-600/20"}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-gray hover:bg-violet-50 hover:text-violet-600"
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
          <Body className="font-medium text-violet-600">Confirm Password</Body>
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            className={`pr-12 ${errors.confirmPassword ? "border-red-600 focus:border-red-600 focus:ring-red-600/20" : "focus:border-violet-600 focus:ring-violet-600/20"}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-gray hover:bg-violet-50 hover:text-violet-600"
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

      <Button 
        type="submit" 
        className="w-full bg-gradient-violet hover:opacity-90 text-white border-0" 
        disabled={isLoading} 
        size="lg"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
