import type { BlogPost } from '@/services/cms';

/**
 * The blog card grid, shared by the index and the tag listings.
 *
 * The `save-btn` markup is load-bearing beyond the save toggle itself: SubsidiaryUX
 * locates cards through it to drive the client-side search filter on /blog, and keys
 * the saved-article state off `data-id`. Keep both the class and the attribute.
 */
export default function BlogPostGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) {
    return (
      <p className="font-inter text-sm text-gray-500 py-10">No posts here yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8 pt-3 lg:pt-6 xl:pt-6 2xl:pt-8">
      {posts.map((post) => (
        <div key={post.id} className="lg:col-span-4 col-span-12 group hover:shadow-xl bg-white border">
          <div className="relative overflow-hidden">
            <img
              decoding="async"
              loading="lazy"
              src={post.image_url}
              alt={post.data.title}
              className="transition-transform group-hover:scale-105 duration-300"
            />
          </div>
          <div className="p-5 space-y-5">
            <a href={`/blog/articles/${post.slug}`}>
              <h1 className="font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl hover:underline hover:text-[#194f97]">
                {post.data.title}</h1>
            </a>
            <p className="font-inter text-sm lg:text-sm xl:text-sm 2xl:text-base">
              <span className="italic">{post.data.excerpt}</span>
            </p>
            <div className="save-flex items-center justify-between">
              {post.data.tag_slug ? (
                <a href={`/blog/tag/${post.data.tag_slug}`} className="inline-flex">
                  <h6 className="font-inter text-sm hover:text-[#194f97] hover:underline">{post.data.tag_name}</h6>
                </a>
              ) : (
                <span />
              )}
              <button className="save-btn" data-id={post.id} data-user-id="" data-saved="false">
                <div className="save-icon default" id={`save-icon-${post.id}`}></div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
