'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/site';

const PACKAGES = [
  'Home Internet',
  'Wireless Internet',
  'Business Internet',
  'Fiber Internet',
  'TV Bundles',
  'Home Phone Service',
];

const DEVICE_OPTIONS = ['1 to 4', '5 to 8', '8 to 12', '12+'];
const DEFAULT_PROVIDERS = ['AT&T', 'Spectrum', 'Xfinity', 'Other', 'None'];

/**
 * Lead form used by the home page, the contact page, and each provider page.
 *
 * `variant="simple"` drops the service checkboxes and device count, matching the
 * shorter form the provider pages carry alongside their plan tables.
 */
export default function ContactForm({
  variant = 'full',
  idPrefix = 'contact',
  source = 'website',
  providerLabel = 'Current Provider',
  providerOptions = DEFAULT_PROVIDERS,
  onDark = false,
}) {
  const isSimple = variant === 'simple';
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    provider: providerOptions[0],
    usage: DEVICE_OPTIONS[0],
    packages: isSimple ? [] : ['Home Internet'],
    consent: false,
  });

  const fieldId = (name) => `${idPrefix}-${name}`;
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const togglePackage = (value) =>
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.includes(value)
        ? prev.packages.filter((item) => item !== value)
        : [...prev.packages, value],
    }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setStatus('idle');
        setError(data.error || 'Unable to send your request right now. Please call us or try again.');
        return;
      }

      setStatus('sent');
    } catch {
      setStatus('idle');
      setError('Unable to send your request right now. Please call us or try again.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="pc-form-success" role="status">
        <h3>Thanks — we received your request</h3>
        <p>
          A specialist will follow up shortly. For faster help, call us now at{' '}
          <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  const busy = status === 'sending';

  return (
    <form
      className={`pc-contact-form${onDark ? ' pc-contact-form-on-dark' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="pc-form-row">
        <label htmlFor={fieldId('name')}>
          Name
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            required
            disabled={busy}
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </label>
        <label htmlFor={fieldId('phone')}>
          Phone
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            required
            disabled={busy}
            autoComplete="tel"
            placeholder="(555) 555-5555"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </label>
      </div>

      <div className="pc-form-row">
        <label htmlFor={fieldId('email')}>
          Email
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            required
            disabled={busy}
            autoComplete="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </label>
        <label htmlFor={fieldId('address')}>
          Address / ZIP
          <input
            id={fieldId('address')}
            name="address"
            type="text"
            required
            disabled={busy}
            autoComplete="postal-code"
            placeholder="Street or ZIP code"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
          />
        </label>
      </div>

      {isSimple ? (
        <label htmlFor={fieldId('provider')}>
          {providerLabel}
          <select
            id={fieldId('provider')}
            name="provider"
            disabled={busy}
            value={form.provider}
            onChange={(e) => update('provider', e.target.value)}
          >
            {providerOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      ) : (
        <>
          <div className="pc-form-row">
            <label htmlFor={fieldId('provider')}>
              {providerLabel}
              <select
                id={fieldId('provider')}
                name="provider"
                disabled={busy}
                value={form.provider}
                onChange={(e) => update('provider', e.target.value)}
              >
                {providerOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label htmlFor={fieldId('usage')}>
              Devices in Home
              <select
                id={fieldId('usage')}
                name="usage"
                disabled={busy}
                value={form.usage}
                onChange={(e) => update('usage', e.target.value)}
              >
                {DEVICE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <fieldset disabled={busy}>
            <legend>Select service</legend>
            <div className="pc-form-checks">
              {PACKAGES.map((item) => (
                <label className="pc-form-check" key={item}>
                  <input
                    type="checkbox"
                    name="packages"
                    value={item}
                    checked={form.packages.includes(item)}
                    onChange={() => togglePackage(item)}
                  />{' '}
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      <label className="pc-form-consent">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={busy}
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
        />
        <span>
          {SITE.consentCopy} See our <Link href="/privacy-policy">privacy policy</Link> and{' '}
          <Link href="/terms-and-conditions">terms &amp; conditions</Link>.
        </span>
      </label>

      {error ? <p className="pc-form-error">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? 'Sending...' : 'Request Free Quote'}
      </button>
    </form>
  );
}
