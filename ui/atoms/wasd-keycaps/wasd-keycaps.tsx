"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WASDKeycapsProps {
  className?: string;
}

export const WASDKeycaps: React.FC<WASDKeycapsProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* W Key */}
      <div className="animate-fade-in-from-top">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-violet-600 bg-white text-sm font-semibold text-violet-600 shadow-sm transition-all hover:bg-violet-50 md:h-12 md:w-12 md:text-base">
          W
        </div>
      </div>
      
      {/* A Key */}
      <div className="animate-fade-in-from-top" style={{ animationDelay: "0.1s" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-violet-600 bg-white text-sm font-semibold text-violet-600 shadow-sm transition-all hover:bg-violet-50 md:h-12 md:w-12 md:text-base">
          A
        </div>
      </div>
      
      {/* S Key */}
      <div className="animate-fade-in-from-top" style={{ animationDelay: "0.2s" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-violet-600 bg-white text-sm font-semibold text-violet-600 shadow-sm transition-all hover:bg-violet-50 md:h-12 md:w-12 md:text-base">
          S
        </div>
      </div>
      
      {/* D Key */}
      <div className="animate-fade-in-from-top" style={{ animationDelay: "0.3s" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-violet-600 bg-white text-sm font-semibold text-violet-600 shadow-sm transition-all hover:bg-violet-50 md:h-12 md:w-12 md:text-base">
          D
        </div>
      </div>
    </div>
  );
}; 