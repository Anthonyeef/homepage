import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
	test('should display blog posts list', async ({ page }) => {
		await page.goto('/blog');
		
		// Check that blog posts container is visible
		await expect(page.locator('.blog-posts')).toBeVisible();
		
		// Check that posts are displayed
		const posts = page.locator('.post-preview');
		const postCount = await posts.count();
		expect(postCount).toBeGreaterThan(0);
		
		// Check that each post has required elements
		const firstPost = posts.first();
		await expect(firstPost.locator('.post-title')).toBeVisible();
		await expect(firstPost.locator('.post-meta')).toBeVisible();
	});

	test('should navigate to individual blog posts', async ({ page }) => {
		await page.goto('/blog');
		
		// Get the first post title
		const firstPostTitle = await page.locator('.post-title a').first().textContent();
		
		// Click on the first post
		await page.locator('.post-title a').first().click();
		
		// Check that we're on a blog post page
		await expect(page).toHaveURL(/\/blog\/.+/);
		
		// Check that the post content is displayed
		await expect(page.locator('article')).toBeVisible();
		await expect(page.locator('h1')).toBeVisible();
	});

	test('should display tags on blog posts', async ({ page }) => {
		await page.goto('/blog');
		
		// Click on first blog post
		await page.locator('.post-title a').first().click();
		
		// Check if tags are displayed (some posts might not have tags)
		const tagsContainer = page.locator('.post-tags');
		if (await tagsContainer.isVisible()) {
			const tagCount = await tagsContainer.locator('.tag-link').count();
			expect(tagCount).toBeGreaterThan(0);
		}
	});

	test('should have back navigation on blog posts', async ({ page }) => {
		await page.goto('/blog');
		
		// Click on first blog post
		await page.locator('.post-title a').first().click();
		
		// Check that back link is present
		await expect(page.locator('.back-link')).toContainText('Back to posts');
		
		// Click back link
		await page.locator('.back-link').click();
		
		// Should be back on blog list
		await expect(page).toHaveURL('/blog');
	});
}); 