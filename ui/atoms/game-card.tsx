"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  onDelete?: (id: string) => void;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  imageUrl,
  onDelete,
  className,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  return (
    <div className={cn("group relative", className)}>
      {/* Game Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
        >
          <Trash2 className="h-4 w-4 text-gray-dark" />
        </button>
      </div>
    </div>
  );
};
