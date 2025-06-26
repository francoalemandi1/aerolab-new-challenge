import { GameCollectionButton } from "./game-collection-button";

const mockGameData = {
  id: "1",
  title: "Cyberpunk 2077",
  slug: "cyberpunk-2077",
  imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
  imageId: "co2lbd",
  genres: ["Action", "RPG"],
  summary:
    "Cyberpunk 2077 is an open-world, action-adventure story set in Night City.",
};

export default {
  title: "Organisms/GameCollectionButton",
  component: GameCollectionButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const CollectState = {
  args: {
    gameData: mockGameData,
  },
};

export const WithDifferentGame = {
  args: {
    gameData: {
      ...mockGameData,
      id: "2",
      title: "The Witcher 3: Wild Hunt",
      slug: "the-witcher-3-wild-hunt",
    },
  },
};
