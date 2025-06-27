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

  const handleFilterChange = (newFilter: FilterType) => {
    setActiveFilter(newFilter);
  };

  // Mostrar spinner durante la hidratación
  if (!isHydrated) {
    return (
      <div className={className}>
        <H1 className="mb-6 text-violet-600 md:mb-8 md:text-center">
          Saved games
        </H1>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" text="Loading your games..." />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <H1 className="mb-6 text-violet-600 md:mb-8 md:text-center">
        Saved games
      </H1>

      {/* Filter Chips - Solo se muestran si hay games */}
      {hasGames && (
        <FilterChips
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          className="mb-6 md:mb-8"
        />
      )}

      {/* Content: Empty state o games list */}
      <div className="md:mx-auto md:max-w-4xl">
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
