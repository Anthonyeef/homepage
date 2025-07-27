export const prerender = true;

export const GET = async () => {
    // Import all .md files from the blog directory
    const posts = import.meta.glob('../../blog/*.md');
    
    // Process each post to get its metadata
    const postPromises = Object.entries(posts).map(async ([path, resolver]) => {
        const post = await resolver();
        const slug = path.slice(12, -3); // Remove '../../blog/' and '.md'
        
        return {
            slug,
            title: post.metadata.title,
            date: post.metadata.date,
            excerpt: post.metadata.excerpt,
            draft: post.metadata.draft || false,
            tags: post.metadata.tags || []
        };
    });

    const allPosts = await Promise.all(postPromises);

    // Show drafts in development, hide in production
    const isDev = import.meta.env.DEV;
    const publishedPosts = isDev 
        ? allPosts // Show all posts including drafts in development
        : allPosts.filter(post => !post.draft); // Hide drafts in production
    
    // Sort posts by date (newest first)
    publishedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return new Response(JSON.stringify(publishedPosts), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};