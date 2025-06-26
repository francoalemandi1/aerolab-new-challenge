import { SavedGamesSection } from "./saved-games-section";

export default {
  title: "Organisms/SavedGamesSection",
  component: SavedGamesSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {},
};

export const WithCustomClass = {
  args: {
    className: "max-w-4xl",
  },
};
