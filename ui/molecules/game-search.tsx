"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/ui/atoms/command";
import Image from "next/image";

interface Game {
  id: string;
  title: string;
  imageUrl: string;
}

interface GameSearchProps {
  onGameSelect?: (game: Game) => void;
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
];

export const GameSearch: React.FC<GameSearchProps> = ({
  onGameSelect,
  placeholder = "Search games...",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

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
    setInputValue(game.title);
    setOpen(false);
    onGameSelect?.(game);
  };

  return (
    <div className={cn("relative w-full", className)}>
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
          <Command className="rounded-main rounded-t-none border-0 bg-transparent">
            <CommandList className="max-h-60">
              <CommandGroup>
                {filteredGames.map(game => (
                  <CommandItem
                    key={game.id}
                    value={game.title}
                    onSelect={() => handleGameSelect(game)}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-900 opacity-100 hover:bg-pink-50 aria-selected:bg-pink-50 data-[selected=true]:bg-pink-50"
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
                  </CommandItem>
                ))}
              </CommandGroup>
              {filteredGames.length === 0 && inputValue && (
                <CommandEmpty>No games found.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}

      {/* Backdrop para cerrar el dropdown */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};
