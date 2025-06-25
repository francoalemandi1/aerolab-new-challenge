import React from "react";
import { cn } from "@/lib/utils";
import { H1 } from "@/ui/atoms";
import Image from "next/image";

interface AppHeaderProps {
  title: string;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, className }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/gaming-haven-logo.svg"
        alt="Gaming Haven Z Logo"
        width={24}
        height={24}
        className="shrink-0"
      />
      <H1 className="text-h1-mobile text-violet-600 md:text-h1-desktop">
        {title}
      </H1>
    </div>
  );
};
