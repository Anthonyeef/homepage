export async function load({ params }){
    const post = await import(`../${params.slug}.md`)
    const { title, date, draft } = post.metadata
    const content = post.default

    // Check if this is a draft and we're in production
    const isDev = import.meta.env.DEV;
    if (draft && !isDev) {
        // Return 404 for drafts in production
        throw new Error('Not found');
    }

    return {
        content,
        title,
        date,
        draft: draft || false
    }
}