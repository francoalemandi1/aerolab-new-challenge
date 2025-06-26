import React from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DefaultImageProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const DefaultImage: React.FC<DefaultImageProps> = ({
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-16 h-12",
    md: "w-28 h-20",
    lg: "w-40 h-28",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-gray-200",
        sizeClasses[size],
        className
      )}
      data-testid="default-image-container"
    >
      <ImageIcon
        className={cn("text-gray-400", iconSizes[size])}
        data-testid="default-image-icon"
      />
    </div>
  );
};
