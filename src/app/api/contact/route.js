import { appendFile, mkdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';

/**
 * SMTP comes from the environment so credentials never land in the repo.
 * Set these in .env.local (see .env.local.example) or in Vercel's project
 * environment variables.
 */
const SMTP = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || SITE.email;

const LEAD_LOG = process.env.LEAD_LOG_PATH || '.leads/leads.jsonl';

/**
 * Append-only JSON Lines record of every valid submission, written *before* we
 * attempt delivery so a lead survives an SMTP outage. A failed send adds a
 * second `delivery_failure` line carrying the same `id`.
 *
 * Never throws: losing the log must not fail the submission. On Vercel the
 * filesystem is read-only outside /tmp, so this falls back to stderr, which the
 * platform captures in the function logs.
 */
async function appendLeadLog(record) {
  const line = JSON.stringify(record) + '\n';
  try {
    const file = path.isAbsolute(LEAD_LOG)
      ? LEAD_LOG
      : path.join(/* turbopackIgnore: true */ process.cwd(), LEAD_LOG);
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, line, 'utf8');
  } catch (error) {
    console.error('Lead log unavailable, recording to stderr instead:', error?.message);
    console.error('LEAD', line.trim());
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const address = String(body.address || '').trim() || 'Not provided';
    const provider = String(body.provider || '').trim() || 'Not specified';
    const usage = String(body.usage || '').trim() || 'Not specified';
    const source = String(body.source || '').trim() || 'website';
    const consent = Boolean(body.consent);
    const packages = Array.isArray(body.packages)
      ? body.packages.map((item) => String(item).trim()).filter(Boolean)
      : [];

    if (!name || !email || !phone || !consent) {
      return Response.json(
        { ok: false, error: 'Please fill in all required fields.' },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const leadId = randomUUID();
    await appendLeadLog({
      id: leadId,
      type: 'lead',
      received_at: new Date().toISOString(),
      name,
      email,
      phone,
      address,
      provider,
      usage,
      packages,
      source,
      consent,
    });

    if (!SMTP.host || !SMTP.user || !SMTP.pass) {
      console.error('Contact form: SMTP env vars are not configured.');
      await appendLeadLog({
        id: leadId,
        type: 'delivery_failure',
        failed_at: new Date().toISOString(),
        error: 'SMTP env vars are not configured',
      });
      return Response.json(
        { ok: false, error: 'Our form is temporarily unavailable. Please call us instead.' },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP.host,
      port: SMTP.port,
      secure: SMTP.port === 465,
      auth: { user: SMTP.user, pass: SMTP.pass },
    });

    const servicesLabel = packages.length ? packages.join(', ') : 'Not specified';
    const subject = `New lead from ${SITE.brandFull}: ${servicesLabel} — ${name}`;

    const rows = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone],
      ['Address / ZIP', address],
      ['Current provider / interest', provider],
      ['Devices in home', usage],
      ['Services requested', servicesLabel],
      ['Source', source],
      ['Consent', 'Yes'],
    ];

    const text = [
      `New contact form submission from ${SITE.domain}`,
      '',
      ...rows.map(([label, value]) => `${label}: ${value}`),
    ].join('\n');

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Site:</strong> ${escapeHtml(SITE.domain)}</p>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
          )
          .join('')}
      </table>
    `;

    try {
      await transporter.sendMail({
        from: `"${SITE.brandFull} Website" <${SMTP.user}>`,
        to: TO_EMAIL,
        replyTo: email,
        subject,
        text,
        html,
      });
    } catch (error) {
      console.error('Contact form email failed:', error);
      await appendLeadLog({
        id: leadId,
        type: 'delivery_failure',
        failed_at: new Date().toISOString(),
        error: String(error?.message || error),
      });
      return Response.json(
        { ok: false, error: 'Unable to send your message right now. Please call us instead.' },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact form request failed:', error);
    return Response.json(
      { ok: false, error: 'Unable to send your message right now. Please call us instead.' },
      { status: 500 },
    );
  }
}
