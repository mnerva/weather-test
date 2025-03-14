import { test, expect } from '@playwright/test';

test.describe('Weather Application', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('search for a city', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('Weather Application');
        await page.locator('[data-testid=search-input]').fill('Melbourne');
        await page.locator('text=Search').click();
        const results = page.locator('[data-testid=search-results] .search-result');
        await expect(results).toHaveCount(5);
    });

    test('renders the app title', async ({ page }) => {
        const title = page.locator('h1');
        await expect(title).toHaveText('Weather Application');
        await expect(title).toBeVisible();
    });

    test('checks if the weather category is clouds', async ({ page }) => {
        await page.locator('[data-testid=search-input]').fill('Melbourne');
        await page.locator('text=Search').click();
        await page.locator('[data-testid=search-results] .search-result').first().click();
        const weatherContainer = page.locator('[data-testid=my-weather-list] .weather-container');
        await expect(weatherContainer).toHaveCount(1);
        await expect(weatherContainer).toHaveClass(/clouds/);
    });
});
