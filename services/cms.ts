/**
 * Delivery API client.
 *
 * Server-side only — CMS_API_KEY is a secret key and must never reach the browser.
 * Every response is wrapped in a { data, meta } envelope which is unwrapped here so
 * callers never see it.
 */

import { resolveMediaUrl } from '@/utils/media';

const CMS_URL = process.env.CMS_API_URL;
const CMS_KEY = process.env.CMS_API_KEY;

/** Cache tag revalidated by the CMS webhook — see app/api/revalidate/route.ts. */
export const CMS_CACHE_TAG = 'cms';

/** Backstop for a webhook that never arrives. The webhook is the fast path. */
const DEFAULT_REVALIDATE_SECONDS = 300;

export interface CmsEntry<TData> {
  id: string;
  type: string;
  slug: string | null;
  locale: string;
  status: 'draft' | 'in_review' | 'scheduled' | 'published' | 'archived';
  data: TData;
  seo: Record<string, unknown> | null;
  published_at: string | null;
  updated_at: string;
}

export interface BlogPostData {
  title: string;
  excerpt?: string;
  body?: string;
  hero_image?: string;
  published_date?: string;
  author_name?: string;
  read_time?: string;
  seo_title?: string;
  seo_description?: string;
  /**
   * Thumbnail shown on the blog index. Separate from `hero_image`, which is a CMS
   * media field and only accepts an uploaded asset — the migrated articles reference
   * images that still live on the legacy host.
   */
  card_image?: string;
  /**
   * The CMS cannot yet link an entry to a taxonomy term, so the tag shown on the
   * index card is stored on the entry itself.
   */
  tag_name?: string;
  tag_slug?: string;
}

export type BlogPost = CmsEntry<BlogPostData> & ResolvedImage;

/**
 * The single image a card or hero should show.
 *
 * `hero_image` is a CMS media field, so it holds an asset **id**, not a URL —
 * resolving it needs a second call. `card_image` is a plain path carried over from the
 * pre-CMS pages. Callers should not have to know which of the two an entry uses, so the
 * client resolves both into one value here.
 */
interface ResolvedImage {
  image_url: string;
}

export interface CaseStudyData extends BlogPostData {
  /** The `?id=` value the old /case-study route used, kept so inbound links resolve. */
  legacy_id?: string;
}

export type CaseStudy = CmsEntry<CaseStudyData> & ResolvedImage;

interface ListResponse<T> {
  data: T[];
  meta: { total: number; limit: number; has_more: boolean; next_cursor: string | null };
}

/**
 * The CMS could not be reached, or answered in a way that says "try again later"
 * rather than "this does not exist".
 *
 * Kept distinct from an ordinary error so callers can tell an outage apart from a
 * missing entry: a missing entry is a 404, an outage is a degraded page. Never let
 * one of these reach the render — it turns the whole route into a 500.
 */
export class CmsUnavailableError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'CmsUnavailableError';
  }
}

/** Statuses that mean "the CMS is unwell", as opposed to "you asked for the wrong thing". */
function isTransientStatus(status: number) {
  return status >= 500 || status === 408 || status === 429;
}

async function delivery<T>(path: string, revalidate = DEFAULT_REVALIDATE_SECONDS): Promise<T> {
  if (!CMS_URL || !CMS_KEY) {
    throw new CmsUnavailableError('CMS_API_URL and CMS_API_KEY must be set.');
  }

  let response: Response;
  try {
    response = await fetch(`${CMS_URL}${path}`, {
      headers: { Authorization: `Bearer ${CMS_KEY}` },
      next: { revalidate, tags: [CMS_CACHE_TAG] },
    });
  } catch (cause) {
    // DNS failure, connection refused, TLS error, timeout — the CMS is not answering.
    throw new CmsUnavailableError(`CMS unreachable on ${path}`, { cause });
  }

  if (!response.ok) {
    // The CMS names the failing condition in every error — surface it rather than
    // a bare status code, because "insufficient_scope" and "key_revoked" have very
    // different fixes.
    const detail = await response.text().catch(() => '');
    const message = `CMS ${response.status} on ${path}: ${detail.slice(0, 300)}`;
    throw isTransientStatus(response.status)
      ? new CmsUnavailableError(message)
      : new Error(message);
  }

  try {
    return (await response.json()) as T;
  } catch (cause) {
    // A truncated or non-JSON body means the response never really arrived.
    throw new CmsUnavailableError(`CMS sent an unreadable body on ${path}`, { cause });
  }
}

/** What a page got back, and whether the CMS was reachable at all. */
export interface CmsResult<T> {
  data: T;
  /** True when the content is missing because the CMS is down, not because it is empty. */
  unavailable: boolean;
}

