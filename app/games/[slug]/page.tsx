import Link from "next/link";
import { ArrowLeft, Star, Calendar, Gamepad2 } from "lucide-react";
import { Metadata } from "next";
import {
  H1,
  H2,
  H3,
  GameDetailImage,
  GameStatChip,
  WasdKeycaps,
} from "@/ui/atoms";
import { MediaCarousel, GameContentSection } from "@/ui/molecules";
import { GameSearch } from "@/ui/molecules";
import { GameCollectionButton } from "@/ui/organisms";
import { getGameBySlugSSR } from "@/lib/igdb";
import { createSupabaseServerClient } from "@/lib/supabase";
import { GameFromIGDB } from "@/types/igdb";
import Image from "next/image";
import GameNotFound from "./not-found";

interface GameDetailPageProps {
  params: Promise<{ slug: string }>;
}

// AuthenticatedControls component - only renders for authenticated users
async function AuthenticatedControls() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Back Button and Search - Desktop: same row */}
      <div className="mb-8 md:mb-12 md:flex md:items-start md:gap-8">
        <Link
          href="/games"
          className="mb-6 inline-flex items-center gap-2 text-violet-600 transition-colors hover:text-violet-700 md:mb-0 md:flex-shrink-0 md:pt-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <H2 className="text-violet-600">Back</H2>
        </Link>

        <div className="md:max-w-2xl md:flex-1">
          <GameSearch />
        </div>
      </div>
    </>
  );
}

