import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://gaming-haven.vercel.app";
  const currentDate = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    // Landing page - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Authentication pages - high priority for user acquisition
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Support pages - medium priority
    {
      url: `${baseUrl}/auth/password-recovery`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/reset-password`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Games Dashboard - high priority but protected
    {
      url: `${baseUrl}/games`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // TODO: In the future, we could add dynamic routes for popular games
  // This would require fetching popular games from IGDB API
  // Example:
  // const popularGames = await getPopularGames()
  // const gameRoutes = popularGames.map(game => ({
  //   url: `${baseUrl}/games/${game.slug}`,
  //   lastModified: new Date(game.updated_at),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }))

  return staticRoutes;
}
