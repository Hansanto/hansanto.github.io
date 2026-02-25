import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';
import playwrighteslint from 'eslint-plugin-playwright';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['src/**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['**/*.{ts,mts,cts}'],
        extends: [tseslint.configs.recommended],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['src/**/*.{ts,mts,cts}'],
        extends: [tseslint.configs.recommended],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['test/playwright/**/*.{ts,mts,cts}'],
        extends: [tseslint.configs.recommended, playwrighteslint.configs['flat/recommended']],
        rules: {
            ...playwrighteslint.configs['flat/recommended'].rules,
            'playwright/expect-expect': 'off',
        },
        languageOptions: { globals: globals.node },
    },
    {
        files: ['test/**/*.spec.{ts,mts,cts}'],
        rules: {
            // Sometimes, in test, we need to use require() to import a module dynamically.
            // For example, when we want to mock a module with Jest, we need to use require() to import the module after it has been mocked.
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['../**'],
                            message: 'Relative parent imports are not allowed. Use path aliases (e.g. @utils) instead.',
                        },
                    ],
                },
            ],
        },
    },
    globalIgnores(['node_modules', 'dist', 'report', 'package-lock.json']),
]);
