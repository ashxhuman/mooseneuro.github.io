# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:4321 (hot reload)
npm run build     # Build static site to dist/
npm run preview   # Serve the production build locally
```

Always run `npm run build` before committing to catch type/schema errors that don't surface in dev mode.

## Architecture

This is an **Astro 5** static site for [mooseneuro.org](https://mooseneuro.org) — the website for MOOSE (Multiscale Object-Oriented Simulation Environment), a computational neuroscience simulator.

### Layout system

All pages wrap in `src/layouts/BaseLayout.astro`, which injects:
- SEO meta + Open Graph + JSON-LD structured data (from `src/data/schema.ts`)
- `Navbar` (React, `client:only="react"`) — responsive with desktop/mobile dropdowns; nav items defined in `src/components/nav-data.ts`
- `Banner` (React, `client:only="react"`) — top announcement bar
- `DiscussionButton` (React floating button)
- `Footer`

Collection-specific layouts (`BlogsLayout`, `NewsLayout`, `WorkshopLayout`) extend `BaseLayout`.

### Content collections

Astro content collections live in `src/content/`. Each has its own `*.config.ts` defining the Zod schema:

| Collection | Type | Key frontmatter |
|---|---|---|
| `blogs` | `content` | `title`, `date`, `author`, `authorimage`, `designation`, `affiliation`, `image`, `socialLinks` |
| `news` | `content` | `title`, `date` |
| `workshops` | glob loader | `title`, `description`, `url`, `image`, `pubDate`, `carouselheading` |
| `team` | `content` | `title`, `team[]` (name, designation, image) |

The central `src/content/config.ts` just re-exports all four configs.

### Dynamic routes

Each collection has `src/pages/<collection>/index.astro` (listing) and `[...slug].astro` (detail), using `getCollection()` + `getStaticPaths()`.

### Publications

`src/components/publication.astro` renders publications by reading `public/assets/publications.bib` at build time via `src/lib/citations.js` (uses `citation-js`, formats as APA HTML, auto-links DOIs). To add/update publications, edit the `.bib` file directly.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (not the old PostCSS integration)
- Brand colors defined in `src/styles/global.css` under `@theme is:global`: `brand-primary` (#41729f), `brand-secondary`, `brand-tertiary` (#274472)
- `@tailwindcss/typography` plugin used for `prose` classes in blog/markdown content
- KaTeX CSS imported globally for math rendering in markdown

### React components

Interactive components use `client:only="react"` or `client:load`. MUI is available but used sparingly. Shared UI primitives (button, card, carousel) are in `src/components/ui/` using shadcn-style CVA patterns.

### Images / assets

- Static assets served from `public/assets/` (logos, `.bib` file, images referenced in markdown)
- Imported assets (processed by Astro/Vite) live in `src/assets/`
- In markdown frontmatter, image paths should point to `public/assets/` and be referenced as `/assets/...` or relative paths from public root

### Standalone content files

Some pages import `.md` files directly via `import.meta.glob` rather than through Astro content collections:
- `src/content/FAQ.md` → `src/pages/faq.astro`
- `src/content/guidelines/CommunityGuidelines.md` → `src/pages/community.astro`
- `src/content/tutorials/tutorial.md` → documentation pages
- `src/content/support.md` → support page

Edit these files directly to update that page's content.

### Adding content

- **New blog post**: add a `.md` file to `src/content/blogs/` with required frontmatter (`title`, `date`)
- **New news item**: add a `.md` file to `src/content/news/`
- **New workshop**: add a `.md` file to `src/content/workshops/` with `title`, `url`, `image`, `pubDate`, `carouselheading`
- **New page**: add a `.astro` file to `src/pages/` — route is automatic
- **Nav changes**: edit `src/components/nav-data.ts`
