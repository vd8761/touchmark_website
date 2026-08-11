/**
 * One-off import of the three hardcoded case studies into the CMS.
 *
 * app/case-study/page.tsx renders all three from one file, switching on `?id=1|2|3`.
 * This splits it on those `{id === "N" && (` guards, converts each block to HTML and
 * stores it as a `case_study` entry.
 *
 * The block is kept whole, including the "Check out Our Case Studies" tiles at the
 * foot. Those tiles carry per-item labels (SCHOOL, ACADAMIC) that the content model has
 * nowhere to put, so extracting them would lose visible design for no editorial gain at
 * three entries. Cross-links stay on `?id=N`, which the route still serves.
 *
 * Idempotent: re-running skips slugs that already exist.
 *
 * Usage:
 *   node --env-file=.env.local scripts/migrate-case-studies.mjs           # dry run
 *   node --env-file=.env.local scripts/migrate-case-studies.mjs --commit  # writes
 */
import { readFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';

import { jsxToHtml } from './lib/jsx-to-html.mjs';

const CMS_URL = process.env.CMS_API_URL ?? 'http://localhost:4000';
const WORKSPACE_ID = process.env.CMS_WORKSPACE_ID;
const EMAIL = process.env.CMS_EMAIL ?? 'owner@example.test';
const PASSWORD = process.env.CMS_PASSWORD ?? 'development-password-1';
const SOURCE_FILE = 'app/case-study/page.tsx';
const COMMIT = process.argv.includes('--commit');

/**
 * The `?id=` values are load-bearing: they appear in inbound links, in the tiles inside
 * each body, and in the SubsidiaryUX legacy-URL rewrite. The slug is the durable name;
 * `legacy_id` keeps the old URLs resolvable.
 */
const CASE_STUDIES = [
  { legacyId: '1', slug: 'rupinis' },
  { legacyId: '2', slug: 'school-management-system' },
  { legacyId: '3', slug: 'sidbi' },
];

async function login() {
  const response = await fetch(`${CMS_URL}/admin/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!response.ok) throw new Error(`Login failed: ${response.status}`);
  return response.headers.getSetCookie().join('; ');
}

async function admin(cookie, path, init = {}) {
  const response = await fetch(`${CMS_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Cookie: cookie, ...(init.headers ?? {}) },
  });
  if (!response.ok) {
    throw new Error(`${init.method ?? 'GET'} ${path} → ${response.status} ${await response.text()}`);
  }
  return response.status === 204 ? null : response.json();
}

/** The JSX slice guarded by `{id === "N" && (` … `)}`, found by brace balance. */
function sliceBlock(source, legacyId) {
  const opener = `{id === "${legacyId}" && (`;
  const start = source.indexOf(opener);
  if (start === -1) return null;

  let depth = 0;
  for (let position = start; position < source.length; position += 1) {
    const character = source[position];
    if (character === '{') depth += 1;
    else if (character === '}') {
      depth -= 1;
      if (depth === 0) {
        const inner = source.slice(start + opener.length, position);
        return inner.replace(/\)\s*$/, '');
      }
    }
  }
  return null;
}

function extract(source, legacyId) {
  const block = sliceBlock(source, legacyId);
  if (!block) return null;

  // The block is a JSX fragment holding JSX comments. An HTML parser has no notion of
  // either: `<>` becomes the text "&lt;&gt;" and `{/* … */}` renders verbatim on the
  // page, so both have to go before parsing.
  const markup = jsxToHtml(block)
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '')
    .replace(/^\s*<>/, '')
    .replace(/<\/>\s*$/, '');

  const $ = cheerio.load(markup);

  // Favicon links were duplicated into every converted page; the root layout owns them.
  $('link[rel*="icon"]').remove();

  const $headline = $('h1.font-gellix').filter((_i, el) => $(el).attr('class')?.includes('mt-4')).first();
  const title = $headline.text().replace(/\s+/g, ' ').trim();
  const excerpt = $headline.next('p').text().replace(/\s+/g, ' ').trim();
  const cardImage = $('img').first().attr('src') ?? '';

  // `$.html()` would wrap the fragment in <html><head></head><body>.
  return { title, excerpt, cardImage, body: ($('body').html() ?? '').trim() };
}

async function main() {
  if (!WORKSPACE_ID) throw new Error('Set CMS_WORKSPACE_ID.');

  const cookie = await login();
  const existing = await admin(
    cookie,
    `/admin/v1/workspaces/${WORKSPACE_ID}/content/case_study?limit=100`,
  );
  const bySlug = new Map(existing.data.map((entry) => [entry.slug, entry]));

  const source = await readFile(SOURCE_FILE, 'utf8');
  let created = 0;
  let updated = 0;

  for (const { legacyId, slug } of CASE_STUDIES) {
    const parsed = extract(source, legacyId);
    if (!parsed?.title || !parsed.body) {
      console.warn(`SKIP ${slug} — could not parse block id=${legacyId}`);
      continue;
    }

    const data = {
      title: parsed.title,
      excerpt: parsed.excerpt,
      body: parsed.body,
      seo_title: `${parsed.title} Case Study`,
      seo_description: parsed.excerpt,
      card_image: parsed.cardImage,
      legacy_id: legacyId,
    };

    const existingEntry = bySlug.get(slug);
    const action = existingEntry ? 'UPDATE' : 'CREATE';

    if (!COMMIT) {
      console.log(
        `WOULD ${action} ${slug} — "${parsed.title}" (body ${parsed.body.length} chars, ` +
          `excerpt ${parsed.excerpt.length} chars, image=${Boolean(parsed.cardImage)})`,
      );
      if (existingEntry) updated += 1;
      else created += 1;
      continue;
    }

    // Re-running overwrites rather than skipping, so a fix to the extractor can be
    // applied without deleting entries first — deleted slugs stay reserved.
    const entryId = existingEntry
      ? existingEntry.id
      : (await admin(cookie, `/admin/v1/workspaces/${WORKSPACE_ID}/content/case_study`, {
          method: 'POST',
          body: JSON.stringify({ slug, data }),
        })).data.id;

    if (existingEntry) {
      await admin(cookie, `/admin/v1/workspaces/${WORKSPACE_ID}/content/entries/${entryId}`, {
        method: 'PATCH',
        body: JSON.stringify({ data, change_note: 'Re-imported from app/case-study/page.tsx' }),
      });
      updated += 1;
    } else {
      created += 1;
    }

    await admin(cookie, `/admin/v1/workspaces/${WORKSPACE_ID}/content/entries/${entryId}/publish`, {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(`${existingEntry ? 'UPDATED' : 'CREATED'} ${slug}`);
  }

  console.log(`\n${COMMIT ? 'Created' : 'Would create'} ${created}, updated ${updated}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
