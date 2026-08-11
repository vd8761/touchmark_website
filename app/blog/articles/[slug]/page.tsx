import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import NewsletterSection from '@/components/NewsletterSection';
import RelatedBlogsSection from '@/components/RelatedBlogsSection';
import { getBlogPost, listBlogPosts } from '@/services/cms';

export const revalidate = 300;
export const dynamicParams = true;

const SITE_URL = 'https://touchmarkdes.com';
const RELATED_COUNT = 4;

export async function generateStaticParams() {
  const posts = await listBlogPosts();
  return posts
    .filter((post) => post.slug)
    .map((post) => ({ slug: post.slug as string }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const post = await getBlogPost((await params).slug);
  if (!post) return {};

  return {
    title: post.data.seo_title ?? post.data.title,
    description: post.data.seo_description ?? post.data.excerpt,
    openGraph: {
      title: post.data.seo_title ?? post.data.title,
      description: post.data.seo_description ?? post.data.excerpt,
      images: post.image_url ? [post.image_url] : undefined,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const allPosts = await listBlogPosts();
  const related = allPosts.filter((other) => other.slug !== slug).slice(0, RELATED_COUNT);
  const shareUrl = encodeURIComponent(`${SITE_URL}/blog/articles/${slug}`);

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      <div id="blog-content">
        <section className="2xl:max-w-screen-lg xl:max-w-screen-md lg:max-w-screen-md w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-12 col-span-12">
              <a href="/blog">
                <div className="inline-flex justify-start items-center space-x-2">
                  <svg height="12" viewBox="-111 0 475 475.46667" width="12" className="text-gray-500" xmlns="http://www.w3.org/2000/svg">
                    <path d="m237.964844 475.464844-237.730469-237.730469 237.730469-237.734375 15.070312 15.066406-222.667968 222.667969 222.667968 222.664063zm0 0"></path>
                  </svg>
                  <p className="hover:underline text-sm text-gray-500">Back to New at Descience Blog</p>
                </div>
              </a>
              <h1 className="mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 font-gellix text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                {post.data.title}</h1>
              <div className="flex justify-start items-center space-x-2 mt-10">
                <a href={`https://www.linkedin.com/share?url=${shareUrl}`} target="_blank" className="group">
                  <img decoding="async" src="/images/home/icons/linkedin-black-fill.svg" alt="Share on LinkedIn" className="h-8 group-hover:hidden" />
                  <img decoding="async" loading="lazy" src="/images/home/icons/linkedin-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="group">
                  <img decoding="async" loading="lazy" src="/images/home/icons/facebook-black-fill.svg" alt="Share on Facebook" className="h-8 group-hover:hidden" />
                  <img decoding="async" loading="lazy" src="/images/home/icons/facebook-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
                </a>
                <a href={`https://twitter.com/share?url=${shareUrl}`} target="_blank" className="group">
                  <img decoding="async" loading="lazy" src="/images/home/icons/twitter-black-fill.svg" alt="Share on X" className="h-8 group-hover:hidden" />
                  <img decoding="async" loading="lazy" src="/images/home/icons/twitter-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 col-span-12"></div>
          </div>

          {post.data.author_name || post.data.published_date || post.data.read_time ? (
            <div className="mt-5 flex justify-start items-center space-x-3 font-inter text-sm text-gray-500">
              {post.data.author_name && <span>{post.data.author_name}</span>}
              {post.data.published_date && (
                <time dateTime={post.data.published_date}>
                  {new Date(post.data.published_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              )}
              {post.data.read_time && <span>{post.data.read_time}</span>}
            </div>
          ) : null}

          {/* Posts authored in the CMS carry a hero as a media asset. The migrated ones
              have it baked into the body HTML instead, so this stays empty for them and
              the image is never rendered twice. */}
          {post.data.hero_image && post.image_url && (
            <div className="mt-10">
              <img
                decoding="async"
                fetchPriority="high"
                src={post.image_url}
                alt={post.data.title}
                className="w-full h-auto"
                style={{ paddingBottom: '30px' }}
              />
            </div>
          )}

          {/* Body is trusted HTML authored in the CMS by an authenticated editor.
              Do not render untrusted input through this path. */}
          <div className="blog_desc" dangerouslySetInnerHTML={{ __html: post.data.body ?? '' }} />
        </section>

        <NewsletterSection />
      </div>

      <RelatedBlogsSection posts={related} />
    </div>
  );
}
