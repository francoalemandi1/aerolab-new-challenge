"use client";

import {
  Button,
  ToastProvider,
  ToastViewport,
  Toast,
  GameCollectionToast,
} from "@/ui/atoms";
import { useGames } from "@/hooks/useGames";
import { useToast } from "@/hooks/useToast";
import { GameFromIGDB } from "@/types/igdb";

interface GameCollectionButtonProps {
  gameData: GameFromIGDB;
}

export function GameCollectionButton({ gameData }: GameCollectionButtonProps) {
  const { addGame, removeGame, isGameSaved } = useGames();
  const {
    isOpen,
    title,
    description,
    action,
    onOpenChange,
    showGameCollectedToast,
    showGameRemovedToast,
  } = useToast();

  const isInCollection = isGameSaved(gameData.id);

  const handleToggleCollection = () => {
    const game = {
      id: gameData.id,
      title: gameData.title,
      slug: gameData.slug,
      imageUrl: gameData.imageUrl,
      imageId: gameData.imageId,
      releaseDate: gameData.releaseDate,
      first_release_date: gameData.first_release_date,
      addedAt: new Date().toISOString(),
    };

    if (isInCollection) {
      removeGame(gameData.id);
      showGameRemovedToast(gameData.title);
    } else {
      addGame(game);
      showGameCollectedToast(gameData.title);
    }
  };

  const toastVariant = action === "removed" ? "destructive" : "success";

  return (
    <ToastProvider>
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

      <Toast
        open={isOpen}
        onOpenChange={onOpenChange}
        duration={3000}
        variant={toastVariant}
      >
        <GameCollectionToast
          title={title}
          description={description}
          action={action}
        />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
