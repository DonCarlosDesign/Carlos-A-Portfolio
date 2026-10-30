// Vercel serverless function: POST /api/lead
// Receives the paid-ads.html inquiry form and emails it through Resend.
//
// Required environment variables (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY   Resend API key
//   LEAD_TO_EMAIL    Where inquiries are delivered (comma-separate for several)
//   LEAD_FROM_EMAIL  Sender, on a domain verified in Resend,
//                    e.g. "DONCARLOS Leads <leads@doncarlosdesign.com>"
//
// Accepts JSON (the page's JavaScript) and regular form posts (no-JS
// fallback). JSON callers get JSON back; form posts get a 303 redirect.

const RESEND_URL = 'https://api.resend.com/emails';

const OPTIONS = {
    industry: [
        'Dental or orthodontics',
        'HVAC, plumbing or roofing',
        'Home improvement',
        'Med spa or aesthetics',
        'Legal',
        'Specialized B2B services',
        'Other local or service business'
    ],
    ad_spend: ['Not running ads yet', 'Under $1,000', '$1,000 to $3,000', '$3,000 to $10,000', '$10,000+'],
    budget: ['Under $1,500', '$1,500 to $2,500', '$2,500+', 'Not sure yet'],
    platforms: ['Meta (Facebook & Instagram)', 'Google Ads', 'Not sure yet']
};

const LIMITS = { name: 100, company: 120, email: 254, phone: 40, website: 200, goals: 3000, page: 300 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+().\-\s]{7,40}$/;
const WEBSITE_RE = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i;

// Strip control characters (keeps newlines/tabs only where allowed) and trim
function clean(value, { multiline = false } = {}) {
    if (typeof value !== 'string') return '';
    const pattern = multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
    return value.replace(pattern, multiline ? '' : ' ').trim();
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function parseBody(req) {
    let body = req.body;
    if (typeof body === 'string') {
        const type = String(req.headers['content-type'] || '');
        try {
            body = type.includes('application/json')
                ? JSON.parse(body)
                : Object.fromEntries(new URLSearchParams(body));
        } catch (e) {
            body = {};
        }
    }
    return body && typeof body === 'object' ? body : {};
}

function validate(raw) {
    const lead = {
        name: clean(raw.name),
        company: clean(raw.company),
        email: clean(raw.email),
        phone: clean(raw.phone),
        website: clean(raw.website),
        industry: clean(raw.industry),
        ad_spend: clean(raw.ad_spend),
        budget: clean(raw.budget),
        platforms: (Array.isArray(raw.platforms) ? raw.platforms : raw.platforms ? [raw.platforms] : [])
            .map(p => clean(p))
            .filter(p => OPTIONS.platforms.includes(p)),
        goals: clean(raw.goals, { multiline: true }),
        page: clean(raw.page).slice(0, LIMITS.page)
    };

    const errors = {};
    if (!lead.name) errors.name = 'Please enter your name.';
    if (!lead.company) errors.company = 'Please enter your business name.';
    if (!EMAIL_RE.test(lead.email)) errors.email = 'Please enter a valid email address.';
    if (lead.phone && !PHONE_RE.test(lead.phone)) errors.phone = 'Please enter a valid phone number, or leave it blank.';
    if (lead.website && !WEBSITE_RE.test(lead.website)) errors.website = 'Please enter a valid web address, or leave it blank.';
    if (!OPTIONS.industry.includes(lead.industry)) errors.industry = 'Please choose your type of business.';
    if (!OPTIONS.ad_spend.includes(lead.ad_spend)) errors.ad_spend = 'Please choose your current monthly ad spend.';
    if (!OPTIONS.budget.includes(lead.budget)) errors.budget = 'Please choose a management budget range.';
    if (lead.goals.length < 10) errors.goals = 'Please add a little more detail (at least 10 characters).';

    Object.keys(LIMITS).forEach(key => {
        if (key !== 'page' && lead[key] && lead[key].length > LIMITS[key]) {
            errors[key] = 'This is too long.';
        }
    });

    return { lead, errors };
}

function buildEmail(lead) {
    const rows = [
        ['Name', lead.name],
        ['Business', lead.company],
        ['Email', lead.email],
        ['Phone', lead.phone || '(not provided)'],
        ['Website', lead.website || '(not provided)'],
        ['Type of business', lead.industry],
        ['Current monthly ad spend', lead.ad_spend],
        ['Management budget', lead.budget],
        ['Platforms', lead.platforms.length ? lead.platforms.join(', ') : '(not specified)']
    ];

    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
        `\n\nWhat they want paid ads to do:\n${lead.goals}\n\nSubmitted from: ${lead.page || 'paid-ads.html'}`;

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1F2433">
<h2 style="margin:0 0 16px;font-size:20px">New paid ads inquiry</h2>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td style="color:#555B6B;vertical-align:top;padding-right:16px">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join('\n')}
</table>
<h3 style="margin:24px 0 8px;font-size:16px">What they want paid ads to do</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(lead.goals)}</p>
<p style="margin-top:24px;color:#555B6B;font-size:13px">Submitted from ${escapeHtml(lead.page || 'paid-ads.html')}. Reply to this email to respond directly.</p>
</div>`;

    return {
        subject: `New paid ads inquiry: ${lead.company} (${lead.budget})`.slice(0, 200),
        text,
        html
    };
}

module.exports = async function handler(req, res) {
    const contentType = String(req.headers['content-type'] || '');
    const wantsJson = contentType.includes('application/json') ||
        String(req.headers.accept || '').includes('application/json');

    const reply = (status, payload, redirectTo) => {
        res.setHeader('Cache-Control', 'no-store');
        if (wantsJson || !redirectTo) {
            res.status(status).json(payload);
        } else {
            res.setHeader('Location', redirectTo);
            res.status(303).end();
        }
    };

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return reply(405, { ok: false, error: 'Method not allowed' });
    }

    const raw = parseBody(req);

    // Honeypot filled in: act as if it worked so bots get no signal
    if (clean(raw.extra_info)) {
        console.warn('Lead dropped by honeypot:', clean(raw.company).slice(0, 120));
        return reply(200, { ok: true }, '/paid-ads-thanks.html');
    }

    const { lead, errors } = validate(raw);
    if (Object.keys(errors).length) {
        return reply(400, { ok: false, errors }, '/paid-ads.html#inquiry-error');
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = (process.env.LEAD_TO_EMAIL || '').split(',').map(s => s.trim()).filter(Boolean);
    const from = process.env.LEAD_FROM_EMAIL;
    if (!apiKey || !to.length || !from) {
        console.error('Lead form is not configured: set RESEND_API_KEY, LEAD_TO_EMAIL and LEAD_FROM_EMAIL.');
        return reply(500, { ok: false, error: 'Lead form is not configured' }, '/paid-ads.html#inquiry-error');
    }

    const email = buildEmail(lead);
    try {
        const response = await fetch(RESEND_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from,
                to,
                reply_to: lead.email,
                subject: email.subject,
                text: email.text,
                html: email.html
            }),
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            const detail = await response.text().catch(() => '');
            console.error(`Resend rejected the lead email (${response.status}): ${detail.slice(0, 500)}`);
            return reply(502, { ok: false, error: 'Could not send inquiry' }, '/paid-ads.html#inquiry-error');
        }
    } catch (err) {
        console.error('Lead email request failed:', err && err.message);
        return reply(502, { ok: false, error: 'Could not send inquiry' }, '/paid-ads.html#inquiry-error');
    }

    return reply(200, { ok: true }, '/paid-ads-thanks.html');
};
