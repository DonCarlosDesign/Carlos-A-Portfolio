# Codex audit handoff: paid acquisition landing page

**Repo:** `DonCarlosDesign/Carlos-A-Portfolio` · **Branch:** `paid-acquisition-landing-page`
**Base:** `master` @ `9986bc3` (what is live on doncarlosdesign.com via Vercel)
**Scope:** `git diff master...paid-acquisition-landing-page` (new files only; no existing file modified)

Revision 2 (checkpoint 4) redesigned the page visually; see decisions 15 to 24. Read `docs/paid-ads/DECISIONS.md` first: it records the owner's direction and why the page is built this way.

## What to review

| File | What it is |
|---|---|
| `paid-ads.html` | Landing page for paid traffic: Meta/Google Ads management for local and service businesses |
| `paid-ads-thanks.html` | Post-submit confirmation page |
| `css/paid-ads.css` | Self-contained styles (does not load the site's `style.css`) |
| `js/paid-ads.js` | Theme toggle, form validation/submission, sticky mobile CTA, optional booking link |
| `api/lead.js` | Vercel Node function `POST /api/lead` → Resend email |
| `.vercelignore` | Excludes `docs/` from Vercel deployments |

## Checklist (please report each as pass / issue with file:line)

1. **Visual quality** at 320, 375, 768, 1024, 1366, 1920 px, light and dark.
2. **Brand consistency** with the rest of the site (colors, Poppins, pill buttons, CTA gradient, logo treatment).
3. **Conversion clarity:** one primary action (inquiry form), clear offer, objections handled, no dead ends.
4. **Responsive behavior:** no horizontal scroll, sticky mobile CTA shows only between hero and form.
5. **Accessibility (WCAG 2.2 AA):** contrast, focus visibility, labels/errors (`aria-invalid`, `aria-describedby`),
   keyboard order, skip link, toggle button semantics, reduced motion, target sizes.
6. **Technical correctness:** HTML validity, JS errors, API validation parity between client and server,
   no-JS fallback (`303` redirects, `#inquiry-error` via `:target`), Vercel function compatibility (CommonJS,
   no `package.json`, global `fetch`, `AbortSignal.timeout`).
7. **Regressions:** confirm no existing file changed and existing pages are unaffected.
8. **Dead code:** unused CSS, JS, assets.
9. **Form functionality:** happy path, validation, server errors, timeout, honeypot, email HTML escaping,
   header/subject injection, `reply_to`.
10. **Performance:** critical path weight, image sizing/lazy loading, font loading, CLS.
11. **Concept campaigns:** confirm every concept is clearly labeled fictional and nothing implies real
    client results or that DCD managed paid media for Cigna/Evernorth. Check the industry tabs
    (keyboard, ARIA), the swipe rows under 1100px, and reduced-motion behavior.
12. **Marketing claims:** flag anything misleading, unverifiable or implying results. The page intentionally
    makes no performance claims; the owner still has to confirm the practice statements listed in DECISIONS.md.

## How to test locally

No dependencies are needed. Any static server works for the page; the form needs `/api/lead`. A Vercel-like
harness used during the build (not committed) did:
static file serving + `req.body` parsing (JSON and urlencoded) + `res.status().json()` + a stubbed
`fetch` for `https://api.resend.com/emails`. `vercel dev` also works if the Vercel CLI is available, with
`RESEND_API_KEY`, `LEAD_TO_EMAIL` and `LEAD_FROM_EMAIL` set.

## Already verified by the builder (re-check, don't trust)

- API: 405 on GET; 200 on valid JSON; 400 with per-field errors on empty, bad selects, bad email/phone/website,
  over-length name, non-object JSON; honeypot returns 200 and sends nothing; HTML in fields is escaped in the
  email; unknown platform values are dropped; form posts redirect `303` to the thank-you page or `#inquiry-error`;
  missing env vars → 500; Resend 500 or network failure → 502.
- Browser: empty submit shows all 7 required-field errors and focuses the first; valid submit reaches the mocked
  Resend and redirects to the thank-you page; network failure shows the error alert, focuses it and re-enables
  the button; theme persists across the site via `localStorage.theme`.
- Contrast: automated check of every text node passes AA in light and dark.
- Structure: one `h1`, no skipped heading levels, all fields labeled, no duplicate IDs, all in-page anchors resolve.
- Layout: no horizontal overflow at 320, 375, 768, 1366.
- Weight: HTML 7.7 KB + CSS 5.6 KB + JS 2.9 KB gzipped; no images above the fold; two lazy-loaded
  case-study screenshots (~205 KB) below.

## Known limitations / open items (not bugs unless you disagree)

- The form is not live until the owner sets the three Resend env vars in Vercel and verifies the sending domain.
- No rate limiting on `/api/lead` beyond honeypot + validation; Vercel Firewall rules could add it.
- The two case-study screenshots are 1200 px wide but render at about 300 to 560 px. Smaller variants would save
  ~150 KB; no image tooling was available during the build.
- `BOOKING_URL` in `js/paid-ads.js` is empty, so the "Book a call" option is hidden until the owner provides one.
- GitHub Pages also publishes this repo; `/api/lead` does not exist there, so the form shows its error state.
- No analytics or ad pixels are installed (owner decision pending). A `generate_lead` dataLayer event fires on success.

## Constraints for any fixes

Stay on `paid-acquisition-landing-page`. Do not merge to `master`, push, or deploy. Do not edit pre-existing site files.
