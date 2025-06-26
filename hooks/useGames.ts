"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface Game {
  id: string;
  title: string;
  imageUrl: string;
  addedAt?: string;
}

const STORAGE_KEY = "gaming-haven-saved-games";

/**
 * Custom hook para manejar la colección de juegos guardados
 * Utiliza useLocalStorage para persistir los datos
 */
export function useGames() {
  const [savedGames, setSavedGames, removeSavedGames] = useLocalStorage<Game[]>(
    STORAGE_KEY,
    []
  );

  const addGame = useCallback(
    (game: Omit<Game, "addedAt">) => {
      // Verificar si el juego ya existe
      if (savedGames.some((savedGame: Game) => savedGame.id === game.id)) {
        console.log("Game already saved:", game.title);
        return false;
      }

      const newGame: Game = {
        ...game,
        addedAt: new Date().toISOString(),
      };

      setSavedGames(prev => [...prev, newGame]);
      return true;
    },
    [savedGames, setSavedGames]
  );

  const removeGame = useCallback(
    (gameId: string) => {
      setSavedGames(prev => prev.filter(game => game.id !== gameId));
    },
    [setSavedGames]
  );

  const isGameSaved = useCallback(
    (gameId: string) => {
      return savedGames.some((game: Game) => game.id === gameId);
    },
    [savedGames]
  );

  const clearAllGames = useCallback(() => {
    removeSavedGames();
  }, [removeSavedGames]);

  return {
    savedGames,
    addGame,
    removeGame,
    isGameSaved,
    clearAllGames,
    isLoading: false, // Ya no necesitamos loading state con el nuevo patrón
  };
}
