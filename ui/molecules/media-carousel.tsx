"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DefaultImage } from "@/ui/atoms";

interface MediaCarouselProps {
  images: string[];
  className?: string;
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  images,
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

  // Create array with images and default placeholders if needed
  const displayImages = images.length > 0 ? images : Array(4).fill(null);
  const hasRealImages = images.length > 0;

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Container */}
      <div className="relative">
        {/* Images Container */}
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          id="carousel-container"
        >
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg"
            >
              {hasRealImages && image ? (
                <Image
                  src={image}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <DefaultImage size="md" className="h-full w-full" />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - positioned relative to carousel */}
        {hasRealImages && images.length > 1 && (
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
