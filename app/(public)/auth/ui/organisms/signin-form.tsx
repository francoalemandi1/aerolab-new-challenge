"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signInSchema, type SignInFormData } from "@/lib/validations";
import { Button } from "@/ui/atoms/button";
import { Input } from "@/ui/atoms/input";
import { Body } from "@/ui/atoms/typography";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export function SignInForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await signIn(data);

      if (authError) {
        setError(authError.message);
        return;
      }

      // Success - redirect to intended page or home
      const redirectTo = searchParams.get("redirectTo");
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/home");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        {errors.password && (
          <Body className="text-sm text-red-600">
            {errors.password.message}
          </Body>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-violet hover:opacity-90 text-white border-0" 
        disabled={isLoading} 
        size="lg"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
