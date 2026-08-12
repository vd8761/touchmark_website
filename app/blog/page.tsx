import type { Metadata } from 'next';
import Link from 'next/link';

import BlogPostGrid from '@/components/BlogPostGrid';
import ContentUnavailable from '@/components/ContentUnavailable';
import { listBlogPosts, tryCms, type BlogPost } from '@/services/cms';

export const revalidate = 300;

const DESCRIPTION =
  'A collection of stories about our people, our capabilities, our research, and the ever-changing face of our firm.';

/**
 * `noindex` while the CMS is down, so an outage is never crawled as a blog with no
 * articles. The listing read is cached, so this does not cost a second round trip.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { unavailable } = await tryCms(() => listBlogPosts(), [] as BlogPost[]);
  return {
    title: 'Touchmark Blog',
    description: DESCRIPTION,
    robots: unavailable ? { index: false, follow: true } : undefined,
  };
}

const socials = [
  {
    href: 'https://in.linkedin.com/company/touchmarkdes',
    label: 'LinkedIn',
    icon: '/images/home/icons/linkedin-black-fill.svg',
    hoverIcon: '/images/home/icons/linkedin-blue-fill.svg',
  },
  {
    href: 'https://www.facebook.com/touchmarkdes/',
    label: 'Facebook',
    icon: '/images/home/icons/facebook-black-fill.svg',
    hoverIcon: '/images/home/icons/facebook-blue-fill.svg',
  },
  {
    href: 'https://www.instagram.com/touchmarkdes/',
    label: 'Instagram',
    icon: '/images/home/icons/insta-black-fill.svg',
    hoverIcon: '/images/home/icons/insta-blue-fill.svg',
  },
];

const CONTAINER =
  '2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8';

export default async function Page() {
  const { data: posts, unavailable } = await tryCms(() => listBlogPosts(), [] as BlogPost[]);

  // Tag chips are derived from what is actually published, so a new tag in the CMS
  // shows up here without a code change.
  const topicMap = new Map<string, string>();
  for (const post of posts) {
    const { tag_name: name, tag_slug: slug } = post.data;
    if (name && slug && !topicMap.has(slug)) topicMap.set(slug, name);
  }
  const topics = [...topicMap.entries()];

  return (
    <div className="overflow-x-hidden bg-white lg:overflow-x-auto">

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-16 text-white lg:pt-32 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl"
        />

        <div className={`${CONTAINER} relative`}>
          <nav aria-label="Breadcrumb" className="font-inter text-xs text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90" aria-current="page">Blog</li>
            </ol>
          </nav>

          <div className="mt-8 grid grid-cols-12 gap-8 lg:mt-12">
            <div className="col-span-12 lg:col-span-8">
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                New at Descience
              </p>
              <h1 className="mt-4 font-gellix text-4xl leading-[1.08] lg:text-5xl xl:text-6xl 2xl:text-7xl">
                Ideas worth<br className="hidden sm:block" /> building on
              </h1>
              <p className="mt-6 max-w-2xl font-inter text-sm leading-relaxed text-white/75 lg:text-base">
                A collection of stories about our people, our capabilities, our research, and the
                ever-changing face of our firm.
              </p>
            </div>

            {/* Counts would read "0 articles" during an outage, which is a claim we do
                not want to make — so the whole block sits out. */}
            {!unavailable && posts.length > 0 && (
              <div className="col-span-12 flex items-end lg:col-span-4 lg:justify-end">
                <dl className="flex gap-10">
                  <div>
                    <dt className="font-inter text-xs uppercase tracking-[0.18em] text-white/50">Articles</dt>
                    <dd className="mt-1 font-gellix text-3xl lg:text-4xl">{posts.length}</dd>
                  </div>
                  {topics.length > 0 && (
                    <div>
                      <dt className="font-inter text-xs uppercase tracking-[0.18em] text-white/50">Topics</dt>
                      <dd className="mt-1 font-gellix text-3xl lg:text-4xl">{topics.length}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Toolbar: topics + search. Filtering nothing is worse than not offering it,
          so the whole toolbar is skipped while the listing is unavailable. */}
      {!unavailable && (
      <section className={`${CONTAINER} pt-10 lg:pt-14`}>
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {topics.length > 0 && (
              <span className="mr-1 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Topics
              </span>
            )}
            {topics.map(([slug, name]) => (
              <a
                key={slug}
                href={`/blog/tag/${slug}`}
                className="rounded-full border border-slate-200 px-3.5 py-1.5 font-inter text-xs text-slate-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
              >
                {name}
              </a>
            ))}
          </div>

          {/* SubsidiaryUX rewrites this form to filter the grid client-side on /blog. */}
          <div className="flex items-center justify-start lg:justify-end">
            <div className="relative flex items-center rounded-full border border-slate-200 bg-slate-50 transition-colors focus-within:border-primary">
              <div className="search-icon relative z-10 bg-transparent px-4 py-3">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="#194F97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <form action="https://touchmarkdes.com/search.php" method="get" className="flex">
                <input
                  className="search-input h-11 bg-transparent text-sm text-black outline-none"
                  type="search"
                  name="query"
                  autoComplete="off"
                  spellCheck="false"
                  aria-live="polite"
                  placeholder="Search articles..."
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Posts */}
      <section className={`${CONTAINER} ${unavailable ? 'pt-10 lg:pt-14' : ''} pb-16 lg:pb-24`}>
        {unavailable ? (
          <ContentUnavailable
            title="Articles are temporarily unavailable"
            message="We cannot reach our content library at the moment, so the latest articles are not showing. It is a problem on our end — please try again shortly."
            retryHref="/blog"
          />
        ) : (
          <BlogPostGrid posts={posts} />
        )}
      </section>

      {/* Follow along */}
      <section className={`${CONTAINER} pb-16 lg:pb-24`}>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-slate-50 px-6 py-8 sm:flex-row sm:items-center lg:px-10">
          <div>
            <h2 className="font-gellix text-xl lg:text-2xl">Follow along</h2>
            <p className="mt-2 font-inter text-sm text-slate-600">
              New thinking from our teams, as it is published.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Touchmark on ${social.label}`}
              >
                <img decoding="async" loading="lazy" src={social.icon} alt="" className="h-8 group-hover:hidden" />
                <img decoding="async" loading="lazy" src={social.hoverIcon} alt="" className="hidden h-8 group-hover:block" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
