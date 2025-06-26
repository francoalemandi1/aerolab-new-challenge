"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GameCard } from "@/ui/atoms";
import { useGames } from "@/hooks/useGames";
import { useRouter } from "next/navigation";

interface GamesGridProps {
  className?: string;
}

export const GamesGrid: React.FC<GamesGridProps> = ({ className }) => {
  const { savedGames, removeGame } = useGames();
  const router = useRouter();

  const handleDeleteGame = (id: string) => {
    removeGame(id);
    console.log("Game removed from collection:", id);
  };

  const handleGameClick = (id: string) => {
    router.push(`/home/${id}`);
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {savedGames.map(game => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.title}
          imageUrl={game.imageUrl}
          imageId={game.imageId}
          onDelete={handleDeleteGame}
          onClick={handleGameClick}
        />
      ))}
    </div>
  );
};
