<script>
    export let data;
</script>

<article>
    <h1>{ data.title }</h1>
    <p class="date">Published: {data.date}</p>
    <svelte:component this={data.content} />
    
    <div class="back-nav">
        <a href="/blog" class="back-link">← Back to posts</a>
    </div>
</article>

<style>
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