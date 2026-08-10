/**
 * Delivery API client.
 *
 * Server-side only — CMS_API_KEY is a secret key and must never reach the browser.
 * Every response is wrapped in a { data, meta } envelope which is unwrapped here so
 * callers never see it.
 */

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

export type BlogPost = CmsEntry<BlogPostData>;

export interface CaseStudyData extends BlogPostData {
  /** The `?id=` value the old /case-study route used, kept so inbound links resolve. */
  legacy_id?: string;
}

export type CaseStudy = CmsEntry<CaseStudyData>;

interface ListResponse<T> {
  data: T[];
  meta: { total: number; limit: number; has_more: boolean; next_cursor: string | null };
}

async function delivery<T>(path: string, revalidate = DEFAULT_REVALIDATE_SECONDS): Promise<T> {
  if (!CMS_URL || !CMS_KEY) {
    throw new Error('CMS_API_URL and CMS_API_KEY must be set.');
  }

  const response = await fetch(`${CMS_URL}${path}`, {
    headers: { Authorization: `Bearer ${CMS_KEY}` },
    next: { revalidate, tags: [CMS_CACHE_TAG] },
  });

  if (!response.ok) {
    // The CMS names the failing condition in every error — surface it rather than
    // a bare status code, because "insufficient_scope" and "key_revoked" have very
    // different fixes.
    const detail = await response.text().catch(() => '');
    throw new Error(`CMS ${response.status} on ${path}: ${detail.slice(0, 300)}`);
  }

  return response.json() as Promise<T>;
}

/** Published posts, newest first. */
export async function listBlogPosts(limit = 100): Promise<BlogPost[]> {
  const body = await delivery<ListResponse<BlogPost>>(
    `/v1/content/blog_post?limit=${limit}&sort=-published_at`,
  );
  return body.data;
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

/** One post by slug, or null when it does not exist or is unpublished. */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const body = await delivery<{ data: BlogPost }>(
      `/v1/content/blog_post/${encodeURIComponent(slug)}`,
    );
    return body.data;
  } catch {
    return null;
  }
}

/** Published case studies, newest first. */
export async function listCaseStudies(limit = 100): Promise<CaseStudy[]> {
  const body = await delivery<ListResponse<CaseStudy>>(
    `/v1/content/case_study?limit=${limit}&sort=-published_at`,
  );
  return body.data;
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
