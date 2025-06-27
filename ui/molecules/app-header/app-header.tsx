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
  showMenu = false 
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center gap-3 md:gap-4",
        className
      )}
    >
      {/* Espaciador izquierdo en desktop cuando hay menú */}
      {showMenu && <div className="hidden md:block md:w-32" />}
      
      {/* Contenedor para ícono y título - izquierda en mobile, centro en desktop */}
      <div className="flex flex-1 items-center gap-3 md:justify-center md:gap-4">
        <div className="relative shrink-0 animate-fade-in-from-bottom">
          <Image
            src="/game-logo.svg"
            alt="Gaming Haven Z Logo"
            width={24}
            height={24}
            className="h-6 w-6 shrink-0 md:h-8 md:w-8"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {/* Degradé overlay solo en desktop */}
          <div className="absolute inset-0 hidden bg-gradient-to-b from-transparent via-white/20 to-white/40 md:block" />
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
