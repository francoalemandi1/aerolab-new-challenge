"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GameCard } from "@/ui/atoms";

interface Game {
  id: string;
  title: string;
  imageUrl: string;
}

interface GamesGridProps {
  games?: Game[];
  onDeleteGame?: (id: string) => void;
  onGameClick?: (id: string) => void;
  className?: string;
}

// Mock data con más juegos para generar scroll
const mockGames: Game[] = [
  {
    id: "1",
    title: "Dragon Ball Sparking Zero",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
  },
  {
    id: "2",
    title: "Silent Hill 2",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=500&fit=crop",
  },
  {
    id: "3",
    title: "Off The Grid",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop",
  },
  {
    id: "4",
    title: "Arena Breakout",
    imageUrl:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=500&fit=crop",
  },
  {
    id: "5",
    title: "Silent Hill 2",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=500&fit=crop",
  },
  {
    id: "6",
    title: "Dragon Ball Sparking Zero",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
  },
  {
    id: "7",
    title: "Cyberpunk 2077",
    imageUrl:
      "https://images.unsplash.com/photo-1554213352-5ffe6534af08?w=400&h=500&fit=crop",
  },
  {
    id: "8",
    title: "The Witcher 3",
    imageUrl:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=500&fit=crop",
  },
  {
    id: "9",
    title: "Assassin's Creed",
    imageUrl:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=500&fit=crop",
  },
  {
    id: "10",
    title: "God of War",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=500&fit=crop",
  },
  {
    id: "11",
    title: "Horizon Zero Dawn",
    imageUrl:
      "https://images.unsplash.com/photo-1574891164043-eec9ebfe8b6a?w=400&h=500&fit=crop",
  },
  {
    id: "12",
    title: "Spider-Man",
    imageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=500&fit=crop",
  },
];

export const GamesGrid: React.FC<GamesGridProps> = ({
  games = mockGames,
  onDeleteGame,
  onGameClick,
  className,
}) => {
  const handleDeleteGame = (id: string) => {
    console.log("Deleting game:", id);
    onDeleteGame?.(id);
  };

  const handleGameClick = (id: string) => {
    console.log("Clicking game:", id);
    onGameClick?.(id);
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {games.map(game => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.title}
          imageUrl={game.imageUrl}
          onDelete={handleDeleteGame}
          onClick={handleGameClick}
        />
      ))}
    </div>
  );
};
