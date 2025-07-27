<script>
    export let data;
</script>

<div class="tags-page">
    {#if data.tags.length > 0}
        <div class="tags-list">
            {#each data.tags as tag}
                <div class="tag-item">
                    <a href="/blog/tags/{tag.name}" class="tag-link">
                        <span class="tag-name">#{tag.name}</span>
                        <span class="tag-count">({tag.count})</span>
                    </a>
                </div>
            {/each}
        </div>
    {:else}
        <div class="no-tags">
            <p>No tags found.</p>
        </div>
    {/if}
</div>

<style lang="scss">
    .tags-page {
        margin-top: 2.5rem;
    }

    .tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
    }

    .tag-item {
        // No additional styling needed
    }

    .tag-link {
        color: #666;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.2s ease;
        border-bottom: none !important;
        font-weight: normal !important;
        
        &:hover {
            color: #333;
            text-decoration: none;
            border-bottom: none !important;
        }
    }

    .tag-name {
        color: inherit;
    }

    .tag-count {
        color: #999;
        font-size: 0.9rem;
    }

    .no-tags {
        text-align: center;
        padding: 3rem 0;
        color: #999;
        
        p {
            font-size: 1rem;
        }
    }
</style> 