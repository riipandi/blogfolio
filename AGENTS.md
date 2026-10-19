# EmDash portfolio site

EmDash is a CMS built on Astro, with a full admin UI at `http://localhost:4321/_emdash/admin`.

## Commands

- `pnpm dev` — start the dev server (also regenerates `emdash-env.d.ts`)
- `pnpm dlx emdash types` — regenerate collection types from a running site

## Key files

- `astro.config.mjs` — `emdash()` integration, database, storage, fonts
- `src/live.config.ts` — EmDash loader registration; boilerplate, don't modify
- `seed/seed.json` — schema + demo content (collections, fields, taxonomies, menus, widgets)
- `emdash-env.d.ts` — generated collection types
- `src/layouts/Base.astro` — base layout with EmDash wiring (menus, search, page contributions)
- `src/pages/` — Astro pages, all server-rendered

## Skills and docs

Load skills from `.agents/skills/` when the task calls for them:

- `building-emdash-site` — start here: querying content, Portable Text, schema design, seed files, menus, widgets, search, SEO, comments, bylines
- `creating-plugins` — hooks, storage, admin UI, API routes, Portable Text block types
- `emdash-cli` — content management, seeding, type generation, visual editing flow

Verify APIs, hooks, config options, field types and patterns with `search_docs` on the docs MCP server (`https://docs.emdashcms.com/mcp`); the live docs are current, training-data recall may not be. `.mcp.json`, `.cursor/mcp.json` and `.vscode/mcp.json` auto-configure Claude Code, Cursor and VS Code; other tools need a one-time setup: [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Code rules

- All content pages are server-rendered (`output: "server"`); no `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Render them, gallery images included, with `<Image image={...} />` from `"emdash/ui"`; never reduce them to raw URLs.
- `entry.id` is the slug (for URLs); `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- With Astro's cache enabled, pass content-query hints to `Astro.cache.set(cacheHint)`, and use the `WithCacheHint` variants for site settings, menus, taxonomies and widget areas rendered by cached routes.
- Taxonomy names in queries must match the seed's `"name"` exactly (`"tag"`, not `"tags"`).

## Code comments

Rare and short: a comment says only what the code can't.

- **Write one for** a non-obvious why (why this over the obvious alternative), an invariant or contract callers must keep, or a trap (order dependence, platform quirk, harmless-looking failure).
- **Don't** restate the code or the name, narrate change ("now", "no longer", "used to"), or reference decisions, tickets, sessions, or other files. Name the concept or symbol instead; a good name beats a comment.
- **Shape:** a few plain lines, English, under ~100 characters each. No banners, no commented-out code, no TODO without a concrete next action.
- **Directives** (tool-read suppressions like `// oxlint-disable-next-line` or `@ts-expect-error`) follow the tool's exact syntax, stay scoped to the narrowest line, and carry a reason when the suppression isn't self-evident.
- Update or delete any comment your change makes wrong. A stale comment is a defect.

## Content model

- `projects`: `title`, `featured_image`, `client`, `year`, `summary` (text), `content` (Portable Text), `gallery` (repeater: required media-library `image` + optional `caption`; detail page only), `url`.
- `pages`: `title`, `content` (Portable Text); used for `/about`.
- Taxonomy `tag`: work-index filtering and project metadata. One menu: `primary`.
- Site settings `title` and `tagline` both render on the home page.

## Pages

| Path           | Shows                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `/`            | Site title (centred serif) + tagline (italic), "Selected Work" grid: 3–6 projects, one strong image each, no gallery thumbnails |
| `/work`        | Heading + summary, tag filter chips, full grid                                                  |
| `/work/[slug]` | Meta line, big serif title, summary, featured image, Portable Text body, optional gallery, URL  |
| `/about`       | Page content (Portable Text)                                                                    |
| `/contact`     | Direct email CTA that opens the visitor's email app (no form). Replace the example address in `src/pages/contact.astro` before publishing |

## Design

Editorial, near-monochrome portfolio for designers, photographers, illustrators and studios. Typography and generous whitespace carry the design; the work is the decoration, and the only saturated colour on the page should be inside images.

- Type: Playfair Display serif (`--font-heading`) for the site title, hero, project and page titles, and contact column labels; system sans (`--font-body`) for everything else. Serif weight is calm on purpose: `--font-weight-heading` and `--font-weight-display` are both 500 (raise for a heavier voice).
- Colour: a single accent, `--color-brand` (`#7c3aed`), used sparingly for link hover and focus states.
- Copy: specific (a client name, a discipline, a year), never generic ("Welcome to my portfolio", "Crafting beautiful experiences").
- Never: gradients, drop shadows on cards, coloured section backgrounds, a second accent colour, or a display font on `--font-body`.

## Styling

- Override tokens in `src/styles/theme.css`; it's unlayered, so it beats the `@layer base` defaults in `src/styles/tokens.css`. Don't edit `tokens.css` or `Base.astro` for visual changes.
- Colours use `light-dark(<light>, <dark>)`; there is no separate dark palette. A plain-colour override changes both modes; use `light-dark()` to keep them distinct.
- Display face: in `astro.config.mjs` under `fonts:` (Astro Fonts API), swap `name:` for any Google Fonts serif and keep `cssVariable: "--font-heading"`. Good pairings: Cormorant Garamond, Fraunces, EB Garamond, DM Serif Display. `--font-body` is a plain token in `tokens.css`; override it in `theme.css` only with a reason.
- Key tokens (full list in `tokens.css`): `--color-brand`, `--color-on-brand`, `--color-brand-ring` (accent); `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border` (neutrals); `--color-danger` (form errors); `--font-size-4xl` (home and project titles); `--max-width` (720px), `--wide-width` (1200px).

## Git

- Check `git status` and stage explicit paths only; never `git add -A` or `git add .`.
- Commit only when this turn asks for it; never push. Otherwise, when finished, suggest a one-line message and list the paths.
- Message format: `{feat,fix,docs,refactor,chore}[(scope)]: <concise message>`.
- Never run `git reset --hard`, `git checkout .`, `git clean -fd`, `git stash`, `git commit --no-verify`, or `git push --force`.
