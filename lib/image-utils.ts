// IGDB Image size types based on official documentation
export type IGDBImageSize =
  | "cover_small" // 90 x 128 - Fit
  | "screenshot_med" // 569 x 320 - Lfill, Center gravity
  | "cover_big" // 264 x 374 - Fit
  | "logo_med" // 284 x 160 - Fit
  | "screenshot_big" // 889 x 500 - Lfill, Center gravity
  | "screenshot_huge" // 1280 x 720 - Lfill, Center gravity
  | "thumb" // 90 x 90 - Thumb, Center gravity
  | "micro" // 35 x 35 - Thumb, Center gravity
  | "720p" // 1280 x 720 - Fit, Center gravity
  | "1080p"; // 1920 x 1080 - Fit, Center gravity

// Helper function to build IGDB image URL with retina support
export function buildImageUrl(
  imageId: string,
  size: IGDBImageSize = "cover_small",
  retina: boolean = false
): string {
  const sizeWithRetina = retina ? `${size}_2x` : size;
  return `https://images.igdb.com/igdb/image/upload/t_${sizeWithRetina}/${imageId}.jpg`;
}

// Context-aware image URL builder
export function getOptimalImageUrl(
  imageId: string,
  context: "card" | "detail" | "thumbnail" | "hero" | "screenshot" | "carousel",
  retina: boolean = false
): string {
  const sizeMap: Record<typeof context, IGDBImageSize> = {
    card: "cover_big", // Game cards in grid - using bigger size for better quality
    detail: "cover_big", // Detail page main image
    thumbnail: "thumb", // Small thumbnails
    hero: "720p", // Hero/banner images
    screenshot: "screenshot_big", // Individual screenshots
    carousel: "screenshot_huge", // Carousel/gallery screenshots
  };

  return buildImageUrl(imageId, sizeMap[context], retina);
}
