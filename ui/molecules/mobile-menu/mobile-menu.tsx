"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/ui/organisms";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop: Direct logout button */}
      <div className={cn("hidden md:block", className)}>
        <LogoutButton 
          variant="ghost" 
          size="lg"
          showIcon={true}
          className="text-violet-600 hover:bg-transparent hover:text-violet-600 [&>svg]:h-6 [&>svg]:w-6"
        >
          Cerrar sesión
        </LogoutButton>
      </div>

      {/* Mobile: Hamburger menu */}
      <div className={cn("relative md:hidden", className)}>
        {/* Hamburger button */}
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center rounded-md p-3 text-violet-600 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>

        {/* Mobile menu overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black bg-opacity-25"
              onClick={closeMenu}
            />
            
            {/* Sidebar panel */}
            <div className="fixed right-0 top-0 z-50 h-screen w-60 bg-white shadow-xl">
              <div className="flex h-full flex-col">
                {/* Header with close button */}
                <div className="flex items-center justify-end p-6 border-b border-gray-200">
                  <button
                    onClick={closeMenu}
                    className="rounded-md p-3 text-violet-600 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6">
                  <div onClick={closeMenu}>
                    <LogoutButton 
                      variant="ghost" 
                      size="lg"
                      showIcon={true}
                      className="w-full justify-start text-violet-600 hover:bg-violet-50 hover:text-violet-700 [&>svg]:text-violet-600 [&>svg]:h-6 [&>svg]:w-6"
                    >
                      Cerrar sesión
                    </LogoutButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}; 