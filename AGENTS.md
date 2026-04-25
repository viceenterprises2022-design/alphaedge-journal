# AGENTS.md — AlphaEdge Journal

## Project Overview

This repo contains **two separate apps** that deploy to Vercel:

| URL | App Type | Entry |
|-----|---------|-------|
| `/app` | Next.js App Router | `source/` |
| `/marketing` | Static HTML + React (CDN) | `ui_kits/marketing/` |
| `/` (root) | Static HTML + React (CDN) | `ui_kits/app/` |

The `vercel.json` rewrites route traffic to these static builds.

## Development Notes

- **No `package.json`** — This is a static Vercel deployment. There is no npm to run.
- **`source/` is Next.js** — Uses App Router, Clerk auth, Redux, local fonts. It's mounted at `/app` via rewrite.
- **`ui_kits/` is vanilla React** — Loads React via CDN, uses Babel standalone, Tailwind CDN. No build step required.
- **Fonts** — Geist via Google Fonts CDN in HTML kits; local `source/fonts/main.woff2` in Next.js app.

## Key Files

- `vercel.json` — Routes configuration
- `source/layout.tsx` — Next.js root layout (Clerk + Redux)
- `ui_kits/app/index.html` — Main app shell entry point
- `ui_kits/marketing/index.html` — Marketing site entry point
- `colors_and_type.css` — Design system tokens (shared across both apps)

## Non-Obvious Details

- `source/` uses `@clerk/nextjs` for authentication
- Tailwind config is inline in `<script>` tags in the HTML kits
- Trading colors: `buy` (#76b562), `sell` (#e96a5e) — used throughout for trade indicators

## Testing / Deployment

```bash
# Vercel auto-deploys on push to main
# PRs get preview deployments automatically
```

No local build or test commands exist. Edit files directly and push to deploy.