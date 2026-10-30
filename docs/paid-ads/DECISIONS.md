# Paid acquisition landing page: decisions

Branch: `paid-acquisition-landing-page` (from `master` at `9986bc3`). Not merged, not pushed.

## Owner direction (2026-10-30)

- **Offer:** paid acquisition management (Meta Ads, Google Ads, strategy, ad creative, campaign setup,
  conversion tracking, ongoing optimization, reporting). Design/web work supports credibility only.
- **Audience:** higher-value local and service businesses.
- **Fee:** roughly $1,500 to $2,500+ per month, separate from ad spend. **Not shown on the page.**
- **Conversion:** inquiry form first, "book a call" link second.
- **Form delivery:** Vercel function + Resend.
- **Pricing on page:** no prices; the form asks for a budget range.

## Files

| File | Purpose |
|---|---|
| `paid-ads.html` | The landing page |
| `paid-ads-thanks.html` | Post-submit confirmation page (also a clean URL for ad conversion tracking) |
| `css/paid-ads.css` | Page styles, self-contained |
| `js/paid-ads.js` | Theme toggle, form validation + submit, sticky mobile CTA, booking link |
| `api/lead.js` | `POST /api/lead` Vercel function, emails the lead through Resend |
| `.vercelignore` | Keeps `docs/` off the Vercel deployment |

No existing file was modified.

## Decisions

1. **Standalone page, not linked from the main nav.** Paid traffic goes straight to `/paid-ads.html`.
   The rest of the site is untouched, so rollback is deleting the new files (or not merging).
2. **Self-contained CSS/JS.** The page does not load `style.css`, `responsive.css`, `main.js`,
   `animations.js`, Font Awesome or the Netlify Identity widget. Brand tokens (colors, Poppins, pill
   buttons, CTA gradient) are copied from `style.css`. Reasons: zero risk of regressions elsewhere, and
   a much lighter page for cold paid traffic. Icons are an inline SVG sprite.
3. **Minimal header** (logo, theme toggle, one CTA). No full site nav, to limit exits from a paid page.
   The footer keeps a few site links for trust.
4. **`noindex, follow`** on the landing page and `noindex, nofollow` on the thank-you page, so the ad
   page doesn't compete with the main site in search. Remove the tag if you want it indexed.
5. **No client-logo wall.** The homepage logos (Nike, Walmart, Target...) are design clients. Showing
   them on an ads-management page would imply ad-management results for those brands.
6. **No numbers, results, testimonials or guarantees.** There is no verified paid-ads performance data
   in the repo, so the page claims none. Credibility comes from verifiable facts already on the site:
   17+ years as a designer and the Cigna/Evernorth landing page work via Summer Friday (2021 to 2024),
   clearly captioned as design work.
7. **First person ("I").** Matches the rest of the site and an independent consultant.
8. **No em dashes in copy**, matching the site-wide cleanup in commit `1a073b7`.
9. **Thank-you page redirect** after a successful submit, plus a `generate_lead` `dataLayer` event.
   Either can drive conversion tracking once GA4/GTM or ad pixels are added.
10. **Progressive enhancement.** Without JavaScript the form still posts to `/api/lead`, which
    redirects to the thank-you page or back to `#inquiry-error`.
11. **Spam:** hidden honeypot field (`extra_info`); submissions that fill it get a fake success and are
    logged, not emailed. No CAPTCHA (would add friction for paid traffic). No rate limiting yet.
12. **Booking link** is hidden until `BOOKING_URL` in `js/paid-ads.js` is set.
13. **"Strategy call"** is the single name for the first conversation everywhere on both pages.
14. **Dark mode** uses the same `localStorage.theme` key and `dark-theme` class as the rest of the site.

## Revision 2: visual redesign (2026-10-30)

Owner feedback: the page explained the service well but felt like a generic agency page. Goal: make
visitors *experience* excellent paid media while scrolling (SELL, SHOW, EXPLAIN, SHOW, PROVE, CONVERT).

