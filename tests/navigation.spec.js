import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
	test('should display correct navigation links', async ({ page }) => {
		await page.goto('/');
		
		// Check that navigation links are present
		await expect(page.locator('nav')).toBeVisible();
		await expect(page.locator('a[href="/"]')).toContainText('Yifen');
		await expect(page.locator('a[href="/blog"]')).toContainText('Blog');
		await expect(page.locator('a[href="/blog/tags"]')).toContainText('Tags');
	});

	test('should navigate to blog page', async ({ page }) => {
		await page.goto('/');
		await page.click('a[href="/blog"]');
		
		await expect(page).toHaveURL('/blog');
		// Check that blog posts are displayed
		await expect(page.locator('.blog-posts')).toBeVisible();
	});

	test('should navigate to tags page', async ({ page }) => {
		await page.goto('/');
		await page.click('a[href="/blog/tags"]');
		
		await expect(page).toHaveURL('/blog/tags');
		// Check that tags are displayed
		await expect(page.locator('.tags-list')).toBeVisible();
	});

	test('should not show navigation on blog post pages', async ({ page }) => {
		await page.goto('/blog');
		
		// Click on first blog post
		const firstPost = page.locator('.post-title a').first();
		await firstPost.click();
		
		// Navigation should not be visible on individual post pages
		await expect(page.locator('nav')).not.toBeVisible();
	});
}); 