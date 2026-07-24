# FRAG.LOG — Design System

## What this is
FRAG.LOG is a fictional stats-tracking tool for tactical FPS players (Valorant/CS-style). This design system captures its visual concept: **Terminal + Arcade Ledger** — a dense, monospace data tool with one loud, earned moment of color (amber) reserved for hero numbers and win states.

**Sources provided:** no codebase or Figma file was attached. This system was built from a written brand brief plus five reference mockups uploaded to `uploads/`: wordmark, UI components sheet, data viz treatment, empty/error states, and a sample promotional piece. Those PNGs are the ground truth for exact colors, spacing, and component shapes — refer back to them if in doubt. No production codebase or Figma link exists to re-check against; if one becomes available, re-verify this system against it.

## Index
- `styles.css` — root stylesheet, imports everything below
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `base.css` (resets, keyframes)
- `components/core/` — Button, StatusTag, RankBadge, Input
- `components/data/` — StatTile, LineChart, BarChart, DataTable
- `components/feedback/` — EmptyState, ErrorState
- `components/brand/` — Wordmark
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius, promo ad)
- `ui_kits/fraglog/` — interactive click-through recreation of the 5 core app screens
- `SKILL.md` — Claude Code / Agent Skills compatible entry point

## Components
Button, StatusTag, RankBadge, TierTag, Input, StatTile, LineChart, BarChart, DataTable, EmptyState, ErrorState, Wordmark.

**Intentional additions** (not shown in the reference mockups, added to make the UI kit functional): StatTile (hero number + label pairing implied by the data-viz mockup and screens list), DataTable (order-book style grid implied by "tables: left-align text, right-align numeric" in the brief), LineChart/BarChart (built to the exact visual spec described under Data Visualization).

## Content fundamentals
- **Tone**: the product reports facts, it doesn't cheerlead. No exclamation points, no "successfully," no congratulatory tone. A win is communicated through the amber tag and hero number — never a burst of copy or motion.
- **Casing**: sentence case for prose ("no matches logged yet."), lowercase for in-app labels, map names, stat labels — reinforces a "raw log output" feel.
- **Buttons**: lowercase, underscore_case — `view_match`, `export_log`, `refresh_log`, `retry_sync` — never "View Match."
- **Headlines** (marketing): lowercase, blunt, data-driven — "know your frag_efficiency." not "Level up your game!"
- **Meta-labels**: small underscore_case tags above empty/error copy — `empty // no_matches`, `error // sync_failed` — read like system log output.
- **No emoji.** No mascot, no illustration accompanying copy.
- **Voice example** (error state): "couldn't reach the match server. last synced 14 minutes ago. retry the connection below." — factual, not apologetic.

## Visual foundations
- **Palette**: warm near-black base (`#14100a`), never pure black or cool gray. Amber (`#f0a93e`) and a warm red-orange loss signal (`#c85a3e`) are the *only* saturated colors in the system — used exclusively to signal state (win/loss/rank change/active), never decoratively. Everything else is the warm neutral scale (text primary/secondary/muted, row/border neutrals).
- **Type**: one family only — Cascadia Mono (regular/400, semibold/600 — never light). Hero numbers (rank, win rate, K/D, streaks) use the same family at semibold/600 and a large size; weight + scale alone create the "hero" moment, never body text. A separate pixel/LCD display face was tried and rejected for reading too arcade-game rather than serious terminal tool. Labels are lowercase with ~1px letter-spacing.
- **Performance tier ladder**: a second color system, separate from the win/loss signal, for grading stats/agent/weapon performance — gray (below average) → blue (average) → purple (excellent). Amber and red are never reused here: amber stays reserved for MVP/hero numbers/wins (the rarest, most earned color), red stays reserved for losses. `TierTag` implements this.
- **Layout**: dense, grid-driven, real data-tool density — not generous SaaS whitespace. Hairline dividers (`#3a2f1c` rows on `#241d11` alternating background) separate rows and sections instead of card shadows or elevation. Hero stat rows use a 3-column grid: label above number, generous gap between stats, tight internal spacing.
- **Corners**: sharp, 2px radius only on buttons/tags/badges/inputs. No pill shapes, no fully-rounded corners.
- **Shadows / elevation**: none. No card shadows, no glassmorphism, no blur. Structure comes from hairline borders and background-color banding only.
- **Backgrounds**: flat color only. No gradients, no textures, no photography, no 3D renders. The product's own data/UI is the imagery — including in marketing contexts.
- **Animation**: minimal and functional. Simple opacity/fade transitions for state changes; no bounce/spring easing, no decorative hover animation beyond a subtle border/color shift. The one recurring motion signature is the blinking cursor on the wordmark (`frag.log_`) — reused anywhere the product implies something is "live" (loading, match in progress, syncing). No skeleton shimmer, no confetti/celebration bursts on wins.
- **Hover / press states**: buttons shift border/text color only (no scale, no shadow). Inputs get a thin amber border-bottom on focus — no glow.
- **Transparency/blur**: not used.
- **Imagery color vibe**: n/a — this system uses no photography or illustration by design.

## Iconography
No icon system, icon font, or SVG icon set appears in the source material. The reference mockups use **text only** — abbreviated rank strings (`IRON`, `RDNT`), status words (`win`/`loss`/`mvp`), and underscore_case labels — in place of icons or crests. Follow that convention: prefer a short text label over an icon. If a future screen genuinely needs an icon (e.g. a settings gear), use a minimal line-style glyph in the secondary text color, never colored unless indicating a state change, and flag the addition here.

## Logo
No logo mark exists in the source material — only a wordmark treatment: `frag` + an amber "." (styled as a blinking terminal cursor in motion contexts) + `log` + a trailing blinking cursor (`_`). This is rendered in type (`components/brand/Wordmark.jsx`), not an image asset. Do not invent a logomark.

## Font
No font files were provided. Cascadia Mono loads as a self-hosted embedded web font via `@fontsource/cascadia-mono` on jsDelivr (`@import` in `tokens/typography.css`, weights 400/600 only) — renders identically regardless of what's installed locally. (A pixel/LCD display face was tried for hero numbers and dropped per feedback; an IBM Plex Mono substitution was tried after that and has since been replaced with Cascadia Mono per feedback. Hero numbers now use Cascadia Mono semibold/600 at large size.)

## Caveats & ask
- Built entirely from the written brief + 5 reference PNGs — no codebase or Figma to cross-check against. If a FRAG.LOG codebase or Figma file exists, attach it and this system should be re-verified/reconciled against it.
- The component set (buttons, tags, badges, inputs, charts, table, empty/error, wordmark) covers everything shown in the mockups plus the minimum extra needed for a working UI kit. Tell me if you want additional primitives (e.g. Tabs, Modal) built out.
- Please look over `ui_kits/fraglog/` and the specimen cards and flag anything that reads as "generic gamer UI" rather than FRAG.LOG's terminal/ledger concept — that's the failure mode this brief explicitly warns against.
