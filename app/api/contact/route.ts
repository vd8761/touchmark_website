import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  company_name: string;
  location: string;
  website: string;
  project_type: string;
  requirements: string;
  country_code: string;
};

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'info@touchmarkdes.com';
const DEFAULT_FROM_EMAIL = 'no-reply@touchmarkdes.com';
const SITE_URL = 'https://touchmarkdes.com';
// Points at the logo on the currently-live site rather than this repo's own
// /public path, since that path 404s until this Next.js revamp is deployed.
const LOGO_URL = `${SITE_URL}/src/assets/img/tds-color-logo.png`;
const BRAND_BLUE = '#194F97';
const BRAND_NAVY = '#10233F';
const COPYRIGHT_YEARS = `2010-${new Date().getFullYear()}`;
const COUNTRY_DIGITS: Record<string, { min: number; max: number }> = {
  '+91': { min: 10, max: 10 },
  '+44': { min: 10, max: 11 },
  '+65': { min: 8, max: 8 },
};

function clean(value: FormDataEntryValue | string | null | undefined, maxLength = 500) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normaliseWebsite(value: string) {
  if (!value) return '';
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    return url.href;
  } catch {
    return '';
  }
}

async function readPayload(request: Request): Promise<ContactPayload> {
  const contentType = request.headers.get('content-type') ?? '';
  let values: Record<string, string> = {};

  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    values = Object.fromEntries(
      Object.entries(body).map(([key, value]) => [key, typeof value === 'string' ? value : '']),
    );
  } else {
    const formData = await request.formData();
    values = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => [key, typeof value === 'string' ? value : '']),
    );
  }

  return {
    first_name: clean(values.first_name, 80),
    last_name: clean(values.last_name, 80),
    email: clean(values.email, 160).toLowerCase(),
    contact_number: clean(values.contact_number, 24).replace(/\D/g, ''),
    company_name: clean(values.company_name, 160),
    location: clean(values.location, 160),
    website: normaliseWebsite(clean(values.website, 240)),
    project_type: clean(values.project_type, 120),
    requirements: clean(values.requirements, 4000),
    country_code: clean(values.country_code, 8) || '+91',
  };
}

function validatePayload(payload: ContactPayload) {
  const errors: Record<string, string> = {};
  const phoneRule = COUNTRY_DIGITS[payload.country_code] ?? COUNTRY_DIGITS['+91'];

  if (!payload.first_name) errors.first_name = 'First name is required.';
  if (!payload.last_name) errors.last_name = 'Last name is required.';
  if (!payload.email || !isEmail(payload.email)) errors.email = 'A valid email is required.';
  if (!payload.company_name) errors.company_name = 'Company name is required.';
  if (!payload.location) errors.location = 'Location is required.';
  if (!payload.project_type) errors.project_type = 'Project type is required.';
  if (!payload.requirements) errors.requirements = 'Requirement details are required.';
  if (
    payload.contact_number.length < phoneRule.min ||
    payload.contact_number.length > phoneRule.max
  ) {
    errors.contact_number = 'A valid contact number is required.';
  }

  return errors;
}

function detailRows(payload: ContactPayload) {
  const fullName = `${payload.first_name} ${payload.last_name}`.trim();
  const phone = `${payload.country_code} ${payload.contact_number}`;
  return [
    ['Name', fullName],
    ['Email', payload.email],
    ['Phone', phone],
    ['Company', payload.company_name],
    ['Location', payload.location],
    ['Website', payload.website || 'Not provided'],
    ['Project type', payload.project_type],
  ];
}

function detailsTableHtml(rows: string[][]) {
  const htmlRows = rows
    .map(([label, value], index) => {
      const bg = index % 2 === 0 ? '#f7f9fc' : '#ffffff';
      return `
        <tr>
          <td style="padding:12px 16px;background:${bg};border-bottom:1px solid #e7edf6;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#42506b;width:36%;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;background:${bg};border-bottom:1px solid #e7edf6;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#10233f;">${escapeHtml(value)}</td>
        </tr>`;
    })
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e7edf6;border-radius:8px;overflow:hidden;">${htmlRows}</table>`;
}

function badgeHtml(label: string) {
  return `<span style="display:inline-block;background:#eaf1fc;color:${BRAND_BLUE};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">${escapeHtml(label)}</span>`;
}

function buttonHtml(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${BRAND_BLUE};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:13px 26px;border-radius:6px;">${escapeHtml(label)}</a>`;
}

