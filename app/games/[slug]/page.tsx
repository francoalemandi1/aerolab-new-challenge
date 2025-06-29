import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { H2, WasdKeycaps, LoadingSpinner } from "@/ui/atoms";
import { GameSearch } from "@/ui/molecules";
import { getGameBySlugSSR } from "@/lib/igdb";
import { getAuthenticatedUser } from "@/lib/supabase";
import GameNotFound from "./not-found";
import { Suspense } from "react";
import GameContentWrapper from "./_components/GameContentWrapper";

interface GameDetailPageProps {
  params: Promise<{ slug: string }>;
}

// AuthenticatedControls component - only renders for authenticated users
async function AuthenticatedControls() {
  await getAuthenticatedUser(); // Ensures user is authenticated

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
  const gameData = getGameBySlugSSR(slug);

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

          {/* Game Content - Resolve promise inside JSX */}
          <Suspense fallback={<LoadingSpinner />}>
            <GameContentWrapper gameDataPromise={gameData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
