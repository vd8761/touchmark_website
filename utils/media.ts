/**
 * Normalises an image reference coming from the CMS.
 *
 * The migrated entries carry the paths that were hardcoded on the old pages, and those
 * were written as document-relative (`assets/front/home/x.webp`). That only resolved
 * correctly from `/blog`; on `/blog/articles/<slug>` it would resolve to
 * `/blog/articles/assets/…`. Anchoring the path at the site root fixes both.
 */
export function resolveMediaUrl(source: string | undefined): string {
  if (!source) return '';
  if (/^(https?:)?\/\//.test(source) || source.startsWith('data:')) return source;
  return `/${source.replace(/^(?:\.{1,2}\/)+/, '').replace(/^\/+/, '')}`;
}
