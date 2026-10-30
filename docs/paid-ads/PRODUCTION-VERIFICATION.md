# Production release and verification

Released 2026-10-30 after the owner explicitly approved publishing the tested feature.

- Live site: https://doncarlosdesign.com/
- Live service: https://doncarlosdesign.com/paid-ads.html
- Release commit: `e0b7954315d0a3b9c5bcb7610b443a172404d696` on `master`.
- Production deployment: `dpl_BVxB26puWYkFhLxCorjY33uBRQTc`, READY.
- Vercel's apex alias was verified to point at this deployment.
- The application source matches the successfully tested Preview commit `8643d18`;
  the intervening commit only records Preview evidence in deployment-excluded docs.
- All 11 automated form/API/tracking regression tests passed before the release.

## Release procedure

Fetched the latest remote state and confirmed that `master` had no divergent commits.
Fast-forwarded the approved feature into `master`, then atomically pushed `master`
and the feature branch. Vercel's Git integration built and published production.
No pull request was created; the owner directly approved the merge and release in chat.

## Public-site smoke test

Opened the public apex site without a preview access link. Confirmed the global
Paid Ads header/footer links and homepage service entry. Followed the header link
to the actual public landing page and submitted a clearly labeled synthetic inquiry.

The browser reached `https://doncarlosdesign.com/paid-ads-thanks.html`. The resulting
email with subject containing `DCD PRODUCTION LAUNCH TEST - 20261030` was found in
the configured Gmail INBOX, not SPAM, at approximately 3:31 PM America/New_York.
No credentials were retrieved, logged or committed.

## Remaining domain follow-up

The apex domain is configured and live. At verification time, `www.doncarlosdesign.com`
was absent from the project's configured domains. Vercel's domain configuration
check returned `misconfigured: true` with no CNAME or A values, using external
Namecheap nameservers. Configure its redirect and DNS separately using step 2 of
`LAUNCH-CHECKLIST.md`. No DNS records were changed during this release.
