// see https://typescript-eslint.io/packages/typescript-eslint#config

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended
    ],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    }
  }
);