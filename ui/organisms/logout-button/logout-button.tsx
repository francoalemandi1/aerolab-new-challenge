"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/ui/atoms/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function LogoutButton({
  size = "lg",
  className = "",
  showIcon = true,
  children = "Sign Out",
}: LogoutButtonProps) {
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await signOut();
      if (error) {
        console.error("Sign out error:", error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Unexpected sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      className={`text-violet-600 hover:bg-transparent hover:text-violet-600 md:hover:bg-transparent md:hover:text-violet-600 ${className}`}
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      {isLoading ? "Signing out..." : children}
    </Button>
  );
}
