import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



/** @type {import("eslint").Linter.FlatConfig[]} */
const eslintConfig = [
  ...compat.extends(
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
];

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintConfig,
});

export default eslintConfig;
