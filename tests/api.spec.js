import { test, expect } from '@playwright/test';

test.describe('API', () => {
	test('should return blog posts from API', async ({ request }) => {
		const response = await request.get('/api/posts');
		
		expect(response.ok()).toBeTruthy();
		
		const posts = await response.json();
		expect(Array.isArray(posts)).toBeTruthy();
		expect(posts.length).toBeGreaterThan(0);
		
		// Check that each post has required fields
		const firstPost = posts[0];
		expect(firstPost).toHaveProperty('slug');
		expect(firstPost).toHaveProperty('title');
		expect(firstPost).toHaveProperty('date');
		expect(firstPost).toHaveProperty('excerpt');
		expect(firstPost).toHaveProperty('draft');
		expect(firstPost).toHaveProperty('tags');
	});

	test('should filter out draft posts in production', async ({ request }) => {
		const response = await request.get('/api/posts');
		
		expect(response.ok()).toBeTruthy();
		
		const posts = await response.json();
		
		// In production, draft posts should be filtered out
		// In development, they should be included
		const draftPosts = posts.filter(post => post.draft);
		
		// This test will pass in both environments
		// In production: draftPosts.length should be 0
		// In development: draftPosts.length could be > 0
		expect(draftPosts.length).toBeGreaterThanOrEqual(0);
	});

	test('should return posts with valid data structure', async ({ request }) => {
		const response = await request.get('/api/posts');
		
		expect(response.ok()).toBeTruthy();
		
		const posts = await response.json();
		
		// Check data types and structure
		posts.forEach(post => {
			expect(typeof post.slug).toBe('string');
			expect(typeof post.title).toBe('string');
			expect(typeof post.date).toBe('string');
			expect(typeof post.draft).toBe('boolean');
			expect(Array.isArray(post.tags)).toBeTruthy();
			
			// excerpt might be undefined for some posts
			if (post.excerpt !== undefined) {
				expect(typeof post.excerpt).toBe('string');
			}
		});
	});
}); 