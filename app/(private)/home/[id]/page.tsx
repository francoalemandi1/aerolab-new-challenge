import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Gamepad2 } from "lucide-react";
import { H1, H2, H3, Button } from "@/ui/atoms";
import { MediaCarousel } from "@/ui/molecules/media-carousel";

// Mock data - later will be replaced with API call
const mockGameData = {
  id: "1",
  title: "Grand Theft Auto V",
  developer: "Rockstar Games",
  rating: 8.9,
  releaseDate: "9/16/2013",
  genre: "Card & Board Game",
  description:
    "Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game's three lead characters, playing all sides of the game's interwoven story.",
  platforms: [
    "PC (Microsoft Windows)",
    "PlayStation 3",
    "PlayStation 4",
    "Xbox 360",
    "Xbox One",
  ],
  coverImage:
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
  screenshots: [
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop",
  ],
  similarGames: [
    {
      id: "2",
      title: "Grand Theft Auto III",
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=150&h=200&fit=crop",
    },
    {
      id: "3",
      title: "Grand Theft Auto San Andreas",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=200&fit=crop",
    },
    {
      id: "4",
      title: "Grand Theft Auto IV",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=150&h=200&fit=crop",
    },
    {
      id: "5",
      title: "Grand Theft Auto Vice City",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=200&fit=crop",
    },
    {
      id: "6",
      title: "Grand Theft Auto XIV",
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=150&h=200&fit=crop",
    },
    {
      id: "7",
      title: "Watch Dogs 2",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=200&fit=crop",
    },
  ],
};

interface GameDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;

  // In a real app, this would be an API call
  // const gameData = await fetchGameById(id);

  if (!id) {
    notFound();
  }

  const gameData = mockGameData; // Mock data for now

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

      {/* Game Header */}
      <div className="mb-8 flex flex-col gap-6">
        {/* Game Cover and Basic Info */}
        <div className="flex gap-6">
          <div className="relative h-36 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={gameData.coverImage}
              alt={gameData.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1">
            <H1 className="mb-2 text-violet-600">{gameData.title}</H1>
            <H3 className="mb-4" style={{ color: "#775C90" }}>
              {gameData.developer}
            </H3>
          </div>
        </div>

        {/* Collect Button */}
        <Button className="w-full bg-violet-600 py-4 text-base font-medium text-white hover:bg-violet-700">
          Collect game
        </Button>

        {/* Game Stats */}
        <div className="flex flex-wrap gap-3">
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
              {gameData.rating}
            </span>
          </div>
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
              {gameData.genre}
            </span>
          </div>
        </div>
      </div>

      {/* Game Description */}
      <div className="mb-8">
        <H2 className="mb-2 text-h2-mobile text-black">Summary</H2>
        <p className="text-sm leading-relaxed text-gray-700">
          {gameData.description}
        </p>
      </div>

      {/* Platforms */}
      <div className="mb-8">
        <H2 className="mb-2 text-h2-mobile text-black">Platforms</H2>
        <p className="text-sm leading-relaxed text-gray-700">
          {gameData.platforms.join("  ")}
        </p>
      </div>

      {/* Media Gallery */}
      <div className="mb-8">
        <H2 className="mb-2 text-h2-mobile text-black">Media</H2>
        <MediaCarousel images={gameData.screenshots} />
      </div>

      {/* Similar Games */}
      <div>
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
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
