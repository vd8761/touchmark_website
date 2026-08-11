import type { BlogPost } from '@/services/cms';

/**
 * The "Read Touchmark Descience Blogs" tile grid shown under every article.
 *
 * The hardcoded pages listed the same four posts on every article; this takes whatever
 * the caller passes, so the tiles now follow the CMS.
 */
export default function RelatedBlogsSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">
      <div className="grid grid-cols-12">
        <div className="lg:col-span-4 xl:col-span-5 2xl:col-span-6 col-span-12">
          <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-inter font-medium">
            Descience Blogs</h3>
          <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
            Read Touchmark Descience Blogs</h1>
        </div>
        <div className="lg:col-span-8 xl:col-span-7 2xl:col-span-6 col-span-12 lg:block hidden"></div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="lg:col-span-3 col-span-12 relative overflow-hidden group h-[300px] lg:h-[350px] xl:h-[400px]"
          >
            <a href={`/blog/articles/${post.slug}`}>
              <img
                decoding="async"
                loading="lazy"
                src={post.image_url}
                alt={post.data.title}
                className="transition-transform group-hover:scale-125 duration-500 lg:w-auto w-full h-full object-cover"
              />
            </a>
            <div className="absolute inset-0 flex justify-end items-end">
              <div className="bg-gradient-to-t from-black/45 to-transparent p-5 transition-opacity duration-300 group-hover:from-black/90 group-hover:to-black/0 w-full">
                <div className="flex justify-between items-end">
                  <a href={`/blog/articles/${post.slug}`}>
                    <div>
                      <h1 className="text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2">
                        {post.data.title}
                      </h1>
                    </div>
                  </a>
                  <div>
                    <a href={`/blog/articles/${post.slug}`}>
                      <svg fill="none" height="28" className="-rotate-90 rounded-full text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
                        <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
