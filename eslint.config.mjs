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
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    rules: {
      "@typescript-eslint/no-restricted-imports": "off",
      "import/no-restricted-paths": "off",
    },
  },
];

export default eslintConfig;
