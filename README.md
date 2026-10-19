# EmDash Blogfolio Template

<p align="left">
    <a href="https://github.com/riipandi/blogfolio/pulse">
        <img src="https://img.shields.io/badge/Contributions-welcome-gray.svg" alt="Contribution">
    </a>
    <a href="https://github.com/riipandi/blogfolio">
        <img src="https://img.shields.io/github/languages/top/riipandi/blogfolio" alt="Top language">
    </a>
    <a href="https://aris.mit-license.org">
        <img src="https://img.shields.io/github/license/riipandi/blogfolio" alt="License">
    </a>
</p>

A visual portfolio for showcasing creative work and blog, built with [EmDash](https://github.com/emdash-cms/emdash).
Runs on any Node.js server with SQLite and local file storage. Project pages with tag filtering, case study layouts, and an RSS feed for new work.

> [!NOTE]
> This project just a template that I use for my personal use, so you may encounter bugs.
> Please review the release notes thoroughly before updating, as breaking changes can occur!

## What's Included

- Project grid with hover effects
- Tag-based filtering on the work page
- Individual project pages with galleries
- About and contact pages
- Short-link redirects (`/l/[slug]`) with optional password protection, expiry dates, and click counting
- Blog with category and tag archives, threaded comment replies, and live search
- RSS feed for new projects
- SEO metadata and JSON-LD
- Page-load entrance transitions and scroll-driven media reveals (pure CSS, reduced-motion aware)
- Dark/light mode

## Infrastructure

- **Runtime:** Node.js
- **Database:** SQLite (local file)
- **Storage:** Local filesystem
- **Framework:** Astro with `@astrojs/node`

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open <http://localhost:4321/_emdash/admin> and complete the setup wizard.
EmDash runs database migrations and applies the portfolio seed during setup.
The site is available at <http://localhost:4321>.

For detailed explanation on how things work, check out [EmDash documentation](https://docs.emdashcms.com/).

## Deployment

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/riipandi/blogfolio/tree/main)

## Development

This project uses TypeScript for type checking and the [oxc](https://oxc.rs) toolchain
([oxfmt](https://oxc.rs/docs/guide/usage/formatter) + [oxlint](https://oxc.rs/docs/guide/usage/linter))
for formatting and linting, configured in [`.oxfmtrc.json`](./.oxfmtrc.json) and
[`.oxlintrc.json`](./.oxlintrc.json). Editor integration is preconfigured for
[VS Code](./.vscode/settings.json) and [Zed](./.zed/settings.json).

Available scripts:

```sh
pnpm dev         # dev server on :4321 (regenerates emdash-env.d.ts)
pnpm build       # production build
pnpm format      # format the codebase (oxfmt)
pnpm lint        # lint with auto-fix (oxlint)
pnpm check       # formatting + linting in check mode
pnpm typecheck   # astro check
```

Source imports use the `#/` path alias mapped to `src/` (see [`tsconfig.json`](./tsconfig.json)).

## Contributions

Please open a pull requests for your changes and tickets in case you would like to
discuss something or have a question. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for
detailed documentation.

## Aknowledgements

This project adopted from the official EmDash templates:

- [Blog template](https://github.com/emdash-cms/templates/tree/main/blog)
- [Marketing template](https://github.com/emdash-cms/templates/tree/main/marketing)
- [Portfolio template](https://github.com/emdash-cms/templates/tree/main/portfolio)

with some customizations and additional features.

## License

This project licensed under the [MIT License](https://choosealicense.com/licenses/mit).
See the [LICENSE](./LICENSE) file for more information.

---

<sub>If you like my work, you can support me via [GitHub sponsors](https://github.com/sponsors/riipandi).</sub>

[![Creator Badge](https://badgen.net/badge/icon/by%20Aris%20Ripandi?label&color=black&labelColor=black)](https://twitter.com/intent/follow?screen_name=riipandi)
