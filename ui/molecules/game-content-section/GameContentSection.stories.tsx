import type { Meta, StoryObj } from "@storybook/react";
import { GameContentSection } from "./game-content-section";

const meta: Meta<typeof GameContentSection> = {
  title: "UI/Molecules/GameContentSection",
  component: GameContentSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Section title",
    },
    children: {
      control: "text",
      description: "Section content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Summary: Story = {
  args: {
    title: "Summary",
    children:
      "This is an action-packed adventure game that takes you through a mystical world filled with danger and excitement. Battle fierce enemies, solve challenging puzzles, and uncover ancient secrets in this epic journey.",
  },
};

export const Storyline: Story = {
  args: {
    title: "Storyline",
    children:
      "Long ago, in a realm beyond the stars, an ancient evil awakened from its eternal slumber. As the chosen hero, you must gather allies, master powerful abilities, and embark on a quest to restore balance to the world before darkness consumes everything.",
  },
};

export const Platforms: Story = {
  args: {
    title: "Platforms",
    children: "PlayStation 5 • Xbox Series X/S • PC (Steam) • Nintendo Switch",
  },
};

export const CustomClassName: Story = {
  args: {
    title: "Custom Section",
    children: "This section has a custom className applied.",
    className: "mb-12 p-4 border border-violet-50 rounded-lg",
  },
};
