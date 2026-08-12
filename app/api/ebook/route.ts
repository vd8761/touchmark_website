import { NextResponse } from 'next/server';

import { getEbook, getEbookDownloadUrl } from '@/services/ebooks';

export const runtime = 'nodejs';

/**
 * E-book download requests.
 *
 * Replaces the legacy `/head/engine/ajax/__ajax_ebook_form.php` endpoint, which only
 * ever existed on the PHP host — posting to it from this site returned 404 and the form
 * could never succeed. Mirrors app/api/contact/route.ts: Resend delivers a notification
 * to the team and a copy to the requester.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'info@touchmarkdes.com';
const DEFAULT_FROM_EMAIL = 'no-reply@touchmarkdes.com';
const SITE_URL = 'https://touchmarkdes.com';
const LOGO_URL = `${SITE_URL}/src/assets/img/tds-color-logo.png`;
const BRAND_BLUE = '#194F97';
const BRAND_NAVY = '#10233F';
const COPYRIGHT_YEARS = `2010-${new Date().getFullYear()}`;

interface EbookPayload {
  ebook_content_id: string;
  ebook_name: string;
  ebook_lname: string;
  ebook_email: string;
  ebook_comname: string;
}

function clean(value: unknown, maxLength = 200) {
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

async function readPayload(request: Request): Promise<EbookPayload> {
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
    ebook_content_id: clean(values.ebook_content_id, 8),
    ebook_name: clean(values.ebook_name, 80),
    ebook_lname: clean(values.ebook_lname, 80),
    ebook_email: clean(values.ebook_email, 160).toLowerCase(),
    ebook_comname: clean(values.ebook_comname, 160),
  };
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
            <tr><td style="padding:36px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${contentRowsHtml}</table>
            </td></tr>
            <tr>
              <td style="background:${BRAND_NAVY};padding:32px 40px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#c3cde0;">
                <p style="margin:0 0 6px;font-weight:600;color:#ffffff;font-size:14px;">Touchmark Descience Pvt. Ltd</p>
                <p style="margin:0 0 12px;">Tamarai Tech Park (Level 5), S.P. Plot No.16-19 &amp; 20-A, Thiru Vi Ka Industrial Estate, Guindy, Chennai, Tamil Nadu 600032</p>
                <p style="margin:0 0 4px;">
                  <a href="tel:+914440652648" style="color:#c3cde0;text-decoration:none;">+91 44 4065 2648</a>
                  &nbsp;&middot;&nbsp;
                  <a href="mailto:info@touchmarkdes.com" style="color:#c3cde0;text-decoration:none;">info@touchmarkdes.com</a>
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
  </body>
</html>`;
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

function buttonHtml(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${BRAND_BLUE};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:13px 26px;border-radius:6px;">${escapeHtml(label)}</a>`;
}

type ResendMessage = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to: string;
};

async function sendViaResend(apiKey: string, message: ResendMessage) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
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
  const ebook = getEbook(payload.ebook_content_id);

  const errors: Record<string, string> = {};
  if (!ebook) errors.ebook_content_id = 'Unknown e-book.';
  if (!payload.ebook_name) errors.ebook_name = 'First name is required.';
  if (!payload.ebook_lname) errors.ebook_lname = 'Last name is required.';
  if (!isEmail(payload.ebook_email)) errors.ebook_email = 'A valid email is required.';
  if (!payload.ebook_comname) errors.ebook_comname = 'Company name is required.';
  if (Object.keys(errors).length > 0 || !ebook) {
    return NextResponse.json({ message: 'Please check the form fields.', errors }, { status: 400 });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const teamEmail = process.env.EBOOK_TO_EMAIL || process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fullName = `${payload.ebook_name} ${payload.ebook_lname}`.trim();
  const downloadUrl = getEbookDownloadUrl(ebook.id);

  const rows = [
    ['Name', fullName],
    ['Email', payload.ebook_email],
    ['Company', payload.ebook_comname],
    ['E-book', ebook.title],
  ];

  // 1) Notify the team. This is the part that must succeed — it is the lead.
  const internal = await sendViaResend(apiKey, {
    from: fromEmail,
    to: [teamEmail],
    subject: `E-book download request — ${ebook.title}`,
    html: renderEmailLayout(
      `${fullName} requested "${ebook.title}"`,
      `<tr><td style="padding-bottom:6px;">
         <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#10233f;">${escapeHtml(fullName)}</h1>
       </td></tr>
       <tr><td style="padding-bottom:22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#42506b;line-height:1.6;">
         requested an e-book download from touchmarkdes.com. Reply directly to this email to reach them.
       </td></tr>
       <tr><td style="padding-bottom:26px;">${detailsTableHtml(rows)}</td></tr>
       ${
         downloadUrl
           ? ''
           : `<tr><td style="padding:16px;background:#fff6e5;border:1px solid #ffd98a;border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7a5200;line-height:1.6;">
                No download URL is configured for this e-book (<code>EBOOK_DOWNLOAD_URL_${escapeHtml(ebook.id)}</code>),
                so the requester was told the team would send the file. Please email it to them.
              </td></tr>`
       }
       <tr><td style="padding-top:28px;">${buttonHtml(`mailto:${escapeHtml(payload.ebook_email)}`, `Reply to ${payload.ebook_name}`)}</td></tr>`,
    ),
    text: [
      'New e-book download request from touchmarkdes.com',
      '',
      ...rows.map(([label, value]) => `${label}: ${value}`),
      ...(downloadUrl ? [] : ['', `No EBOOK_DOWNLOAD_URL_${ebook.id} configured — send the file manually.`]),
    ].join('\n'),
    reply_to: payload.ebook_email,
  });

  if (!internal.ok) {
    return NextResponse.json(
      {
        message:
          internal.body.message ||
          internal.body.error ||
          'Unable to send your request right now. Please try again.',
      },
      { status: internal.status },
    );
  }

  // 2) Send the requester their copy. Best-effort: a failed acknowledgement must not
  //    fail a submission whose lead has already been delivered.
  //    Without a configured file we promise a follow-up rather than link to nothing.
  await sendViaResend(apiKey, {
    from: fromEmail,
    to: [payload.ebook_email],
    subject: `Your e-book: ${ebook.title}`,
    html: renderEmailLayout(
      `Your copy of "${ebook.title}"`,
      `<tr><td style="padding-bottom:6px;">
         <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#10233f;">Thanks, ${escapeHtml(payload.ebook_name)}</h1>
       </td></tr>
       <tr><td style="padding-bottom:22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#42506b;line-height:1.6;">
         ${
           downloadUrl
             ? `Here is your copy of <strong>${escapeHtml(ebook.title)}</strong>.`
             : `We have received your request for <strong>${escapeHtml(ebook.title)}</strong>. A member of our team will email the file to you shortly.`
         }
       </td></tr>
       ${downloadUrl ? `<tr><td style="padding-bottom:26px;">${buttonHtml(downloadUrl, 'Download your e-book')}</td></tr>` : ''}
       <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#42506b;line-height:1.6;">
         Questions? Just reply to this email — it reaches us at
         <a href="mailto:${escapeHtml(teamEmail)}" style="color:${BRAND_BLUE};">${escapeHtml(teamEmail)}</a>.
       </td></tr>`,
    ),
    text: [
      `Hi ${payload.ebook_name},`,
      '',
      downloadUrl
        ? `Here is your copy of "${ebook.title}": ${downloadUrl}`
        : `We have received your request for "${ebook.title}". A member of our team will email the file to you shortly.`,
      '',
      '— Touchmark Descience',
    ].join('\n'),
    reply_to: teamEmail,
  }).catch(() => undefined);

  return NextResponse.json({ ok: true, delivered: Boolean(downloadUrl) });
}
