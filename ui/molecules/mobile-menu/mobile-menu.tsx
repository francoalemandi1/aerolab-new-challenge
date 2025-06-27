"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/ui/organisms";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={cn("relative", className)}>
      {/* Desktop Logout Button */}
      <div className="hidden md:flex">
        <LogoutButton size="lg" showIcon>
          Cerrar sesión
        </LogoutButton>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center rounded-lg p-2 text-violet-600"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen ? (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={closeMenu}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 z-50 h-full w-64 bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-violet-600">Menú</h2>
                <LogoutButton size="sm" showIcon={false} className="text-sm">
                  Cerrar sesión
                </LogoutButton>
              </div>
              <button
                onClick={closeMenu}
                className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
