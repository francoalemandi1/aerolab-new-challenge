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

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
  placeholder: string;
  isDropdownOpen: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  placeholder,
  isDropdownOpen,
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-200 md:h-6 md:w-6" />
      {value ? (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-200 transition-colors hover:text-pink-400 md:h-6 md:w-6"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      ) : null}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          "flex h-12 w-full border border-pink-600/20 bg-gray-white py-4 pl-12 pr-12",
          "font-inter text-base placeholder:text-pink-200",
          "focus:outline-none focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:h-14 md:pl-14 md:pr-14 md:text-lg",
          isDropdownOpen
            ? "rounded-main rounded-b-none border-b-0"
            : "rounded-main"
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

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
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Hooks
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

  // Derived state - no more useEffect needed!
  const shouldShowSearch = debouncedSearchTerm.trim().length >= 1;
  const shouldShowSuggestions =
    showSuggestions && inputValue.trim().length === 0;
  const isDropdownOpen = shouldShowSearch || shouldShowSuggestions;

  // Determinar qué resultados mostrar
  const displayResults = shouldShowSuggestions ? popularGames : searchResults;

  const handleGameSelect = (igdbGame: GameFromIGDB) => {
    if (onGameSelect) {
      onGameSelect(igdbGame);
    } else {
      router.push(`/games/${igdbGame.slug}`);
    }

    setInputValue("");
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (inputValue.trim().length === 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay para permitir clicks en los resultados
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleBackdropClick = () => {
    setShowSuggestions(false);
  };

  return (
    <div
      className={cn(
        "relative mb-6 w-full md:mx-auto md:mb-4 md:max-w-md",
        className
      )}
    >
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClear={handleClearSearch}
        placeholder={placeholder}
        isDropdownOpen={isDropdownOpen}
      />

      {/* Dropdown Results */}
      {isDropdownOpen ? (
        <div className="absolute left-0 right-0 top-full z-50 rounded-main rounded-t-none border border-t-0 border-pink-600/20 bg-gray-white shadow-lg">
          <div className="max-h-60 overflow-y-auto md:max-h-80">
            {/* Título para sugerencias */}
            {shouldShowSuggestions ? (
              <div className="border-b border-pink-600/10 px-4 py-2 text-xs font-medium text-gray-500 md:px-6 md:py-3 md:text-sm">
                Suggested games
              </div>
            ) : null}

            {/* Error en búsqueda */}
            {error && !shouldShowSuggestions ? (
              <div className="py-6 text-center text-sm text-red-500">
                {error instanceof Error
                  ? error.message
                  : "Error searching games. Please try again."}
              </div>
            ) : null}

            {/* Mensaje para 1 carácter */}
            {!error &&
            !shouldShowSuggestions &&
            debouncedSearchTerm.trim().length === 1 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                Type at least 2 characters to search...
              </div>
            ) : null}

            {/* Resultados de búsqueda o sugerencias */}
            {!error &&
            displayResults.length > 0 &&
            (shouldShowSuggestions || debouncedSearchTerm.trim().length >= 2)
              ? displayResults.map(game => (
                  <div
                    key={game.id}
                    onClick={() => handleGameSelect(game)}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-900 hover:bg-violet-50 md:gap-4 md:px-6 md:py-4"
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
                      {game.summary ? (
                        <span className="block truncate text-xs text-gray-500 md:text-sm">
                          {game.summary.substring(0, 60)}...
                        </span>
                      ) : null}
                    </div>
                    {isGameSaved(game.id) ? (
                      <Check className="h-4 w-4 flex-shrink-0 text-green-600 md:h-5 md:w-5" />
                    ) : null}
                  </div>
                ))
              : null}

            {/* Estado de carga para sugerencias */}
            {shouldShowSuggestions && isLoadingPopular ? (
              <div className="py-6 text-center text-sm text-gray-500">
                Loading suggestions...
              </div>
            ) : null}

            {/* Estado de carga para búsqueda */}
            {!error &&
            !shouldShowSuggestions &&
            debouncedSearchTerm.trim().length >= 2 &&
            isLoading ? (
              <div className="py-6 text-center text-sm text-gray-500">
                Searching...
              </div>
            ) : null}

            {/* Sin resultados */}
            {!error &&
            !shouldShowSuggestions &&
            debouncedSearchTerm.trim().length >= 2 &&
            !isLoading &&
            searchResults.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No games found. Try another search.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Backdrop para cerrar el dropdown */}
      {isDropdownOpen ? (
        <div className="fixed inset-0 z-40" onClick={handleBackdropClick} />
      ) : null}
    </div>
  );
};
