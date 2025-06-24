import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "@storybook/test";
import { Button } from "@/ui/atoms/button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Render as child component",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive Button",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

// Size Stories
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Default: Story = {
  args: {
    children: "Default Button",
    size: "default",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    children: "🚀",
    size: "icon",
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: "Disabled Secondary",
    variant: "secondary",
    disabled: true,
  },
};

export const DisabledOutline: Story = {
  args: {
    children: "Disabled Outline",
    variant: "outline",
    disabled: true,
  },
};

// Interactive Stories
export const WithLongText: Story = {
  args: {
    children: "Button with Very Long Text Content",
  },
};

export const WithEmoji: Story = {
  args: {
    children: "🎉 Celebrate",
  },
};

export const LoadingState: Story = {
  args: {
    children: "Loading...",
    disabled: true,
  },
};
