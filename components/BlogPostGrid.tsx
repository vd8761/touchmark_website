import type { BlogPost } from '@/services/cms';
import { estimateReadTime } from '@/utils/readTime';

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  );
}

/**
 * The blog card grid, shared by the index and the tag listings.
 *
 * The `save-btn` markup is load-bearing beyond the save toggle itself: SubsidiaryUX
 * locates cards through it to drive the client-side search filter on /blog, and keys
 * the saved-article state off `data-id`. Keep both the class and the attribute, and
 * keep `group lg:col-span-4 col-span-12` on the card — that class trio is how the
 * filter walks back up from a button to the card it belongs to.
 */
export default function BlogPostGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) {
    return (
      <p className="font-inter text-sm text-gray-500 py-10">No posts here yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8 pt-6 lg:pt-10">
      {posts.map((post) => {
        const date = formatDate(post.data.published_date);
        const readTime = post.data.read_time || estimateReadTime(post.data.body);

        return (
          <article
            key={post.id}
            className="lg:col-span-4 col-span-12 group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_18px_45px_rgba(15,40,80,0.14)]"
          >
            <div className="relative">
              <a href={`/blog/articles/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  decoding="async"
                  loading="lazy"
                  src={post.image_url}
                  alt={post.data.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
              {post.data.tag_name &&
                (post.data.tag_slug ? (
                  <a
                    href={`/blog/tag/${post.data.tag_slug}`}
                    className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur transition-colors hover:bg-primary hover:text-white"
                  >
                    {post.data.tag_name}
                  </a>
                ) : (
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
                    {post.data.tag_name}
                  </span>
                ))}
            </div>

            <div className="flex flex-1 flex-col p-5 lg:p-6">
              <div className="flex items-center gap-3 font-inter text-xs text-slate-500">
                {date && <span>{date}</span>}
                {date && readTime && <span aria-hidden="true" className="text-slate-300">•</span>}
                {readTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <ClockIcon />
                    {readTime}
                  </span>
                )}
              </div>

              <a href={`/blog/articles/${post.slug}`} className="mt-3">
                <h2 className="font-gellix text-lg leading-snug transition-colors group-hover:text-primary lg:text-xl 2xl:text-[1.375rem]">
                  {post.data.title}
                </h2>
              </a>

              {post.data.excerpt && (
                <p className="mt-3 line-clamp-3 font-inter text-sm leading-relaxed text-slate-600">
                  {post.data.excerpt}
                </p>
              )}

              <div className="mt-auto pt-6">
              <div className="save-flex border-t border-slate-100 pt-4">
                <a
                  href={`/blog/articles/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-primary"
                >
                  Read article
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <button className="save-btn" data-id={post.id} data-user-id="" data-saved="false">
                  <div className="save-icon default" id={`save-icon-${post.id}`}></div>
                </button>
              </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
