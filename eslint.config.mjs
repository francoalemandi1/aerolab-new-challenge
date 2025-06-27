// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...storybook.configs.recommended,
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    rules: {
      "storybook/no-uninstalled-addons": "off",
      "storybook/use-storybook-testing-library": "off",
      "@typescript-eslint/no-restricted-imports": "off",
      // Disable the rule that prevents importing from @storybook/react
      "@typescript-eslint/no-restricted-imports": "off",
      "import/no-restricted-paths": "off",
    },
  },
];

export default eslintConfig;
