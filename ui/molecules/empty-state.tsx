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
        "flex flex-col items-center justify-center space-y-6 px-8 py-16",
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
        />
      </div>

      {/* Text content */}
      <div className="space-y-2 text-center">
        <H4 className="text-violet-600">{title}</H4>
        <Body className="text-gray">{description}</Body>
      </div>
    </div>
  );
};
