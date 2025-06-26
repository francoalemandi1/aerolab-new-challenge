// eslint-disable-next-line
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SearchInput } from "./search-input";

const meta = {
  title: "Atoms/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    value: {
      control: "text",
      description: "Current value of the input",
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Search for games...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Search...",
    value: "Adventure games",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Search...",
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    placeholder: "Search...",
    value: "Cannot edit this",
    disabled: true,
  },
};

export const LongPlaceholder: Story = {
  args: {
    placeholder:
      "Search for your favorite adventure, action, or strategy games...",
  },
};

export const Interactive: Story = {
  args: {
    placeholder: "Type to search...",
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing focus states and typing behavior.",
      },
    },
  },
};
