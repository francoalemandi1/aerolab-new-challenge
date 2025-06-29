import Link from "next/link";
import { Star, Calendar, Gamepad2 } from "lucide-react";
import { H1, H2, H3, GameDetailImage, GameStatChip } from "@/ui/atoms";
import { MediaCarousel, GameContentSection } from "@/ui/molecules";
import { GameFromIGDB } from "@/types/igdb";
import Image from "next/image";
import GameNotFound from "../not-found";
import { createSupabaseServerClient } from "@/lib/supabase";
import { GameCollectionButton } from "@/ui/organisms";

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

// Game Content Wrapper - resolves promise inside JSX
export default async function GameContentWrapper({
  gameDataPromise,
}: {
  gameDataPromise: Promise<GameFromIGDB | null>;
}) {
  try {
    const gameData = await gameDataPromise;

    if (!gameData) {
      return <GameNotFound />;
    }

    return (
      <>
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
              <H1 className="mb-2 text-violet-600 md:mb-4">{gameData.title}</H1>
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
            {gameData.rating && (
              <GameStatChip
                icon={Star}
                label="Rating"
                value={Math.round(gameData.rating).toString()}
              />
            )}
            {gameData.releaseDate && (
              <GameStatChip
                icon={Calendar}
                label="Release"
                value={gameData.releaseDate}
              />
            )}
            {gameData.genres && gameData.genres.length > 0 && (
              <GameStatChip
                icon={Gamepad2}
                label="Genre"
                value={gameData.genres[0]}
              />
            )}
          </div>
        </div>

        {/* Game Description */}
        {gameData.summary && (
          <GameContentSection title="Summary">
            {gameData.summary}
          </GameContentSection>
        )}

        {/* Storyline (if different from summary) */}
        {gameData.storyline && gameData.storyline !== gameData.summary && (
          <GameContentSection title="Storyline">
            {gameData.storyline}
          </GameContentSection>
        )}

        {/* Platforms */}
        {gameData.platforms && gameData.platforms.length > 0 && (
          <GameContentSection title="Platforms">
            {gameData.platforms.join(" • ")}
          </GameContentSection>
        )}

        {/* Screenshots */}
        {gameData.screenshotIds && gameData.screenshotIds.length > 0 && (
          <div className="mb-8">
            <H2 className="mb-2 text-h2-mobile text-gray-dark md:text-h2-desktop">
              Media
            </H2>
            <MediaCarousel imageIds={gameData.screenshotIds} />
          </div>
        )}

        {/* Similar Games */}
        {gameData.similarGames && gameData.similarGames.length > 0 && (
          <div className="mb-8">
            <H2 className="mb-2 text-h2-mobile text-violet-600 md:mb-4 md:text-h2-desktop">
              Similar games
            </H2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {gameData.similarGames.map(similarGame => (
                <Link
                  key={similarGame.id}
                  href={`/games/${similarGame.slug}`}
                  className="group block"
                >
                  <div className="relative mb-2 aspect-[3/4] overflow-hidden rounded-lg">
                    {similarGame.imageId ? (
                      <GameDetailImage
                        imageId={similarGame.imageId}
                        alt={similarGame.title}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <Image
                        src={similarGame.imageUrl || "/placeholder-game.jpg"}
                        alt={similarGame.title}
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
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading game data:", error);
    return <GameNotFound />;
  }
}
