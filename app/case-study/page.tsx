import { redirect } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';

/** Shown when no `?id=` is given, matching the previous default. */
const DEFAULT_LEGACY_ID = '1';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const idStr = (await searchParams).id || DEFAULT_LEGACY_ID;
  const id = parseInt(idStr, 10);
  
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    redirect('/case-study/rupinis');
  }

  // Redirect legacy ?id=1 to the new beautiful slug URL!
  redirect(`/case-study/${study.slug}`);
}
