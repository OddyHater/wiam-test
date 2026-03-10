import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      // JS / TS
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // React
      'react/jsx-key': 'error',
      'react/self-closing-comp': 'warn',

      'prettier/prettier': 'error',
    },
  },

  globalIgnores(['build/**']),
]);