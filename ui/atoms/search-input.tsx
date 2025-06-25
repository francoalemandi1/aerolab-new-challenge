import React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-200" />
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-main border border-pink-600/20 bg-gray-white px-12 py-4",
            "font-inter text-base placeholder:text-pink-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
