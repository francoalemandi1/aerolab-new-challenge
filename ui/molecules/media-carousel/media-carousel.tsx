"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DefaultImage, GameCarouselImage } from "@/ui/atoms";

interface MediaCarouselProps {
  images?: string[]; // Legacy support for direct URLs
  imageIds?: string[]; // New support for IGDB image IDs
  className?: string;
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  images = [],
  imageIds = [],
  className,
}) => {
  const goToPrevious = () => {
    // Scroll to previous images
    const container = document.getElementById("carousel-container");
    if (container) {
      container.scrollBy({ left: -120, behavior: "smooth" });
    }
  };

  const goToNext = () => {
    // Scroll to next images
    const container = document.getElementById("carousel-container");
    if (container) {
      container.scrollBy({ left: 120, behavior: "smooth" });
    }
  };

  // Determine which data source to use and prepare display items
  const useImageIds = imageIds.length > 0;
  const displayItems = useImageIds
    ? imageIds
    : images.length > 0
      ? images
      : Array(4).fill(null);
  const hasRealImages = useImageIds ? imageIds.length > 0 : images.length > 0;

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Container */}
      <div className="relative">
        {/* Images Container */}
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          id="carousel-container"
          data-testid="carousel-container"
        >
          {displayItems.map((item: string | null, index: number) => (
            <div
              key={index}
              className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg"
            >
              {hasRealImages && item ? (
                useImageIds ? (
                  <GameCarouselImage
                    imageId={item}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="112px"
                    retina={true}
                  />
                ) : (
                  <img
                    src={item}
                    alt={`Screenshot ${index + 1}`}
                    className="h-full w-full object-cover"
                    data-testid="carousel-image"
                  />
                )
              ) : (
                <DefaultImage size="md" className="h-full w-full" />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - positioned relative to carousel */}
        {hasRealImages && displayItems.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors"
              style={{ backgroundColor: "#F2F2F2D9" }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors"
              style={{ backgroundColor: "#F2F2F2D9" }}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
