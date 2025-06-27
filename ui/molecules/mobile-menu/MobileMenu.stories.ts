import type { Meta, StoryObj } from "@storybook/nextjs";
import { MobileMenu } from "./mobile-menu";

const meta: Meta<typeof MobileMenu> = {
  title: "Molecules/MobileMenu",
  component: MobileMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Responsive menu component that shows a violet-themed hamburger menu on mobile and direct logout button on desktop. The mobile sidebar occupies the full viewport height.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default mobile menu with violet theme. On mobile devices, it shows a full-height sidebar with violet-colored elements. On desktop, it shows a direct logout button.",
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "bg-gray-100 p-2 rounded-lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Mobile menu with custom styling applied.",
      },
    },
  },
}; 