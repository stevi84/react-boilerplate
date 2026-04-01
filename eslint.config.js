import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const allRules = {
  // Prettier integration
  'prettier/prettier': ['error', { endOfLine: 'lf' }],

  // @eslint-react overrides (match previously disabled react/react-hooks rules)
  '@eslint-react/exhaustive-deps': 'off',
  '@eslint-react/component-hook-factories': 'off', // should be reviewed occasionally
  
  // JSX a11y rules
  ...jsxA11y.flatConfigs.recommended.rules,
  'jsx-a11y/no-autofocus': 'off', // should be reviewed occasionally
  
  // Import rules
  ...importPlugin.flatConfigs.recommended.rules,
  'import/no-unresolved': 'off', // TypeScript handles this
  'import/named': 'off', // TypeScript handles this
  'import/no-named-as-default-member': 'off',

  // TypeScript rules
  ...typescript.configs.recommended.rules,
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
 '@typescript-eslint/no-deprecated': 'warn',
  '@typescript-eslint/no-namespace': 'off',

  // General ESLint rules
  indent: 'off',
  'no-unused-vars': 'off',
  'no-undef': 'off',
  'no-empty': 'off',
  'no-prototype-builtins': 'off',
};

const allPlugins = {
  'jsx-a11y': jsxA11y,
  import: importPlugin,
  prettier,
  '@typescript-eslint': typescript,
};

const baseLanguageOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
};

export default [
  js.configs.recommended,
  eslintReact.configs['recommended-typescript'],
  // Configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ...baseLanguageOptions,
      parser: typescriptParser,
    },
    plugins: allPlugins,
    rules: allRules,
  },
  // Override for config files that need tsconfig.node.json
  {
    files: ['vite.config.ts', 'cypress.config.ts'],
    languageOptions: {
      ...baseLanguageOptions,
      parser: typescriptParser,
      parserOptions: {
        ...baseLanguageOptions.parserOptions,
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.node.json',
      },
    },
  },
  // Override for cypress TypeScript files
  {
    files: ['cypress/**/*.{ts,tsx}'],
    languageOptions: {
      ...baseLanguageOptions,
      parser: typescriptParser,
      parserOptions: {
        ...baseLanguageOptions.parserOptions,
        tsconfigRootDir: import.meta.dirname,
        project: './cypress/tsconfig.json',
      },
    },
  },
  // Override for non-config TypeScript files to use main tsconfig
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['vite.config.ts', 'cypress.config.ts', 'cypress/**'],
    languageOptions: {
      ...baseLanguageOptions,
      parser: typescriptParser,
      parserOptions: {
        ...baseLanguageOptions.parserOptions,
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.json',
      },
    },
  },
  // Disable type-checked rules for plain JS files (no tsconfig project)
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    ignores: ['build/**', 'node_modules/**'],
  },
];
