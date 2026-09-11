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
    intro: [
      'The aerospace sector is undergoing a rapid transformation, driven by emerging technologies and an increased focus on sustainability. This comprehensive e-book explores the cutting-edge innovations that are redefining how we design, manufacture, and operate within the industry.',
      'From advanced materials and additive manufacturing to the integration of artificial intelligence in flight systems, staying ahead of the curve is crucial for industry leaders. We dive deep into the strategic shifts required to adapt to these changes and maintain a competitive edge in a global market.',
      'Whether you are an established manufacturer or an emerging startup, understanding the trajectory of aerospace innovation will empower you to make informed decisions. Download your copy today to discover actionable insights and prepare your organization for the future of flight.',
    ],
  },
  '2': {
    id: '2',
    title: 'Design and Technological Strategies Shaping the Future of UX/UI',
    coverImage: '/assets/front/home/ebook_thumb_1721628762.webp',
    intro: [
      'User experience is no longer just about aesthetics; it is a critical driver of business success and customer retention. This e-book provides a detailed analysis of the evolving UX/UI landscape, highlighting the strategic design decisions that are shaping the next generation of digital products.',
      'We explore the intersection of human-centered design and emerging technologies, including voice interfaces, augmented reality, and AI-driven personalization. Learn how top-tier organizations are leveraging these tools to create seamless, intuitive, and engaging experiences that resonate with users.',
      'Equip your product teams with the knowledge they need to build digital interfaces that not only look beautiful but also deliver measurable business results. Uncover the methodologies and technological strategies that will define the future of UX/UI design.',
    ],
  },
  '3': {
    id: '3',
    title: 'Unleashing Business Potential through Open-Source Collaboration and Development',
    coverImage: '/assets/front/home/ebook_thumb_1721628861.webp',
    intro: [
      'Open-source software has become the backbone of modern enterprise architecture, offering unparalleled flexibility, security, and innovation. This e-book delves into the transformative power of open-source collaboration and how it is enabling businesses to scale efficiently and securely.',
      'Discover the strategic advantages of participating in open-source ecosystems, from accelerating time-to-market to attracting top engineering talent. We analyze successful case studies of companies that have harnessed community-driven development to build robust and highly adaptable software solutions.',
      'Learn how to effectively integrate open-source methodologies into your proprietary development workflows. Download this guide to unlock the full potential of collaborative engineering and drive sustainable growth for your organization.',
    ],
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
