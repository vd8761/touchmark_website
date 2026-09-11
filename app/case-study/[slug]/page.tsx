import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { caseStudies } from '@/data/case-studies';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) return {};

  return {
    title: `${study.title} Case Study`,
    description: study.heroSubtitle,
    openGraph: {
      title: `${study.title} Case Study`,
      description: study.heroSubtitle,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyTemplate data={study} />;
}
