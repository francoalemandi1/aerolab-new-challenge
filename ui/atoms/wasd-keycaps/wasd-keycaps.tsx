"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WasdKeycapsProps {
  className?: string;
}

export const WasdKeycaps: React.FC<WasdKeycapsProps> = ({ className }) => {
  return (
    <div className={cn("pointer-events-none absolute", className)}>
      {/* Mobile Keys */}
      <div className="animate-fade-in-down md:hidden">
        <Image
          src="/mobile-keys.svg"
          alt="WASD Gaming Keys"
          width={191}
          height={56}
          className="drop-shadow-lg"
          style={{
            animationDelay: "0.5s",
            animationFillMode: "both",
          }}
          priority
          sizes="191px"
        />
      </div>

      {/* Desktop Keys */}
      <div className="hidden w-screen animate-fade-in-down md:block">
        <Image
          src="/desktop-keys.svg"
          alt="WASD Gaming Keys"
          width={1391}
          height={177}
          className="h-auto w-full drop-shadow-lg"
          style={{
            animationDelay: "0.5s",
            animationFillMode: "both",
          }}
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
};
