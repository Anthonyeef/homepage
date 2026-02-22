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
    <div class="projects-list">
        {#each projects as project}
            <a 
                href={project.link} 
                class="project-item"
                target={isExternal(project.type) ? "_blank" : "_self"}
                rel={isExternal(project.type) ? "noopener noreferrer" : ""}
            >
                {#if project.image}
                <div class="project-image">
                    <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                {/if}
                
                <div class="project-content" class:full-width={!project.image}>
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
        padding: 0.5rem 0 2rem;
    }

    .projects-list {
        display: flex;
        flex-direction: column;
    }

    .project-item {
        display: flex;
        gap: 1.25rem;
        padding: 1.25rem 1rem;
        text-decoration: none;
        color: inherit;
        border-bottom: 1px solid #eee;
        transition: all 0.2s ease;
    }

    .project-item:last-child {
        border-bottom: none;
    }

    .project-item:hover {
        background: rgba(0, 151, 167, 0.02);
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

    .project-content {
        flex: 1;
        min-width: 0;
    }

    .project-content.full-width {
        width: 100%;
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
    }
</style>
