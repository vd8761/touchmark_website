/** Average adult reading speed for prose, in words per minute. */
const WORDS_PER_MINUTE = 200;

/**
 * Reading time for an article body, as a display string.
 *
 * A fallback only: when an editor fills in the CMS `read_time` field, that wins. The
 * migrated articles have it empty, and a derived estimate reads better than a blank
 * chip in the card design.
 */
export function estimateReadTime(html: string | undefined): string {
  const words = (html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} MIN TO READ`;
}
