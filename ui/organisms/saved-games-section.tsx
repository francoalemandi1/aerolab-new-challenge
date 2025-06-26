"use client";
import React, { useState } from "react";
import { H1, LoadingSpinner } from "@/ui/atoms";
import { EmptyState, FilterChips, GamesGrid } from "@/ui/molecules";
import { useGames, FilterType } from "@/hooks/useGames";

interface SavedGamesSectionProps {
  className?: string;
}

export const SavedGamesSection: React.FC<SavedGamesSectionProps> = ({
  className,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("last-added");
  const { savedGames, isHydrated } = useGames();

  // Determinar si hay juegos guardados
  const hasGames = savedGames.length > 0;

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    console.log("Filter changed to:", filter);
  };

  // Mostrar spinner durante la hidratación
  if (!isHydrated) {
    return (
      <div className={className}>
        <H1 className="mb-6 text-violet-600">Saved games</H1>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" text="Loading your games..." />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
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
  );
};
