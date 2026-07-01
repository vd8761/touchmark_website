import React from 'react';

interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  readTime: string;
  link: string;
}

const bottomBlogs: BlogItem[] = [
  {
    id: "blog-1",
    title: "Cultivating a Global Hub for Thoughtful Discourse Community...",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    image: "/images/blog/image1.webp",
    tags: ["TECHNOLOGY", "AR/VR"],
    readTime: "10 MIN TO READ",
    link: "/blog/articles/key-factors-why-business-process-management-systems-are-successful"
  },
  {
    id: "blog-2",
    title: "Cultivating a Global Hub for Thoughtful Discourse Community...",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    image: "/images/blog/image2.webp",
    tags: ["TECHNOLOGY", "AR/VR"],
    readTime: "10 MIN TO READ",
    link: "/blog/articles/increasing-your-productivity-using-business-process-management-system"
  },
  {
    id: "blog-3",
    title: "Cultivating a Global Hub for Thoughtful Discourse Community...",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    image: "/images/blog/image3.webp",
    tags: ["TECHNOLOGY", "AR/VR"],
    readTime: "10 MIN TO READ",
    link: "/blog/articles/real-time-iot-applications-in-the-retail-industry"
  }
];

export default function RecentBlogs() {
  return (
    <section className="w-full bg-primary py-14 lg:py-24 xl:py-24 2xl:py-32 text-white">
      <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-10 mb-12">
          <div className="max-w-3xl">
            <p className="font-secondary text-xs lg:text-sm font-semibold tracking-widest text-white/70 uppercase">Blogs</p>
            <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">Recent Blogs</h2>
            <p className="font-secondary text-white/80 text-sm lg:text-base leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c.
            </p>
          </div>
          <a href="/blog" className="inline-flex items-center justify-center bg-white text-primary font-secondary font-semibold px-6 py-3 rounded-none hover:bg-white/95 transition-all text-sm shadow-md shrink-0 w-fit">
            <span>View all</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Featured Blog Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Image */}
          <div className="relative group overflow-hidden rounded-none">
            <img 
              src="/images/blog/vr.webp" 
              alt="Featured Blog - VR Headset" 
              className="w-full h-auto object-cover rounded-none" 
            />
          </div>
          
          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="border border-white/30 text-white text-xs px-3 py-1 rounded-full font-secondary tracking-wider uppercase">Technology</span>
              <span className="border border-white/30 text-white text-xs px-3 py-1 rounded-full font-secondary tracking-wider uppercase">AR/VR</span>
              <span className="flex items-center text-white/85 text-xs font-secondary ml-1.5">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
                10 MIN TO READ
              </span>
            </div>
            
            <h3 className="font-primary text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mt-6">
              Cultivating a Global Hub for Thoughtful Discourse and Community Connection Through AR/VR Technology
            </h3>
            
            <p className="font-secondary text-white/70 text-sm lg:text-base leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c.
            </p>
            
            <a 
              href="/blog/articles/a-360-view-of-business-process-management-system" 
              className="inline-flex items-center border border-white text-white bg-transparent px-6 py-3 rounded-none hover:bg-white hover:text-primary transition-all duration-300 text-sm font-secondary font-semibold mt-8 w-fit group"
            >
              <span>Learn more</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bottomBlogs.map((blog) => (
            <div 
              key={blog.id} 
              className="group rounded-none p-6 lg:p-8 flex flex-col justify-between border border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 shadow-none hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="border text-[10px] lg:text-xs px-2.5 py-0.5 rounded-full font-secondary tracking-wider uppercase border-white/30 text-white group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                  <span 
                    className="flex items-center text-[10px] lg:text-xs font-secondary ml-1 text-white/85 group-hover:text-primary/80 transition-colors duration-300"
                  >
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                    </svg>
                    {blog.readTime}
                  </span>
                </div>
                
                <h4 
                  className="font-primary text-lg lg:text-xl font-bold leading-snug line-clamp-2 text-white group-hover:text-primary transition-colors duration-300"
                >
                  {blog.title}
                </h4>
                
                <p 
                  className="font-secondary text-xs lg:text-sm leading-relaxed mt-3 line-clamp-3 text-white/70 group-hover:text-gray-600 transition-colors duration-300"
                >
                  {blog.excerpt}
                </p>
              </div>
              
              <div>
                <div className="my-6 overflow-hidden rounded-none">
                  <img 
                    src={blog.image} 
                    alt="Blog representation" 
                    className="w-full h-44 object-cover object-center" 
                  />
                </div>
                
                <a 
                  href={blog.link} 
                  className="inline-flex items-center text-xs lg:text-sm font-secondary font-semibold group/link text-white group-hover:text-primary transition-colors duration-300"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
