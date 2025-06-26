"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchGames, getGameById } from "@/lib/igdb";
import { GameFromIGDB } from "@/types/igdb";

/**
 * Hook personalizado para búsqueda de juegos con React Query
 * Maneja el caché automáticamente y permite acceso a los resultados desde cualquier componente
 */
export function useGamesSearch(query: string, limit: number = 8) {
  return useQuery({
    queryKey: ["games-search", query, limit],
    queryFn: () => searchGames(query, limit),
    enabled: query.trim().length >= 2, // Solo buscar si hay al menos 2 caracteres
    staleTime: 5 * 60 * 1000, // 5 minutos - los datos se consideran frescos por este tiempo
    gcTime: 10 * 60 * 1000, // 10 minutos - tiempo que se mantienen en caché después de ser unused
    retry: 2,
    retryDelay: 1000,
  });
}

/**
 * Hook para obtener un juego específico, primero del caché de búsqueda, luego de la API
 * Para uso en client components
 */
export function useGameDetails(gameId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["game-details", gameId],
    queryFn: async () => {
      // Primero intentar encontrar el juego en el caché de búsquedas
      const queryCache = queryClient.getQueryCache();
      const searchQueries = queryCache.findAll({
        queryKey: ["games-search"],
        exact: false,
      });

      // Buscar en todos los resultados de búsqueda cacheados
      for (const query of searchQueries) {
        if (query.state.data) {
          const games = query.state.data as GameFromIGDB[];
          const foundGame = games.find(game => game.id === gameId);
          if (foundGame) {
            return foundGame;
          }
        }
      }

      // Si no se encuentra en caché, hacer llamada a la API
      return await getGameById(gameId);
    },
    enabled: !!gameId,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
}

/**
 * Hook para prefetch de juegos (útil para optimización)
 */
export function usePrefetchGame(gameId: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: ["game-details", gameId],
      queryFn: () => getGameById(gameId),
      staleTime: 10 * 60 * 1000,
    });
  };
}
