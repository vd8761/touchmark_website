/**
 * The e-book catalogue, keyed by the `?ebook_content_id=` the homepage links use.
 *
 * Shared by the landing page and the submission API so a title can never drift between
 * what a visitor reads and what the confirmation email says.
 *
 * TODO(content): `tagline`, `intro`, `points` and `quote` are the marketing copy for
 * each e-book. They shipped as lorem ipsum from the original build and are omitted from
 * the render until real copy is supplied — an empty section does not appear at all,
 * rather than showing placeholder text to visitors.
 */
export interface Ebook {
  id: string;
  title: string;
  /** Sub-heading under the title in the hero. */
  tagline?: string;
  coverImage: string;
  /** Paragraphs for the "What you can learn" section. */
  intro?: string[];
  /** Bulleted takeaways, shown with a tick. */
  points?: string[];
  /** Pull quote below the bullets. */
  quote?: string;
}

export const EBOOKS: Record<string, Ebook> = {
  '1': {
    id: '1',
    title: 'Advancing Aerospace Innovations And Future Directions In The Industry',
    coverImage: '/assets/front/home/ebook_thumb_1721628330.webp',
  },
  '2': {
    id: '2',
    title: 'Design and Technological Strategies Shaping the Future of UX/UI',
    coverImage: '/assets/front/home/ebook_thumb_1721628762.webp',
  },
  '3': {
    id: '3',
    title: 'Unleashing Business Potential through Open-Source Collaboration and Development',
    coverImage: '/assets/front/home/ebook_thumb_1721628861.webp',
  },
};

export const DEFAULT_EBOOK_ID = '1';

export function getEbook(id: string | undefined): Ebook | undefined {
  return EBOOKS[id || DEFAULT_EBOOK_ID];
}

/**
 * The file a requester should be sent, from `EBOOK_DOWNLOAD_URL_<id>`.
 *
 * Server-only. The PDFs are not in this repo, so until those variables are set the
 * confirmation email promises a follow-up from the team instead of linking to a file
 * that does not exist — see app/api/ebook/route.ts.
 */
export function getEbookDownloadUrl(id: string): string {
  const url = process.env[`EBOOK_DOWNLOAD_URL_${id}`] ?? '';
  return /^https?:\/\//i.test(url) ? url : '';
}
