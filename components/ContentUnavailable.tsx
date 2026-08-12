import Link from 'next/link';

/**
 * Shown in place of CMS-backed content when the CMS cannot be reached.
 *
 * Deliberately states that the problem is on our side and temporary, rather than
 * implying the content does not exist — the visitor should come back, not conclude the
 * page is dead. Pair it with `noindex` on any route where this can be the whole page,
 * so an outage never gets crawled as an empty listing.
 */
export default function ContentUnavailable({
  title = 'This content is temporarily unavailable',
  message = 'We are having trouble loading this right now. It is a problem on our end, not yours — please try again in a few moments.',
  retryHref,
}: {
  title?: string;
  message?: string;
  /** Where "Try again" points. Use the current path so the retry re-renders the page. */
  retryHref: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-14 text-center lg:py-20"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
        <svg
          className="h-6 w-6 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>

      <h2 className="mt-5 font-gellix text-xl lg:text-2xl">{title}</h2>
      <p className="mt-3 max-w-md font-inter text-sm leading-relaxed text-slate-600">{message}</p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a
          href={retryHref}
          className="inline-flex items-center bg-primary px-5 py-2.5 font-inter text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
        >
          Try again
        </a>
        <Link
          href="/contact-us"
          className="inline-flex items-center border border-slate-300 px-5 py-2.5 font-inter text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
