import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    settings: {
      next: {
        rootDir: 'src',
      },
    },
    extends: [
      'next',
      'eslint:recommended',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:@next/next/recommended',
    ],
  }),
];

export default eslintConfig;
