import { test, expect } from '@playwright/test';

test.describe('Counter', { tag: ['@responsive', '@dark'] }, () => {
    test('counter increments', async ({page}) => {
        await page.goto('/');
        await expect(page).toHaveScreenshot('counter-initial.png');
        const button = page.getByRole('button');
        await button.click();
        await expect(page).toHaveScreenshot('counter-1-click.png');
    });
});
