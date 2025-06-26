"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, Check } from "lucide-react";
import Image from "next/image";
import { useGames, type Game } from "@/hooks/useGames";

interface GameSearchProps {
  placeholder?: string;
  className?: string;
}

// Mock data de juegos - en una app real vendría de una API
const mockGames: Game[] = [
  {
    id: "1",
    title: "Grand Theft Auto San Andreas",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop",
  },
  {
    id: "2",
    title: "Grand Theft Auto V",
    imageUrl:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=60&h=60&fit=crop",
  },
  {
    id: "3",
    title: "Grand Theft Auto IV",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=60&h=60&fit=crop",
  },
  {
    id: "4",
    title: "Grand Theft Auto III",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=60&h=60&fit=crop",
  },
  {
    id: "5",
    title: "Grand Theft Auto",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop",
  },
  {
    id: "6",
    title: "Grand Theft Auto Vice City",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop",
  },
  {
    id: "7",
    title: "Grand Theft Auto: Episodes from Liberty City",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop",
  },
  {
    id: "8",
    title: "Grand Theft Auto: The Trilogy",
    imageUrl:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=60&h=60&fit=crop",
  },
  {
    id: "9",
    title: "Grand Theft Auto Online",
    imageUrl:
      "https://images.unsplash.com/photo-1574891164043-eec9ebfe8b6a?w=60&h=60&fit=crop",
  },
  {
    id: "10",
    title: "Grand Theft Auto: Chinatown Wars",
    imageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=60&h=60&fit=crop",
  },
];

export const GameSearch: React.FC<GameSearchProps> = ({
  placeholder = "Search games...",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  // Hook para manejar los juegos guardados
  const { addGame, isGameSaved } = useGames();

  // Filtrar juegos basado en el input
  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = mockGames.filter(game =>
        game.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredGames(filtered);
      setOpen(filtered.length > 0);
    } else {
      setFilteredGames([]);
      setOpen(false);
    }
  }, [inputValue]);

  const handleGameSelect = (game: Game) => {
    const success = addGame(game);
    if (success) {
      console.log(`Game "${game.title}" added to collection!`);
      // Opcional: mostrar un toast o notificación
    } else {
      console.log(`Game "${game.title}" is already in your collection.`);
    }

    // Limpiar el input después de seleccionar
    setInputValue("");
    setOpen(false);
  };

  return (
    <div className={cn("relative mb-6 w-full", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-200" />
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => {
            if (filteredGames.length > 0) setOpen(true);
          }}
          className={cn(
            "flex h-12 w-full border border-pink-600/20 bg-gray-white py-4 pl-12 pr-4",
            "font-inter text-base placeholder:text-pink-200",
            "focus:outline-none focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            open && filteredGames.length > 0
              ? "rounded-main rounded-b-none border-b-0"
              : "rounded-main"
          )}
          placeholder={placeholder}
        />
      </div>

      {/* Dropdown Results */}
      {open && filteredGames.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 rounded-main rounded-t-none border border-t-0 border-pink-600/20 bg-gray-white shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {filteredGames.map(game => (
              <div
                key={game.id}
                onClick={() => handleGameSelect(game)}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-900 hover:bg-pink-50"
              >
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={game.imageUrl}
                    alt={game.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <span className="flex-1 text-sm font-medium text-gray-900">
                  {game.title}
                </span>
                {isGameSaved(game.id) && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </div>
            ))}
            {filteredGames.length === 0 && inputValue && (
              <div className="py-6 text-center text-sm text-gray-500">
                No games found.
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
