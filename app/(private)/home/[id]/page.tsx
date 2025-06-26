import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Gamepad2 } from "lucide-react";
import { Metadata } from "next";
import { H1, H2, H3, GameDetailImage } from "@/ui/atoms";
import { MediaCarousel } from "@/ui/molecules/media-carousel";
import { GameSearch } from "@/ui/molecules";
import { GameCollectionButton } from "@/ui/organisms";
import { getGameByIdSSR } from "@/lib/igdb";
import Image from "next/image";

interface GameDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const gameData = await getGameByIdSSR(id);

    if (!gameData) {
      return {
        title: "Game Not Found - Gaming Haven",
        description: "The requested game could not be found.",
      };
    }

    return {
      title: `${gameData.title} - Gaming Haven`,
      description:
        gameData.summary ||
        `Explore ${gameData.title} and add it to your gaming collection.`,
      openGraph: {
        title: gameData.title,
        description:
          gameData.summary ||
          `Explore ${gameData.title} and add it to your gaming collection.`,
        images: gameData.imageUrl ? [gameData.imageUrl] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: gameData.title,
        description:
          gameData.summary ||
          `Explore ${gameData.title} and add it to your gaming collection.`,
        images: gameData.imageUrl ? [gameData.imageUrl] : [],
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
  const { id } = await params;

  if (!id) {
    notFound();
  }

  // Server-side data fetching
  const gameData = await getGameByIdSSR(id);

  if (!gameData) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Back Button */}
      <Link
        href="/home"
        className="mb-8 inline-flex items-center gap-2 text-violet-600 transition-colors hover:text-violet-700"
      >
        <ArrowLeft className="h-5 w-5" />
        <H2 className="text-violet-600">Back</H2>
      </Link>

      <GameSearch />

      {/* Game Header */}
      <div className="mb-8 flex flex-col gap-6">
        {/* Game Cover and Basic Info */}
        <div className="flex gap-6">
          <div className="relative h-36 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <GameDetailImage
              imageId={gameData.imageId || ""}
              alt={gameData.title}
              fill
              className="object-cover"
              sizes="96px"
              priority
              retina={true}
            />
          </div>
          <div className="flex-1">
            <H1 className="mb-2 text-violet-600">{gameData.title}</H1>
            <H3 className="mb-4" style={{ color: "#775C90" }}>
              {gameData.genres?.[0] || "Unknown Genre"}
            </H3>
          </div>
        </div>

        {/* Collect Button - Client Component */}
        <GameCollectionButton gameData={gameData} />

        {/* Game Stats */}
        <div className="flex flex-wrap gap-3">
          {gameData.rating && (
            <div
              className="flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: "#E2DCE7" }}
            >
              <Star className="h-4 w-4 text-violet-600" />
              <span
                className="font-inter text-sm"
                style={{ fontSize: "14px", color: "#6B46C1" }}
              >
                Rating:{" "}
              </span>
              <span className="font-inter text-sm" style={{ fontSize: "14px" }}>
                {Math.round(gameData.rating)}
              </span>
            </div>
          )}
          {gameData.releaseDate && (
            <div
              className="flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: "#E2DCE7" }}
            >
              <Calendar className="h-4 w-4 text-violet-600" />
              <span
                className="font-inter text-sm"
                style={{ fontSize: "14px", color: "#6B46C1" }}
              >
                Release:{" "}
              </span>
              <span className="font-inter text-sm" style={{ fontSize: "14px" }}>
                {gameData.releaseDate}
              </span>
            </div>
          )}
          {gameData.genres && gameData.genres.length > 0 && (
            <div
              className="flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: "#E2DCE7" }}
            >
              <Gamepad2 className="h-4 w-4 text-violet-600" />
              <span
                className="font-inter text-sm"
                style={{ fontSize: "14px", color: "#6B46C1" }}
              >
                Genre:{" "}
              </span>
              <span className="font-inter text-sm" style={{ fontSize: "14px" }}>
                {gameData.genres[0]}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Game Description */}
      {gameData.summary && (
        <div className="mb-8">
          <H2 className="mb-2 text-h2-mobile text-black">Summary</H2>
          <p className="text-sm leading-relaxed text-gray-700">
            {gameData.summary}
          </p>
        </div>
      )}

      {/* Storyline (if different from summary) */}
      {gameData.storyline && gameData.storyline !== gameData.summary && (
        <div className="mb-8">
          <H2 className="mb-2 text-h2-mobile text-black">Storyline</H2>
          <p className="text-sm leading-relaxed text-gray-700">
            {gameData.storyline}
          </p>
        </div>
      )}

      {/* Platforms */}
      {gameData.platforms && gameData.platforms.length > 0 && (
        <div className="mb-8">
          <H2 className="mb-2 text-h2-mobile text-black">Platforms</H2>
          <p className="text-sm leading-relaxed text-gray-700">
            {gameData.platforms.join(" • ")}
          </p>
        </div>
      )}

      {/* Screenshots */}
      {gameData.screenshotIds && gameData.screenshotIds.length > 0 && (
        <div className="mb-8">
          <H2 className="mb-2 text-h2-mobile text-black">Media</H2>
          <MediaCarousel imageIds={gameData.screenshotIds} />
        </div>
      )}

      {/* Similar Games */}
      {gameData.similarGames && gameData.similarGames.length > 0 && (
        <div className="mb-8">
          <H2 style={{ color: "#6727A6" }} className="mb-2 text-h2-mobile">
            Similar games
          </H2>
          <div className="grid grid-cols-2 gap-4">
            {gameData.similarGames.map(game => (
              <Link
                key={game.id}
                href={`/home/${game.id}`}
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
                <H3 className="text-sm font-medium text-gray-800 transition-colors group-hover:text-violet-600">
                  {game.title}
                </H3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
