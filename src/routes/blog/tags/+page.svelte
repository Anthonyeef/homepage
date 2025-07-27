<script>
    export let data;
</script>

<svelte:head>
    <title>Blog Tags</title>
</svelte:head>

<div class="tags-page">
    {#if data.tags.length > 0}
        <div class="tags-grid">
            {#each data.tags as tag}
                <div class="tag-card">
                    <h2 class="tag-name">
                        <a href="/blog/tags/{tag.name}">{tag.name}</a>
                    </h2>
                    <div class="tag-count">{tag.count} post{tag.count === 1 ? '' : 's'}</div>
                    <div class="tag-posts">
                        {#each tag.posts.slice(0, 3) as post}
                            <div class="tag-post">
                                <a href="/blog/{post.slug}">{post.title}</a>
                                <span class="post-date">{post.date}</span>
                            </div>
                        {/each}
                        {#if tag.posts.length > 3}
                            <div class="more-posts">
                                <a href="/blog/tags/{tag.name}">+{tag.posts.length - 3} more</a>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="no-tags">
            <p>No tags found. Posts need to have tags in their frontmatter to appear here.</p>
        </div>
    {/if}
</div>

<style lang="scss">
    .tags-page {
        padding: 2rem;
    }

    .tags-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .tag-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1.5rem;
        transition: all 0.2s;
        
        &:hover {
            border-color: #3b82f6;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
    }

    .tag-name {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        
        a {
            color: #1f2937;
            text-decoration: none;
            transition: color 0.2s;
            
            &:hover {
                color: #3b82f6;
            }
        }
    }

    .tag-count {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }

    .tag-posts {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tag-post {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #f3f4f6;
        
        &:last-child {
            border-bottom: none;
        }
        
        a {
            color: #374151;
            text-decoration: none;
            font-size: 0.875rem;
            transition: color 0.2s;
            
            &:hover {
                color: #3b82f6;
            }
        }
    }

    .post-date {
        color: #9ca3af;
        font-size: 0.75rem;
    }

    .more-posts {
        margin-top: 0.5rem;
        
        a {
            color: #3b82f6;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .no-tags {
        text-align: center;
        padding: 3rem 1rem;
        color: #6b7280;
        
        p {
            margin-bottom: 1rem;
            font-size: 1.125rem;
        }
    }
</style> 