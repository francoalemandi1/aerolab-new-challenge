"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Chip } from "@/ui/atoms";

export type FilterType = "last-added" | "newest" | "oldest";

interface FilterChipsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  className?: string;
}

const filterOptions: { key: FilterType; label: string }[] = [
  { key: "last-added", label: "Last added" },
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
];

export const FilterChips: React.FC<FilterChipsProps> = ({
  activeFilter,
  onFilterChange,
  className,
}) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detecta cuando se ha scrolleado hacia abajo
      const scrollY = window.scrollY;
      setIsFixed(scrollY > 200); // Se hace fixed después de 200px de scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Versión normal (en el flujo del documento) */}
      <div
        className={cn(
          "flex flex-wrap justify-start gap-2 transition-opacity duration-300",
          isFixed ? "pointer-events-none opacity-0" : "opacity-100",
          className
        )}
      >
        {filterOptions.map(option => (
          <Chip
            key={option.key}
            isActive={activeFilter === option.key}
            onClick={() => onFilterChange(option.key)}
          >
            {option.label}
          </Chip>
        ))}
      </div>

      {/* Versión fixed (cuando se hace scroll) */}
      <div
        className={cn(
          "fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-white/90 p-1 shadow-lg backdrop-blur-sm transition-all duration-300",
          isFixed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
          {filterOptions.map(option => (
            <Chip
              key={`fixed-${option.key}`}
              isActive={activeFilter === option.key}
              onClick={() => onFilterChange(option.key)}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      </div>
    </>
  );
};
