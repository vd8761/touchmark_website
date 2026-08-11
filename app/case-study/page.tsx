import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getCaseStudyByLegacyId } from '@/services/cms';

export const revalidate = 300;

/** Shown when no `?id=` is given, matching the previous default. */
const DEFAULT_LEGACY_ID = '1';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const study = await getCaseStudyByLegacyId((await searchParams).id || DEFAULT_LEGACY_ID);
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
  const study = await getCaseStudyByLegacyId((await searchParams).id || DEFAULT_LEGACY_ID);
  if (!study) notFound();

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      {/* Body is trusted HTML authored in the CMS by an authenticated editor.
          Do not render untrusted input through this path. */}
      <div dangerouslySetInnerHTML={{ __html: study.data.body ?? '' }} />
    </div>
  );
}
