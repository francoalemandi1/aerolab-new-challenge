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
      className={`w-full py-4 text-base font-medium transition-colors focus:ring-0 focus:ring-offset-0 active:scale-[0.98] ${
        isInCollection
          ? "border-2 border-violet-600 bg-white text-violet-600 hover:bg-violet-50 focus:bg-white active:bg-white"
          : "bg-violet-900 text-white hover:bg-violet-900/90 focus:bg-violet-900 active:bg-violet-900"
      }`}
    >
      {isInCollection ? "Game collected" : "Collect game"}
    </Button>
  );
}
