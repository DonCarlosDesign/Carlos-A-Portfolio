# Independent paid acquisition audit

Date: 2026-10-30. Reviewed checkpoint `e6ff916` on `paid-acquisition-landing-page`.

**Verdict: GO for Resend + Vercel production setup. Production launch remains gated on a real delivered test lead, owner visual approval, and the launch checklist.** No critical issues found. Three important findings were resolved locally; no redesign was needed.

## Important findings resolved

1. **Rejected spam counted as a conversion.** `api/lead.js:158` returned the same `ok` success for the honeypot as a real submission, and the client set the tracking flag for both. The API now adds `accepted: true` only after Resend accepts the email (`api/lead.js:208`). The client clears stale eligibility and sets the flag only for that response (`js/paid-ads.js:322`). Fake success still reaches confirmation without a conversion. Updated the obsolete URL-conversion comment in `paid-ads-thanks.html:8`.
2. **Mobile budget ranges were cut off.** At 320px the two-column controls were approximately 110px wide: `$3,000 to $10,000` appeared as `$3,000`, and `$1,500 to $2,500` appeared as `$1,500`. Form rows now use one column below 720px (`css/paid-ads.css:2663`). Verified full selected ranges at 320px, with approximately 239px outer field width.
3. **Submitted data could enter infrastructure logs.** The honeypot logged the supplied business name; provider error bodies and exception messages were logged verbatim. `api/lead.js:161`, `:198`, and `:203` now log fixed messages and provider status without submitted data or raw provider messages. Responses continue to avoid exposing these details to visitors.

## Minor findings / follow-up

- **Image variants:** the two proof images total 207,926 bytes (about 203 KiB). Both are lazy loaded with dimensions, but smaller responsive variants would reduce below-fold transfer (`paid-ads.html:666`). No image rewrite was necessary for readiness.
- **No-JavaScript error recovery:** native form posts work, but `novalidate` allows incomplete posts and the fallback returns one generic error while losing entered values (`paid-ads.html:793`, `api/lead.js:167`). Enabling native validation until JS initializes would improve this fallback. Enhanced validation identifies fields and preserves values correctly.
- **Commercial scope:** the process mentions landing pages (`paid-ads.html:634`), while the fee description specifies channels, campaigns and creative volume. Clarify landing-page build/hosting scope in the proposal; the page does not state quantities or limits. No speculative pricing copy added.

Optional: monitor abuse after activation and use hosting-level throttling if needed. Honeypot and validation do not stop a determined sender. This known limitation is not classified as a launch-blocking code vulnerability for this small lead form.

## Audit coverage and evidence

| Area | Result |
|---|---|
| Visual / UX | Pass after mobile form fix. Inspected representative desktop, tablet, mobile, light/dark, campaign and confirmation views. Hierarchy, CTA labels and section variety are coherent. The mobile hero intentionally crops its decorative composition. |
| Conversion clarity | Pass. Offer, target businesses, included services, separate fee/ad spend, email-first follow-up and optional calls are explicit. Hidden booking link is intentional. Scope clarification above is minor. |
| Credibility | Pass. All five coined campaign brands are marked fictional/spec work; accessible descriptions also identify concepts. No numeric paid-media results, testimonials or performance guarantees found. Cigna/Evernorth is explicitly design work via Summer Friday, consistent with the existing project page. Historical claims were checked for repository consistency, not externally authenticated. |
| Code / regressions | Pass. Standalone assets, CommonJS function, bounded fields, fixed email recipient/provider URL, local redirect destinations. Branch diff from master consists exclusively of added feature files. Existing site files are untouched. |
| Form / API | Pass in isolated tests. JSON and URL-encoded handling, allowed values, required fields, lengths, optional formats, escaped HTML, removed subject control characters, rejected methods, no-store responses, missing config, provider rejection and network failures checked. No credentials added. |
| Accessibility | Pass in checks performed: named landmarks, one h1, ordered heading levels, no duplicate IDs, labeled controls, field error descriptions, first-invalid focus, focusable server-error alert, accessible campaign summaries, roving tab focus and End-key activation. Solid-background text checks found no failures among 80 sampled rendered text elements in each theme. Gradient/image text was visually reviewed. Reduced-motion disabling was source-reviewed. This is not a full assistive-technology/WCAG certification. |
| Responsive | All five industry states checked at 320, 390, 768, 1280 and 1440px in both themes: 50 combinations, one active panel each, no document horizontal overflow. Mobile sticky CTA appeared after the hero and became inert/hidden at inquiry. |
| Performance | Landing HTML 14,689 + CSS 11,282 + JS 4,514 = 30,485 bytes gzip, excluding fonts/shared logos. Raster proof images lazy load with explicit dimensions; hero artwork is inline SVG. Font CSS uses display=swap. No framework, analytics, ad pixel or unrelated site scripts. No measured production LCP/CLS score is claimed. |
| Tracking | Pass after fix. Accepted submission sets eligibility; confirmation consumes it once; direct visits/reloads do not emit. Honeypot fake success does not emit. Storage-denied visitors still navigate successfully but do not emit a conversion. No production IDs installed. |
| Production readiness | Code is ready for setup. Resend domain/key, Vercel variables, delivered preview/production lead, owner screenshots and www configuration still require the launch workflow. No real email was sent by this audit. |

## Tests and limits

Run `node --test docs/paid-ads/tests/lead.test.cjs`: **10 tests passed**. These use isolated API/client JavaScript contexts and a stubbed Resend transport; they never contact the provider. They cover conversion lifecycle, spam and stale flag suppression, storage restrictions, input validation, HTML/header safety, local fallback redirects, configuration/provider/network failures and retry behavior.

Browser testing used a local static server for actual form controls, themes, industry switching, layout widths, keyboard focus, error display/retry and confirmation layout. The unavailable endpoint produced the expected focused alert and restored submit state. A second local harness ran the actual API handler with a stubbed email transport: a valid browser submission successfully reached `/paid-ads-thanks.html`. Confirmation also passed overflow checks at all five required widths. A successful real Resend/Vercel submission remains the setup acceptance test; local stubs do not replace it.

`node --check` passed for both production JS files. `git diff --check` passed. Viewport override restored after testing. No push, merge, deployment, DNS change, external form submission or production branch modification was performed.
