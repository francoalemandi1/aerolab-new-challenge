// IGDB API Response Types
// Based on IGDB API v4 documentation

export interface IGDBImage {
  id: number;
  alpha_channel?: boolean;
  animated?: boolean;
  checksum: string;
  game?: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
}

export interface IGDBCover {
  id: number;
  alpha_channel?: boolean;
  animated?: boolean;
  checksum: string;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
}

export interface IGDBGenre {
  id: number;
  checksum: string;
  created_at: number;
  name: string;
  slug: string;
  updated_at: number;
  url: string;
}

export interface IGDBPlatform {
  id: number;
  abbreviation?: string;
  alternative_name?: string;
  checksum: string;
  created_at: number;
  name: string;
  platform_logo?: number;
  slug: string;
  updated_at: number;
  url: string;
  versions?: number[];
}

export interface IGDBReleaseDate {
  id: number;
  category: number; // 0 = YYYYMMDDHHMMSS, 1 = YYYYMM, 2 = YYYY, 3 = YYYYQ1, 4 = YYYYQ2, 5 = YYYYQ3, 6 = YYYYQ4, 7 = TBD
  checksum: string;
  created_at: number;
  date?: number; // Unix timestamp
  game: number;
  human: string;
  m?: number; // Month (1-12)
  platform?: number;
  region?: number; // 1 = Europe, 2 = North America, 3 = Australia, 4 = New Zealand, 5 = Japan, 6 = China, 7 = Asia, 8 = Worldwide
  updated_at: number;
  y?: number; // Year
}

export interface IGDBCompany {
  id: number;
  checksum: string;
  country?: number;
  created_at: number;
  description?: string;
  developed?: number[];
  logo?: number;
  name: string;
  parent?: number;
  published?: number[];
  slug: string;
  start_date?: number;
  start_date_category?: number;
  updated_at: number;
  url: string;
  websites?: number[];
}

export interface IGDBInvolvedCompany {
  id: number;
  checksum: string;
  company: number | IGDBCompany;
  created_at: number;
  developer: boolean;
  porting: boolean;
  publisher: boolean;
  supporting: boolean;
  updated_at: number;
}

export interface IGDBScreenshot {
  id: number;
  alpha_channel?: boolean;
  animated?: boolean;
  checksum: string;
  game?: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
}

export interface IGDBVideo {
  id: number;
  checksum: string;
  game?: number;
  name?: string;
  video_id: string;
}

// Main Game interface
export interface IGDBGame {
  id: number;
  age_ratings?: number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  alternative_names?: number[];
  artworks?: number[];
  bundles?: number[];
  category?: number; // 0 = main_game, 1 = dlc_addon, 2 = expansion, 3 = bundle, 4 = standalone_expansion, 5 = mod, 6 = episode, 7 = season, 8 = remake, 9 = remaster, 10 = expanded_game, 11 = port, 12 = fork, 13 = pack, 14 = update
  checksum: string;
  collection?: number;
  cover?: number | IGDBCover;
  created_at: number;
  dlcs?: number[];
  expanded_games?: number[];
  expansions?: number[];
  external_games?: number[];
  first_release_date?: number; // Unix timestamp
  follows?: number;
  forks?: number[];
  franchise?: number;
  franchises?: number[];
  game_engines?: number[];
  game_localizations?: number[];
  game_modes?: number[];
  genres?: number[] | IGDBGenre[];
  hypes?: number;
  involved_companies?: number[] | IGDBInvolvedCompany[];
  keywords?: number[];
  language_supports?: number[];
  multiplayer_modes?: number[];
  name: string;
  parent_game?: number;
  platforms?: number[] | IGDBPlatform[];
  player_perspectives?: number[];
  ports?: number[];
  rating?: number;
  rating_count?: number;
  release_dates?: number[] | IGDBReleaseDate[];
  remakes?: number[];
  remasters?: number[];
  screenshots?: number[] | IGDBScreenshot[];
  similar_games?: number[];
  slug: string;
  standalone_expansions?: number[];
  status?: number; // 0 = released, 2 = alpha, 3 = beta, 4 = early_access, 5 = offline, 6 = cancelled, 7 = rumored, 8 = delisted
  storyline?: string;
  summary?: string;
  tags?: number[];
  themes?: number[];
  total_rating?: number;
  total_rating_count?: number;
  updated_at: number;
  url: string;
  version_parent?: number;
  version_title?: string;
  videos?: number[] | IGDBVideo[];
  websites?: number[];
}

// Response wrapper for IGDB API
export interface IGDBResponse<T> {
  results?: T[];
  data?: T[];
  // IGDB returns directly an array, so this is for consistency with other APIs
}

// Simplified Game interface for our app
export interface GameFromIGDB {
  id: string;
  title: string;
  imageUrl: string;
  imageId?: string; // Original IGDB image ID for dynamic sizing
  summary?: string;
  storyline?: string;
  releaseDate?: string;
  genres?: string[];
  platforms?: string[];
  rating?: number;
  screenshots?: string[];
  screenshotIds?: string[]; // Original IGDB screenshot IDs for dynamic sizing
}

// Search response type
export type IGDBGamesResponse = IGDBGame[];
