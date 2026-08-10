/**
 * One-off import of the hardcoded blog articles into the CMS.
 *
 * The generated `app/blog/articles/<slug>/page.tsx` files are JSX, not HTML: they use
 * `className` and `style={{ ... }}` object literals. Both are converted back to plain
 * HTML before the body is stored, because the CMS holds the body as an HTML string
 * (see CMS_INTEGRATION_GUIDE.md §3.1) and it is rendered with dangerouslySetInnerHTML.
 *
 * Card metadata — thumbnail, nicely-cased title, excerpt and tag — lives only on the
 * blog index (`app/blog/page.tsx`), so that file is parsed first and used to enrich
 * each article.
 *
 * Idempotent: re-running skips slugs that already exist, so a partial run can be
 * resumed without creating duplicates.
 *
 * Usage:
 *   node scripts/migrate-articles.mjs           # dry run, prints what it would do
 *   node scripts/migrate-articles.mjs --commit  # actually writes
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import * as cheerio from 'cheerio';

const CMS_URL = process.env.CMS_API_URL ?? 'http://localhost:4000';
const WORKSPACE_ID = process.env.CMS_WORKSPACE_ID;
const EMAIL = process.env.CMS_EMAIL ?? 'owner@example.test';
const PASSWORD = process.env.CMS_PASSWORD ?? 'development-password-1';
const ARTICLES_DIR = 'app/blog/articles';
const INDEX_FILE = 'app/blog/page.tsx';
const COMMIT = process.argv.includes('--commit');

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

/**
 * Rewrites JSX-only syntax back to HTML so the stored body renders correctly.
 * Only `style={{ … }}` and `className` appear in these generated files.
 */
function jsxToHtml(source) {
  return source
    .replace(/style=\{\{([\s\S]*?)\}\}/g, (_match, object) => {
      const declarations = [...object.matchAll(/"([^"]+)"\s*:\s*"([^"]*)"/g)].map(
        ([, property, value]) =>
          `${property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value}`,
      );
      return `style="${declarations.join(';')}"`;
    })
    .replace(/\bclassName=/g, 'class=')
    .replace(/\bfetchPriority=/g, 'fetchpriority=')
    .replace(/\bautoComplete=/g, 'autocomplete=')
    .replace(/\bspellCheck=/g, 'spellcheck=')
    .replace(/\bstrokeWidth=/g, 'stroke-width=')
    .replace(/\bstrokeLinecap=/g, 'stroke-linecap=')
    .replace(/\bstrokeLinejoin=/g, 'stroke-linejoin=');
}

/** slug → { title, excerpt, cardImage, tagName, tagSlug } harvested from the blog index. */
async function readIndexCards() {
  const $ = cheerio.load(jsxToHtml(await readFile(INDEX_FILE, 'utf8')));
  const cards = new Map();

  $('a[href^="/blog/articles/"]').each((_position, anchor) => {
    const $anchor = $(anchor);
    const slug = ($anchor.attr('href') ?? '').replace('/blog/articles/', '').replace(/\/$/, '');
    if (!slug || cards.has(slug)) return;

    const $card = $anchor.closest('.group');
    const $tag = $card.find('a[href^="/blog/tag/"]').first();

    cards.set(slug, {
      title: $anchor.find('h1').text().replace(/\s+/g, ' ').trim(),
      excerpt: $card.find('p').first().text().replace(/\s+/g, ' ').trim(),
      cardImage: $card.find('img').first().attr('src') ?? '',
      tagName: $tag.text().replace(/\s+/g, ' ').trim(),
      tagSlug: ($tag.attr('href') ?? '').replace('/blog/tag/', ''),
    });
  });

  return cards;
}

/**
 * Pulls the title, meta description and article markup out of one generated page.tsx.
 * The body lives in `div.blog_desc`; the hero image sits just above it and is prepended
 * so nothing is lost, since `hero_image` is a media field that needs an uploaded asset.
 */
function extract(source) {
  const title = source.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? null;
  const description = source.match(/<meta name="description" content="([\s\S]*?)"/)?.[1] ?? '';

  const $ = cheerio.load(jsxToHtml(source));
  const $description = $('.blog_desc').first();
  if (!$description.length) return { title, description, body: null, heroImage: '' };

  const heroImage = $description.prevAll('div').find('img').first().attr('src') ?? '';
  const hero = heroImage
    ? `<div class="mt-10"><img src="${heroImage}" style="padding-bottom:30px" /></div>\n`
    : '';

  return { title, description, body: hero + ($description.html() ?? ''), heroImage };
}

/** "Why Internet Of Things?" is the fallback when the index has no card for a slug. */
function pickTitle(card, fallback) {
  return card?.title || fallback;
}

async function main() {
  if (!WORKSPACE_ID) throw new Error('Set CMS_WORKSPACE_ID.');

  const cookie = await login();
  const existing = await admin(
    cookie,
    `/admin/v1/workspaces/${WORKSPACE_ID}/content/blog_post?limit=100`,
  );
  const taken = new Set(existing.data.map((entry) => entry.slug));

  const cards = await readIndexCards();
  const slugs = await readdir(ARTICLES_DIR);
  let created = 0;
  let skipped = 0;

  for (const slug of slugs) {
    if (taken.has(slug)) {
      skipped += 1;
      continue;
    }

    const source = await readFile(join(ARTICLES_DIR, slug, 'page.tsx'), 'utf8');
    const { title: pageTitle, description, body } = extract(source);
    const card = cards.get(slug);
    const title = pickTitle(card, pageTitle);
    const excerpt = card?.excerpt || description;

    if (!title || !body) {
      console.warn(`SKIP ${slug} — title=${Boolean(title)} body=${Boolean(body)}`);
      continue;
    }

    const data = {
      title,
      excerpt,
      body,
      seo_title: title,
      seo_description: description || excerpt,
      card_image: card?.cardImage ?? '',
      tag_name: card?.tagName ?? '',
      tag_slug: card?.tagSlug ?? '',
    };

    if (!COMMIT) {
      console.log(
        `WOULD CREATE ${slug} — "${title}" (body ${body.length} chars, ` +
          `excerpt ${excerpt.length} chars, card=${Boolean(card)})`,
      );
      created += 1;
      continue;
    }

    const entry = await admin(cookie, `/admin/v1/workspaces/${WORKSPACE_ID}/content/blog_post`, {
      method: 'POST',
      body: JSON.stringify({ slug, data }),
    });

    await admin(
      cookie,
      `/admin/v1/workspaces/${WORKSPACE_ID}/content/entries/${entry.data.id}/publish`,
      { method: 'POST', body: JSON.stringify({}) },
    );

    console.log(`CREATED ${slug}`);
    created += 1;
  }

  console.log(`\n${COMMIT ? 'Created' : 'Would create'} ${created}, skipped ${skipped}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
