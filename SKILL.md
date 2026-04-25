# AlphaEdge Journal Design System — Skill

A warm paper-and-ink aesthetic for **AlphaEdge Journal**, a free AI-powered trading journal. Extracted from the live Next.js codebase and ready for mocks, slides, screens, and decks.

## When to use
Reach for this whenever the request mentions:
- AlphaEdge Journal, "AI trading journal", "Claude + trading"
- Warm off-white + Claude-orange aesthetic with tactile embossed shadows
- Calendar/statistics/strategies/journal/trade-log product surfaces

## What's here
- `README.md` — full context: sources, content rules, visual foundations, iconography
- `colors_and_type.css` — all tokens (palette, type, shadows, radii, motion) as CSS vars
- `preview/` — design-system reference cards (visible in the Design System tab)
- `ui_kits/marketing/` — recreation of the public marketing site (Nav, Hero, Charts parallax, Summary, AI, Calendar, Journal, Reviews, 40rem dark CTA footer)
- `ui_kits/app/` — recreation of the in-app dashboard (Calendar view, Statistics, Strategies with priority chips, Trade AI report, Journal, Trade log dialog)
- `assets/logo.svg` — brand mark
- `source/` — imported Next.js codebase, read-only reference

## Signature moves
- **Palette:** warm off-white (`#fbfaf9`) page, paper cards (`#f4f1ee`), ink text (`#3d3929`), single Claude-orange (`#da7756`) accent. `buy #76b562` / `sell #e96a5e` are reserved for data.
- **Type:** body ships as honest `Arial, Helvetica, sans-serif`; hero uses a `bg-gradient-to-br zinc-800 → zinc-600 → zinc-950` clipped to text (`.main-text`). Marketing display uses Geist.
- **Shadows:** 5-layer warm ink on black buttons (`.button-shadow`); embossed paper on light buttons (`.button-shadow-white`); saddle-leather tan on switches; hairline on calendar cells.
- **Radii:** the 40-px `rounded-[2.5rem]` dark CTA block is a brand signature; 24-px app chrome sheet; 12-px cards; thin `border-[0.5px]` hairlines everywhere.
- **Iconography:** Lucide + react-icons (SiClaude starburst). Numbers in German locale (`1.234,56`).
- **Motion:** GSAP parallax; Radix accordions; dual-direction marquee for reviews; bouncing dots loader.

## Start
```html
<link rel="stylesheet" href="colors_and_type.css" />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```
Then compose: page bg `var(--primary)`, cards `bg-white rounded-xl border border-zinc-200 shadow-md p-6`, CTAs using `.button-shadow` / `.button-shadow-white`, section heads with `.eyebrow` chip + sentence-case `<h1>`.

## Caveats
- Local `Trading-journal-rules/` folder was empty on `local_ls`; system built from GitHub + user's PixiJS upload.
- No branded display font was in the repo. Using Geist/Geist Mono as reasonable stand-ins; ask user if they'd prefer otherwise.
- Per user request, the marketing hero uses PixiJS for the soft color-strip backdrop (drifting pastel bars).
