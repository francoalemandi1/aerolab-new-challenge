"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { H1 } from "@/ui/atoms";
import {
  AppHeader,
  EmptyState,
  FilterChips,
  GamesGrid,
  GameSearch,
} from "@/ui/molecules";
import { useGames, FilterType } from "@/hooks/useGames";

interface GamingPageLayoutProps {
  className?: string;
}

export const GamingPageLayout: React.FC<GamingPageLayoutProps> = ({
  className,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("last-added");
  const { savedGames } = useGames();

  // Determinar si hay juegos guardados
  const hasGames = savedGames.length > 0;

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    console.log("Filter changed to:", filter);
  };

  return (
    <div className={cn("px-6 py-8", className)}>
      {/* Header */}
      <AppHeader title="Gaming Haven Z" className="mb-8" />

      {/* Search */}
      <GameSearch placeholder="Search games..." />

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
          <GamesGrid filter={activeFilter} />
        ) : (
          <EmptyState
            title="Nothing collected yet"
            description="Here you will see your collected games"
          />
        )}
      </div>
    </div>
  );
};
