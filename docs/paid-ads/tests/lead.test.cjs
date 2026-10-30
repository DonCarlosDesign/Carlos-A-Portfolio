// Run: node --test docs/paid-ads/tests/lead.test.cjs
// No dependencies, credentials or network calls. Resend is always stubbed.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../../..');
const apiSource = fs.readFileSync(path.join(root, 'api/lead.js'), 'utf8');
const clientSource = fs.readFileSync(path.join(root, 'js/paid-ads.js'), 'utf8');
const valid = {
    name: 'Test Person', company: 'Test Business', email: 'test@example.com',
    phone: '', website: '', industry: 'Dental or orthodontics',
    ad_spend: '$3,000 to $10,000', budget: '$1,500 to $2,500',
    platforms: ['Google Ads'], goals: 'More booked consultations', extra_info: ''
};

async function request(body, { method = 'POST', json = true, env = true, failure = '' } = {}) {
    const sent = [], logs = [];
    const context = vm.createContext({
        module: { exports: {} }, URLSearchParams, AbortSignal,
        process: { env: env ? { RESEND_API_KEY: 'stub', LEAD_TO_EMAIL: 'owner@example.com', LEAD_FROM_EMAIL: 'leads@example.com' } : {} },
        console: { warn: (...args) => logs.push(args.join(' ')), error: (...args) => logs.push(args.join(' ')) },
        fetch: async (_, options) => {
            sent.push(JSON.parse(options.body));
            if (failure === 'network') throw new Error('Private provider error');
            return { ok: failure !== 'provider', status: 422, text: async () => 'Private submitted data' };
        }
    });
    vm.runInContext(apiSource, context);
    const result = { headers: {}, sent, logs };
    const res = {
        setHeader: (k, v) => { result.headers[k] = v; },
        status: code => { result.status = code; return res; },
        json: payload => { result.body = JSON.parse(JSON.stringify(payload)); },
        end: () => {}
    };
    await context.module.exports({ method, body, headers: { 'content-type': json ? 'application/json' : 'application/x-www-form-urlencoded' } }, res);
    return result;
}

test('accepted leads are emailed and explicitly eligible for conversion', async () => {
    const r = await request(valid);
    assert.equal(r.status, 200);
    assert.equal(r.body.accepted, true);
    assert.equal(r.sent.length, 1);
    assert.equal(r.sent[0].reply_to, valid.email);
    assert.equal(r.headers['Cache-Control'], 'no-store');
});

test('honeypot gets fake success without email, tracking eligibility or submitted-data logs', async () => {
    const r = await request({ ...valid, company: 'PRIVATE BUSINESS', extra_info: 'spam' });
    assert.equal(r.status, 200);
    assert.equal(r.body.ok, true);
    assert.equal(r.body.accepted, undefined);
    assert.equal(r.sent.length, 0);
    assert.ok(!r.logs.join(' ').includes('PRIVATE BUSINESS'));
});

test('invalid required fields and unsupported selections are rejected before sending', async () => {
    for (const body of [{}, null, [], 'broken JSON', { ...valid, industry: 'unknown' }, { ...valid, budget: 'unknown' }, { ...valid, ad_spend: 'unknown' }, { ...valid, email: 'bad' }, { ...valid, phone: 'letters' }, { ...valid, website: 'invalid' }, { ...valid, goals: 'short' }, { ...valid, name: 'x'.repeat(101) }]) {
        const r = await request(body);
        assert.equal(r.status, 400);
        assert.equal(r.sent.length, 0);
        assert.ok(Object.keys(r.body.errors).length > 0);
    }
});

test('email HTML is escaped, subject controls removed, unsupported platforms discarded', async () => {
    const r = await request({ ...valid, name: '<img src=x>', company: 'Business\r\nBcc: other@example.com', goals: '<script>alert(1)</script>', platforms: ['Google Ads', 'unknown'] });
    assert.equal(r.status, 200);
    assert.ok(r.sent[0].html.includes('&lt;img src=x&gt;'));
    assert.ok(!r.sent[0].html.includes('<script>'));
    assert.ok(!/[\r\n]/.test(r.sent[0].subject));
    assert.ok(!r.sent[0].text.includes('unknown'));
});

