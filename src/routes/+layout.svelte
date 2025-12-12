<script>
    import '$lib/styles/style.scss'
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { dev } from '$app/environment'
    import { inject } from '@vercel/analytics'
    
    $: isBlogs = $page.route?.id?.includes('/blog/[slug]')
    
    onMount(() => {
        inject({ mode: dev ? 'development' : 'production' })
    })
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