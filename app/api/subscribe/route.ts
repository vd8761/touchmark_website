import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type SubscribePayload = {
  subscribe_name: string;
  subscribe_email: string;
};

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'info@touchmarkdes.com';
const DEFAULT_FROM_EMAIL = 'Touchmark Descience <no-reply@touchmarkdes.com>';
const SITE_URL = 'https://touchmarkdes.com';
const LOGO_URL = `${SITE_URL}/src/assets/img/tds-color-logo.png`;
const BRAND_BLUE = '#194F97';
const BRAND_NAVY = '#10233F';
const COPYRIGHT_YEARS = `2010-${new Date().getFullYear()}`;

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

async function readPayload(request: Request): Promise<SubscribePayload> {
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
    subscribe_name: clean(values.subscribe_name, 80),
    subscribe_email: clean(values.subscribe_email, 160).toLowerCase(),
  };
}

function validatePayload(payload: SubscribePayload) {
  const errors: Record<string, string> = {};

  if (!payload.subscribe_name) errors.subscribe_name = 'Name is required.';
  if (!payload.subscribe_email || !isEmail(payload.subscribe_email)) errors.subscribe_email = 'A valid email is required.';

  return errors;
}

function badgeHtml(label: string) {
  return `<span style="display:inline-block;background:#eaf1fc;color:${BRAND_BLUE};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;padding:6px 14px;border-radius:999px;">${escapeHtml(label)}</span>`;
}

function buttonHtml(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${BRAND_BLUE};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:13px 26px;border-radius:6px;">${escapeHtml(label)}</a>`;
}

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

function buildInternalEmail(payload: SubscribePayload) {
  const text = [
    'New newsletter subscription from touchmarkdes.com',
    '',
    `Name: ${payload.subscribe_name}`,
    `Email: ${payload.subscribe_email}`,
    '',
    `Touchmark Descience Pvt. Ltd — © ${COPYRIGHT_YEARS}`,
  ].join('\n');

  const contentRows = `
    <tr><td style="padding-bottom:14px;">${badgeHtml('New Subscription')}</td></tr>
    <tr><td style="padding-bottom:6px;">
      <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#10233f;">${escapeHtml(payload.subscribe_name)}</h1>
    </td></tr>
    <tr><td style="padding-bottom:22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#42506b;line-height:1.6;">
      A visitor just subscribed to the newsletter on touchmarkdes.com.
    </td></tr>
    <tr><td style="padding-bottom:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#42506b;line-height:1.6;">
      <strong>Name:</strong> ${escapeHtml(payload.subscribe_name)}<br>
      <strong>Email:</strong> ${escapeHtml(payload.subscribe_email)}
    </td></tr>
    `;

  return {
    html: renderEmailLayout(`New newsletter subscription from ${payload.subscribe_name}`, contentRows),
    text,
    subject: `New subscription: ${payload.subscribe_name}`,
  };
}

function buildAcknowledgementEmail(payload: SubscribePayload) {
  const text = [
    `Hi ${payload.subscribe_name || 'there'},`,
    '',
    'Thanks for subscribing to the Touchmark Descience newsletter! You will now receive our latest updates directly to your inbox.',
    '',
    '— Touchmark Descience',
    `© ${COPYRIGHT_YEARS} Touchmark Descience Pvt. Ltd. All rights reserved.`,
  ].join('\n');

  const contentRows = `
    <tr><td style="padding-bottom:14px;">${badgeHtml('Subscription Confirmed')}</td></tr>
    <tr><td style="padding-bottom:6px;">
      <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#10233f;">Welcome, ${escapeHtml(payload.subscribe_name || 'there')}</h1>
    </td></tr>
    <tr><td style="padding-bottom:22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#42506b;line-height:1.6;">
      Thanks for subscribing to the Touchmark Descience newsletter! You'll now receive our latest news, case studies, and updates directly to your inbox.
    </td></tr>
    <tr><td style="padding-top:26px;">${buttonHtml(SITE_URL + '/blog', 'Read our latest blogs')}</td></tr>`;

  return {
    html: renderEmailLayout('Welcome to the Touchmark Descience Newsletter', contentRows),
    text,
    subject: 'Welcome to the Touchmark Descience Newsletter',
  };
}

type ResendMessage = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
};

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
  // Per user instruction, use CONTACT_TO_EMAIL for the internal notification
  const teamEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;

  // 1) Deliver the notification to the Touchmark inbox.
  const internal = buildInternalEmail(payload);
  const internalResult = await sendViaResend(apiKey, {
    from: fromEmail,
    to: [teamEmail],
    subject: internal.subject,
    html: internal.html,
    text: internal.text,
    reply_to: payload.subscribe_email,
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

  // 2) Send the subscriber a welcome copy from no-reply
  const acknowledgement = buildAcknowledgementEmail(payload);
  await sendViaResend(apiKey, {
    from: fromEmail,
    to: [payload.subscribe_email],
    subject: acknowledgement.subject,
    html: acknowledgement.html,
    text: acknowledgement.text,
  }).catch(() => undefined);

  return NextResponse.json({ ok: true, id: internalResult.body.id ?? null });
}