test('method, configuration and provider failures are safe and never eligible for tracking', async () => {
    for (const [options, status] of [[{ method: 'GET' }, 405], [{ env: false }, 500], [{ failure: 'provider' }, 502], [{ failure: 'network' }, 502]]) {
        const r = await request(valid, options);
        assert.equal(r.status, status);
        assert.equal(r.body.accepted, undefined);
        assert.ok(!r.logs.join(' ').includes('Private'));
    }
});

test('no-JavaScript URL-encoded posts redirect to local success/error pages', async () => {
    for (const [body, location] of [[new URLSearchParams(valid).toString(), '/paid-ads-thanks.html'], ['', '/paid-ads.html#inquiry-error']]) {
        const r = await request(body, { json: false });
        assert.equal(r.status, 303);
        assert.equal(r.headers.Location, location);
    }
});

function client({ response = { ok: true, accepted: true }, status = 200, networkFailure = false, storageBlocked = false } = {}) {
    const storage = new Map(), fields = {}, listeners = {};
    let focus = '', destination = '';
    const field = name => fields[name] ||= {
        id: name, value: valid[name] || '', tagName: 'INPUT', attributes: {},
        setAttribute(k, v) { this.attributes[k] = v; },
        removeAttribute(k) { delete this.attributes[k]; },
        hasAttribute(k) { return k in this.attributes; },
        addEventListener() {}, focus() { focus = name; }
    };
    const error = { hidden: true, focus() { focus = 'form-error'; } };
    const button = { setAttribute() {}, querySelector: () => ({ textContent: 'Request my review' }) };
    const form = {
        elements: { namedItem: field },
        querySelector: selector => selector === 'button[type="submit"]' ? button : error,
        addEventListener: (name, fn) => { listeners[name] = fn; }
    };
    const context = vm.createContext({
        document: {
            documentElement: { classList: { contains: () => false } }, addEventListener() {},
            getElementById: id => id === 'lead-form' ? form : { textContent: '' },
            querySelector: () => true
        },
        sessionStorage: {
            getItem: k => { if (storageBlocked) throw Error(); return storage.get(k); },
            setItem: (k, v) => { if (storageBlocked) throw Error(); storage.set(k, v); },
            removeItem: k => { if (storageBlocked) throw Error(); storage.delete(k); }
        },
        window: { location: { pathname: '/paid-ads.html', search: '', assign: url => { destination = url; } } },
        FormData: class { get(k) { return valid[k] || ''; } getAll(k) { return valid[k] || []; } },
        AbortController, setTimeout, clearTimeout,
        fetch: async () => {
            if (networkFailure) throw Error('Offline');
            return { ok: status === 200, status, json: async () => response };
        }
    });
    vm.runInContext(clientSource, context);
    context.initLeadForm();
    return { context, storage, submit: () => listeners.submit({ preventDefault() {} }), focus: () => focus, destination: () => destination, error };
}

test('successful submission emits exactly once on confirmation, never on reload/direct visit', async () => {
    const c = client();
    c.context.initLeadConversion();
    assert.equal(c.context.window.dataLayer, undefined);
    await c.submit();
    assert.equal(c.destination(), 'paid-ads-thanks.html');
    c.context.initLeadConversion();
    c.context.initLeadConversion();
    assert.equal(c.context.window.dataLayer.length, 1);
    assert.equal(c.context.window.dataLayer[0].event, 'generate_lead');
});

test('fake honeypot success clears stale eligibility and never emits a conversion', async () => {
    const c = client({ response: { ok: true } });
    c.storage.set('dcd_paid_ads_lead', '1');
    await c.submit();
    assert.equal(c.destination(), 'paid-ads-thanks.html');
    c.context.initLeadConversion();
    assert.equal(c.context.window.dataLayer, undefined);
});

test('storage restrictions do not prevent success navigation', async () => {
    const c = client({ storageBlocked: true });
    await c.submit();
    assert.equal(c.destination(), 'paid-ads-thanks.html');
    c.context.initLeadConversion();
    assert.equal(c.context.window.dataLayer, undefined);
});

test('network/server failures focus alert, allow retry and never navigate or track', async () => {
    for (const options of [{ networkFailure: true }, { status: 502, response: { ok: false } }]) {
        const c = client(options);
        await c.submit();
        await c.submit();
        assert.equal(c.focus(), 'form-error');
        assert.equal(c.error.hidden, false);
        assert.equal(c.destination(), '');
        assert.equal(c.storage.size, 0);
    }
});
