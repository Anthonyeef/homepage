export async function load({ params }) {
    const posts = import.meta.glob('../../*.md')

    const postPromises = Object.entries(posts).map(async ([path, resolver]) => {
        const post = await resolver()
        const slug = path.slice(6, -3) // Remove '../../' and '.md'

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

    // Filter posts by the specified tag
    const taggedPosts = publishedPosts.filter(post => 
        post.tags && post.tags.includes(params.tag)
    );

    // Sort posts by date (newest first)
    taggedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
        tag: params.tag,
        posts: taggedPosts
    }
} 