import { LogoutButton } from "./logout-button";

export default {
  title: "Organisms/LogoutButton",
  component: LogoutButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {},
};

export const WithCustomClass = {
  args: {
    className: "mr-4",
  },
};
