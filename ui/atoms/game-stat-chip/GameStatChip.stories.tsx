import type { Meta, StoryObj } from "@storybook/react";
import { Star, Calendar, Gamepad2 } from "lucide-react";
import { GameStatChip } from "./game-stat-chip";

const meta: Meta<typeof GameStatChip> = {
  title: "UI/Atoms/GameStatChip",
  component: GameStatChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Rating: Story = {
  args: {
    icon: Star,
    label: "Rating",
    value: "85",
  },
};

export const ReleaseDate: Story = {
  args: {
    icon: Calendar,
    label: "Release",
    value: "2024",
  },
};

export const Genre: Story = {
  args: {
    icon: Gamepad2,
    label: "Genre",
    value: "Action RPG",
  },
};
