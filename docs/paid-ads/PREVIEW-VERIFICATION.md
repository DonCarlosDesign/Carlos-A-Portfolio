# Real Preview email verification

Verified 2026-10-30 at approximately 3:00 PM America/New_York.

- Project: `carlos-a-portfolio`, team `carlos-aguilars-projects-b18e74e8`.
- Branch and application commit: `paid-acquisition-landing-page` at `8643d181e244c072d4f92f5544839db19e644bc9`.
- Deployment: `dpl_B9QWKyEJttDFXmp6G926kmEPEXfQ`, READY, Preview/staging; no production promotion.
- Preview: https://carlos-a-portfolio-9csy39qv3-carlos-aguilars-projects-b18e74e8.vercel.app

## Failure and resolution

The first deployed form returned HTTP 500, `Lead form is not configured`. A safe
server diagnostic identified the missing runtime setting as `RESEND_API_KEY`.
The variable entry existed in project settings, but the running function received
no value. A rebuild alone did not resolve it. The owner re-saved the credential
directly in Vercel; no secret was pasted into chat, retrieved, logged or committed.
Rebuilding the Preview after that update resolved the failure.

## Complete flow confirmed

1. Opened the protected Preview using owner-authorized temporary access.
2. Followed the actual homepage header's Paid Ads link.
3. Filled the browser form with clearly labeled synthetic test data, including a
   selected Google Ads platform and a unique test reference.
4. Submitted once on this deployment. The browser reached `/paid-ads-thanks.html`.
5. Found the resulting email in the configured Gmail account's INBOX, not SPAM.
6. Read the test email and confirmed the submitted fields, platform, goals and
   page path were preserved. Reply-To matched the synthetic test email address.
7. The received email's authentication results reported SPF, DKIM and DMARC pass.

The existing automated suite has 11 passing tests for validation, configuration
diagnostics, escaping, error handling, spam suppression and one-time tracking.
No production tracking IDs are installed. This delivery test does not certify
production until the same test is repeated there after release.

## Remaining release gates

Final owner release approval, the `www` configuration/recheck, and the production
smoke test remain in `LAUNCH-CHECKLIST.md`. No merge into `master`, production
deployment, DNS modification or production traffic switch was performed.
