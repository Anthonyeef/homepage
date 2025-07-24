# AGENT.md - Development Guide

## Commands
- **Build**: `npm run build` (uses @sveltejs/adapter-static for static site generation)
- **Dev Server**: `npm run dev` (starts Vite dev server)
- **Test**: `npm run test` (runs Playwright tests)
- **Single test**: `npx playwright test tests/test.js` or `npx playwright test --grep "test name"`
- **Lint**: `npm run lint` (ESLint + Prettier check)
- **Format**: `npm run format` (Prettier write)

## Architecture
- **Framework**: SvelteKit with static adapter for blog/portfolio site
- **Routes**: `src/routes/` with file-based routing (+page.svelte, +layout.svelte)
- **Blog**: Markdown posts processed via mdsvex, API endpoint at `/api/posts/`
- **Styling**: SCSS in `src/lib/styles/`, component-scoped styles
- **Components**: Reusable components in `src/lib/components/`

## Code Style
- **Formatting**: Prettier with tabs, single quotes, 100 char width, no trailing commas
- **Imports**: ES modules, relative imports for local files
- **Naming**: camelCase for JS/variables, kebab-case for files/routes, PascalCase for components
- **Files**: `.svelte` for components, `.js` for logic, `.md` for blog posts
- **Prerendering**: Required for static builds - add `export const prerender = true;` to routes
