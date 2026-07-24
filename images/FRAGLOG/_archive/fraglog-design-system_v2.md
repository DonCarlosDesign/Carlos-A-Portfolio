# FRAG.LOG — Design System

Fictional FPS/tac-shooter (Valorant/CS-style) stats tracker. Concept: Terminal + Arcade Ledger hybrid — a serious data tool with one loud, earned moment of color.

## Concept summary
- Base: dense, monospace-driven data grids — trading-desk / order-book layout, minimal chrome, rules and dividers instead of card shadows.
- Accent: a pixel/LCD-adjacent display face reserved only for hero numbers (rank, win rate, K/D, streaks) — like a marquee sitting on top of the terminal grid.
- Discipline: color is rare and earned. If it shows up on every border and icon, the concept collapses back into generic gamer UI.

## Color palette
- Background (base): `#14100a` — near-black, warm undertone (not pure black, not cool gray)
- Background (row divider): `#241d11`
- Border (hairline): `#3a2f1c`
- Text (primary): `#e6d9c4` — warm off-white
- Text (secondary/labels): `#8e7a56`
- Text (muted/meta): `#6a5b41`
- Accent (amber — hero numbers, wins, active states): `#f0a93e`
- Signal (loss/negative only): `#c85a3e` — warm red-orange, stays in the same warm family as the rest of the palette rather than a cold system red. Reserved strictly for losses/negative outcomes — not part of the tier ladder below.

