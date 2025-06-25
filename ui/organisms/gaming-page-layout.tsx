"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { H1 } from "@/ui/atoms";
import { SearchInput } from "@/ui/atoms";
import {
  AppHeader,
  EmptyState,
  FilterChips,
  FilterType,
  GamesGrid,
} from "@/ui/molecules";
import Image from "next/image";

interface GamingPageLayoutProps {
  className?: string;
  hasGames?: boolean; // Prop para controlar si hay games o no
}

export const GamingPageLayout: React.FC<GamingPageLayoutProps> = ({
  className,
  hasGames = false, // Por defecto false para mostrar empty state
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("last-added");

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    // Aquí se implementará la lógica de filtrado más adelante
    console.log("Filter changed to:", filter);
  };

  const handleDeleteGame = (gameId: string) => {
    console.log("Deleting game:", gameId);
    // Aquí se implementará la lógica de eliminación más adelante
  };

  return (
    <div className={cn("relative min-h-screen bg-gray-white", className)}>
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
      <div className="relative z-10 px-6 py-8">
        {/* Header */}
        <AppHeader title="Gaming Haven Z" className="mb-8" />

        {/* Search */}
        <div className="mb-8">
          <SearchInput placeholder="Search games..." />
        </div>

        {/* Saved games section */}
        <div className="mb-6">
          <H1 className="mb-6 text-violet-600">Saved games</H1>

          {/* Filter Chips - Solo se muestran si hay games */}
          {hasGames && (
            <FilterChips
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              className="mb-6"
            />
          )}

          {/* Content: Empty state o games list */}
          {hasGames ? (
            <GamesGrid onDeleteGame={handleDeleteGame} />
          ) : (
            <EmptyState
              title="Nothing collected yet"
              description="Here you will see your collected games"
            />
          )}
        </div>
      </div>
    </div>
  );
};