// Wraps a block of content rows in the shared branded shell: logo header,
// white content card, and a footer with company details + copyright.
function renderEmailLayout(preheader: string, contentRowsHtml: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Touchmark Descience</title>
  </head>
  <body style="margin:0;padding:0;background:#eef2f8;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e3e9f3;">
            <tr>
              <td style="background:#ffffff;padding:28px 40px;border-bottom:3px solid ${BRAND_BLUE};">
                <a href="${SITE_URL}" style="text-decoration:none;">
                  <img src="${LOGO_URL}" alt="Touchmark Descience" width="168" style="display:block;height:auto;border:0;outline:none;text-decoration:none;" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${contentRowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND_NAVY};padding:32px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#c3cde0;">
                      <p style="margin:0 0 6px;font-weight:600;color:#ffffff;font-size:14px;">Touchmark Descience Pvt. Ltd</p>
                      <p style="margin:0 0 12px;">Tamarai Tech Park (Level 5), S.P. Plot No.16-19 &amp; 20-A, Thiru Vi Ka Industrial Estate, Guindy, Chennai, Tamil Nadu 600032</p>
                      <p style="margin:0 0 4px;">
                        <a href="tel:+914440652648" style="color:#c3cde0;text-decoration:none;">+91 44 4065 2648</a>
                        &nbsp;&middot;&nbsp;
                        <a href="mailto:info@touchmarkdes.com" style="color:#c3cde0;text-decoration:none;">info@touchmarkdes.com</a>
                        &nbsp;&middot;&nbsp;
                        <a href="${SITE_URL}" style="color:#c3cde0;text-decoration:none;">touchmarkdes.com</a>
                      </p>
                      <p style="margin:16px 0 0;">
                        <a href="https://in.linkedin.com/company/touchmarkdes" style="color:#8fa3c9;text-decoration:none;margin-right:14px;">LinkedIn</a>
                        <a href="https://www.instagram.com/touchmarkdes/" style="color:#8fa3c9;text-decoration:none;margin-right:14px;">Instagram</a>
                        <a href="https://www.facebook.com/touchmarkdes/" style="color:#8fa3c9;text-decoration:none;">Facebook</a>
                      </p>
                      <p style="margin:18px 0 0;border-top:1px solid rgba(255,255,255,0.12);padding-top:14px;color:#8493ae;font-size:12px;">
                        &copy; ${COPYRIGHT_YEARS} Touchmark Descience Pvt. Ltd. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Internal notification: the visitor's enquiry, delivered to the Touchmark inbox.
function buildInternalEmail(payload: ContactPayload) {
  const fullName = `${payload.first_name} ${payload.last_name}`.trim();
  const rows = detailRows(payload);
  const displayName = fullName || payload.company_name;

  const text = [
    'New contact request from touchmarkdes.com',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Requirements:',
    payload.requirements,
    '',
    `Touchmark Descience Pvt. Ltd — © ${COPYRIGHT_YEARS}`,
  ].join('\n');

  const contentRows = `
    <tr><td style="padding-bottom:14px;">${badgeHtml('New Website Enquiry')}</td></tr>
    <tr><td style="padding-bottom:6px;">
      <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#10233f;">${escapeHtml(displayName)}</h1>
    </td></tr>
    <tr><td style="padding-bottom:22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#42506b;line-height:1.6;">
      A visitor submitted the contact form on touchmarkdes.com. Reply directly to this email to respond to them.
    </td></tr>
    <tr><td style="padding-bottom:26px;">${detailsTableHtml(rows)}</td></tr>
    <tr><td style="padding-bottom:8px;">
      <h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#10233f;">Requirements</h2>
    </td></tr>
    <tr><td style="padding:16px;background:#f7f9fc;border:1px solid #e7edf6;border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#10233f;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.requirements)}</td></tr>
    <tr><td style="padding-top:28px;">${buttonHtml(`mailto:${escapeHtml(payload.email)}`, `Reply to ${payload.first_name || 'sender'}`)}</td></tr>`;

  return {
    html: renderEmailLayout(`New contact request from ${displayName}`, contentRows),
    text,
    subject: `New contact request from ${displayName}`,
  };
}

// Acknowledgement: a copy of the message sent back to the visitor so they have a
// record and know it was received. Replies are routed to the Touchmark inbox.
function buildAcknowledgementEmail(payload: ContactPayload) {
  const rows = detailRows(payload);

  const text = [
    `Hi ${payload.first_name || 'there'},`,
    '',
    'Thanks for reaching out to Touchmark Descience. We have received your message and a member of our team will get back to you shortly.',
    '',
    'Here is a copy of what you sent:',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Requirements:',
    payload.requirements,
    '',
    'If you need to add anything, just reply to this email and it will reach us at info@touchmarkdes.com.',
    '',
    '— Touchmark Descience',
    `© ${COPYRIGHT_YEARS} Touchmark Descience Pvt. Ltd. All rights reserved.`,
  ].join('\n');

  const contentRows = `
    <tr><td style="padding-bottom:14px;">${badgeHtml('Message Received')}</td></tr>
    <tr><td style="padding-bottom:6px;">
      <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#10233f;">Thanks for reaching out, ${escapeHtml(payload.first_name || 'there')}</h1>
    </td></tr>
    <tr><td style="padding-bottom:22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#42506b;line-height:1.6;">
      We've received your message and a member of our team will get back to you shortly. Here's a copy of what you sent for your records:
    </td></tr>
    <tr><td style="padding-bottom:26px;">${detailsTableHtml(rows)}</td></tr>
    <tr><td style="padding-bottom:8px;">
      <h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#10233f;">Requirements</h2>
    </td></tr>
    <tr><td style="padding:16px;background:#f7f9fc;border:1px solid #e7edf6;border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#10233f;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.requirements)}</td></tr>
    <tr><td style="padding-top:22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#42506b;line-height:1.6;">
      Need to add anything? Just reply to this email — it'll reach us at
      <a href="mailto:info@touchmarkdes.com" style="color:${BRAND_BLUE};">info@touchmarkdes.com</a>.
    </td></tr>
    <tr><td style="padding-top:26px;">${buttonHtml(SITE_URL, 'Visit our website')}</td></tr>`;

  return {
    html: renderEmailLayout('We received your message — Touchmark Descience', contentRows),
    text,
    subject: 'We received your message — Touchmark Descience',
  };
}

type ResendMessage = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to: string;
  cc?: string[];
  bcc?: string[];
};