**Performance tier ladder** (for grading stats, weapon/agent performance, rank tiers — inspired by Borderlands' weapon-rarity color logic, not the win/loss signal above):
- Gray (existing neutral scale) — below average / common
- Blue — solid / average performance
- Purple — excellent / rare-tier performance
- Amber — stays reserved for MVP/hero numbers and win states only; it is the top of the ladder and must stay rare — do not reuse it as a generic "high tier" color or it loses its earned, special quality

**Rule:** amber is still the rarest, most "earned" color in the system — reserved for hero numbers, MVP, and wins. Red is reserved only for losses/negative signal. Blue and purple are free to use more broadly for tiering/grading without diluting amber's meaning.

## Typography
- One family only: IBM Plex Mono (or JetBrains Mono) — no separate display/pixel typeface. A second "pixel/LCD" font was tried and rejected for reading too much like a retro arcade game rather than a serious terminal tool.
- Hero numbers (rank, win rate, K/D, streak counters): same IBM Plex Mono family, bold/700, at a large size — the weight and scale alone create the "hero" moment, no separate face needed
- Labels are lowercase with letter-spacing (~1px) — reinforces the "terminal readout" feel over standard UI casing
- Two weights only: regular (400) for data/body, bold (700) for hero numbers and win states

## Spacing & layout
- Dense, grid-driven — real data-tool density, not generous SaaS whitespace. Dense should not mean cramped: a first-pass build read as too tight, so err toward more breathing room in rows and cards while keeping the overall page denser than a typical SaaS dashboard.
- Hairline dividers (`#3a2f1c` / `#241d11`) separate rows and sections instead of card shadows or elevation
- Hero stat row: 3-column grid, label above number, generous gap between the 3 stats but tight internal spacing
- Tables: left-align text columns, right-align numeric columns, consistent row height with enough vertical padding that rows don't feel stacked on top of each other

## Iconography & imagery
- No decorative icons, no illustration, no gradients, no glow/blur effects
- If icons are needed, keep them minimal line-style, same warm neutral as secondary text — never colored unless indicating a state change
- No stock photography or 3D renders — this is a data tool, not a lifestyle brand

## Voice / naming conventions
- Product name: FRAG.LOG (the "." can be treated as a blinking terminal cursor in motion contexts)
- Sentence case throughout, lowercase for in-app labels (map names, stat labels) — reinforces "raw log output" feel
- No exclamation points, no "successfully," no congratulatory tone — the product reports facts, it doesn't cheerlead

## Components

### Buttons
- Primary (amber fill, near-black text): reserved for the single main action on a screen — e.g. "view_match." Sharp corners (2px radius), not pills.
- Secondary (transparent, hairline border, primary text color): default action button — most buttons on screen should be this style
- Disabled (transparent, dim border and text `#6a5b41`/`#241d11`): stays visible, never fully hidden
- Labels: lowercase, underscore_case (matches the "raw log output" voice) — `view_match`, `export_log`, not "View Match"

### Status tags
- Small, sharp-cornered (2px radius) fill tags for match/round outcomes: win (amber-on-dark-amber), loss (warm red-orange-on-dark), pending (neutral), mvp (amber, bold)
- Tags are the only place besides hero numbers where color fill is used — keep them small and text-sized, never oversized badges

### Rank badges
- Square (not circular) badge outline, 48px, hairline border in the neutral tone for standard ranks, amber border + bold amber text only for the player's current/active rank
- Abbreviated rank text (e.g. "IRON," "RDNT") rather than icon-heavy rank crests — keeps consistent with the terminal/text-driven concept

### Inputs
- Flat fill (`#1c1811`), hairline border, sharp corners, monospace placeholder text, no focus glow — a thin amber border-bottom on focus is enough

## Ad / promotional direction
- Same base palette and monospace type — ads should look like an extension of the product, not a separate marketing register
- Headline pattern: lowercase, blunt, data-driven phrasing — "know your frag_efficiency." not "Level up your game!"
- One clear CTA button (primary/amber style), lowercase with a trailing `>` to imply a terminal command
- Wordmark placed small and dim in a corner (`#3a2f1c` with amber dot) — a signature, not a logo lockup shouting for attention
- No hero photography, no player renders — the product's own data/UI is the imagery

## Empty & error states
- Empty state: hairline border box, neutral tone throughout — a plain statement of fact ("no matches logged yet") plus a one-line explanation of what triggers content, plus a secondary-style button. No illustration, no mascot.
- Error state: same box treatment, but border and label shift to the warm red-orange signal color, with a primary-style button in that same color for the retry action. Copy stays blunt and factual ("couldn't reach the match server") — never apologetic, never exclamation-pointed.
- Both states keep the underscore_case labeling convention (`no_matches`, `sync_failed`) as a small meta-label above the message, reinforcing the "system log" voice.

## Data visualization
- Line charts (rank/win-rate trends): single amber line, no fill/gradient under the curve, dashed hairline gridlines in the neutral border tone, current value called out with a dot + label at the line's endpoint rather than a legend
- Bar charts (per-map/per-agent comparisons): flat-fill bars, amber for above-average/win performance, the warm red-orange signal color for below-average — same two-color discipline as everywhere else, no rainbow-per-bar coloring
- Axis labels: small, muted (`#6a5b41`), monospace, minimal — dates/categories only, no unnecessary tick marks or axis titles
- No 3D bars, no glow/drop-shadow on data lines, no gradient fills under area charts

## Motion notes
- The blinking cursor (used on the "frag.log_" wordmark) is the system's one recurring motion signature — it should reappear anywhere the product implies something is "live": a loading state, a match currently in progress, a "syncing" indicator
- Outside of that cursor blink, motion stays minimal and functional: simple fades/opacity changes for state transitions, no bounce/spring easing, no decorative hover animations beyond a subtle border/color shift on buttons
- Avoid: skeleton-loading shimmer effects, animated gradients, confetti/celebration animations on wins — a win is communicated through the amber tag and hero number, not a burst of motion

## Screens to design
1. Overview/home — hero stats (rank, win rate, K/D) + recent match list
2. Match detail — round-by-round timeline, full scoreboard
3. Agent/weapon breakdown — performance sliced by character/loadout
4. Leaderboard/ranked ladder — arcade high-score-board reference returns strongest here
5. Profile/season summary — rank history trend, badges/milestones

## What to avoid
- Purple/blue "safe SaaS" gradients
- Neon-on-black cyberpunk esports cliché
- Rounded pill buttons / soft shadows / glassmorphism
- Any color used decoratively rather than to signal a state (win/loss/rank change)
