import React from "react";
import { H2 } from "@/ui/atoms/typography";

interface GameContentSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const GameContentSection = ({
  title,
  children,
  className = "mb-8",
}: GameContentSectionProps) => {
  return (
    <div className={className}>
      <H2 className="mb-2">{title}</H2>
      <div className="text-sm leading-relaxed text-gray md:text-base">
        {children}
      </div>
    </div>
  );
};
