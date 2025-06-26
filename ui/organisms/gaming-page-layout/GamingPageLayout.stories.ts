import { GamingPageLayout } from "./gaming-page-layout";

export default {
  title: "Organisms/GamingPageLayout",
  component: GamingPageLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {},
};

export const WithCustomClass = {
  args: {
    className: "bg-gray-50",
  },
};
