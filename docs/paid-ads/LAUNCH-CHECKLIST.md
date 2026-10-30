# Paid ads page: launch checklist

Everything here is done by the owner in Resend, Namecheap and Vercel. Nothing in this list is
automated, and no secret belongs in the repo. Work top to bottom; the form must be confirmed working
(step 1) before production approval.

## 1. Lead form email (Resend) — required before launch

The form posts to `/api/lead` (`api/lead.js`), which sends the lead to you through Resend. Until the
three environment variables below exist in Vercel, every submission shows the form's error message.

### 1a. Verify the sending domain in Resend

1. Sign in at resend.com → **Domains** → **Add domain**.
2. Enter a sending subdomain or the root domain. A subdomain such as `mail.doncarlosdesign.com` is
   recommended so it can't interfere with any existing email on `doncarlosdesign.com`.
3. Choose the region (US East is fine) and create it. Resend shows a list of DNS records: an MX and a
   TXT (SPF) record for the bounce subdomain, a TXT record for DKIM (`resend._domainkey...`), and an
   optional DMARC TXT record.
4. In Namecheap → **Domain List** → `doncarlosdesign.com` → **Manage** → **Advanced DNS** →
   **Add new record**, add each record exactly as Resend shows it. In the **Host** field, Namecheap
   wants only the part before `doncarlosdesign.com` (for example `resend._domainkey.mail`, not the
   full name). Leave TTL on Automatic.
   - Don't edit or delete the existing A record (`@ → 216.198.79.1`) or anything Vercel relies on.
5. Back in Resend, click **Verify DNS records**. It can take from a few minutes to a few hours. Wait
   until the domain shows **Verified**.

### 1b. Create the API key

1. Resend → **API Keys** → **Create API key**.
2. Name: `doncarlosdesign-vercel`. Permission: **Sending access**. Domain: the domain from 1a.
3. Copy the key (it starts with `re_`). Resend shows it only once. Don't paste it into any file,
   commit, chat or ticket; it goes straight into Vercel in the next step.

### 1c. Add the environment variables in Vercel

Vercel → the `doncarlosdesign.com` project → **Settings** → **Environment Variables**. Add each one for
the **Production** environment (also tick **Preview** if you want to test the form on a preview
deployment before launch). Mark `RESEND_API_KEY` as **Sensitive**.

| Name | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | the `re_...` key from 1b | Secret. Never in source code. |
| `LEAD_TO_EMAIL` | the inbox that should receive leads | Several addresses allowed, comma separated. |
| `LEAD_FROM_EMAIL` | `DONCARLOS Leads <leads@mail.doncarlosdesign.com>` | Must be an address on the domain verified in 1a. It doesn't need a real mailbox. |

Environment variables only apply to deployments made **after** they're saved. If a deployment
already exists, redeploy it (Deployments → ⋯ → **Redeploy**).

Replies go to the lead: the function sets `reply_to` to the email address the prospect typed, so
hitting Reply in your inbox answers them directly.

### 1d. Test it

1. Open the preview (or production) URL → `/paid-ads.html` → submit the form with your own details.
2. You should land on the thank-you page and receive an email titled
   `New paid ads inquiry: <business> (<budget>)` within a minute.
3. If the form shows its error message instead: Vercel → the deployment → **Logs** (filter on
   `/api/lead`). "missing configuration" means a variable is absent or the deployment predates it; a
   Resend error usually means the from-address isn't on the verified domain.
4. Check the email didn't land in spam. If it did, add the DMARC record from step 1a.

## 2. `www.doncarlosdesign.com` → `doncarlosdesign.com`

Today `www` has no DNS record, so `www.doncarlosdesign.com` doesn't load at all.

1. Vercel → project → **Settings** → **Domains** → **Add** `www.doncarlosdesign.com`. When asked,
   choose to **redirect** it to `doncarlosdesign.com` (308 permanent), keeping the apex as the
   primary domain.
2. Vercel then shows the DNS record it needs (a CNAME for `www`, normally `cname.vercel-dns.com` or a
   project-specific value; use exactly what Vercel shows).
3. Namecheap → **Advanced DNS** → add `CNAME Record`, Host `www`, Value from step 2, TTL Automatic.
   Remove any old `www` URL-redirect record if Namecheap has one.
4. Wait for Vercel to show the domain as valid, then check that `https://www.doncarlosdesign.com/paid-ads.html`
   redirects to `https://doncarlosdesign.com/paid-ads.html`.

## 3. Tracking (when paid traffic starts)

Nothing is installed yet and no ID is invented. The page is prepared so one container can be added:

- **Where:** a `TRACKING` comment in the `<head>` of `paid-ads.html` and `paid-ads-thanks.html` marks
  where the Google Tag Manager snippet goes. GTM's second snippet (the `<noscript>` iframe) goes right
  after the opening `<body>` tag on both pages.
- **Conversion signal:** after a successful submission the thank-you page pushes one event:
  `dataLayer.push({ event: 'generate_lead', form_id: 'paid-ads-inquiry' })`. It fires only after a
  real submission, not on a direct visit or reload of the thank-you page.
- **Suggested GTM setup:** a Custom Event trigger on `generate_lead`, used by the GA4 event tag, the
  Google Ads conversion tag and the Meta Pixel `Lead` event. Base tags (GA4 config, Meta Pixel
  PageView, Google Ads conversion linker) fire on All Pages.
- **Before installing:** decide on a cookie/consent approach for the regions you advertise in. Then
  remove `noindex` only if you also want the page in search.

## 4. Before production approval

- [ ] Step 1 done and a test lead received.
- [x] Independent Codex audit run against `docs/paid-ads/AUDIT-HANDOFF.md` and its important findings resolved.
      See `AUDIT-RESULTS.md` for coverage, minor follow-ups and test limits.
- [ ] Owner review of the final screenshots.
- [ ] Then: push the branch, open a PR into `master`, check the Vercel preview deployment, merge.
      Vercel deploys `master` to production automatically.
- [ ] After launch: submit one real test lead on production, and check the `www` redirect.
