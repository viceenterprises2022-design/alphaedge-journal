# AlphaEdge Journal — Design System

A free, AI-powered platform that lets traders log trades, explore analytics, build rule-based strategies and receive Claude-generated performance reports. The product skin is **warm off-white paper + soft saddle-leather shadows + a single Claude-orange accent**.

This design system was extracted from the live codebase (Next.js + Tailwind + shadcn/ui + GSAP) and is intended to produce pixel-faithful mocks, slides and new screens that feel like they belong to AlphaEdge Journal.

---

## Sources

- **Codebase (primary source of truth):** GitHub `Bilovodskyi/ai-trading-journal` (imported under `source/`)
  - `source/globals.css` — color tokens, shadow recipes, custom keyframes
  - `source/home-page/*` — marketing site (nav, hero, AI section, calendar, journal, reviews, footer)
  - `source/private-layout/PrivateLayoutClient.tsx` — in-app chrome
  - `source/calendar/*`, `source/history/*`, `source/strategies/*`, `source/tradeAI/*`, `source/trade-dialog/*`, `source/journal/*` — feature surfaces
  - `source/ui/*` — shadcn primitives (Button, Card, Table, Dialog, Accordion, Sheet, Tabs, HoverCard, Select)
- **Brand mark:** `assets/logo.svg` (dark rounded tile with gradient "J" glyph)
- **PixiJS reference upload:** `uploads/shoan-pixi.html` — stylistic reference the user provided for PixiJS usage. **Note:** its content is a Japanese-tea brand, not trading. I used it only as an implementation reference for `<pixi.js>` canvas mounts; none of its palette/type carries over.

### Caveats / flags
- The local folder `Trading-journal-rules/` was attached but returned **empty** via `local_ls`. I proceeded with the GitHub repo + upload only.
- No font files were in the repo — the app ships with `Arial, Helvetica, sans-serif`. I use the system sans as the authentic body stack and substitute **Geist / Geist Mono / Inter** (Google Fonts CDN) for the marketing display, matching the weight / tracking of the compiled site. **Ask the user if they'd like a brand-specific display face instead.**

---

## Index

```
.
├── README.md                     ← you are here
├── SKILL.md                      ← agent skill manifest
├── colors_and_type.css           ← all CSS variables (palette, type, shadows, motion)
├── assets/
│   └── logo.svg                  ← brand mark
├── preview/                      ← design system cards (registered in the sidebar)
├── ui_kits/
│   ├── marketing/                ← public site recreation
│   └── app/                      ← in-app dashboard recreation
├── source/                       ← imported codebase (read-only reference)
└── uploads/
    └── shoan-pixi.html           ← PixiJS reference (not brand content)
```

---

## Content Fundamentals

TradeJournal writes like a friendly but evidence-minded coach. Trader-to-trader, never finance-marketing. (Product is branded **AlphaEdge Journal**.)

| Dimension | Pattern | Evidence |
|---|---|---|
| Voice | Direct, encouraging, second-person ("you", "your trades"). Rarely "we". | *"Trade like a professional."* / *"Your trading achievements, all in one place."* |
| Casing | **Sentence case** everywhere. Section titles are headline-length sentences that end with periods. | *"Visual Calendar. Simple. Powerful."* / *"Join today."* |
| Punctuation | Hero headlines use periods as a quiet stop, not excited punctuation. No em-dashes in copy. Ellipses used sparingly in UI states ("Generating…"). | *"Trade like a professional."* |
| Hype level | Low-key confident. Uses concrete numbers ("1,000 traders") and warnings ("No financial advice") instead of superlatives. | Hero trust pill: *"Trusted by over 1,000 traders worldwide!"* |
| Section eyebrows | One-word chip above each section title: **Charts**, **Summary**, **Calendar**, **Reviews**, **Feature**. | Always in a hairline-border pill with sm shadow. |
| CTAs | Short verbs + clear value. Mix of free-forward copy: "Get started — for free", "Join for free today", "Start Journaling", "Get report ↗". | Footer CTA pill + hero button. |
| Feature naming | Title Case product nouns: **Calendar**, **History**, **Statistics**, **Trade AI**, **Strategies**, **Archive**, **Journal**. |
| Legal copy | Blockquote warning callouts styled like a GitHub admonition. *"No Financial Advice"*, *"User Responsibility"*. |
| Emoji | Sparingly. `💡` used inside journal tip callouts. `⭐️` for support asks. Never in marketing headlines. |
| Numbers / tabular | German-locale thousands formatting (`1.234,56`) in PnL cells (see `MonthView.tsx` → `.toLocaleString("de-DE")`). Tabular-numerals in all finance surfaces. |
| Tone for AI output | The AI report voice is plain-language analyst: *"Stop guessing why some trades succeed while others fail."* Positioned as unbiased / objective. |

