import React from "react";
import { cn } from "@/lib/utils";
import { H1 } from "@/ui/atoms";
import { MobileMenu } from "@/ui/molecules";
import Image from "next/image";

interface AppHeaderProps {
  title: string;
  className?: string;
  showMenu?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  className,
  showMenu = false,
}) => {
  return (
    <div className={cn("relative flex items-center gap-3 md:gap-4", className)}>
      {/* Espaciador izquierdo en desktop cuando hay menú */}
      {showMenu && <div className="hidden md:block md:w-32" />}

      {/* Contenedor para ícono y título - izquierda en mobile, centro en desktop */}
      <div className="flex flex-1 items-center gap-3 md:justify-center md:gap-4">
        <div className="relative shrink-0 animate-fade-in-from-bottom">
          {/* Container with pink border and gradient background */}
          <div className="relative rounded-secondary border border-pink-600 bg-gradient-logo p-1 backdrop-blur-[24px]">
            <Image
              src="/game-logo.svg"
              alt="Gaming Haven Z Logo"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 md:h-6 md:w-6"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>

        <H1 className="text-h1-mobile text-violet-600 md:text-h1-desktop">
          {title}
        </H1>
      </div>

      {/* Mobile Menu - Only show if showMenu is true */}
      {showMenu && (
        <div className="w-auto shrink-0 md:w-32">
          <MobileMenu />
        </div>
      )}
    </div>
  );
};
