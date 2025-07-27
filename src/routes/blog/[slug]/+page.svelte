<script>
    export let data;
</script>

<article>
    <h1>{ data.title }</h1>
    {#if data.draft}
        <div class="draft-badge">DRAFT</div>
    {/if}
    {#if data.tags && data.tags.length > 0}
        <div class="post-tags">
            {#each data.tags as tag}
                <a href="/blog/tags/{tag}" class="tag-link">{tag}</a>
            {/each}
        </div>
    {/if}
    <p class="date">Published: {data.date}</p>
    <svelte:component this={data.content} />
    
    <div class="back-nav">
        <a href="/blog" class="back-link">← Back to posts</a>
    </div>
</article>

<style lang="scss">
    .draft-badge {
        display: inline-block;
        background-color: #fbbf24;
        color: #92400e;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    .post-tags {
        margin: 1rem 0;
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
        
        &:hover {
            background-color: #3b82f6;
            color: white;
        }
    }

    .date {
        text-align: right;
        color: #666;
        font-size: 0.9em;
        margin-bottom: 2rem;
    }

    .back-nav {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #eee;
    }

    .back-link {
        color: #666;
        text-decoration: none;
        font-size: 0.9em;
        border-bottom: none !important;
        font-weight: normal !important;
        transition: color 0.2s ease;
        
        &:hover {
            color: #ec4899;
        }
    }
</style>