<script>
    import '$lib/styles/style.scss'
    import { page } from '$app/stores'
    
    $: isBlogs = $page.route?.id?.includes('/blog/[slug]')
</script>

<div class="container">
    {#if !isBlogs}
    <header class="header">
        <nav>
            <ul class="nav-links">
                <li class="nav-link-item">
                    <a class="nav-link-text" href="/">Yifen</a>
                </li>
                <li class="nav-link-item">
                    <a class="nav-link-text" href="/blog">Blog</a>
                </li>
                <li class="nav-link-item">
                    <a class="nav-link-text" href="/blog/tags">Tags</a>
                </li>
            </ul>
        </nav>
    </header>
    {/if}

    <main>
        <slot />
    </main>
</div>