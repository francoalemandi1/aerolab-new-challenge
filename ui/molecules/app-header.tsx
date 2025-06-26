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
    <div
      className={cn(
        "flex items-center gap-3 md:justify-center md:gap-4",
        className
      )}
    >
      <div className="relative shrink-0">
        <Image
          src="/game-logo.svg"
          alt="Gaming Haven Z Logo"
          width={24}
          height={24}
          className="shrink-0 md:h-8 md:w-8"
        />
        {/* Degradé overlay solo en desktop */}
        <div className="absolute inset-0 hidden bg-gradient-to-b from-transparent via-white/20 to-white/40 md:block" />
      </div>
      <H1 className="text-h1-mobile text-violet-600 md:text-h1-desktop">
        {title}
      </H1>
    </div>
  );
};
