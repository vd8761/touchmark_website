import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import BlogPostGrid from '@/components/BlogPostGrid';
import BlogSocialBar from '@/components/BlogSocialBar';
import ContentUnavailable from '@/components/ContentUnavailable';
import { listBlogPosts, listBlogPostsByTag, listTags, tryCms, type BlogPost } from '@/services/cms';

export const revalidate = 300;
export const dynamicParams = true;

/**
 * A CMS outage at build time prunes the prerender list rather than failing the build —
 * `dynamicParams` means every tag still renders on demand once the CMS is back.
 */
export async function generateStaticParams() {
  const { data: posts } = await tryCms(() => listBlogPosts(), [] as BlogPost[]);
  const slugs = new Set(
    posts.map((post) => post.data.tag_slug).filter((slug): slug is string => Boolean(slug)),
  );
  return [...slugs].map((slug) => ({ slug }));
}

/**
 * Display name for a tag.
 *
 * The taxonomy term is canonical: the per-entry `tag_name` was carried over from the
 * old hardcoded cards and is not consistent across posts, so it is only a fallback for
 * a tag that has no term yet.
 */
async function resolveTagName(slug: string, posts: Awaited<ReturnType<typeof listBlogPostsByTag>>) {
  const terms = await listTags().catch(() => []);
  return terms.find((term) => term.slug === slug)?.name ?? posts[0]?.data.tag_name ?? '';
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const { data: posts, unavailable } = await tryCms(
    () => listBlogPostsByTag(slug),
    [] as BlogPost[],
  );
  if (unavailable) return { title: 'Touchmark Blog', robots: { index: false, follow: true } };
  if (!posts.length) return {};

  const name = await resolveTagName(slug, posts);
  return {
    title: `${name} — Touchmark Blog`,
    description: `Touchmark Descience articles tagged ${name}.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: posts, unavailable } = await tryCms(
    () => listBlogPostsByTag(slug),
    [] as BlogPost[],
  );

  // A tag with no published posts has no page — the old hardcoded route only ever
  // existed for tags that had content. An outage is not that case: 404-ing here would
  // tell crawlers the tag is gone, so it degrades instead.
  if (!posts.length && !unavailable) notFound();

  const tagName = unavailable ? '' : await resolveTagName(slug, posts);

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-10 col-span-12">
            <a href="/blog">
              <div className="inline-flex justify-start items-center space-x-2">
                <svg height="12" viewBox="-111 0 475 475.46667" className="text-gray-500" width="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="m237.964844 475.464844-237.730469-237.730469 237.730469-237.734375 15.070312 15.066406-222.667968 222.667969 222.667968 222.664063zm0 0"></path>
                </svg>
                <p className="hover:underline text-gray-500 text-sm">Back to New at Descience Blog</p>
              </div>
            </a>
            <h1 className="mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 font-gellix text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {tagName || 'Blog'}</h1>
          </div>
          <div className="lg:col-span-2 col-span-12 lg:block hidden"></div>
        </div>
      </section>

      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-7 lg:pt-12 xl:pt-12 2xl:pt-16">
        {unavailable ? (
          <ContentUnavailable
            title="Articles are temporarily unavailable"
            message="We cannot reach our content library at the moment. It is a problem on our end — please try again shortly."
            retryHref={`/blog/tag/${slug}`}
          />
        ) : (
          <>
            <BlogSocialBar heading="BROWSE ALL POSTS" />
            <div className="border border-b mt-5"></div>
            <BlogPostGrid posts={posts} />
          </>
        )}
      </section>

      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-7 lg:pt-12 xl:pt-12 2xl:pt-16">
        <div className="text-transparent">
          01
        </div>
      </section>
    </div>
  );
}
