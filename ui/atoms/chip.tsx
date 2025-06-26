import React from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ children, isActive = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full py-1 transition-colors",
          "font-inter text-h5-desktop font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600",
          "disabled:pointer-events-none disabled:opacity-50",
          "md:py-2 md:text-base",
          isActive
            ? "bg-violet-600 px-2.5 text-white md:px-4"
            : "bg-transparent px-1.5 text-violet-600 hover:bg-violet-50 md:px-3",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Chip.displayName = "Chip";
