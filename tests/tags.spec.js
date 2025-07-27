import { test, expect } from '@playwright/test';

test.describe('Tags', () => {
	test('should display tags overview page', async ({ page }) => {
		await page.goto('/blog/tags');
		
		// Check that tags list is visible
		await expect(page.locator('.tags-list')).toBeVisible();
		
		// Check that tags are displayed
		const tags = page.locator('.tag-item');
		const tagCount = await tags.count();
		expect(tagCount).toBeGreaterThan(0);
		
		// Check that each tag has required elements
		const firstTag = tags.first();
		await expect(firstTag.locator('.tag-link')).toBeVisible();
		await expect(firstTag.locator('.tag-name')).toBeVisible();
		await expect(firstTag.locator('.tag-count')).toBeVisible();
	});

	test('should navigate to individual tag pages', async ({ page }) => {
		await page.goto('/blog/tags');
		
		// Click on first tag
		await page.locator('.tag-link').first().click();
		
		// Check that we're on a tag page
		await expect(page).toHaveURL(/\/blog\/tags\/.+/);
		
		// Wait for posts to load
		await page.waitForSelector('.blog-posts');
		
		// Check that posts for this tag are displayed
		await expect(page.locator('.blog-posts')).toBeVisible();
	});

	test('should display posts filtered by tag', async ({ page }) => {
		await page.goto('/blog/tags');
		
		// Click on first tag
		await page.locator('.tag-link').first().click();
		
		// Wait for posts to load
		await page.waitForSelector('.blog-posts');
		
		// Check that posts are displayed
		const posts = page.locator('.post-preview');
		const postCount = await posts.count();
		expect(postCount).toBeGreaterThan(0);
		
		// Check that each post has required elements
		const firstPost = posts.first();
		await expect(firstPost.locator('.post-title')).toBeVisible();
		await expect(firstPost.locator('.post-meta')).toBeVisible();
	});

	test('should have consistent styling with blog list', async ({ page }) => {
		await page.goto('/blog/tags');
		
		// Click on first tag
		await page.locator('.tag-link').first().click();
		
		// Check that the styling is consistent with main blog page
		await expect(page.locator('.blog-posts')).toBeVisible();
		await expect(page.locator('.post-preview')).toBeVisible();
		await expect(page.locator('.post-title')).toBeVisible();
	});
}); 