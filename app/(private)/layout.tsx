import React from "react";
import Image from "next/image";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Image - SVG High Quality */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        <Image
          src="/home-absolute-bg.svg"
          alt="Background"
          fill
          className="object-cover object-top"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      {/* Content with overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
