"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface Game {
  id: string;
  title: string;
  slug: string; // IGDB official slug
  imageUrl: string;
  imageId?: string; // IGDB image ID for optimized images
  addedAt?: string;
  releaseDate?: string; // Human readable release date
  first_release_date?: number; // Unix timestamp from IGDB
}

export type FilterType = "last-added" | "newest" | "oldest";

const STORAGE_KEY = "gaming-haven-saved-games";

/**
 * Custom hook para manejar la colección de juegos guardados
 * Utiliza useLocalStorage para persistir los datos
 */
export function useGames() {
  const [savedGames, setSavedGames, removeSavedGames, isHydrated] =
    useLocalStorage<Game[]>(STORAGE_KEY, []);

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

  // Función para filtrar y ordenar juegos
  const getFilteredGames = useCallback(
    (filter: FilterType): Game[] => {
      const games = [...savedGames];

      switch (filter) {
        case "last-added":
          return games.sort((a, b) => {
            const dateA = new Date(a.addedAt || 0).getTime();
            const dateB = new Date(b.addedAt || 0).getTime();
            return dateB - dateA; // Más reciente primero
          });

        case "newest":
          return games.sort((a, b) => {
            const dateA = a.first_release_date || 0;
            const dateB = b.first_release_date || 0;
            return dateB - dateA; // Más nuevo primero
          });

        case "oldest":
          return games.sort((a, b) => {
            const dateA = a.first_release_date || Number.MAX_SAFE_INTEGER;
            const dateB = b.first_release_date || Number.MAX_SAFE_INTEGER;
            return dateA - dateB; // Más viejo primero
          });

        default:
          return games;
      }
    },
    [savedGames]
  );

  return {
    savedGames,
    addGame,
    removeGame,
    isGameSaved,
    clearAllGames,
    getFilteredGames,
    isHydrated,
    isLoading: false, // Ya no necesitamos loading state con el nuevo patrón
  };
}
