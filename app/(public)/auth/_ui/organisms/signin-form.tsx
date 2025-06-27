"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { signInSchema, type SignInFormData } from "@/lib/validations";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { Paragraph } from "@/ui/atoms/typography";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { LoadingSpinner } from "@/ui/atoms/loading-spinner";

export const SignInForm: React.FC = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/games";

  const { isLoading, error, submitForm } = useFormSubmission({
    onSuccess: () => {
      router.push(callbackUrl);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = submitForm(signIn);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error ? (
        <div className="flex items-center gap-3 rounded-secondary border border-red-600/20 bg-red-600/10 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <Paragraph className="text-sm text-red-600">{error}</Paragraph>
        </div>
      ) : null}

      <div className="space-y-4">
        <div>
          <Paragraph className="font-medium text-violet-600">Email</Paragraph>
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
          {errors.email ? (
            <Paragraph className="text-sm text-red-600">
              {errors.email.message}
            </Paragraph>
          ) : null}
        </div>

        <div>
          <Paragraph className="font-medium text-violet-600">
            Password
          </Paragraph>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
          {errors.password ? (
            <Paragraph className="text-sm text-red-600">
              {errors.password.message}
            </Paragraph>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full border-0 bg-gradient-violet text-white hover:opacity-90"
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? <LoadingSpinner size="sm" /> : "Sign In"}
      </Button>
    </form>
  );
};
