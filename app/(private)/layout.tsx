import React from "react";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Pattern - Mobile: home-absolute-bg.svg, Desktop: desktop-home-bg.svg */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage:
              "url('/home-absolute-bg.svg'), url('/home-absolute-bg.svg')",
            backgroundSize: "390px 276px, 390px 276px",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top left, top 390px",
          }}
        />

        {/* Desktop Background */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/desktop-home-bg.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      {/* Content with overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
