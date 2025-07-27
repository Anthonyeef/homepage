export async function load() {
    const posts = import.meta.glob('../*.md')

    const postPromises = Object.entries(posts).map(async ([path, resolver]) => {
        const post = await resolver()
        const slug = path.slice(3, -3) // Remove '../' and '.md'

        return {
            slug,
            title: post.metadata.title,
            date: post.metadata.date,
            excerpt: post.metadata.excerpt,
            draft: post.metadata.draft || false,
            tags: post.metadata.tags || []
        }
    })

    const allPosts = await Promise.all(postPromises);

    // Show drafts in development, hide in production
    const isDev = import.meta.env.DEV;
    const publishedPosts = isDev
        ? allPosts // Show all posts including drafts in development
        : allPosts.filter(post => !post.draft); // Hide drafts in production

    // Collect all unique tags
    const tagMap = new Map();
    
    publishedPosts.forEach(post => {
        if (post.tags && post.tags.length > 0) {
            post.tags.forEach(tag => {
                if (!tagMap.has(tag)) {
                    tagMap.set(tag, []);
                }
                tagMap.get(tag).push(post);
            });
        }
    });

    // Convert to array and sort by tag name
    const tags = Array.from(tagMap.entries())
        .map(([tag, posts]) => ({
            name: tag,
            count: posts.length,
            posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date))
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    return {
        tags
    }
} 