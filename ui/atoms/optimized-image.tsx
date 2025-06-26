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
  ...props
}: OptimizedImageProps) {
  const src = imageId ? getOptimalImageUrl(imageId, context, retina) : fallback;

  return (
    <Image
      src={src}
      alt={alt}
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
