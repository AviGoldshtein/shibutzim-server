// @ts-check

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  globalIgnores(['dist', 'eslint.config.mjs']),

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,

      ...tseslint.configs.recommendedTypeChecked,

      eslintPluginPrettierRecommended,
    ],

    languageOptions: {
      sourceType: 'commonjs',

      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

    rules: {
      /*
       * Imports
       */
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      /*
       * Unused imports
       */
      'unused-imports/no-unused-imports': 'error',

      /*
       * Unused vars
       */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      /*
       * TypeScript
       */
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      /*
       * Prettier
       */
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
]);
