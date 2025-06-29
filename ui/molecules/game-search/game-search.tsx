"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGames } from "@/hooks/useGames";
import { useDebounce } from "@/hooks/useDebounce";
import { useGamesSearch } from "@/hooks/useGamesSearch";
import { useQuery } from "@tanstack/react-query";
import { getPopularGames } from "@/lib/igdb";
import { GameThumbnailImage } from "@/ui/atoms";
import { GameFromIGDB } from "@/types/igdb";
import * as Popover from "@radix-ui/react-popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/ui/atoms/command";

interface GameSearchProps {
  placeholder?: string;
  className?: string;
  onGameSelect?: (game: GameFromIGDB) => void;
}

export const GameSearch: React.FC<GameSearchProps> = ({
  placeholder = "Search games...",
  className,
  onGameSelect,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { isGameSaved } = useGames();

  // Debounce del valor de entrada para evitar demasiadas llamadas a la API
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  // React Query para búsqueda con caché automático
  const {
    data: searchResults = [],
    isLoading,
    error,
  } = useGamesSearch(debouncedSearchTerm, 8);

  // React Query para juegos populares (sugerencias)
  const { data: popularGames = [], isLoading: isLoadingPopular } = useQuery({
    queryKey: ["popular-games-suggestions"],
    queryFn: () => getPopularGames(10),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const shouldShowSuggestions =
    popularGames.length > 0 && inputValue.trim().length === 0;

  // Determinar qué resultados mostrar
  const displayResults = shouldShowSuggestions ? popularGames : searchResults;

  const handleGameSelect = (igdbGame: GameFromIGDB) => {
    if (onGameSelect) {
      onGameSelect(igdbGame);
    } else {
      router.push(`/games/${igdbGame.slug}`);
    }

    setInputValue("");
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setIsOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsOpen(value.length > 0 || popularGames.length > 0);
  };

  const handleInputFocus = () => {
    setIsOpen(inputValue.length > 0 || popularGames.length > 0);
  };

  return (
    <div
      className={cn(
        "relative mb-6 w-full md:mx-auto md:mb-4 md:max-w-md",
        className
      )}
    >
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Anchor asChild>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-pink-200 md:h-6 md:w-6" />
            {inputValue ? (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-pink-200 transition-colors hover:text-pink-400 md:h-6 md:w-6"
                aria-label="Clear search"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            ) : null}
            <input
              value={inputValue}
              onChange={e => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              className={cn(
                "flex h-12 w-full border border-pink-600/20 bg-gray-white py-4 pl-12 pr-12",
                "font-inter text-base placeholder:text-pink-200",
                "focus:outline-none focus-visible:outline-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "md:h-14 md:pl-14 md:pr-14 md:text-lg",
                isOpen
                  ? "rounded-main rounded-b-none border-b-0"
                  : "rounded-main"
              )}
              placeholder={placeholder}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-autocomplete="list"
            />
          </div>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            className={cn(
              "z-50 w-[var(--radix-popover-trigger-width)] rounded-main rounded-t-none border border-t-0 border-pink-600/20 bg-gray-white shadow-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
            align="start"
            sideOffset={0}
            onOpenAutoFocus={e => {
              e.preventDefault(); // Prevent focus from moving to the content
            }}
          >
            <Command
              className="max-h-60 overflow-hidden md:max-h-80"
              shouldFilter={false}
            >
              <CommandList className="max-h-60 overflow-y-auto md:max-h-80">
                {/* Título para sugerencias */}
                {shouldShowSuggestions && (
                  <div className="border-b border-pink-600/10 px-4 py-2 text-xs font-medium text-gray-500 md:px-6 md:py-3 md:text-sm">
                    Suggested games
                  </div>
                )}

                {/* Error en búsqueda */}
                {error && !shouldShowSuggestions && (
                  <div className="py-6 text-center text-sm text-red-500">
                    {error instanceof Error
                      ? error.message
                      : "Error searching games. Please try again."}
                  </div>
                )}

                {/* Mensaje para 1 carácter */}
                {!error &&
                  !shouldShowSuggestions &&
                  debouncedSearchTerm.trim().length === 1 && (
                    <div className="py-6 text-center text-sm text-gray-500">
                      Type at least 2 characters to search...
                    </div>
                  )}

                {/* Estados de carga */}
                {shouldShowSuggestions && isLoadingPopular && (
                  <div className="py-6 text-center text-sm text-gray-500">
                    Loading suggestions...
                  </div>
                )}

                {!error &&
                  !shouldShowSuggestions &&
                  debouncedSearchTerm.trim().length >= 2 &&
                  isLoading && (
                    <div className="py-6 text-center text-sm text-gray-500">
                      Searching...
                    </div>
                  )}

                {/* Sin resultados */}
                {!error &&
                  !shouldShowSuggestions &&
                  debouncedSearchTerm.trim().length >= 2 &&
                  !isLoading &&
                  searchResults.length === 0 && (
                    <CommandEmpty>
                      No games found. Try another search.
                    </CommandEmpty>
                  )}

                {/* Resultados de búsqueda o sugerencias */}
                {!error &&
                  displayResults.length > 0 &&
                  (shouldShowSuggestions ||
                    debouncedSearchTerm.trim().length >= 2) && (
                    <CommandGroup>
                      {displayResults.map(game => (
                        <CommandItem
                          key={game.id}
                          value={`${game.title}-${game.id}`}
                          onSelect={() => handleGameSelect(game)}
                          className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-900 hover:bg-violet-50 aria-selected:bg-violet-50 data-[disabled]:pointer-events-auto data-[disabled]:opacity-100 md:gap-4 md:px-6 md:py-4"
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 md:h-14 md:w-14">
                            <GameThumbnailImage
                              imageId={game.imageId || ""}
                              alt={game.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 48px, 56px"
                              retina={true}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-gray-900 md:text-base">
                              {game.title}
                            </span>
                            {game.summary && (
                              <span className="block truncate text-xs text-gray-500 md:text-sm">
                                {game.summary.substring(0, 60)}...
                              </span>
                            )}
                          </div>
                          {isGameSaved(game.id) && (
                            <Check className="h-4 w-4 flex-shrink-0 text-green-600 md:h-5 md:w-5" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
              </CommandList>
            </Command>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
