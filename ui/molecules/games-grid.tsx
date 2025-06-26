"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GameCard } from "@/ui/atoms";
import { useGames, FilterType } from "@/hooks/useGames";
import { useRouter } from "next/navigation";

interface GamesGridProps {
  className?: string;
  filter?: FilterType;
}

export const GamesGrid: React.FC<GamesGridProps> = ({
  className,
  filter = "last-added",
}) => {
  const { getFilteredGames, removeGame } = useGames();
  const router = useRouter();

  // Obtener juegos filtrados según el filtro activo
  const filteredGames = getFilteredGames(filter);

  const handleDeleteGame = (id: string) => {
    removeGame(id);
    console.log("Game removed from collection:", id);
  };

  const handleGameClick = (gameSlug: string) => {
    router.push(`/home/${gameSlug}`);
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {filteredGames.map(game => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.title}
          imageUrl={game.imageUrl}
          imageId={game.imageId}
          onDelete={handleDeleteGame}
          onClick={() => handleGameClick(game.slug)}
        />
      ))}
    </div>
  );
};
