"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { signUpSchema, type SignUpFormData } from "@/lib/validations";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { Paragraph } from "@/ui/atoms/typography";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { SignUpSuccess } from "./signup-success";

export function SignUpForm() {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const { isLoading, error, success, submitForm } = useFormSubmission();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = submitForm(async (data: SignUpFormData) => {
    setSubmittedEmail(data.email);
    return await signUp(data);
  });

  if (success) {
    return <SignUpSuccess email={submittedEmail} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error ? (
        <div className="flex items-center gap-3 rounded-secondary border border-red-600/20 bg-red-600/10 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <Paragraph className="text-sm text-red-600">{error}</Paragraph>
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="email" className="block">
          <Paragraph className="font-medium text-violet-600">Email</Paragraph>
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
        {errors.email ? (
          <Paragraph className="text-sm text-red-600">
            {errors.email.message}
          </Paragraph>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block">
          <Paragraph className="font-medium text-violet-600">
            Password
          </Paragraph>
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
        {errors.password ? (
          <Paragraph className="text-sm text-red-600">
            {errors.password.message}
          </Paragraph>
        ) : null}
        <Paragraph className="text-xs text-gray">
          Password must contain at least 8 characters, including uppercase,
          lowercase, and a number.
        </Paragraph>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block">
          <Paragraph className="font-medium text-violet-600">
            Confirm Password
          </Paragraph>
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
        {errors.confirmPassword ? (
          <Paragraph className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </Paragraph>
        ) : null}
      </div>

      <Button
        type="submit"
        className="w-full border-0 bg-gradient-violet text-white hover:opacity-90"
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
