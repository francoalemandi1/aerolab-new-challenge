"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { H4, Body } from "@/ui/atoms";
import Image from "next/image";

interface EmptyStateProps {
  title: string;
  description: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-6 px-8 py-16 md:space-y-8 md:px-12 md:py-24",
        className
      )}
    >
      {/* Empty Cards Image - Large */}
      <div className="flex w-full items-center justify-center">
        <Image
          src="/empty-cards.png"
          alt="Empty cards illustration"
          width={320}
          height={200}
          className="w-full max-w-sm object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 320px"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "320px",
          }}
        />
      </div>

      {/* Text content */}
      <div className="space-y-2 text-center md:space-y-3">
        <H4 className="text-violet-600">{title}</H4>
        <Body className="text-gray md:text-lg">{description}</Body>
      </div>
    </div>
  );
};
