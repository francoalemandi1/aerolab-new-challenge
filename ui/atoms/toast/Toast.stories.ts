import { GameCollectionToast } from "./toast";

export default {
  title: "Atoms/Toast",
  component: GameCollectionToast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const GameAdded = {
  args: {
    title: "Game collected",
    description: "Cyberpunk 2077 has been added to your collection",
    action: "added",
  },
};

export const GameRemoved = {
  args: {
    title: "Game removed",
    description: "Cyberpunk 2077 has been removed from your collection",
    action: "removed",
  },
};

export const LongTitle = {
  args: {
    title: "Game successfully collected",
    description:
      "The Witcher 3: Wild Hunt - Complete Edition has been added to your gaming collection",
    action: "added",
  },
};
