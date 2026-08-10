import type { Metadata } from 'next';

import { listBlogPosts } from '@/services/cms';
import { resolveMediaUrl } from '@/utils/media';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Touchmark Blog',
  description:
    'A collection of stories about our people, our capabilities, our research, and the ever-changing face of our firm.',
};

export default async function Page() {
  const posts = await listBlogPosts();

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-10 col-span-12">
            <a href="/about-us">
              <div className="inline-flex justify-start items-center space-x-2">
                <svg height="12" viewBox="-111 0 475 475.46667" className="text-gray-500" width="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="m237.964844 475.464844-237.730469-237.730469 237.730469-237.734375 15.070312 15.066406-222.667968 222.667969 222.667968 222.664063zm0 0"></path>
                </svg>
                <p className="hover:underline text-gray-500 text-sm">Back to About Us</p>
              </div>
            </a>
            <h1 className="mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 font-gellix text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              New at Descience Blog</h1>
            <p className="mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 2xl:text-base xl:text-sm lg:text-sm text-xs font-inter">A
              collection of stories about our people, our capabilities, our research, and the ever-changing
              face
              of our firm.</p>
          </div>
          <div className="lg:col-span-2 col-span-12 lg:block hidden"></div>
        </div>
      </section>

      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-7 lg:pt-12 xl:pt-12 2xl:pt-16">
        <div className="block lg:flex justify-between items-end">
          <div className="lg:space-y-6">
            <div className="flex justify-start items-center space-x-2">
              <a href="https://in.linkedin.com/company/touchmarkdes" className="group" target="_blank">
                <img decoding="async" src="/images/home/icons/linkedin-black-fill.svg" alt="LinkedIn" className="h-8 group-hover:hidden" />
                <img decoding="async" loading="lazy" src="/images/home/icons/linkedin-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
              </a>
              <a href="https://www.facebook.com/touchmarkdes/" className="group" target="_blank">
                <img decoding="async" loading="lazy" src="/images/home/icons/facebook-black-fill.svg" alt="Facebook" className="h-8 group-hover:hidden" />
                <img decoding="async" loading="lazy" src="/images/home/icons/facebook-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
              </a>
              <a href="https://www.instagram.com/touchmarkdes/" className="group" target="_blank">
                <img decoding="async" loading="lazy" src="/images/home/icons/insta-black-fill.svg" alt="Instagram" className="h-8 group-hover:hidden" />
                <img decoding="async" loading="lazy" src="/images/home/icons/insta-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
              </a>
            </div>
            <h3 className="2xl:text-lg xl:text-base lg:text-base text-sm font-inter font-bold mt-5">BROWSE ALL POSTS</h3>
          </div>
          <div>
            <div className="flex justify-center items-center relative">
              <div className="search-icon bg-transparent px-4 py-3.5 relative z-10">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="#194F97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              {/* SubsidiaryUX rewrites this form to filter the grid client-side on /blog. */}
              <form action="https://touchmarkdes.com/search.php" method="get" className="flex">
                <input className="search-input text-sm text-black h-12" type="search" name="query" autoComplete="off" spellCheck="false" aria-live="polite" placeholder="Search..." />
              </form>
            </div>
          </div>
        </div>
        <div className="border border-b mt-5"></div>

        <div className="grid grid-cols-12 gap-8 pt-3 lg:pt-6 xl:pt-6 2xl:pt-8">
          {posts.map((post) => (
            <div key={post.id} className="lg:col-span-4 col-span-12 group hover:shadow-xl bg-white border">
              <div className="relative overflow-hidden">
                <img
                  decoding="async"
                  loading="lazy"
                  src={resolveMediaUrl(post.data.card_image)}
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
                  {/* SubsidiaryUX turns this into a localStorage-backed save toggle and
                      uses it to locate cards for the client-side search filter. */}
                  <button className="save-btn" data-id={post.id} data-user-id="" data-saved="false">
                    <div className="save-icon default" id={`save-icon-${post.id}`}></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-7 lg:pt-12 xl:pt-12 2xl:pt-16">
        <div className="text-transparent">
          01
        </div>
      </section>
    </div>
  );
}
