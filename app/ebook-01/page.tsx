import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import EbookForm from '@/components/EbookForm';
import { getEbook } from '@/services/ebooks';

/**
 * The e-book landing page.
 *
 * This used to be the same ~170 lines of markup pasted three times behind an
 * `id === "1" | "2" | "3"` switch, which is how ebook 3 ended up with a grid whose
 * columns summed to 11 and how ebooks 2 and 3 lost their "What you can learn" heading.
 * One layout now; the entries live in services/ebooks.ts.
 */
interface PageProps {
  searchParams: Promise<{ ebook_content_id?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const ebook = getEbook((await searchParams).ebook_content_id);
  if (!ebook) return {};

  return {
    title: `${ebook.title} — Touchmark E-Book`,
    description: ebook.tagline ?? `Download the Touchmark Descience e-book: ${ebook.title}.`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const ebook = getEbook((await searchParams).ebook_content_id);
  if (!ebook) notFound();

  const hasDetail = Boolean(ebook.intro?.length || ebook.points?.length || ebook.quote);

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      <section
        className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10"
        style={{ backgroundImage: "url('/images/ebooks/hero-banner-img-e-book.webp')" }}
      >
        <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
          <div className="grid grid-cols-12 lg:gap-4">
            <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
              <nav aria-label="Breadcrumb" className="text-xs lg:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">
                <ol className="flex items-center gap-2">
                  <li><Link href="/" className="hover:underline">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">E-Book</li>
                </ol>
              </nav>

              <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                {ebook.title}
              </h1>

              {ebook.tagline && (
                <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                  {ebook.tagline}
                </p>
              )}
            </div>
            <div className="col-span-5 lg:block hidden" />
          </div>
        </div>
      </section>

      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:pt-24 xl:py-24 2xl:py-32">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 col-span-12">
            {hasDetail && (
              <h2 className="text-2xl lg:text-3xl font-primary text-gray-950 mb-4 font-bold">
                What you can learn
              </h2>
            )}

            {ebook.intro?.map((paragraph) => (
              <p key={paragraph} className="text-sm font-secondary text-gray-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="py-5 lg:py-6 flex justify-start items-center">
              <img
                decoding="async"
                src={ebook.coverImage}
                className="max-w-[200px] shadow-sm border border-gray-100 rounded"
                alt={`${ebook.title} cover`}
              />
            </div>

            {ebook.points && ebook.points.length > 0 && (
              <ul className="space-y-4 mb-6">
                {ebook.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <img
                      decoding="async"
                      loading="lazy"
                      src="/images/ebooks/tick.svg"
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      alt=""
                    />
                    <span className="text-sm font-secondary text-gray-600 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {ebook.quote && (
              <p className="italic text-base font-secondary text-gray-600 border-l-4 border-primary pl-4 py-1 leading-relaxed">
                &ldquo;{ebook.quote}&rdquo;
              </p>
            )}
          </div>

          <div className="lg:col-span-6 col-span-12 lg:mt-0 mt-8">
            <EbookForm ebookId={ebook.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