**Micro-copy vocabulary:**
> Log a trade · Open / Close · Buy / Sell · Strategy · Rules · Priority (High/Medium/Low) · Report · Archive · Token · Follow-up · Journal entry · Calendar · Month view / Year view

---

## Visual Foundations

### Paper-and-ink aesthetic
The system is built on a **warm off-white** (`#fbfaf9`) that runs through page, cards and most surfaces. Secondary surfaces step darker to `#f4f1ee` and `#e8e7e5`. This is **not a white app** — the whole product feels like aged book paper. A muted **claude-orange** (`#da7756`) is the only accent hue that survives into chrome; everything else (green `buy`, red `sell`, blue/yellow/orange chart accents) is reserved for data.

### Color
- Neutrals: `--primary #fbfaf9`, `--darkPrimary #e8e7e5`, `--secondary #f4f1ee`, `--tertiary #6e747c`, ink `#3d3929`.
- Brand accent: `--claude #da7756` with 10% tint for Claude surfaces.
- Semantic (data only): `--buy #76b562`, `--sell #e96a5e` — both with `Opacity` (40%) and `Light` (20%) variants for backgrounds on calendar day cells.
- Data accents: `--customBlue #9999ff`, `--customOrange #e16540`, `--customYellow #fac666`.
- A signature **orange→amber text gradient** (`#fd5a24 → #ffb73a`) is reserved for a single accented word in the hero; used via `background-clip: text`.

### Type
- Body stack is the honest `Arial, Helvetica, sans-serif` — unusual, but it's what the production site ships. We keep it.
- Marketing display uses a gradient "main-text" treatment: `bg-gradient-to-br from-zinc-800 via-zinc-600 to-zinc-950` clipped to text. Available as `.display-gradient`.
- Hero sizes: `6rem` (96 px) for the primary title, `3rem` for the sub-verb, `2rem` for the lede. Body is `14px`; `<p>` default is `0.8rem` (12.8 px) — small-type product.
- Weight hierarchy: **300 / 400 / 500 / 600 / 700** — but 600 dominates headings, 400 for body.

### Spacing & layout
- Container padding cadence: `px-3` (mobile) → `px-12` (md) → `px-48` (2xl). Home sections pin to `max-w-7xl` in the footer and `background-class` bleed in section bands.
- Radius scale (from Tailwind config): **4 / 6 / 8 / 12 / 16 / 24 / 40 px**. The big `rounded-[2.5rem]` (40 px) is reserved for the **dark CTA hero block in the footer** — its shape is a brand signature.
- Grid: app chrome is a `md:rounded-t-3xl` white sheet floating over a `bg-darkPrimary` desk. Calendar uses a 7-column `grid` with hairline `border-[0.5px]` cells — no big shadows on cells.

### Backgrounds
- **`background-class`** — `background-bars-colors.png` as a full-bleed, non-repeating, contain-sized hero pattern (desktop only). Soft pastel strips, behind the hero chart.
- **`gradient`** — a near-black vertical gradient (`rgba(49,45,43,.9) → rgba(32,30,29,.9) over #000`) for the dark "Charts" pin-scroll section.
- Cards use `bg-secondary` (paper) not `bg-white`.
- No full-bleed photography. No hand-drawn illustrations. No repeating textures.

### Shadows (the brand's quiet signature)
- **Black button (`.button-shadow`)**: 5-layer stack with warm `rgba(45,32,17,…)` tints — base `rgb(58,53,50)` background. Feels tactile, not flat black.
- **White button (`.button-shadow-white`)**: embossed paper — `0 0 0 1px #efede8, 0 1px 2px #b2aa9e52, 0 3px 3px #d1cdc73d, 0 -2px #f0f0efb3 inset`. The `inset` highlight along the bottom edge is what makes it feel like a physical card.
- **Switch (`.switch-button`)**: saddle-leather tan — `rgba(112, 69, 26, …)` shadows with `inset` highlights that shift when toggled. Stands out as the only ornament in the dashboard.
- **Calendar cells (`.calendar-banner-shadow`)**: hairline `0 0 0.4px 0.4px` — pure edge definition.
- **Cards**: `shadow-md` / `shadow-2xl shadow-zinc-200` — no color tint. Light, generic.

### Animation
- Library: **GSAP + ScrollTrigger** for the parallax "Charts" section on the home page.
- Easing: `cubic-bezier(0.6, 0.6, 0, 1)` for the switch, `0.22 1 0.36 1` for hovers and luxe transitions. Durations: 450–700ms for luxe, 200ms for buttons, 120ms for micro.
- **Reviews marquee** — two rows drift opposite directions (`slideRight`/`slideLeft`, 30s ease-in-out alternate).
- **Bouncing dots loader** (`.dot`, `.running-algorithm`) — staggered `animation-delay` at `0 / .2s / .4s`, translateY(-10px).
- **Accordion** — Radix's `--radix-accordion-content-height` keyframe (0.2s ease-out).
- No pop-in / bounce on cards. Parallax is the showcase motion.

