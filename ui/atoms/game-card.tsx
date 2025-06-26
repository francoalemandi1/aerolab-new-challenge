"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { GameCardImage } from "./optimized-image";

interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  imageId?: string; // IGDB image ID for optimized images
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  imageUrl,
  imageId,
  onDelete,
  onClick,
  className,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      className={cn("group relative cursor-pointer", className)}
      onClick={handleClick}
    >
      {/* Game Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
        {imageId ? (
          <GameCardImage
            imageId={imageId}
            alt={title}
            fill
            retina
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

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
