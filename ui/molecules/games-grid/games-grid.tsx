"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GameCard } from "@/ui/atoms";
import { useGames, FilterType } from "@/hooks/useGames";

interface GamesGridProps {
  className?: string;
  filter?: FilterType;
  onDeleteGame?: (id: string) => void;
}

export const GamesGrid: React.FC<GamesGridProps> = ({
  className,
  filter = "last-added",
  onDeleteGame,
}) => {
  const { getFilteredGames, removeGame } = useGames();

  // Obtener juegos filtrados según el filtro activo
  const filteredGames = getFilteredGames(filter);

  const handleDeleteGame = (id: string) => {
    if (onDeleteGame) {
      onDeleteGame(id);
    } else {
      removeGame(id);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
        className
      )}
    >
      {filteredGames.map(game => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.title}
          imageUrl={game.imageUrl}
          imageId={game.imageId}
          onDelete={handleDeleteGame}
          href={`/games/${game.slug}`}
        />
      ))}
    </div>
  );
};