// Reads a comma/semicolon/whitespace separated list of addresses from an env
// var (e.g. CONTACT_CC_EMAIL="a@x.com, b@y.com") into a clean array.
function parseEmailList(value: string | undefined) {
  return (value ?? '')
    .split(/[,;\s]+/)
    .map((entry) => entry.trim())
    .filter((entry) => isEmail(entry));
}

async function sendViaResend(apiKey: string, message: ResendMessage) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  const body = (await response.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
    error?: string;
  };
  return { ok: response.ok, status: response.status, body };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'Email service is not configured.' }, { status: 500 });
  }

  const payload = await readPayload(request);
  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: 'Please check the form fields.', errors }, { status: 400 });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const teamEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const ccList = parseEmailList(process.env.CONTACT_CC_EMAIL);
  const bccList = parseEmailList(process.env.CONTACT_BCC_EMAIL);

  // 1) Deliver the enquiry to the Touchmark inbox. Replies go to the visitor.
  //    Optional CC/BCC recipients are copied on this internal notification only.
  const internal = buildInternalEmail(payload);
  const internalResult = await sendViaResend(apiKey, {
    from: fromEmail,
    to: [teamEmail],
    subject: internal.subject,
    html: internal.html,
    text: internal.text,
    reply_to: payload.email,
    ...(ccList.length > 0 ? { cc: ccList } : {}),
    ...(bccList.length > 0 ? { bcc: bccList } : {}),
  });

  if (!internalResult.ok) {
    return NextResponse.json(
      {
        message:
          internalResult.body.message ||
          internalResult.body.error ||
          'Unable to send your request right now. Please try again.',
      },
      { status: internalResult.status },
    );
  }

  // 2) Send the visitor a copy from no-reply, with replies routed to the team.
  //    Best-effort: a failed acknowledgement must not fail the submission.
  const acknowledgement = buildAcknowledgementEmail(payload);
  await sendViaResend(apiKey, {
    from: fromEmail,
    to: [payload.email],
    subject: acknowledgement.subject,
    html: acknowledgement.html,
    text: acknowledgement.text,
    reply_to: teamEmail,
  }).catch(() => undefined);

  return NextResponse.json({ ok: true, id: internalResult.body.id ?? null });
}
