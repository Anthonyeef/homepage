<script>
    import projects from '$lib/data/projects.json';
    
    function isExternal(type) {
        return type === 'external';
    }
</script>

<svelte:head>
    <title>Projects | Yifen</title>
    <meta name="description" content="A collection of my projects" />
</svelte:head>

<div class="projects-container">
    <h1 class="page-title">Projects</h1>
    
    <div class="projects-list">
        {#each projects as project}
            <a 
                href={project.link} 
                class="project-item"
                target={isExternal(project.type) ? "_blank" : "_self"}
                rel={isExternal(project.type) ? "noopener noreferrer" : ""}
            >
                <div class="project-image">
                    {#if project.image}
                        <img src={project.image} alt={project.title} loading="lazy" />
                    {:else}
                        <div class="project-image-placeholder">
                            <span>◈</span>
                        </div>
                    {/if}
                </div>
                
                <div class="project-content">
                    <div class="project-header">
                        <h2 class="project-title">{project.title}</h2>
                        {#if isExternal(project.type)}
                            <span class="external-indicator">↗</span>
                        {/if}
                    </div>
                    
                    <p class="project-description">{project.description}</p>
                    
                    {#if project.tags && project.tags.length > 0}
                        <div class="project-tags">
                            {#each project.tags as tag}
                                <span class="tag">{tag}</span>
                            {/each}
                        </div>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .projects-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: #1a1a1a;
    }

    .projects-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .project-item {
        display: flex;
        gap: 1.25rem;
        padding: 1.25rem;
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
    }

    .project-item:hover {
        border-color: #0097A7;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-1px);
    }

    .project-image {
        flex-shrink: 0;
        width: 120px;
        height: 80px;
        border-radius: 6px;
        overflow: hidden;
        background: #f5f5f5;
    }

    .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .project-image-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
        color: #0097A7;
        font-size: 1.5rem;
    }

    .project-content {
        flex: 1;
        min-width: 0;
    }

    .project-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .project-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0;
        color: #1a1a1a;
    }

    .external-indicator {
        font-size: 0.875rem;
        color: #0097A7;
        opacity: 0.7;
    }

    .project-description {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.5;
        margin: 0 0 0.75rem 0;
    }

    .project-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .tag {
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
        background: #f0f0f0;
        border-radius: 4px;
        color: #666;
    }

    @media (max-width: 600px) {
        .project-item {
            flex-direction: column;
            gap: 1rem;
        }

        .project-image {
            width: 100%;
            height: 160px;
        }

        .page-title {
            font-size: 1.5rem;
        }
    }
</style>
