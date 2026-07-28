# Don Carlos — Design System

A hot sauce brand carrying three generations of family legacy — a grandmother's restaurant, a father's nickname, now bottled as Green Sauce. Concept: dignified, custom, earned — a real family name treated with the same respect as an established heritage brand, never rustic-farmers-market or AI-generic.

## Concept summary
- The wordmark is the entire visual identity — no illustration, no flame icons, no chili pepper clipart, no portrait imagery. If the brand needs decoration to feel authentic, the wordmark isn't doing its job.
- Discipline: one accent color per palette variant (green), used to signal product/category — not scattered decoratively.
- The story (three generations, a name people already say with respect) does the emotional work. Copy and design should stay understated and let that story carry weight rather than over-explaining it.

## Color palette
Three approved brand background variants — not a single locked palette. Each is a complete, usable context on its own.

**Variant A — Near-black**
- Background: `#0f0f0d`
- Wordmark/text: `#f0ead6` (cream)
- Use for: premium packaging shots, social posts, primary brand presence

**Variant B — Deep green**
- Background: `#3d5c33`
- Wordmark/text: `#f7f0dc` (warm cream)
- Secondary text/tagline: `#c9d8b8` (pale sage)
- Use for: campaign moments, anything that should tie directly to "Green Sauce" as a product

**Variant C — Cream base**
- Background: `#e8dfc4`
- Wordmark/text: `#1c1c1a` (near-black)
- Use for: print contexts, lighter applications

**Product / accent green** (used on any background variant, for the "GREEN SAUCE" descriptor and green-tinted UI elements):
- Brand green (fills, buttons, filled tags): `#3d5c33`
- Sage (product descriptor text on dark backgrounds): `#9fb888`
- Pale sage (secondary text/tagline on the green variant): `#c9d8b8`

**Neutrals** (used across all variants):
- Muted label text: `#8a8578`
- Muted body text: `#c9c3ae`
- Hairline border: `#3a352a`

**Heat signal** (used sparingly — heat-level tags only, never decoratively):
- Border: `#b0472f`
- Text: `#d9714f`

**Rule:** pick one background variant per application and stay consistent within it — don't mix backgrounds within a single piece (e.g. don't put a near-black label on a green ad). The product green and neutrals can appear on any variant; the heat signal is reserved exclusively for spice-level indicators.

## Typography
- **Titles/headers:** Fraunces, bold/700 or semibold/600 — used for taglines, section headers, product names ("Green Sauce" style descriptors)
- **Body copy:** Work Sans, regular/400 for body text, medium/500-600 for UI labels and buttons — used for ingredient lists, descriptions, fine print, all UI text
- Both loaded as proper embedded web fonts (Google Fonts), never referenced by name alone without a fallback/embed
- **Deliberate contrast is the point:** Fraunces (serif, warm, personality) paired with Work Sans (sans, clean, legible) — an earlier pairing test with Lora for body copy was rejected for reading too similar to the title font and being harder to read at small sizes
- The wordmark itself ("Don Carlos") is a custom hand-lettered logotype, not a typeface — never attempt to recreate it in body text or use it as a font family

## Spacing & layout
- Generous, uncluttered — this is a premium product, not a dense data tool. Whitespace signals quality here, unlike a utility product.
- Label/packaging layout: wordmark centered and dominant, small supporting text (product name, volume) beneath, understated — nothing should compete with the wordmark for attention
- UI components: standard comfortable spacing, sharp-to-slightly-rounded corners (2-6px), no pill shapes

## Iconography & imagery
- No decorative icons on the core brand identity (label, wordmark)
- If icons are needed for UI/web (cart, menu, etc.), keep them minimal line-style, neutral tone
- No stock photography of peppers/food styling clichés — if product photography is used, it should be clean, editorial, studio-lit (see bottle mockup reference)
- No gradients, no glow/blur effects, no neon

## Voice / naming conventions
- Brand: Don Carlos. Product: Green Sauce.
- Tone: dignified, warm, specific — not playful, not cartoonish, not exclamation-pointed
- Copy should draw from the real story rather than generic heritage-brand language — e.g. "the green sauce people keep begging us to sell" (real, specific) beats "an old family recipe" (generic, could describe any product)
- Sentence case for most copy; small tracked-out caps acceptable for short labels/taglines (e.g. "THREE GENERATIONS. ONE RECIPE.")

## Components

### Buttons
- Primary (green fill, cream text): main action — "shop now"
- Secondary (transparent, cream border and text): default/supporting action — "our story"
- Disabled (transparent, dim border and text): stays visible, never fully hidden — e.g. "sold out"
- Labels: sentence case, natural language — "shop now" not "SHOP NOW" or "Shop Now"

### Tags & badges
- Small, sharp-cornered fill or outline tags: "small batch" (filled green), "family recipe" (outlined neutral), "new" (filled cream/inverted)
- Heat-level tag: outlined in the signal accent color, used only for spice-level callouts — this is the one place a warm red-orange accent appears

### Heat level indicator
- Dot-based scale (e.g. 3 dots, filled = heat level, unfilled = remaining headroom) with a small text label ("2 of 3 — medium")
- Green fill for filled dots, dim neutral for unfilled — do not use the red/orange signal color here, that's reserved for the heat tag only

### Inputs
- Flat dark fill, hairline border, sharp corners, paired with a primary button for actions like email signup
- Placeholder text in natural language ("your email," not "Enter your email address")

### Product card/tile
- Neutral dark card, hairline border, title in Fraunces, supporting details (size, format) and price in Work Sans
- No product photography required in the card itself — can be text-only for a clean commerce grid

### Quote treatment
- Fraunces italic, left border accent in the green brand color, used for customer testimonials or the brand's own founding story quotes

## Ad / promotional direction
- Centered, editorial composition — wordmark as the hero, small tracked-out tagline above, a short warm sentence of body copy below
- One variant (green or near-black) per piece — don't combine
- No stock photography, no lifestyle imagery — the wordmark and typography carry the whole piece
- Copy should reference the real story specifically, not generic "heritage" language

## What to avoid
- Flame icons, chili pepper illustrations, or any hot-sauce-category clipart
- Gradient bottle photography or "grocery shelf" mass-market styling
- Rounded pill buttons, drop shadows, glassmorphism
- Mixing background variants within a single piece
- Recreating the wordmark's hand-lettered style in body text or UI elements
- Playful, cartoonish, or exclamation-pointed copy — the tone is dignified, not fun-and-games

## Assets to design next
1. Wordmark (complete — see reference image)
2. Bottle label, full packaging mockup (reference generated, worth refining in Claude Design)
3. Ad concepts — social and print
4. UI components (this doc's component sheet, reference generated)
5. Brand foundations spread (consolidated colors/type/components — for future website and case study use)