### Hover states
- Nav items: `hover:bg-darkPrimary` (solid neutral tint, no underline).
- Black button: background shifts `#3a3532 → #4c4746`, shadow depth grows.
- White button: background stays, shadow depth and inset highlight grow.
- Links: underline animates width from 0→100% (emerald-400 for "Get report", terracotta in navigation).
- Icon buttons (footer social): `text-zinc-400 → text-zinc-900` + `bg-zinc-100`.

### Press / active
- No deliberate shrink/scale. Relies on the inset shadow flipping.

### Borders
- `border-zinc-200` (`#e4e4e7`) is the default hairline. Often `border-[0.25px]` or `border-[0.5px]` — deliberately thin.
- Rounded corners over hard borders almost everywhere.

### Transparency & blur
- `backdrop-blur-sm` on the "Join for free today" status pill in the dark CTA.
- `mix-blend-mode: multiply` on the marketing nav to tuck it under the paper.
- No frosted-glass large surfaces.

### Imagery mood
- Product screenshots are the hero imagery — `scroll-parallax-1..6.png`, `calendar.png`, `statistics-page-*.png`. Mood: cool-neutral app screenshots photographed on paper-colored backdrops.
- Small fake-user avatar strip (4 faces overlapped, white ring) used for social proof.

### Cards
- Base: `bg-white` or `bg-secondary` · `rounded-xl` (12 px) · `border border-zinc-200` · `shadow-md`.
- "Hero" cards (CTA, dark feature) step up to `rounded-[2.5rem]` and `shadow-2xl shadow-zinc-200`.
- Journal preview card fakes macOS window chrome (traffic lights + URL bar) and tilts `rotate-1` → `hover:rotate-0`.

### Fixed layout rules
- Sticky top-center nav in a pill: `sticky top-0 md:top-2 px-3 lg:px-48 z-[999]`. As you scroll past `#nav-trigger-section`, GSAP snaps the nav to `width: 60%` and adds the `mobile-navbar-shadow`.
- App layout: full-viewport `h-svh` shell, `p-2` padding on desktop, content sheet has `md:rounded-t-3xl`.

---

## Iconography

AlphaEdge Journal uses **two icon libraries side-by-side** — both loaded from CDN in the real app, so we do the same.

1. **Lucide React** (`lucide-react`) — default UI icons. Stroke 1.5–2, 16/20 px typical. Examples in code:
   - `ArrowRight`, `Github`, `Twitter`, `Calendar`, `PenLine`, `Book`, `CheckCircle2`, `MoveUpRight`, `FileText`, `ChevronDown`, `ExternalLink`.
2. **react-icons** — used for **brand marks** and a handful of specific products:
   - `SiClaude` from `react-icons/si` — the Claude starburst (colored `#da7756`) appears next to the wordmark in the nav and on the "Powered by Claude" banner.
   - `FaStar` (`react-icons/fa6`) — filled yellow stars in review cards.
   - `FaGithub` — footer.
   - `BsJournalCheck`, `LuChartSpline`, `VscHistory`, `PiStrategyLight`, `RiMoneyDollarCircleLine`, `VscFolderLibrary` — the sidebar nav glyphs.

**CDN substitutions used here:**
- Lucide icons: loaded via `https://unpkg.com/lucide@latest` when needed in HTML mocks, else inline SVG.
- Claude starburst: reproduced as an inline SVG shape (same geometry as `SiClaude`).

**Emoji:** used only inside journal entry callouts (`💡` tip box). Never in headings. Never in product chrome.

**Unicode as icons:** the orange-amber `mark` tag is used as a highlight shape behind text, not as a glyph. No unicode used decoratively.

**Brand logo:** `assets/logo.svg` — a 100×100 rounded-square (12 px radius) in `#201E1D` with an inset gradient panel and a geometric "JT" wordmark. Four 1.5 px dots in the corners (reminiscent of a Polaroid). Used at 30–40 px wherever the "Journal" wordmark appears.

---

## Quick-start for agents

```html
<link rel="stylesheet" href="colors_and_type.css" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Then:
- Page shell: `background: var(--primary); color: var(--ink);`
- Cards: `bg-white rounded-xl border border-zinc-200 shadow-md p-6`
- CTA pill: `.button-shadow { ... }` on a dark button, `.button-shadow-white` on paper.
- Section head: `<span class="eyebrow">Charts</span>` + `<h1>` sentence.
- Any PnL number: use `--buy` or `--sell`; wrap the cell in `bg-buyLight` / `bg-sellLight`.

See `ui_kits/marketing/index.html` and `ui_kits/app/index.html` for complete compositions.
