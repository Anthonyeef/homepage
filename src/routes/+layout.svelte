<script>
    import '$lib/styles/style.scss'
</script>

<div class="container">
    <header class="header">
        <nav>
            <ul class="nav-links">
                <li class="nav-link-item">
                    <a class="nav-link-text" href="/">Home</a>
                </li>
                <li class="nav-link-item">
                    <a class="nav-link-text" href="/about">About</a>
                </li>
                <li class="nav-link-item">
                    <a class="nav-link-text" href="/blog">Blog</a>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <slot />
    </main>
</div>