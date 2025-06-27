"use client";
import Image, { ImageProps } from "next/image";
import { getOptimalImageUrl } from "@/lib/image-utils";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  imageId: string;
  context: "card" | "detail" | "thumbnail" | "hero" | "screenshot" | "carousel";
  retina?: boolean;
  fallback?: string;
}

export function OptimizedImage({
  imageId,
  context,
  retina = false,
  fallback = "/placeholder-game.jpg",
  alt,
  sizes,
  ...props
}: OptimizedImageProps) {
  const src = imageId ? getOptimalImageUrl(imageId, context, retina) : fallback;

  // Dynamic sizes based on context if not provided
  const contextSizes = sizes || getContextSizes(context);

  return (
    <Image
      src={src}
      alt={alt}
      sizes={contextSizes}
      onError={e => {
        const target = e.target as HTMLImageElement;
        if (target.src !== fallback) {
          target.src = fallback;
        }
      }}
      {...props}
    />
  );
}

// Helper function to get optimal sizes for each context
function getContextSizes(context: OptimizedImageProps["context"]): string {
  switch (context) {
    case "card":
      return "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw";
    case "detail":
      return "(max-width: 768px) 96px, 128px";
    case "thumbnail":
      return "(max-width: 768px) 64px, 80px";
    case "hero":
      return "(max-width: 768px) 100vw, 50vw";
    case "screenshot":
      return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
    case "carousel":
      return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
    default:
      return "(max-width: 768px) 50vw, 25vw";
  }
}

// Specialized components for common use cases
export function GameCardImage({
  imageId,
  alt,
  ...props
}: Omit<OptimizedImageProps, "context">) {
  return (
    <OptimizedImage imageId={imageId} context="card" alt={alt} {...props} />
  );
}

export function GameDetailImage({
  imageId,
  alt,
  ...props
}: Omit<OptimizedImageProps, "context">) {
  return (
    <OptimizedImage imageId={imageId} context="detail" alt={alt} {...props} />
  );
}

export function GameThumbnailImage({
  imageId,
  alt,
  ...props
}: Omit<OptimizedImageProps, "context">) {
  return (
    <OptimizedImage
      imageId={imageId}
      context="thumbnail"
      alt={alt}
      {...props}
    />
  );
}

export function GameScreenshotImage({
  imageId,
  alt,
  ...props
}: Omit<OptimizedImageProps, "context">) {
  return (
    <OptimizedImage
      imageId={imageId}
      context="screenshot"
      alt={alt}
      {...props}
    />
  );
}

export function GameCarouselImage({
  imageId,
  alt,
  ...props
}: Omit<OptimizedImageProps, "context">) {
  return (
    <OptimizedImage imageId={imageId} context="carousel" alt={alt} {...props} />
  );
}
