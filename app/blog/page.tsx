import type { Metadata } from 'next';

import BlogPostGrid from '@/components/BlogPostGrid';
import BlogSocialBar from '@/components/BlogSocialBar';
import { listBlogPosts } from '@/services/cms';

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
        <BlogSocialBar heading="BROWSE ALL POSTS" showSearch />
        <div className="border border-b mt-5"></div>
        <BlogPostGrid posts={posts} />
      </section>

      <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-7 lg:pt-12 xl:pt-12 2xl:pt-16">
        <div className="text-transparent">
          01
        </div>
      </section>
    </div>
  );
}
