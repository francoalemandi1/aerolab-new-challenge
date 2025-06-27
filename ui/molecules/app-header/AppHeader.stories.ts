// eslint-disable-next-line
import type { Meta, StoryObj } from "@storybook/react";
import { AppHeader } from "./app-header";

const meta: Meta<typeof AppHeader> = {
  title: "Molecules/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Application header component with logo, title, and optional mobile menu.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Gaming Haven Z",
  },
  parameters: {
    docs: {
      description: {
        story: "Default header without menu.",
      },
    },
  },
};

export const WithMenu: Story = {
  args: {
    title: "Gaming Haven Z",
    showMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Header with mobile menu enabled. Shows hamburger menu on mobile and logout button on desktop.",
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Custom App Name",
    showMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Header with custom title and menu enabled.",
      },
    },
  },
};
