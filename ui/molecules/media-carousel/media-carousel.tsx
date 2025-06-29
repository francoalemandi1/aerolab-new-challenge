"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DefaultImage, GameCarouselImage } from "@/ui/atoms";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    // Scroll to previous images in carousel
    const container = document.getElementById("carousel-container");
    if (container) {
      container.scrollBy({ left: -120, behavior: "smooth" });
    }
  };

  const goToNext = () => {
    // Scroll to next images in carousel
    const container = document.getElementById("carousel-container");
    if (container) {
      container.scrollBy({ left: 120, behavior: "smooth" });
    }
  };

  const goToPreviousModal = () => {
    // Navigate to previous image in modal
    const totalImages = useImageIds ? imageIds.length : images.length;
    setCurrentImageIndex(prev => (prev - 1 + totalImages) % totalImages);
  };

  const goToNextModal = () => {
    // Navigate to next image in modal
    const totalImages = useImageIds ? imageIds.length : images.length;
    setCurrentImageIndex(prev => (prev + 1) % totalImages);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Handle keyboard navigation in modal
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      goToPreviousModal();
    } else if (event.key === "ArrowRight") {
      goToNextModal();
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
                <button
                  onClick={() => openModal(index)}
                  className="group relative h-full w-full cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
                  aria-label={`Expandir screenshot ${index + 1}`}
                >
                  {useImageIds ? (
                    <GameCarouselImage
                      imageId={item}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-90"
                      sizes="112px"
                      retina={true}
                    />
                  ) : (
                    <Image
                      src={item}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover transition-opacity group-hover:opacity-90"
                      data-testid="carousel-image"
                      sizes="112px"
                    />
                  )}
                  {/* Overlay hint for expansion */}
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 group-focus:bg-black/10" />
                </button>
              ) : (
                <DefaultImage size="md" className="h-full w-full" />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - positioned relative to carousel */}
        {hasRealImages && displayItems.length > 1 ? (
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
        ) : null}
      </div>

      {/* Radix UI Dialog for Image Expansion */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed left-[50%] top-[50%] z-50 flex h-[90vh] w-[90vw] max-w-6xl translate-x-[-50%] translate-y-[-50%] flex-col focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
            onKeyDown={handleKeyDown}
          >
            {/* Dialog Title - Hidden for accessibility */}
            <VisuallyHidden.Root asChild>
              <Dialog.Title>
                {hasRealImages && displayItems[currentImageIndex]
                  ? `Screenshot ${currentImageIndex + 1} de ${displayItems.length}`
                  : "Vista de imagen"}
              </Dialog.Title>
            </VisuallyHidden.Root>

            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Cerrar modal"
              >
                <X className="h-6 w-6" />
              </button>
            </Dialog.Close>

            {/* Modal Navigation */}
            {hasRealImages && displayItems.length > 1 && (
              <>
                <button
                  onClick={goToPreviousModal}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNextModal}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="flex h-full items-center justify-center p-8">
              <div className="relative h-full w-full">
                {hasRealImages &&
                  displayItems[currentImageIndex] &&
                  (useImageIds ? (
                    <Image
                      src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${displayItems[currentImageIndex]}.jpg`}
                      alt={`Screenshot ${currentImageIndex + 1} - Vista expandida`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      quality={95}
                      priority
                    />
                  ) : (
                    <Image
                      src={displayItems[currentImageIndex] as string}
                      alt={`Screenshot ${currentImageIndex + 1} - Vista expandida`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      quality={95}
                      priority
                    />
                  ))}
              </div>
            </div>

            {/* Image Counter */}
            {hasRealImages && displayItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                {currentImageIndex + 1} de {displayItems.length}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
