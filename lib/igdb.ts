"use server";

import {
  IGDBGame,
  IGDBGamesResponse,
  GameFromIGDB,
  IGDBPlatform,
  IGDBScreenshot,
  SimilarGame,
} from "@/types/igdb";
import { getOptimalImageUrl } from "./image-utils";

// IGDB API Configuration
const IGDB_API_URL = "https://api.igdb.com/v4/games";
const IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID;
const IGDB_ACCESS_TOKEN = process.env.IGDB_ACCESS_TOKEN;

// Transform IGDB game data to our app format
function transformIGDBGame(igdbGame: IGDBGame): GameFromIGDB {
  // Extract image URL from cover - use card context as default
  let imageUrl = "";
  let imageId: string | undefined;
  if (igdbGame.cover) {
    if (typeof igdbGame.cover === "object" && "image_id" in igdbGame.cover) {
      imageId = igdbGame.cover.image_id;
      imageUrl = getOptimalImageUrl(imageId, "card");
    }
  }

  // Extract platforms
  let platforms: string[] = [];
  if (igdbGame.platforms && Array.isArray(igdbGame.platforms)) {
    platforms = igdbGame.platforms
      .filter(
        (platform): platform is IGDBPlatform =>
          typeof platform === "object" &&
          platform !== null &&
          "name" in platform
      )
      .map(platform => platform.name);
  }

  // Format release date
  let releaseDate: string | undefined;
  if (igdbGame.first_release_date) {
    releaseDate = new Date(
      igdbGame.first_release_date * 1000
    ).toLocaleDateString();
  }

  // Extract screenshots - use carousel context for best quality
  let screenshots: string[] = [];
  let screenshotIds: string[] = [];
  if (igdbGame.screenshots && Array.isArray(igdbGame.screenshots)) {
    const validScreenshots = igdbGame.screenshots.filter(
      (screenshot): screenshot is IGDBScreenshot =>
        typeof screenshot === "object" &&
        screenshot !== null &&
        "image_id" in screenshot
    );

    screenshotIds = validScreenshots.map(screenshot => screenshot.image_id);
    screenshots = validScreenshots.map(screenshot =>
      getOptimalImageUrl(screenshot.image_id, "carousel")
    );
  }

  return {
    id: igdbGame.id.toString(),
    title: igdbGame.name,
    slug: igdbGame.slug,
    imageUrl: imageUrl || "/placeholder-game.jpg", // Fallback image
    imageId,
    summary: igdbGame.summary,
    storyline: igdbGame.storyline,
    releaseDate,
    first_release_date: igdbGame.first_release_date, // Unix timestamp for filtering
    platforms,
    rating: igdbGame.total_rating,
    screenshots,
    screenshotIds,
    // similarGames will be added separately in getGameByIdSSR
  };
}

/**
 * Search games using IGDB API
 * @param query - Search term
 * @param limit - Number of results to return (default: 10)
 * @returns Promise with transformed games data
 */
export async function searchGames(
  query: string,
  limit: number = 10
): Promise<GameFromIGDB[]> {
  // Validate environment variables
  if (!IGDB_CLIENT_ID || !IGDB_ACCESS_TOKEN) {
    console.error("IGDB API credentials not configured");
    throw new Error("IGDB API credentials not configured");
  }

  // Validate query
  if (!query.trim()) {
    return [];
  }

  try {
    // Build the search body for IGDB API
    const searchBody = `
      search "${query}";
      fields name, slug, summary, cover.image_id, platforms.name, first_release_date, total_rating;
      where category = 0;
      limit ${limit};
    `.trim();

    // Make the API call
    const response = await fetch(IGDB_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${IGDB_ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: searchBody,
    });

    if (!response.ok) {
      console.error("IGDB API error:", response.status, response.statusText);
      throw new Error(`IGDB API error: ${response.status}`);
    }

    const igdbGames: IGDBGamesResponse = await response.json();

    // Transform the data to our app format
    const transformedGames = igdbGames.map(transformIGDBGame);

    return transformedGames;
  } catch (error) {
    console.error("Error searching games:", error);
    throw new Error("Failed to search games");
  }
}

/**
 * Get popular games from IGDB
 * @param limit - Number of results to return (default: 20)
 * @returns Promise with popular games data
 */
export async function getPopularGames(
  limit: number = 20
): Promise<GameFromIGDB[]> {
  // Validate environment variables
  if (!IGDB_CLIENT_ID || !IGDB_ACCESS_TOKEN) {
    console.error("IGDB API credentials not configured");
    throw new Error("IGDB API credentials not configured");
  }

  try {
    // Build the query body for popular games
    const queryBody = `
      fields name, slug, summary, cover.image_id, platforms.name, first_release_date, total_rating;
      where category = 0 & total_rating_count > 10;
      sort total_rating desc;
      limit ${limit};
    `.trim();

    // Make the API call
    const response = await fetch(IGDB_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${IGDB_ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: queryBody,
    });

    if (!response.ok) {
      console.error("IGDB API error:", response.status, response.statusText);
      throw new Error(`IGDB API error: ${response.status}`);
    }

    const igdbGames: IGDBGamesResponse = await response.json();

    // Transform the data to our app format
    const transformedGames = igdbGames.map(transformIGDBGame);

    return transformedGames;
  } catch (error) {
    console.error("Error fetching popular games:", error);
    throw new Error("Failed to fetch popular games");
  }
}

