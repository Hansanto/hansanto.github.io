import {defineConfig} from 'vitest/config'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths';
import {resolve} from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tsconfigPaths(),
        svelte()
    ],
    base: process.env.BASE_URL ?? '/',
    test: {
        include: ['test/**/*.spec.ts'],
        exclude: [
            'test/playwright/**',
        ],
    },
    resolve: {
        alias: {
            '@style': resolve(__dirname, 'src/style'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use '@style/variables' as *;`,
            },
        },
    },
})
