"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGames } from "@/hooks/useGames";
import { useDebounce } from "@/hooks/useDebounce";
import { useGamesSearch } from "@/hooks/useGamesSearch";
import { GameThumbnailImage } from "@/ui/atoms";
import { GameFromIGDB } from "@/types/igdb";

interface GameSearchProps {
  placeholder?: string;
  className?: string;
}

export const GameSearch: React.FC<GameSearchProps> = ({
  placeholder = "Search games...",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Hooks
  const router = useRouter();
  const { isGameSaved } = useGames();

  // Debounce del valor de entrada para evitar demasiadas llamadas a la API
  const debouncedSearchTerm = useDebounce(inputValue, 300); // 300ms de delay

  // React Query para búsqueda con caché automático
  const {
    data: searchResults = [],
    isLoading,
    error,
  } = useGamesSearch(debouncedSearchTerm, 8);

  // Manejar apertura/cierre del dropdown
  React.useEffect(() => {
    if (debouncedSearchTerm.trim().length >= 2 && searchResults.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [debouncedSearchTerm, searchResults]);

  const handleGameSelect = (igdbGame: GameFromIGDB) => {
    // Navegar a la página de detalle del juego
    router.push(`/home/${igdbGame.id}`);

    // Limpiar el input después de seleccionar
    setInputValue("");
    setOpen(false);
  };

  return (
    <div className={cn("relative mb-6 w-full", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-200" />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-pink-400" />
        )}
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => {
            if (searchResults.length > 0) setOpen(true);
          }}
          className={cn(
            "flex h-12 w-full border border-pink-600/20 bg-gray-white py-4 pl-12",
            isLoading ? "pr-12" : "pr-4",
            "font-inter text-base placeholder:text-pink-200",
            "focus:outline-none focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            open && (searchResults.length > 0 || error)
              ? "rounded-main rounded-b-none border-b-0"
              : "rounded-main"
          )}
          placeholder={placeholder}
          disabled={isLoading}
        />
      </div>

      {/* Dropdown Results */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 rounded-main rounded-t-none border border-t-0 border-pink-600/20 bg-gray-white shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {error && (
              <div className="py-6 text-center text-sm text-red-500">
                {error instanceof Error
                  ? error.message
                  : "Error searching games. Please try again."}
              </div>
            )}

            {!error &&
              searchResults.length > 0 &&
              searchResults.map(game => (
                <div
                  key={game.id}
                  onClick={() => handleGameSelect(game)}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-900 hover:bg-pink-50"
                >
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <GameThumbnailImage
                      imageId={game.imageId || ""}
                      alt={game.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                      retina={true}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-gray-900">
                      {game.title}
                    </span>
                    {game.summary && (
                      <span className="block truncate text-xs text-gray-500">
                        {game.summary.substring(0, 60)}...
                      </span>
                    )}
                  </div>
                  {isGameSaved(game.id) && (
                    <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                  )}
                </div>
              ))}

            {!error &&
              !isLoading &&
              searchResults.length === 0 &&
              debouncedSearchTerm.trim().length >= 2 && (
                <div className="py-6 text-center text-sm text-gray-500">
                  No games found for &quot;{debouncedSearchTerm}&quot;.
                </div>
              )}
          </div>
        </div>
      )}

      {/* Backdrop para cerrar el dropdown */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};