/**
 * Runs a CMS read without letting an outage take the page down.
 *
 * Returns `fallback` and `unavailable: true` when the CMS cannot answer, so the caller
 * can render a "temporarily unavailable" state instead of a 500.
 *
 * Every failure degrades, not just outages: from a visitor's point of view a revoked
 * key is indistinguishable from a dead host, and neither justifies a broken page. The
 * distinction is kept in the log line — and in /cms/health, which deliberately does not
 * go through here, so operators still see the real error.
 */
export async function tryCms<T>(load: () => Promise<T>, fallback: T): Promise<CmsResult<T>> {
  try {
    return { data: await load(), unavailable: false };
  } catch (error) {
    // warn, not error: the page handled this and rendered. Logging it as an error makes
    // Next's dev overlay announce a crash that did not happen.
    const kind = error instanceof CmsUnavailableError ? 'unavailable' : 'misconfigured';
    console.warn(`[cms] read failed (${kind}), degrading page:`, (error as Error).message);
    return { data: fallback, unavailable: true };
  }
}

interface MediaAsset {
  id: string;
  url: string;
  alt_text: string | null;
}

/**
 * asset id → public URL for the whole library.
 *
 * One request for the library beats one per entry: a 46-post index would otherwise
 * make 46 round trips to resolve its thumbnails. Under the CMS's local storage driver
 * these URLs point back at the API; in production they are CDN URLs.
 */
async function mediaUrlsById(): Promise<Map<string, string>> {
  const body = await delivery<ListResponse<MediaAsset>>('/v1/media?limit=100');
  return new Map(body.data.map((asset) => [asset.id, asset.url]));
}

/** Attaches `image_url`, resolving media ids only when some entry actually uses one. */
async function withImages<T extends CmsEntry<BlogPostData>>(
  entries: T[],
): Promise<(T & ResolvedImage)[]> {
  const usesMedia = entries.some((entry) => entry.data.hero_image);
  const media = usesMedia ? await mediaUrlsById() : new Map<string, string>();

  return entries.map((entry) => ({
    ...entry,
    image_url: entry.data.hero_image
      ? media.get(entry.data.hero_image) ?? ''
      : resolveMediaUrl(entry.data.card_image),
  }));
}

/** Published posts, newest first. */
export async function listBlogPosts(limit = 100): Promise<BlogPost[]> {
  const body = await delivery<ListResponse<CmsEntry<BlogPostData>>>(
    `/v1/content/blog_post?limit=${limit}&sort=-published_at`,
  );
  return withImages(body.data);
}

/**
 * Published posts carrying a given tag, newest first.
 *
 * Filtered here rather than through `filter[…]` on the Delivery API: the tag lives in
 * an ordinary field because this CMS build cannot link an entry to a taxonomy term, and
 * at this catalogue size reusing the cached full list costs less than a second request.
 */
export async function listBlogPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const posts = await listBlogPosts();
  return posts.filter((post) => post.data.tag_slug === tagSlug);
}

/**
 * One post by slug, or null when it does not exist or is unpublished.
 *
 * An outage is *not* flattened into null here: a page that turns "the CMS is down" into
 * a 404 tells search engines the article is gone. Those propagate as
 * `CmsUnavailableError` so the route can degrade instead.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const body = await delivery<{ data: CmsEntry<BlogPostData> }>(
      `/v1/content/blog_post/${encodeURIComponent(slug)}`,
    );
    const [post] = await withImages([body.data]);
    return post;
  } catch (error) {
    if (error instanceof CmsUnavailableError) throw error;
    return null;
  }
}

/** Published case studies, newest first. */
export async function listCaseStudies(limit = 100): Promise<CaseStudy[]> {
  const body = await delivery<ListResponse<CmsEntry<CaseStudyData>>>(
    `/v1/content/case_study?limit=${limit}&sort=-published_at`,
  );
  return withImages(body.data);
}

/**
 * One case study by its old `?id=` value.
 *
 * The route still answers on `?id=N` because those links are embedded in the migrated
 * bodies and in the SubsidiaryUX legacy-URL rewrite, so the mapping has to live
 * somewhere; it lives on the entry rather than in code.
 */
export async function getCaseStudyByLegacyId(legacyId: string): Promise<CaseStudy | null> {
  const studies = await listCaseStudies();
  return studies.find((study) => study.data.legacy_id === legacyId) ?? null;
}

/** Ranked full-text search across published content. */
export async function searchContent(query: string, limit = 20) {
  const body = await delivery<ListResponse<{ kind: string; data: BlogPost }>>(
    `/v1/search?q=${encodeURIComponent(query)}&type=content&limit=${limit}`,
    60,
  );
  return body.data;
}

/** Terms of the `tags` taxonomy. */
export async function listTags() {
  const body = await delivery<ListResponse<{ id: string; name: string; slug: string }>>(
    '/v1/taxonomies/tags/terms',
  );
  return body.data;
}
