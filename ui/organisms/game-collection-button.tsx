"use client";

import { Button } from "@/ui/atoms";
import { useGames } from "@/hooks/useGames";
import { GameFromIGDB } from "@/types/igdb";

interface GameCollectionButtonProps {
  gameData: GameFromIGDB;
}

export function GameCollectionButton({ gameData }: GameCollectionButtonProps) {
  const { addGame, removeGame, isGameSaved } = useGames();

  const isInCollection = isGameSaved(gameData.id);

  const handleToggleCollection = () => {
    const game = {
      id: gameData.id,
      title: gameData.title,
      imageUrl: gameData.imageUrl,
      imageId: gameData.imageId,
      addedAt: new Date().toISOString(),
    };

    if (isInCollection) {
      removeGame(gameData.id);
    } else {
      addGame(game);
    }
  };

  return (
    <Button
      onClick={handleToggleCollection}
      className={`w-full py-4 text-base font-medium transition-colors ${
        isInCollection
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-violet-600 text-white hover:bg-violet-700"
      }`}
    >
      {isInCollection ? "Remove from collection" : "Add to collection"}
    </Button>
  );
}
