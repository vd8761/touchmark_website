import type { Metadata } from 'next';

import CmsHealthRow, { statusPresentation } from '@/components/CmsHealthRow';
import { checkCmsHealth } from '@/services/cms-health';

/**
 * Live status of the CMS connection.
 *
 * `force-dynamic` and `revalidate = 0` are the point of the page: every other
 * route here is statically rendered and cached for five minutes, which would make
 * this one report the state of the world at build time. It must run per request.
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'CMS status',
  // Operational page. Keeping it out of search results also keeps it out of the
  // sitemap and off the radar of anyone not looking for it deliberately.
  robots: { index: false, follow: false },
};

const HEADLINE: Record<string, string> = {
  pass: 'All checks passed',
  warn: 'Working, with warnings',
  fail: 'Something is broken',
};

export default async function Page() {
  const report = await checkCmsHealth();
  const presentation = statusPresentation(report.status);

  return (
    <div className="overflow-x-hidden">
      <section className="max-w-3xl w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 pb-16 lg:pb-24">
        <h1 className="font-gellix text-3xl lg:text-4xl">CMS status</h1>
        <p className="mt-3 font-inter text-sm text-gray-600">
          Live check of the connection between this site and the CMS that supplies the blog. Runs on
          every request — reload to re-test.
        </p>

        <div className="mt-8 border border-gray-200 bg-white">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
            <span className={`w-3 h-3 rounded-full ${presentation.dot}`} aria-hidden="true" />
            <span className={`font-gellix text-lg ${presentation.text}`}>
              {HEADLINE[report.status]}
            </span>
          </div>

          <ul className="px-5">
            {report.checks.map((check) => (
              <CmsHealthRow key={check.id} check={check} />
            ))}
          </ul>

          <dl className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex gap-2">
              <dt className="font-inter text-xs text-gray-400">CMS host</dt>
              <dd className="font-inter text-xs text-gray-600 break-all">{report.host ?? 'not configured'}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-inter text-xs text-gray-400">Checked at</dt>
              <dd className="font-inter text-xs text-gray-600">
                {/* The server renders UTC and the client would render local time;
                    printing the raw ISO string keeps them from disagreeing and
                    triggering a hydration mismatch. */}
                {report.checkedAt}
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 font-inter text-xs text-gray-400">
          No credentials are shown on this page — each check reports only whether a value is
          configured and accepted.
        </p>
      </section>
    </div>
  );
}
