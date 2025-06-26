import { LoadingSpinner } from "./loading-spinner";

export default {
  title: "Atoms/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {},
};

export const WithText = {
  args: {
    text: "Loading your games...",
  },
};

export const Small = {
  args: {
    size: "sm",
    text: "Loading...",
  },
};

export const Medium = {
  args: {
    size: "md",
    text: "Loading games...",
  },
};

export const Large = {
  args: {
    size: "lg",
    text: "Loading your collection...",
  },
};

export const CustomStyling = {
  args: {
    size: "md",
    text: "Custom loading message",
    className: "text-violet-600",
  },
};
