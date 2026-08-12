import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import ContentUnavailable from '@/components/ContentUnavailable';
import { getCaseStudyByLegacyId, tryCms, type CaseStudy } from '@/services/cms';

export const revalidate = 300;

/** Shown when no `?id=` is given, matching the previous default. */
const DEFAULT_LEGACY_ID = '1';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const id = (await searchParams).id || DEFAULT_LEGACY_ID;
  const { data: study, unavailable } = await tryCms(
    () => getCaseStudyByLegacyId(id),
    null as CaseStudy | null,
  );
  if (unavailable) return { robots: { index: false, follow: true } };
  if (!study) return {};

  return {
    title: study.data.seo_title ?? `${study.data.title} Case Study`,
    description: study.data.seo_description ?? study.data.excerpt,
    openGraph: {
      title: study.data.seo_title ?? study.data.title,
      description: study.data.seo_description ?? study.data.excerpt,
      type: 'article',
      publishedTime: study.published_at ?? undefined,
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const id = (await searchParams).id || DEFAULT_LEGACY_ID;
  const { data: study, unavailable } = await tryCms(
    () => getCaseStudyByLegacyId(id),
    null as CaseStudy | null,
  );

  // Only a genuinely missing study is a 404 — an outage keeps the URL alive.
  if (!study) {
    if (!unavailable) notFound();
    return (
      <div className="overflow-x-hidden lg:overflow-x-auto">
        <section className="2xl:max-w-screen-lg xl:max-w-screen-md lg:max-w-screen-md w-full mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
          <ContentUnavailable
            title="This case study is temporarily unavailable"
            message="We cannot reach our content library at the moment. It is a problem on our end — please try again shortly."
            retryHref={`/case-study?id=${encodeURIComponent(id)}`}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      {/* Body is trusted HTML authored in the CMS by an authenticated editor.
          Do not render untrusted input through this path. */}
      <div dangerouslySetInnerHTML={{ __html: study.data.body ?? '' }} />
    </div>
  );
}
