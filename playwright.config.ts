import { defineConfig, devices } from '@playwright/test';

const reportDir = 'report';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    outputDir: reportDir + '/results',
    testDir: './test/playwright',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['json', { outputFile: reportDir + '/json/results.json' }],
        ['html', { open: 'never', outputFolder: reportDir + '/html' }],
        [process.env.CI ? 'github' : 'line'],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: `http://localhost:8080`,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },
    updateSnapshots: process.env.CI ? 'none' : 'missing',
    // https://playwright.dev/docs/api/class-testconfig#test-config-snapshot-path-template
    snapshotPathTemplate: '{testDir}/{testFileDir}/snapshots/{projectName}/{arg}{ext}',
    expect: {
        toHaveScreenshot: {
            // Snapshot should be rendered using Docker to be consistent with CI environment (see command `npm run test:playwright:update-snapshots`).
            // But locally, having a little difference in rendering is possible, so we can set a threshold to avoid failing tests due to very small differences in rendering.
            // Mac OS: 0.03 threshold is needed
            // Windows (WSL Ubuntu): 0.04 threshold is needed
            maxDiffPixelRatio: process.env.CI ? 0 : 0.04,
        },
    },

    /**
     * If the browser configuration (bellow) is changed:
     * /!\ MANDATORY: Update the GitHub Action workflow file to download the browser binaries needed.
     */
    projects: [
        {
            name: 'desktop-light',
            use: {
                ...devices['Desktop Chrome'],
                colorScheme: 'light',
            },
        },
        {
            name: 'desktop-dark',
            use: {
                ...devices['Desktop Chrome'],
                colorScheme: 'dark',
            },
            grep: /@dark/,
        },
        {
            name: 'tablet-light',
            use: {
                ...devices['Nexus 10'],
                colorScheme: 'light',
            },
            grep: /@responsive/,
        },
        {
            name: 'tablet-dark',
            use: {
                ...devices['Nexus 10'],
                colorScheme: 'dark',
            },
            grep: /(?=.*@responsive)(?=.*@dark)/,
        },
        {
            name: 'mobile-light',
            use: {
                ...devices['Pixel 7'],
                colorScheme: 'light',
            },
            grep: /@responsive/,
        },
        {
            name: 'mobile-dark',
            use: {
                ...devices['Pixel 7'],
                colorScheme: 'dark',
            },
            grep: /(?=.*@responsive)(?=.*@dark)/,
        },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'npm run server:test',
        url: `http://localhost:8080`,
        reuseExistingServer: !process.env.CI,
    },
});
