import React from "react";
import {
  GameCardImage,
  GameDetailImage,
  GameThumbnailImage,
} from "./optimized-image";

export default {
  title: "Atoms/OptimizedImage",
  component: GameCardImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const GameCard = {
  args: {
    imageId: "co2lbd",
    alt: "Cyberpunk 2077",
    fill: true,
    sizes: "256px",
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: "256px", height: "342px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const GameDetail = {
  render: (args: {
    imageId: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
  }) => (
    <div style={{ width: "512px", height: "683px", position: "relative" }}>
      <GameDetailImage {...args} />
    </div>
  ),
  args: {
    imageId: "co2lbd",
    alt: "Cyberpunk 2077 - Detail View",
    fill: true,
    sizes: "512px",
    priority: true,
  },
};

export const GameThumbnail = {
  render: (args: {
    imageId: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
  }) => (
    <div style={{ width: "64px", height: "85px", position: "relative" }}>
      <GameThumbnailImage {...args} />
    </div>
  ),
  args: {
    imageId: "co2lbd",
    alt: "Cyberpunk 2077 - Thumbnail",
    fill: true,
    sizes: "64px",
  },
};
