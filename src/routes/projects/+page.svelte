<script>
    import { onMount } from 'svelte';
</script>

<svelte:head>
    <title>Projects | Yifen</title>
    <meta name="description" content="A collection of my projects" />
</svelte:head>

<div class="projects-container">
    <h1 class="page-title">Projects</h1>
    
    <div class="projects-grid">
        <a href="/eva-sticker" class="project-card">
            <div class="project-icon">◈</div>
            <h2 class="project-title">EVA Sticker Generator</h2>
            <p class="project-description">
                Generate Evangelion-style warning stickers with custom text, colors, and dimensions.
            </p>
            <div class="project-tags">
                <span class="tag">Svelte</span>
                <span class="tag">Tool</span>
            </div>
        </a>

        <!-- Placeholder for future projects -->
        <div class="project-card coming-soon">
            <div class="project-icon">◉</div>
            <h2 class="project-title">More Coming Soon</h2>
            <p class="project-description">
                Stay tuned for more projects.
            </p>
        </div>
    </div>
</div>

<style>
    .projects-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .page-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: #1a1a1a;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .project-card {
        display: block;
        padding: 1.5rem;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    }

    .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
        border-color: #0097A7;
    }

    .project-card.coming-soon {
        opacity: 0.6;
        cursor: default;
    }

    .project-card.coming-soon:hover {
        transform: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        border-color: #e0e0e0;
    }

    .project-icon {
        font-size: 1.5rem;
        color: #0097A7;
        margin-bottom: 0.75rem;
    }

    .project-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #1a1a1a;
    }

    .project-description {
        font-size: 0.9rem;
        color: #666;
        line-height: 1.5;
        margin: 0 0 1rem 0;
    }

    .project-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .tag {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        background: #f0f0f0;
        border-radius: 4px;
        color: #666;
    }

    @media (max-width: 600px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