// Collection Button component - only renders for authenticated users
async function CollectionButton({ gameData }: { gameData: GameFromIGDB }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return <GameCollectionButton gameData={gameData} />;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const gameData = await getGameBySlugSSR(slug);

    if (!gameData) {
      return {
        title: "Game Not Found - Gaming Haven",
        description: "The requested game could not be found.",
      };
    }

    const gameDescription =
      gameData.summary ||
      `Explore ${gameData.title} and add it to your gaming collection. ${gameData.genres?.[0] ? `Genre: ${gameData.genres[0]}.` : ""} ${gameData.releaseDate ? `Released: ${gameData.releaseDate}.` : ""}`.trim();

    return {
      title: `${gameData.title} - Gaming Haven`,
      description: gameDescription,
      keywords: [
        gameData.title,
        ...(gameData.genres || []),
        "Gaming",
        "Game Collection",
        "IGDB",
      ],
      openGraph: {
        title: `${gameData.title} | Gaming Haven`,
        description: gameDescription,
        images: gameData.imageUrl
          ? [
              {
                url: gameData.imageUrl,
                width: 1200,
                height: 630,
                alt: `${gameData.title} - Game Cover`,
                type: "image/jpeg",
              },
            ]
          : [
              {
                url: "/game-logo.svg",
                width: 512,
                height: 512,
                alt: "Gaming Haven - Game Details",
                type: "image/svg+xml",
              },
            ],
        type: "website",
        siteName: "Gaming Haven",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: `${gameData.title} | Gaming Haven`,
        description: gameDescription,
        images: gameData.imageUrl
          ? [
              {
                url: gameData.imageUrl,
                alt: `${gameData.title} - Game Cover`,
              },
            ]
          : [
              {
                url: "/game-logo.svg",
                alt: "Gaming Haven - Game Details",
              },
            ],
        creator: "@gaminghaven",
        site: "@gaminghaven",
      },
    };
  } catch {
    return {
      title: "Game Details - Gaming Haven",
      description: "Explore game details and add to your collection.",
    };
  }
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;

  // Server-side data fetching using IGDB slug
  const gameData = await getGameBySlugSSR(slug);

  if (!gameData) {
    return <GameNotFound />;
  }

  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Pattern - Mobile: mobile-background.svg, Desktop: desktop-background.svg */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage:
              "url('/mobile-background.svg'), url('/mobile-background.svg')",
            backgroundSize: "100vw auto, 100vw auto",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top left, top 100vw",
          }}
        />

        {/* Desktop Background */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/desktop-background.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      {/* Animated WASD Keys - For mobile and desktop */}
      <WasdKeycaps className="right-0 top-0 z-50" />

      {/* Content with overlay */}
      <div className="relative z-10 px-6 py-8 md:px-12 md:pb-12 md:pt-32">
        <div className="mx-auto max-w-4xl">
          {/* Authenticated Controls: Back Button and Search */}
          <AuthenticatedControls />

          {/* Game Header */}
          <div className="mb-8 mt-8 flex flex-col gap-6 md:mt-16">
            {/* Game Cover and Basic Info */}
            <div className="flex gap-6 md:gap-8">
              <div className="relative h-36 w-24 flex-shrink-0 overflow-hidden rounded-lg md:h-48 md:w-32">
                <GameDetailImage
                  imageId={gameData.imageId || ""}
                  alt={gameData.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                  priority
                  retina={true}
                />
              </div>
              <div className="flex-1">
                <H1 className="mb-2 text-violet-600 md:mb-4">
                  {gameData.title}
                </H1>
                <H3 className="mb-4 text-typography-h3 md:mb-6">
                  {gameData.genres?.[0] || "Unknown Genre"}
                </H3>

                {/* Collect Button - Desktop: below subtitle - Only for authenticated users */}
                <div className="hidden md:block md:w-fit">
                  <CollectionButton gameData={gameData} />
                </div>
              </div>
            </div>

            {/* Collect Button - Mobile: separate section - Only for authenticated users */}
            <div className="md:hidden">
              <CollectionButton gameData={gameData} />
            </div>

            {/* Game Stats */}
            <div className="flex flex-wrap gap-3">
              {gameData.rating ? (
                <GameStatChip
                  icon={Star}
                  label="Rating"
                  value={Math.round(gameData.rating).toString()}
                />
              ) : null}
              {gameData.releaseDate ? (
                <GameStatChip
                  icon={Calendar}
                  label="Release"
                  value={gameData.releaseDate}
                />
              ) : null}
              {gameData.genres && gameData.genres.length > 0 ? (
                <GameStatChip
                  icon={Gamepad2}
                  label="Genre"
                  value={gameData.genres[0]}
                />
              ) : null}
            </div>
          </div>

          {/* Game Description */}
          {gameData.summary ? (
            <GameContentSection title="Summary">
              {gameData.summary}
            </GameContentSection>
          ) : null}

          {/* Storyline (if different from summary) */}
          {gameData.storyline && gameData.storyline !== gameData.summary ? (
            <GameContentSection title="Storyline">
              {gameData.storyline}
            </GameContentSection>
          ) : null}

          {/* Platforms */}
          {gameData.platforms && gameData.platforms.length > 0 ? (
            <GameContentSection title="Platforms">
              {gameData.platforms.join(" • ")}
            </GameContentSection>
          ) : null}

          {/* Screenshots */}
          {gameData.screenshotIds && gameData.screenshotIds.length > 0 ? (
            <div className="mb-8">
              <H2 className="mb-2 text-h2-mobile text-gray-dark md:text-h2-desktop">
                Media
              </H2>
              <MediaCarousel imageIds={gameData.screenshotIds} />
            </div>
          ) : null}

          {/* Similar Games */}
          {gameData.similarGames && gameData.similarGames.length > 0 ? (
            <div className="mb-8">
              <H2 className="mb-2 text-h2-mobile text-violet-600 md:mb-4 md:text-h2-desktop">
                Similar games
              </H2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {gameData.similarGames.map(game => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="group block"
                  >
                    <div className="relative mb-2 aspect-[3/4] overflow-hidden rounded-lg">
                      {game.imageId ? (
                        <GameDetailImage
                          imageId={game.imageId}
                          alt={game.title}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <Image
                          src={game.imageUrl}
                          alt={game.title}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
