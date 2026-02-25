import { test, expect } from '@playwright/test';

test('counter increments', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('count is 0')).toBeVisible();
    await page.getByRole('button').click();
    await expect(page.getByText('count is 1')).toBeVisible();
});
