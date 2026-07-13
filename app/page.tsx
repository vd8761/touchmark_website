'use client';

import Script from "next/script";
import RecentBlogs from "@/components/RecentBlogs";
import CaseStudiesAccordion from "@/components/CaseStudiesAccordion";
import Preloader from "@/components/Preloader";
import HomeHero from "@/components/HomeHero";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeClientsSection from "@/components/HomeClientsSection";

export default function Page() {
  return (
    <>
      <Preloader />
      <title>Touchmark Descience</title>

      {/* overflow-x: clip prevents horizontal scroll without creating a scroll
          container, so position: sticky keeps working for descendants */}
      <div className="[overflow-x:clip]">


        
        
        
        


        
        
        

        
        <HomeHero />
        

        
        <HomeAboutSection />
        

        
        <HomeClientsSection />
        


        
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 lg:min-h-screen lg:flex lg:flex-col lg:justify-center py-14 lg:py-0">
            <div className="relative">
                <div className="grid grid-cols-12 gap-4 mt-10 lg:mt-20">
                    <div className="lg:col-span-12 col-span-12">
                        <div>
                            <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Projects
                            </h3>
                            <div className="flex flex-col lg:flex-row lg:items-end justify-between">
                                <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                                    Check out Our<br className="hidden lg:block"/>Case Studies</h1>
                                <p className="text-[14px] lg:text-sm xl:text-sm 2xl:text-base font-inter max-w-2xl lg:text-right mt-4 lg:mt-0 lg:ml-8">
                                    Established enterprises and emerging startups need a perfect balance of strategy, technology, analytics, and knowhow to solve everyday business challenges rises and emerging startups need a perfect balance of strategy, technology, analytics, and knowhow to solve everyday business.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <CaseStudiesAccordion />

            </div>
        </section>
        


        
        <section id="ebook" className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8  lg:pt-24 xl:pt-24 2xl:pt-32">
            <div className="grid grid-cols-12 lg:gap-4">
                <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-6 col-span-12">
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">E-Books</h3>
                    <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Fuel your mind with<br />E-books and downloads</h1>
                </div>
                <div className="lg:col-span-1 2xl:col-span-1 col-span-0"></div>
                <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-5 col-span-12 flex justify-start items-center">
                    <p className="text-[14px] lg:text-sm xl:text-sm 2xl:text-base mt-5 lg:mt-10 font-inter">Established
                        enterprises
                        and
                        emerging startups need a perfect balance of strategy, technology, analytics, and knowhow to
                        solve
                        everyday business challenges rises and emerging startups need a perfect balance of strategy,
                        technology, analytics, and know how to solve everyday business .</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-12 gap-4 mt-10">
                                            <div className="col-span-12 lg:col-span-4 md:col-span-4 custom-margin-lg customs-margin-lg-0">
                            <div className="relative overflow-hidden group">
                                <img loading="lazy" decoding="async" src="assets/front/home/ebook_image_1721628330.webp" className="transition-transform transform-gpu group-hover:scale-110 duration-500 w-full" />
                                <div className="absolute top-0">
                                    <div className="p-5 w-64 lg:w-72 xl:w-80 2xl:w-96 h-44 lg:h-48 xl:h-52 2xl:h-56">
                                        <h3 className="text-white font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                                            Advancing Aerospace Innovations And Future Directions In The Industry</h3>
                                        <a href="/ebook-01?ebook_content_id=1" className="relative overflow-hidden border border-gray-100 px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                                            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 text-sm uppercase">Learn
                                                More</span>
                                            <svg fill="none" height="24" className="relative z-10 ml-2 text-white -rotate-90 group-hover:text-black group-hover:rotate-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                            </svg>
                                            <span className="absolute inset-0 bg-white transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-4 custom-margin-lg customs-margin-lg-1">
                            <div className="relative overflow-hidden group">
                                <img loading="lazy" decoding="async" src="assets/front/home/ebook_image_1721628762.webp" className="transition-transform transform-gpu group-hover:scale-110 duration-500 w-full" />
                                <div className="absolute top-0">
                                    <div className="p-5 w-64 lg:w-72 xl:w-80 2xl:w-96 h-44 lg:h-48 xl:h-52 2xl:h-56">
                                        <h3 className="text-white font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                                            Design and Technological Strategies Shaping the Future of UX/UI</h3>
                                        <a href="/ebook-01?ebook_content_id=2" className="relative overflow-hidden border border-gray-100 px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                                            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 text-sm uppercase">Learn
                                                More</span>
                                            <svg fill="none" height="24" className="relative z-10 ml-2 text-white -rotate-90 group-hover:text-black group-hover:rotate-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                            </svg>
                                            <span className="absolute inset-0 bg-white transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-4 custom-margin-lg customs-margin-lg-2">
                            <div className="relative overflow-hidden group">
                                <img loading="lazy" decoding="async" src="assets/front/home/ebook_image_1721628861.webp" className="transition-transform transform-gpu group-hover:scale-110 duration-500 w-full" />
                                <div className="absolute top-0">
                                    <div className="p-5 w-64 lg:w-72 xl:w-80 2xl:w-96 h-44 lg:h-48 xl:h-52 2xl:h-56">
                                        <h3 className="text-white font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                                            Unleashing Business Potential through Open-Source Collaboration and Development</h3>
                                        <a href="/ebook-01?ebook_content_id=3" className="relative overflow-hidden border border-gray-100 px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                                            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 text-sm uppercase">Learn
                                                More</span>
                                            <svg fill="none" height="24" className="relative z-10 ml-2 text-white -rotate-90 group-hover:text-black group-hover:rotate-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                            </svg>
                                            <span className="absolute inset-0 bg-white transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                                    </div>
            </div>

        </section>
        
        
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto lg:min-h-screen lg:flex lg:flex-col lg:justify-center py-14 lg:py-0">
            <div className="grid grid-cols-12 lg:gap-4 px-4 md:px-6 lg:px-8">
                <div className="lg:col-span-5 col-span-12">
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Testimonials</h3>
                    <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Building trust through experience</h1>
                </div>
                <div className="lg:col-span-7 col-span-12 lg:block hidden">
                </div>
            </div>
            <div className="">
                <div id="one-time" className="owl-carousel owl-theme mt-10 md:px-6 lg:px-8">
                    
                    <div className="border bg-[#F1F2FF] grid grid-cols-6 gap-10 lg:p-7 p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="lg:col-span-2 col-span-6">
                            <div className="hidden lg:block flex flex-col justify-between items-center h-full lg:space-y-5 space-y-3">
                                <img loading="lazy" decoding="async" src="/images/home/hayakawa-icon-testimonial.webp" className="mb-auto" />
                                <img loading="lazy" decoding="async" src="/images/home/hayakawa-icon-testimonial-02.webp" className="mt-auto" />
                            </div>
                            <div className="block lg:hidden">
                                <img loading="lazy" decoding="async" src="/images/home/hayakawa-icon-testimonial-02-mob.webp" />
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-6 flex justify-start items-center relative">
                            <div className="flex flex-col justify-between items-center h-full">
                                <div className="relative">
                                    <div className="absolute left-0 ml-0 lg:-ml-8 -mt-5 lg:-mt-0 h-4 w-5 lg:h-7 lg:w-5">
                                        <img loading="lazy" decoding="async" src="/images/home/qutation-black-testimonial.webp" className="h-4 w-5 lg:h-5 lg:w-7" />
                                    </div>
                                    <h1 className="font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                                        I have been travelling with them for so long, happy to see their growth.
                                    </h1>
                                </div>
                                <div>
                                    <p className="font-inter text-sm lg:text-xs xl:text-xs 2xl:text-base mt-2 lg:mt-2.5 xl:mt-3 2xl:mt-5">
                                        We have been working with Touchmark Descience over the last 5 years for the
                                        continual development of our software. The staff assigned to our project have
                                        been highly skilled, intelligent, hard-working, innovative, and completely
                                        reliable.
                                    </p>
                                </div>
                                <div className="pt-5 lg:pt-5 xl:pt-7 2xl:pt-11">
                                    <div className="flex justify-between items-center relative">
                                        <div className="lg:ml-0">
                                            <h1 className="font-gellix text-sm lg:text-base xl:text-base 2xl:text-xl">
                                                S P Chenthilkumar
                                            </h1>
                                            <p className="font-inter text-[12px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] mt-[6px] lg:mt-[8px] xl:mt-[10px] 2xl:mt-[12px]">
                                                Founder, Hayakawa Japanese Language School &amp; Cultural Center
                                            </p>
                                        </div>
                                        <div className="absolute right-0 -mt-16">
                                            <img loading="lazy" decoding="async" src="/images/home/qutation-testimonial.webp" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border bg-[#FFF6F7] grid grid-cols-6 gap-10 lg:p-7 p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="lg:col-span-2 col-span-6">
                            <div className="hidden lg:block flex flex-col justify-between items-center h-full lg:space-y-5 space-y-3">
                                <img loading="lazy" decoding="async" src="/images/home/alpha-icon-testimonial.webp" className="mb-auto" />
                                <img loading="lazy" decoding="async" src="/images/home/alpha-icon-testimonial-02.webp" className="mt-auto" />
                            </div>
                            <div className="block lg:hidden">
                                <img loading="lazy" decoding="async" src="/images/home/alpha-icon-testimonial-02-mob.webp" className="" />
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-6 flex justify-start items-center relative">
                            <div className="flex flex-col justify-between items-center h-full">
                                <div className="relative">
                                    <div className="absolute left-0 ml-0 lg:-ml-8 -mt-5 lg:-mt-0 h-4 w-5 lg:h-7 lg:w-5">
                                        <img loading="lazy" decoding="async" src="/images/home/qutation-black-testimonial.webp" className="h-4 w-5 lg:h-5 lg:w-7" />
                                    </div>
                                    <h1 className="font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                                        The team at Touchmark Descience is the best that I have worked with
                                    </h1>
                                </div>
                                <div>
                                    <p className="font-inter text-sm lg:text-xs xl:text-xs 2xl:text-base mt-2 lg:mt-2.5 xl:mt-3 2xl:mt-5">
                                        I have been involved in different projects for major businesses across
                                        Asia-Pacific regions and when it comes to IT, the team at Touchmark
                                        Descience is
                                        the best that I have worked with. They are efficient and use best
                                        practices in
                                        the industry to make sure they produce quality results.
                                    </p>
                                </div>
                                <div className="pt-5 lg:pt-5 xl:pt-7 2xl:pt-11 w-full">
                                    <div className="flex justify-between items-center relative">
                                        <div className="lg:ml-0">
                                            <h1 className="font-gellix text-sm lg:text-base xl:text-base 2xl:text-xl">
                                                Jill Wong
                                            </h1>
                                            <p className="font-inter text-[12px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] mt-[6px] lg:mt-[8px] xl:mt-[10px] 2xl:mt-[12px]">
                                                Alpha Property Management, Auckland, New Zealand
                                            </p>
                                        </div>
                                        <div className="absolute right-0 -mt-16">
                                            <img loading="lazy" decoding="async" src="/images/home/qutation-testimonial.webp" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border bg-[#F8F9FF] grid grid-cols-6 gap-10 lg:p-7 p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="lg:col-span-2 col-span-6">
                            <div className="lg:block hidden flex flex-col justify-between items-center h-full lg:space-y-5 space-y-3">
                                <img loading="lazy" decoding="async" src="/images/home/tantra-icon-testimonial.webp" className="mb-auto" />
                                <img loading="lazy" decoding="async" src="/images/home/tantra-icon-testimonial-02.webp" className="mt-auto" />
                            </div>
                            <div className="lg:hidden block">
                                <img loading="lazy" decoding="async" src="/images/home/tantra-icon-testimonial-02-mob.webp" className="" />
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-6 flex justify-start items-center relative">
                            <div className="flex flex-col justify-between items-center h-full">
                                <div className="relative">
                                    <div className="w-5 h-7 absolute left-0 lg:-ml-8 ml-0 lg:-mt-0 -mt-5">
                                        <img loading="lazy" decoding="async" src="/images/home/qutation-black-testimonial.webp" className="h-5 w-7" />
                                    </div>
                                    <h1 className="font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                                        I have been travelling with them for so long, happy to see their growth.&nbsp;</h1>
                                </div>
                                <div>
                                    <p className="font-inter 2xl:text-base xl:text-xs lg:text-xs text-sm mt-2 lg:mt-2.5 xl:mt-3 2xl:mt-5">
                                        We have been working with Touchmark Descience over the last 5 years for the
                                        continual development of our softwares. The staff that have been assigned to our
                                        project have been highly skilled, intelligent, hard-working, innovative and
                                        completely reliable.
                                    </p>
                                </div>
                                <div className="pt-5 lg:pt-5 xl:pt-7 2xl:pt-11">
                                    <div className="flex justify-between items-center relative">
                                        <div className="lg:ml-0 -ml-0">
                                            <h1 className="font-gellix text-sm lg:text-base xl:text-base 2xl:text-xl">
                                                JK Saravana</h1>
                                            <p className="2xl:text-[14px] xl:text-[12px] lg:text-[10px] text-[12px] font-inter 2xl:mt-[12px] xl:mt-[10px] lg:mt-[8px] mt-[6px]">
                                                Chairman &amp; Founder, Tantra Inc - Group of Companies, Singapore</p>
                                        </div>
                                        <div className="absolute right-0 -mt-16">
                                            <img loading="lazy" decoding="async" src="/images/home/qutation-testimonial.webp" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border bg-[#F4FFFE] grid grid-cols-6 gap-10 lg:p-7 p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                        <div className="lg:col-span-2 col-span-6">
                            <div className="hidden lg:block flex flex-col justify-between items-center h-full lg:space-y-5 space-y-3">
                                <img loading="lazy" decoding="async" src="/images/home/armtech-icon-testimonial.webp" className="mb-auto" />
                                <img loading="lazy" decoding="async" src="/images/home/armtech-icon-testimonial-02.webp" className="mt-auto" />
                            </div>
                            <div className="lg:hidden block">
                                <img loading="lazy" decoding="async" src="/images/home/armtech-icon-testimonial-02-mob.webp" className="" />
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-6 flex justify-start items-center relative">
                            <div className="flex flex-col justify-between items-center h-full">
                                <div className="relative">
                                    <div className="absolute left-0 ml-0 lg:-ml-8 -mt-5 lg:-mt-0 h-4 w-5 lg:h-7 lg:w-5">
                                        <img loading="lazy" decoding="async" src="/images/home/qutation-black-testimonial.webp" className="h-4 w-5 lg:h-5 lg:w-7" />
                                    </div>
                                    <h1 className="font-gellix text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
                                        The product helped us to increase our productivity as well as a business&nbsp;
                                    </h1>
                                </div>
                                <div>
                                    <p className="font-inter text-sm lg:text-xs xl:text-xs 2xl:text-base mt-2 lg:-mt-2.5 xl:-mt-3 2xl:-mt-5">
                                        We have been working with Touchmark Descience for the past 6 years, the
                                        service
                                        they offer was
                                        remarkable. Recently we deployed an AMC ERP system, which addresses most
                                        of our
                                        real time
                                        challenges.
                                    </p>
                                </div>
                                <div className="pt-5 lg:pt-5 xl:pt-7 2xl:pt-11 w-full">
                                    <div className="flex justify-between items-center relative">
                                        <div>
                                            <h1 className="font-gellix text-sm lg:text-base xl:text-base 2xl:text-xl">
                                                Sathish Kumar</h1>
                                            <p className="2xl:text-[14px] xl:text-[12px] lg:text-[10px] text-[12px] font-inter 2xl:mt-[12px] xl:mt-[10px] lg:mt-[8px] mt-[6px]">
                                                CEO, Armtech Computer Services Pvt Ltd</p>
                                        </div>
                                        <div className="absolute right-0 -mt-16">
                                            <img loading="lazy" decoding="async" src="/images/home/qutation-testimonial.webp" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        


        
        <RecentBlogs />
        


        
        







        

    </div>


























































































      

      {/* Page Inline Script Initializers */}
      <Script id="page-script-2" strategy="lazyOnload">{`
        try {
          \$(document).ready(function() {
        var owlOptions = {
            loop: true,
            nav: false,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0, // No margin on mobile devices
                    dots: true
                },
                600: {
                    items: 1,
                    margin: 20, // Margin for devices with width 600px and above
                    dots: false
                },
                1000: {
                    items: 2,
                    margin: 20, // Margin for devices with width 1000px and above
                    dots: false
                }
            }
        };

        \$("#one-time").owlCarousel(owlOptions);
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-3" strategy="lazyOnload">{`
        try {
          var reducedHeroMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          var compactHero = window.matchMedia('(max-width: 767px)').matches;
          var heroSlideSpeed = reducedHeroMotion ? 0 : (compactHero ? 560 : 720);
          var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: true,
        autoplay: reducedHeroMotion ? false : {
            delay: 5200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: heroSlideSpeed,
        effect: 'slide',
        preventInteractionOnTransition: true
    });

    var hero = document.querySelector('.swiper-container');
    var tabs = document.querySelectorAll('[data-hero-selector]');
    var curve = document.querySelector('[data-hero-curve]');
    var curvePath = curve ? curve.querySelector('[data-hero-curve-path]') : null;
    var curveBaseD = 'M430 184 C520 184 565 181 620 162 C700 135 724 68 806 48 C896 26 968 91 1040 158 L1040 184 Z';
    var curvePoints = [
        { x: 430, y: 184, weight: 0 },
        { x: 520, y: 184, weight: 0.18 },
        { x: 565, y: 181, weight: 0.55 },
        { x: 620, y: 162, weight: 0.86 },
        { x: 700, y: 135, weight: 1 },
        { x: 724, y: 68, weight: 1 },
        { x: 806, y: 48, weight: 1 },
        { x: 896, y: 26, weight: 0.95 },
        { x: 968, y: 91, weight: 0.62 },
        { x: 1040, y: 158, weight: 0 }
    ];
    var curveState = curvePoints.map(function() {
        return { x: 0, y: 0, vx: 0, vy: 0 };
    });
    var curveFrame = 0;
    var curveLastFrame = 0;
    var curveLastImpulse = 0;
    var curveResponse = 0.43;
    var curvePendingKicks = [];
    var heroSwipeSample = null;
    var pendingHeroCurveSource = null;
    var pendingHeroCurveVelocity = 0;
    var pendingHeroCurveToken = 0;
    var preparedHeroCurveSource = 'programmatic';
    var preparedHeroCurveVelocity = 0.55;
    var preparedHeroCurveAt = 0;
    var heroClickPreparedUntil = 0;
    var heroNavigationLocked = false;
    var queuedHeroIndex = null;
    var lastHeroIndex = swiper.realIndex;

    function updateActiveTab(index) {
        tabs.forEach((tab) => tab.removeAttribute('aria-current'));
        var activeTab = tabs[index];
        if (!activeTab) return;

        // Force one small reflow when a slide changes so the CSS-only circular
        // countdown restarts in sync with Swiper's 5.2 second autoplay delay.
        void activeTab.offsetWidth;
        activeTab.setAttribute('aria-current', 'true');
    }

    function clampHeroCurve(value, minimum, maximum) {
        return Math.min(maximum, Math.max(minimum, value));
    }

    function curveCoordinate(value) {
        return Math.round(value * 100) / 100;
    }

    function renderHeroCurve() {
        if (!curvePath) return;

        var points = curvePoints.map(function(point, index) {
            var state = curveState[index];
            return {
                x: curveCoordinate(point.x + state.x),
                y: curveCoordinate(point.y + state.y)
            };
        });

        curvePath.setAttribute('d',
            'M' + points[0].x + ' ' + points[0].y +
            ' C' + points[1].x + ' ' + points[1].y +
            ' ' + points[2].x + ' ' + points[2].y +
            ' ' + points[3].x + ' ' + points[3].y +
            ' C' + points[4].x + ' ' + points[4].y +
            ' ' + points[5].x + ' ' + points[5].y +
            ' ' + points[6].x + ' ' + points[6].y +
            ' C' + points[7].x + ' ' + points[7].y +
            ' ' + points[8].x + ' ' + points[8].y +
            ' ' + points[9].x + ' ' + points[9].y +
            ' L1040 184 Z'
        );
    }

    function resetHeroCurve() {
        curveState.forEach(function(state) {
            state.x = 0;
            state.y = 0;
            state.vx = 0;
            state.vy = 0;
        });
        if (curvePath) curvePath.setAttribute('d', curveBaseD);
        if (curve) {
            curve.removeAttribute('data-curve-direction');
            curve.removeAttribute('data-curve-intensity');
            curve.removeAttribute('data-curve-source');
        }
        curvePendingKicks = [];
        curveFrame = 0;
        curveLastFrame = 0;
    }

    function stepHeroCurve(now) {
        if (!curvePath) {
            curveFrame = 0;
            return;
        }

        if (!curveLastFrame) curveLastFrame = now;
        var frameDelta = Math.min(1 / 30, Math.max(0.001, (now - curveLastFrame) / 1000));
        curveLastFrame = now;

        for (var kickIndex = curvePendingKicks.length - 1; kickIndex >= 0; kickIndex -= 1) {
            var pendingKick = curvePendingKicks[kickIndex];
            if (pendingKick.at > now) continue;

            curveState[pendingKick.index].vx += pendingKick.vx;
            curveState[pendingKick.index].vy += pendingKick.vy;
            curvePendingKicks.splice(kickIndex, 1);
        }

        var omega = 9.2 + 5.3 * curveResponse;
        var stiffness = omega * omega;
        var dampingRatio = 0.34 - 0.11 * curveResponse;
        var damping = 2 * dampingRatio * omega;
        var coupling = 38 + 42 * curveResponse;
        var substeps = Math.max(1, Math.ceil(frameDelta / (1 / 120)));
        var delta = frameDelta / substeps;

        for (var substep = 0; substep < substeps; substep += 1) {
            var accelerationX = [];
            var accelerationY = [];

            curveState.forEach(function(state, index) {
                if (index === 0 || index === curveState.length - 1) {
                    accelerationX[index] = 0;
                    accelerationY[index] = 0;
                    return;
                }

                var left = curveState[index - 1];
                var right = curveState[index + 1];
                var tensionX = left.x + right.x - state.x * 2;
                var tensionY = left.y + right.y - state.y * 2;
                accelerationX[index] = -stiffness * state.x - damping * state.vx + coupling * tensionX;
                accelerationY[index] = -stiffness * state.y - damping * state.vy + coupling * tensionY;
            });

            curveState.forEach(function(state, index) {
                if (index === 0 || index === curveState.length - 1) return;

                state.vx += accelerationX[index] * delta;
                state.vy += accelerationY[index] * delta;
                state.x = clampHeroCurve(state.x + state.vx * delta, -72, 72);
                state.y = clampHeroCurve(state.y + state.vy * delta, -54, 54);
            });
        }

        var maximumOffset = 0;
        var maximumVelocity = 0;
        curveState.forEach(function(state, index) {
            if (index === 0 || index === curveState.length - 1) return;

            maximumOffset = Math.max(maximumOffset, Math.abs(state.x), Math.abs(state.y));
            maximumVelocity = Math.max(maximumVelocity, Math.abs(state.vx), Math.abs(state.vy));
        });

        renderHeroCurve();

        var elapsedSinceImpulse = now - curveLastImpulse;
        if (
            (
                curvePendingKicks.length === 0 &&
                elapsedSinceImpulse > 650 &&
                maximumOffset < 0.08 &&
                maximumVelocity < 0.9
            ) ||
            elapsedSinceImpulse > 1800 + 300 * curveResponse
        ) {
            resetHeroCurve();
            return;
        }

        curveFrame = requestAnimationFrame(stepHeroCurve);
    }

    function smoothHeroCurveSpeed(minimum, maximum, value) {
        var progress = clampHeroCurve((value - minimum) / (maximum - minimum), 0, 1);
        return progress * progress * (3 - 2 * progress);
    }

    function normalizeHeroCurveSpeed(velocity, source) {
        if (source === 'swipe') {
            return smoothHeroCurveSpeed(0.12, 1.6, Math.abs(velocity));
        }
        if (source === 'autoplay') {
            return 0.38 + 0.28 * smoothHeroCurveSpeed(0.55, 1.25, velocity);
        }
        if (source === 'click') return 0.52;
        return 0.46;
    }

    function animateHeroCurve(direction, velocity, source) {
        if (reducedHeroMotion || !curvePath) return;

        var intensity = normalizeHeroCurveSpeed(velocity, source);
        var directionSign = direction === 'next' ? -1 : 1;
        var start = performance.now();
        var kickStrength = 170 + 390 * intensity;
        var travelDuration = 300 - 80 * intensity;

        curveResponse = intensity;
        curveLastImpulse = start;
        if (curve) {
            curve.setAttribute('data-curve-direction', direction);
            curve.setAttribute('data-curve-intensity', intensity.toFixed(2));
            curve.setAttribute('data-curve-source', source || 'programmatic');
        }

        curvePoints.forEach(function(point, index) {
            if (!point.weight || index === 0 || index === curvePoints.length - 1) return;

            var progress = (point.x - 430) / 610;
            var arrival = directionSign < 0 ? 1 - progress : progress;
            var envelope = point.weight * (
                0.82 + 0.18 * Math.cos(arrival * Math.PI * (0.8 + 0.65 * intensity))
            );

            curvePendingKicks.push({
                index: index,
                at: start + arrival * travelDuration,
                vx: directionSign * kickStrength * 0.42 * envelope,
                vy: kickStrength * envelope
            });
        });

        if (!curveFrame) {
            curveLastFrame = 0;
            curveFrame = requestAnimationFrame(stepHeroCurve);
        }
    }

    function heroNow() {
        return window.performance && typeof window.performance.now === 'function'
            ? window.performance.now()
            : Date.now();
    }

    function getProgrammaticHeroVelocity(instance, transitionDuration) {
        var duration = Math.max(Number(transitionDuration) || heroSlideSpeed || 1, 1);
        var travel = Math.min(instance.width || window.innerWidth || 768, 900);
        return clampHeroCurve((travel / duration) * 0.65, 0.42, 1.2);
    }

    swiper.on('touchStart', function(instance) {
        var time = heroNow();
        var x = instance.touches.startX;
        heroSwipeSample = {
            startX: x,
            startTime: time,
            lastX: x,
            lastTime: time,
            velocity: 0,
            hasVelocity: false
        };
    });

    swiper.on('sliderMove', function(instance) {
        var sample = heroSwipeSample;
        if (!sample) return;

        var time = heroNow();
        var x = instance.touches.currentX;
        var elapsed = time - sample.lastTime;
        var distance = x - sample.lastX;

        if (elapsed >= 4 && elapsed <= 120 && Math.abs(distance) >= 0.25) {
            var instantaneousVelocity = distance / elapsed;
            sample.velocity = sample.hasVelocity
                ? sample.velocity * 0.45 + instantaneousVelocity * 0.55
                : instantaneousVelocity;
            sample.hasVelocity = true;
        } else if (elapsed > 120) {
            sample.velocity = 0;
            sample.hasVelocity = false;
        }

        sample.lastX = x;
        sample.lastTime = time;
    });

    swiper.on('touchEnd', function(instance, event) {
        var sample = heroSwipeSample;
        heroSwipeSample = null;

        var nativeEvent = event && (event.originalEvent || event);
        var wasCancelled = nativeEvent && typeof nativeEvent.type === 'string' &&
            nativeEvent.type.indexOf('cancel') !== -1;
        if (!sample || wasCancelled || !instance.touchEventsData.isMoved || !instance.swipeDirection) return;

        var time = heroNow();
        var currentX = instance.touches.currentX;
        var totalTime = Math.max(time - sample.startTime, 1);
        var averageVelocity = (currentX - sample.startX) / totalTime;
        var releaseVelocity = sample.hasVelocity ? sample.velocity : averageVelocity;

        if (sample.hasVelocity) {
            var releaseIdleTime = Math.max(0, time - sample.lastTime);
            releaseVelocity *= Math.max(0.2, 1 - releaseIdleTime / 180);
        }
        if (Math.abs(releaseVelocity) < 0.04) releaseVelocity = averageVelocity * 0.5;

        pendingHeroCurveSource = 'swipe';
        pendingHeroCurveVelocity = clampHeroCurve(Math.abs(releaseVelocity), 0.12, 2.4);
        var releaseToken = ++pendingHeroCurveToken;

        window.setTimeout(function() {
            if (pendingHeroCurveToken === releaseToken && pendingHeroCurveSource === 'swipe') {
                pendingHeroCurveSource = null;
                pendingHeroCurveVelocity = 0;
            }
        }, 0);
    });

    swiper.on('beforeTransitionStart', function(instance, speed, internal) {
        var source = pendingHeroCurveSource;
        var velocity = pendingHeroCurveVelocity;
        var preparationTime = heroNow();

        if (!source) {
            if (preparationTime - preparedHeroCurveAt < 40) {
                source = preparedHeroCurveSource;
                velocity = preparedHeroCurveVelocity;
            } else if (preparationTime <= heroClickPreparedUntil) {
                source = 'click';
            } else {
                source = internal === true && instance.autoplay && instance.autoplay.running
                    ? 'autoplay'
                    : 'programmatic';
            }
        }
        if (!(velocity > 0)) velocity = getProgrammaticHeroVelocity(instance, speed);

        preparedHeroCurveSource = source;
        preparedHeroCurveVelocity = velocity;
        preparedHeroCurveAt = preparationTime;
        pendingHeroCurveToken += 1;
        pendingHeroCurveSource = null;
        pendingHeroCurveVelocity = 0;
    });

    function beginHeroCurveTransition(direction) {
        if (hero) hero.dataset.slideDirection = direction;
        animateHeroCurve(direction, preparedHeroCurveVelocity, preparedHeroCurveSource);
    }

    swiper.on('slideNextTransitionStart', function() {
        beginHeroCurveTransition('next');
    });

    swiper.on('slidePrevTransitionStart', function() {
        beginHeroCurveTransition('prev');
    });

    function releaseHeroNavigation() {
        heroNavigationLocked = false;
        if (queuedHeroIndex === null) return;

        var targetIndex = queuedHeroIndex;
        queuedHeroIndex = null;
        if (targetIndex !== swiper.realIndex) {
            requestAnimationFrame(function() {
                moveToHeroSlide(targetIndex);
            });
        }
    }

    function moveToHeroSlide(targetIndex) {
        var currentIndex = swiper.realIndex;
        if (targetIndex === currentIndex) {
            queuedHeroIndex = null;
            return;
        }

        if (heroNavigationLocked || swiper.animating) {
            queuedHeroIndex = targetIndex;
            return;
        }

        var forwardSteps = (targetIndex - currentIndex + tabs.length) % tabs.length;
        var backwardSteps = (currentIndex - targetIndex + tabs.length) % tabs.length;
        var direction = forwardSteps <= backwardSteps ? 'next' : 'prev';
        heroNavigationLocked = true;
        if (hero) hero.dataset.slideDirection = direction;
        pendingHeroCurveToken += 1;
        pendingHeroCurveSource = 'click';
        pendingHeroCurveVelocity = 0;
        heroClickPreparedUntil = heroNow() + 500;

        if (direction === 'next') {
            swiper.slideNext(heroSlideSpeed, true);
        } else {
            swiper.slidePrev(heroSlideSpeed, true);
        }

        if (heroSlideSpeed === 0) {
            requestAnimationFrame(releaseHeroNavigation);
        }
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => moveToHeroSlide(index));
    });

    // Update the active tab when the slide changes
    swiper.on('slideChange', function() {
        var nextHeroIndex = swiper.realIndex;

        if (nextHeroIndex !== lastHeroIndex) {
            lastHeroIndex = nextHeroIndex;
        }

        updateActiveTab(nextHeroIndex);
    });

    swiper.on('slideChangeTransitionEnd', releaseHeroNavigation);

    if (hero && 'IntersectionObserver' in window) {
        var heroInView = true;
        var interactionPaused = false;

        function syncHeroActivity() {
            var motionActive = heroInView && !document.hidden;
            var autoplayActive = motionActive && !interactionPaused;
            hero.dataset.heroMotion = motionActive ? 'running' : 'paused';
            hero.dataset.heroAutoplay = autoplayActive ? 'running' : 'paused';

            if (!motionActive && curveFrame) {
                cancelAnimationFrame(curveFrame);
                resetHeroCurve();
            }

            if (!swiper.autoplay) return;
            if (autoplayActive && typeof swiper.autoplay.resume === 'function') {
                swiper.autoplay.resume();
            } else if (!autoplayActive && typeof swiper.autoplay.pause === 'function') {
                swiper.autoplay.pause();
            }
        }

        var heroObserver = new IntersectionObserver(function(entries) {
            heroInView = entries[0].isIntersecting;
            syncHeroActivity();
        }, { threshold: 0.08 });

        heroObserver.observe(hero);
        document.addEventListener('visibilitychange', syncHeroActivity);
        hero.addEventListener('mouseenter', function() {
            interactionPaused = true;
            syncHeroActivity();
        });
        hero.addEventListener('mouseleave', function() {
            interactionPaused = false;
            syncHeroActivity();
        });
        hero.addEventListener('focusin', function() {
            interactionPaused = true;
            syncHeroActivity();
        });
        hero.addEventListener('focusout', function(event) {
            if (!hero.contains(event.relatedTarget)) {
                interactionPaused = false;
                syncHeroActivity();
            }
        });
    }

    updateActiveTab(swiper.realIndex);
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
    </>
  );
}
