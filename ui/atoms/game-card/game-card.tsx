"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GameCardImage } from "../optimized-image";

interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  imageId?: string; // IGDB image ID for optimized images
  onDelete?: (id: string) => void;
  href?: string;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  imageUrl,
  imageId,
  onDelete,
  href,
  className,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking delete
    e.stopPropagation(); // Prevent event bubbling
    onDelete?.(id);
  };

  const CardContent = () => (
    <article
      className="relative aspect-[4/5] overflow-hidden rounded-lg"
      aria-label={`Game card for ${title}`}
      role="article"
    >
      {imageId ? (
        <GameCardImage
          imageId={imageId}
          alt={title}
          fill
          retina
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid="game-image"
          aria-hidden="false"
        />
      ) : (
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid="game-image"
          aria-hidden="false"
        />
      )}

      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-white md:bottom-4 md:right-4 md:h-10 md:w-10"
          aria-label="Delete"
          title={`Remove ${title}`}
        >
          <Trash2
            className="h-4 w-4 text-gray-dark md:h-5 md:w-5"
            aria-hidden="true"
          />
        </button>
      )}

      {/* Hidden title for screen readers */}
      <span className="sr-only">
        {title} - {href ? "Click to view game details" : "Game card"}
      </span>
    </article>
  );

  // Wrap in Link only if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-white",
          className
        )}
        aria-label={`View details for ${title}`}
      >
        <CardContent />
      </Link>
    );
  }

  // Otherwise return just the card content
  return (
    <div className={cn("group relative block", className)}>
      <CardContent />
    </div>
  );
};
