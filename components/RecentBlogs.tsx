import { listBlogPosts, type BlogPost } from '@/services/cms';
import { resolveMediaUrl } from '@/utils/media';
import { estimateReadTime } from '@/utils/readTime';

/** The newest post is featured; the next three fill the row beneath it. */
const SUPPORTING_COUNT = 3;

function readTimeOf(post: BlogPost) {
  return post.data.read_time || estimateReadTime(post.data.body);
}

function TagChip({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className={
        muted
          ? 'border text-[10px] lg:text-xs px-2.5 py-0.5 rounded-full font-secondary tracking-wider uppercase border-white/30 text-white group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300'
          : 'border border-white/30 text-white text-xs px-3 py-1 rounded-full font-secondary tracking-wider uppercase'
      }
    >
      {label}
    </span>
  );
}

function ClockIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  );
}

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

/**
 * "Recent Blogs" on the homepage, sourced from the CMS.
 *
 * A Server Component — app/page.tsx is deliberately not 'use client' so this can read
 * the Delivery API during the render. Publishing a post in the CMS now updates the
 * homepage on the next revalidation, with no code change.
 */
export default async function RecentBlogs() {
  const posts = await listBlogPosts();
  if (!posts.length) return null;

  const [featured, ...rest] = posts;
  const supporting = rest.slice(0, SUPPORTING_COUNT);

  return (
    <section className="w-full bg-primary py-14 lg:py-24 xl:py-24 2xl:py-32 text-white">
      <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-10 mb-12">
          <div className="max-w-3xl">
            <p className="font-secondary text-xs lg:text-sm font-semibold tracking-widest text-white/70">Blogs</p>
            <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">Recent Blogs</h2>
            <p className="font-secondary text-white/80 text-sm lg:text-base leading-relaxed mt-4">
              Stories about our people, our capabilities, our research, and the ever-changing face of our firm.
            </p>
          </div>
          <a href="/blog" className="inline-flex items-center justify-center bg-white text-primary font-secondary font-semibold px-6 py-3 rounded-none hover:bg-white/95 transition-all text-sm shadow-md shrink-0 w-fit">
            <span>View all</span>
            <ArrowIcon className="w-4 h-4 ml-2" />
          </a>
        </div>

        {/* Featured Blog Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div className="relative group overflow-hidden rounded-3xl">
            <a href={`/blog/articles/${featured.slug}`}>
              <img
                loading="lazy"
                decoding="async"
                src={resolveMediaUrl(featured.data.card_image)}
                alt={featured.data.title}
                className="w-full h-auto object-cover rounded-3xl"
              />
            </a>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              {featured.data.tag_name && <TagChip label={featured.data.tag_name} />}
              <span className="flex items-center text-white/85 text-xs font-secondary ml-1.5">
                <ClockIcon className="w-4 h-4 mr-1.5" />
                {readTimeOf(featured)}
              </span>
            </div>

            <h3 className="font-primary text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mt-6">
              {featured.data.title}
            </h3>

            <p className="font-secondary text-white/70 text-sm lg:text-base leading-relaxed mt-4">
              {featured.data.excerpt}
            </p>

            <a
              href={`/blog/articles/${featured.slug}`}
              className="inline-flex items-center border border-white text-white bg-transparent px-6 py-3 rounded-none hover:bg-white hover:text-primary transition-all duration-300 text-sm font-secondary font-semibold mt-8 w-fit group"
            >
              <span>Learn more</span>
              <ArrowIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supporting.map((post) => (
            <div
              key={post.id}
              className="group rounded-none p-6 lg:p-8 flex flex-col justify-between border border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 shadow-none hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {post.data.tag_name && <TagChip label={post.data.tag_name} muted />}
                  <span className="flex items-center text-[10px] lg:text-xs font-secondary ml-1 text-white/85 group-hover:text-primary/80 transition-colors duration-300">
                    <ClockIcon className="w-3.5 h-3.5 mr-1" />
                    {readTimeOf(post)}
                  </span>
                </div>

                <h4 className="font-primary text-lg lg:text-xl font-bold leading-snug line-clamp-2 text-white group-hover:text-primary transition-colors duration-300">
                  {post.data.title}
                </h4>

                <p className="font-secondary text-xs lg:text-sm leading-relaxed mt-3 line-clamp-3 text-white/70 group-hover:text-gray-600 transition-colors duration-300">
                  {post.data.excerpt}
                </p>
              </div>

              <div>
                <div className="my-6 overflow-hidden rounded-2xl">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={resolveMediaUrl(post.data.card_image)}
                    alt={post.data.title}
                    className="w-full h-44 object-cover object-center rounded-2xl"
                  />
                </div>

                <a
                  href={`/blog/articles/${post.slug}`}
                  className="inline-flex items-center text-xs lg:text-sm font-secondary font-semibold group/link text-white group-hover:text-primary transition-colors duration-300"
                >
                  <span>Learn more</span>
                  <ArrowIcon className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
