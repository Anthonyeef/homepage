export const load = async ({ fetch }) => {
    // Import all .md files from the blog directory
    const posts = import.meta.glob('./*.md');
    
    // Process each post to get its metadata
    const postPromises = Object.entries(posts).map(async ([path, resolver]) => {
        const post = await resolver();
        const slug = path.slice(2, -3); // Remove './' and '.md'
        
        return {
            slug,
            title: post.metadata.title,
            date: post.metadata.date,
            excerpt: post.metadata.excerpt,
            draft: post.metadata.draft || false
        };
    });

    const allPosts = await Promise.all(postPromises);

    const publishedPosts = allPosts.filter(post => !post.draft);
    
    // Sort posts by date (newest first)
    publishedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
        posts: publishedPosts
    };
};