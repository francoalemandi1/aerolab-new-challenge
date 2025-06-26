// eslint-disable-next-line
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { fn } from "@storybook/test";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Design System/Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "text",
        "email",
        "password",
        "number",
        "search",
        "tel",
        "url",
        "date",
      ],
      description: "The type of input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  decorators: [
    Story => (
      <div style={{ minWidth: "300px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<Meta<typeof Input>>;

// Basic Stories
export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter text here...",
    defaultValue: "Sample text",
  },
};

// Type Variants
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email address",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "123",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Date: Story = {
  args: {
    type: "date",
  },
};

export const Phone: Story = {
  args: {
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
};

export const URL: Story = {
  args: {
    type: "url",
    placeholder: "https://example.com",
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    placeholder: "This input is disabled",
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: "Disabled with value",
    disabled: true,
  },
};

// Style Variants
export const WithError: Story = {
  args: {
    placeholder: "Input with error state",
    className: "border-red-600 focus:border-red-600 focus:ring-red-600",
  },
};

export const WithSuccess: Story = {
  args: {
    placeholder: "Input with success state",
    className: "border-green-600 focus:border-green-600 focus:ring-green-600",
  },
};

// Form Examples
export const LoginForm: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "300px",
      }}
    >
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
    </div>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "300px",
      }}
    >
      <Input placeholder="Full name" />
      <Input type="email" placeholder="Email address" />
      <Input type="tel" placeholder="Phone number" />
      <Input placeholder="Subject" />
    </div>
  ),
};

export const PaymentForm: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "300px",
      }}
    >
      <Input placeholder="Cardholder name" />
      <Input placeholder="1234 5678 9012 3456" />
      <div style={{ display: "flex", gap: "12px" }}>
        <Input placeholder="MM/YY" style={{ flex: 1 }} />
        <Input placeholder="CVC" style={{ flex: 1 }} />
      </div>
    </div>
  ),
};
