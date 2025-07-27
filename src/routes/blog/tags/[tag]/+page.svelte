<script>
    export let data;
</script>

<svelte:head>
    <title>Posts tagged "{data.tag}"</title>
</svelte:head>

<div class="tag-posts-page">
    <div class="page-header">
        <h1>Posts tagged "{data.tag}"</h1>
    </div>
    
    {#if data.posts.length > 0}
        <div class="posts-count">
            {data.posts.length} post{data.posts.length === 1 ? '' : 's'} found
        </div>
        
        <div class="blog-posts">
            {#each data.posts as post}
                <article class="post-preview">
                    <h2 class="post-title">
                        <a href="/blog/{post.slug}">{post.title}</a>
                        {#if post.draft}
                            <span class="draft-badge">DRAFT</span>
                        {/if}
                    </h2>
                    {#if post.excerpt}
                        <p class="post-excerpt">{post.excerpt}</p>
                    {/if}
                    {#if post.tags && post.tags.length > 0}
                        <div class="post-tags">
                            {#each post.tags as tag}
                                <a href="/blog/tags/{tag}" class="tag-link {tag === data.tag ? 'active' : ''}">{tag}</a>
                            {/each}
                        </div>
                    {/if}
                    <div class="post-meta">{post.date}</div>
                </article>
            {/each}
        </div>
    {:else}
        <div class="no-posts">
            <p>No posts found with the tag "{data.tag}".</p>
        </div>
    {/if}
</div>

<style lang="scss">
    .tag-posts-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .page-header h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
    }

    .posts-count {
        color: #6b7280;
        font-size: 1rem;
        margin-bottom: 2rem;
        padding: 0.75rem 1rem;
        background-color: #f9fafb;
        border-radius: 0.375rem;
        border-left: 4px solid #3b82f6;
    }

    .blog-posts {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .post-preview {
        padding-bottom: 2rem;
        border-bottom: 1px solid #f3f4f6;
        
        &:last-child {
            border-bottom: none;
        }
    }

    .post-title {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        line-height: 1.3;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        
        a {
            color: #1f2937;
            text-decoration: none;
            transition: color 0.2s;
            
            &:hover {
                color: #3b82f6;
            }
        }
    }

    .draft-badge {
        display: inline-block;
        background-color: #fbbf24;
        color: #92400e;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        flex-shrink: 0;
    }

    .post-excerpt {
        margin: 0.5rem 0;
        color: #6b7280;
        line-height: 1.6;
    }

    .post-tags {
        margin: 0.5rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tag-link {
        display: inline-block;
        background-color: #f3f4f6;
        color: #374151;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        text-decoration: none;
        transition: all 0.2s;
        
        &.active {
            background-color: #3b82f6;
            color: white;
        }
        
        &:hover {
            background-color: #3b82f6;
            color: white;
        }
    }

    .post-meta {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #9ca3af;
    }

    .no-posts {
        text-align: center;
        padding: 3rem 1rem;
        color: #6b7280;
        
        p {
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
        }
    }
</style> 