15. **Hero** is now a layered composition of designed concept ads (dental Facebook ad, med spa
    Instagram story, HVAC Google search ad, lead and booking notifications), labeled "Concept campaign".
    Staged entrance, slight scroll-linked depth and pointer response; all off under reduced motion.
16. **Signature showcase "What your ads could look like."** Five concept campaign systems (Dental, HVAC,
    Med Spa, Legal, Home Improvement), each with its own palette, typography and copy: landing page,
    feed ad, story ad, search ad and a tracked-lead notification, plus offer/audience/tracking/tone notes.
    Industry tabs follow the WAI-ARIA tabs pattern. Desktop is a layered canvas; under 1100px it becomes a
    swipeable row so each piece stays readable.
17. **Concept artwork is SVG**, not photography. There is no licensed industry photography in the repo,
    and stock photos of real-looking patients/clients would read as real work. Brands (Brightline Dental,
    Northpeak Heating & Air, Lumen Aesthetics, Hartwell Injury Law, Ridgeway Roofing) are fictional;
    the page says so in three places (section intro, footnote, FAQ). The legal concept carries
    "Attorney advertising" notices, as a real one would.
18. **Statement band** "You run the business. I run the acquisition." with the target industries.
19. **Why ads stall** is an editorial numbered list (no cards). **What's included** is three grouped
    modules (Strategy / Build / Grow) instead of eight cards, with a clear-scope note (no social posting,
    content calendars or community management). **Process** is a connected four-stage journey with an
    animated progress line. Mobile never stacks more than three similar cards.
20. **Cigna/Evernorth proof** kept, with the caption now stating it was design work only and that I didn't
    manage their paid media.
21. **Email-first conversion.** Primary CTA: "Request an ad opportunity review". Copy no longer promises a
    call; "If it looks like a fit, I'll personally follow up by email with next steps. A call is optional."
22. **Form industries** now match the target list; `api/lead.js` validates the same values.
23. **DM Serif Display** is loaded only for the med spa and legal concept ads. The site font stays Poppins.
24. **Rhythm:** dark showcase, dark journey and the brand-gradient fit band alternate with light sections;
    the hero composition, showcase and proof media break out of the 1200px container.

## Owner inputs still needed before launch

- [ ] **Resend:** verify `doncarlosdesign.com` in Resend, then in Vercel set
      `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` (e.g. `DONCARLOS Leads <leads@doncarlosdesign.com>`).
      Until then the form shows its error message.
- [ ] **Booking URL** for the "Book a call" button.
- [ ] **Confirm these practice statements** (the page states them as fact):
  - Ad spend is paid directly to Meta/Google from the client's own accounts.
  - Reporting is monthly.
  - "Nothing goes live untracked" (tracking set up before launch).
  - Ad creative (concepts, copy, variations) is included and designed in-house. (Video was deliberately not promised.)
  - A quote is given after the strategy call, before anything is signed.
  - "I read every inquiry myself."
  - An "ad opportunity review" is something you'll deliver by email for qualified inquiries.
  - "Starts by email. A call is optional." and "Most of the early back-and-forth happens by email."
- [ ] **Concept brand names:** fictional, but confirm none collide with a real local business you know of.
- [ ] **Tracking:** GA4/GTM, Meta Pixel and Google Ads conversion IDs, if this page should report its own conversions.
- [ ] **Consider** fixing `www.doncarlosdesign.com` (no DNS record today) before ads point anywhere near it.

## Audit

The Codex CLI is not installed on this laptop, so the independent Codex audit has not run yet.
The builder ran a self-review against the same checklist; the brief for Codex is in `AUDIT-HANDOFF.md`.

## Rollback

- Nothing reaches production unless this branch is merged into `master`.
- Each checkpoint is its own commit; `git revert <sha>` or `git reset --hard <checkpoint>` on this branch.
- Removing the feature entirely: delete the files listed above. No other file depends on them.