/**
 * Get game details by ID (optimized for server-side rendering)
 * @param gameId - IGDB game ID
 * @returns Promise with game details
 */
export async function getGameByIdSSR(
  gameId: string
): Promise<GameFromIGDB | null> {
  // Validate environment variables
  if (!IGDB_CLIENT_ID || !IGDB_ACCESS_TOKEN) {
    console.error("IGDB API credentials not configured");
    throw new Error("IGDB API credentials not configured");
  }

  try {
    // Build the query body for specific game
    const queryBody = `
      fields name, slug, summary, cover.image_id, platforms.name, first_release_date, total_rating, storyline, screenshots.image_id, similar_games;
      where id = ${gameId};
    `.trim();

    // Make the API call
    const response = await fetch(IGDB_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${IGDB_ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: queryBody,
    });

    if (!response.ok) {
      console.error("IGDB API error:", response.status, response.statusText);
      throw new Error(`IGDB API error: ${response.status}`);
    }

    const igdbGames: IGDBGamesResponse = await response.json();

    if (igdbGames.length === 0) {
      return null;
    }

    const game = igdbGames[0];

    // Transform the basic game data
    const transformedGame = transformIGDBGame(game);

    // Fetch similar games details if available
    let similarGames: SimilarGame[] = [];
    if (
      game.similar_games &&
      Array.isArray(game.similar_games) &&
      game.similar_games.length > 0
    ) {
      // similar_games contains IDs as numbers
      const similarGameIds = game.similar_games.filter(
        id => typeof id === "number"
      ) as number[];
      similarGames = await getSimilarGamesDetails(similarGameIds);
    }

    // Return the complete game data with similar games
    return {
      ...transformedGame,
      similarGames,
    };
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw new Error("Failed to fetch game details");
  }
}

/**
 * Get game details by ID (for client-side usage with React Query)
 * @param gameId - IGDB game ID
 * @returns Promise with game details
 */
export async function getGameById(
  gameId: string
): Promise<GameFromIGDB | null> {
  return getGameByIdSSR(gameId);
}

/**
 * Get similar games details by IDs
 * @param gameIds - Array of IGDB game IDs
 * @returns Promise with similar games data
 */
async function getSimilarGamesDetails(
  gameIds: number[]
): Promise<SimilarGame[]> {
  if (!IGDB_CLIENT_ID || !IGDB_ACCESS_TOKEN || gameIds.length === 0) {
    return [];
  }

  try {
    // Build the query body for similar games
    const queryBody = `
      fields name, slug, cover.image_id;
      where id = (${gameIds.slice(0, 4).join(",")});
      limit 4;
    `.trim();

    // Make the API call
    const response = await fetch(IGDB_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${IGDB_ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: queryBody,
    });

    if (!response.ok) {
      console.error(
        "IGDB API error for similar games:",
        response.status,
        response.statusText
      );
      return [];
    }

    const similarGamesData: IGDBGamesResponse = await response.json();

    // Transform the data to our SimilarGame format
    return similarGamesData.map(game => {
      let imageUrl = "";
      let imageId: string | undefined;

      if (
        game.cover &&
        typeof game.cover === "object" &&
        "image_id" in game.cover
      ) {
        imageId = game.cover.image_id;
        imageUrl = getOptimalImageUrl(imageId, "card");
      }

      return {
        id: game.id.toString(),
        title: game.name,
        slug: game.slug,
        imageUrl: imageUrl || "/placeholder-game.jpg",
        imageId,
      };
    });
  } catch (error) {
    console.error("Error fetching similar games:", error);
    return [];
  }
}

/**
 * Get game details by slug (IGDB official slug)
 * @param gameSlug - IGDB game slug
 * @returns Promise with game details
 */
export async function getGameBySlugSSR(
  gameSlug: string
): Promise<GameFromIGDB | null> {
  // Validate environment variables
  if (!IGDB_CLIENT_ID || !IGDB_ACCESS_TOKEN) {
    console.error("IGDB API credentials not configured");
    throw new Error("IGDB API credentials not configured");
  }

  try {
    // Build the query body for specific game by slug
    const queryBody = `
      fields name, slug, summary, cover.image_id, platforms.name, first_release_date, total_rating, storyline, screenshots.image_id, similar_games;
      where slug = "${gameSlug}";
    `.trim();

    // Make the API call
    const response = await fetch(IGDB_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${IGDB_ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: queryBody,
    });

    if (!response.ok) {
      console.error("IGDB API error:", response.status, response.statusText);
      throw new Error(`IGDB API error: ${response.status}`);
    }

    const igdbGames: IGDBGamesResponse = await response.json();

    if (igdbGames.length === 0) {
      return null;
    }

    const game = igdbGames[0];

    // Transform the basic game data
    const transformedGame = transformIGDBGame(game);

    // Fetch similar games details if available
    let similarGames: SimilarGame[] = [];
    if (
      game.similar_games &&
      Array.isArray(game.similar_games) &&
      game.similar_games.length > 0
    ) {
      // similar_games contains IDs as numbers
      const similarGameIds = game.similar_games.filter(
        id => typeof id === "number"
      ) as number[];
      similarGames = await getSimilarGamesDetails(similarGameIds);
    }

    // Return the complete game data with similar games
    return {
      ...transformedGame,
      similarGames,
    };
  } catch (error) {
    console.error("Error fetching game details by slug:", error);
    throw new Error("Failed to fetch game details by slug");
  }
}
