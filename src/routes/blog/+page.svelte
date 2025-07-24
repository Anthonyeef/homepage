<script>
    export let data;
</script>

<div class="blog-posts">
    {#each data.posts as post}
        <article class="post-preview">
            <h2 class="post-title">
                <a href="/blog/{post.slug}">{post.title}</a>
            </h2>
            {#if post.excerpt}
                <p class="post-excerpt">{post.excerpt}</p>
            {/if}
            <div class="post-meta">
                {post.date}
            </div>
        </article>
    {/each}
</div>

<style lang="scss">
    .blog-posts {
        margin-top: 2.5rem;
    }

    .post-preview {
        margin-bottom: 2.5rem;
    }

    .post-title {
        margin: 0;
        font-size: 1.5rem;
        line-height: 1.3;
        font-weight: 600;
        
        a {
            color: #000;
            text-decoration: none;
            border-bottom: none;
            font-weight: inherit;
            transition: color 0.2s ease;
            
            &:hover {
                color: #e879a6;
                text-decoration: none;
            }
        }
    }

    .post-meta {
        margin: 0.75rem 0;
        color: #999;
        font-size: 0.875rem;
        text-align: right;
    }

    .post-excerpt {
        margin: 0.75rem 0 0;
        color: #444;
        line-height: 1.75;
        font-size: 0.95rem;
        padding-left: 1rem;
        border-left: 3px solid #eee;
    }
</style> 