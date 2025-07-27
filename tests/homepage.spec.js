import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
	test('should display correct title and content', async ({ page }) => {
		await page.goto('/');
		
		// Check main title
		await expect(page.locator('h1')).toContainText("Hi, I'm Yifen Wu");
		
		// Check that bio content is present
		await expect(page.locator('.bio')).toBeVisible();
		await expect(page.locator('.bio p')).toHaveCount(4); // 4 paragraphs in your bio
		
		// Check specific content
		await expect(page.locator('.bio')).toContainText('广东人');
		await expect(page.locator('.bio')).toContainText('Grab');
		await expect(page.locator('.bio')).toContainText('Android 开发');
	});

	test('should have proper styling', async ({ page }) => {
		await page.goto('/');
		
		// Check that the page has the expected layout
		await expect(page.locator('.home-page')).toBeVisible();
		await expect(page.locator('.intro')).toBeVisible();
		await expect(page.locator('.bio')).toBeVisible();
	});

	test('should be responsive', async ({ page }) => {
		await page.goto('/');
		
		// Test mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.locator('.home-page')).toBeVisible();
		
		// Test desktop viewport
		await page.setViewportSize({ width: 1920, height: 1080 });
		await expect(page.locator('.home-page')).toBeVisible();
	});
}); 