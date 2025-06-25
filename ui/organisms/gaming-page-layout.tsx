"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { H1 } from "@/ui/atoms";
import {
  AppHeader,
  EmptyState,
  FilterChips,
  FilterType,
  GamesGrid,
  GameSearch,
} from "@/ui/molecules";

interface GamingPageLayoutProps {
  className?: string;
  hasGames?: boolean; // Prop para controlar si hay games o no
  onGameClick?: (gameId: string) => void;
}

export const GamingPageLayout: React.FC<GamingPageLayoutProps> = ({
  className,
  hasGames = false, // Por defecto false para mostrar empty state
  onGameClick,
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

  const handleGameSelect = (game: {
    id: string;
    title: string;
    imageUrl: string;
  }) => {
    console.log("Game selected:", game);
    // Aquí se implementará la lógica para agregar el juego a la colección
  };

  return (
    <div className={cn("px-6 py-8", className)}>
      {/* Header */}
      <AppHeader title="Gaming Haven Z" className="mb-8" />

      {/* Search */}
      <div className="mb-8">
        <GameSearch
          placeholder="Search games..."
          onGameSelect={handleGameSelect}
        />
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
          <GamesGrid
            onDeleteGame={handleDeleteGame}
            onGameClick={onGameClick}
          />
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
