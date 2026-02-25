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
    updateSnapshots: 'missing',
    // https://playwright.dev/docs/api/class-testconfig#test-config-snapshot-path-template
    snapshotPathTemplate: '{testDir}/{testFileDir}/snapshots/{projectName}/{arg}{ext}',
    expect: {
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.01,
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
                isMobile: false,
                colorScheme: 'light',
            },
        },
        {
            name: 'desktop-dark',
            use: {
                ...devices['Desktop Chrome'],
                isMobile: false,
                colorScheme: 'dark',
            },
            grep: /@dark/,
        },
        {
            name: 'tablet-light',
            use: {
                ...devices['Galaxy Tab S9 landscape'],
                isMobile: true,
                colorScheme: 'light',
            },
            grep: /@responsive/,
        },
        {
            name: 'tablet-dark',
            use: {
                ...devices['Galaxy Tab S9 landscape'],
                isMobile: true,
                colorScheme: 'dark',
            },
            grep: /(?=.*@responsive)(?=.*@dark)/,
        },
        {
            name: 'mobile-light',
            use: {
                ...devices['Pixel 5'],
                isMobile: true,
                colorScheme: 'light',
            },
            grep: /@responsive/,
        },
        {
            name: 'mobile-dark',
            use: {
                ...devices['Pixel 5'],
                isMobile: true,
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
