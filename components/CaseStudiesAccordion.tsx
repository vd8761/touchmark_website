'use client';

import { useEffect, useRef, useState } from 'react';

const caseStudies = [
  {
    id: 1,
    title: 'RUPINIS',
    color: '#5C205F',
    logo: '/images/home/case-studies/rupinis-logo.webp',
    image: '/assets/front/home/tc_project_1722505852.webp',
    description: 'Our goal is to become the preeminent online forum that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.\n\nOur goal is to become the preeminent online forum that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.',
    link: '/case-study?id=1',
    icon: '/images/home/case-studies/brush-icon.svg'
  },
  {
    id: 2,
    title: 'OLYMPIAD',
    color: '#4E878C',
    logo: '/images/home/case-studies/olympiad-logo.webp',
    image: '/assets/front/home/tc_project_1722505900.webp',
    description: 'A Comprehensive School Management System that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.',
    link: '/case-study?id=2',
    icon: '/images/home/case-studies/graduation-icon.svg'
  },
  {
    id: 3,
    title: 'SIDBI',
    color: '#C4D347',
    logo: '/images/home/case-studies/sidbi-logo.webp',
    image: '/assets/front/home/tc_project_1722505935.webp',
    description: 'SIDBI\'s Digital Transformation: Boosting User Engagement, Operational Efficiency, and Customer Satisfaction via thought-provoking conversations, creating a worldwide community.',
    link: '/case-study?id=3',
    icon: '/images/home/case-studies/bank-icon.svg'
  },
  {
    id: 4,
    title: 'DVI HOLIDAS',
    color: '#EE3E42',
    logo: '/images/home/case-studies/dvi-logo.webp',
    image: '/assets/front/home/tc_project_1722505852.webp',
    description: 'An exceptional holiday experience that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.',
    link: '/contact-us',
    icon: '/images/home/case-studies/globe-icon.svg'
  }
];

export default function CaseStudiesAccordion() {
  const [activeId, setActiveId] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Desktop: the accordion pins while the tall wrapper scrolls by, and
  // scroll progress through the wrapper picks the open case study.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!mql.matches || !wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return;
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
        const idx = Math.min(caseStudies.length - 1, Math.floor(progress * caseStudies.length));
        setActiveId(idx + 1);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} data-motion-skip className="lg:h-[240vh]">

      {/* ---------- Mobile: cascading sticky card stack ---------- */}
      <div className="lg:hidden mt-10 pb-4">
        {caseStudies.map((study, i) => (
          <div
            key={study.id}
            className="sticky mb-8 overflow-hidden rounded-md shadow-2xl text-white font-inter"
            style={{ top: `calc(50vh - 265px + ${i * 14}px)`, backgroundColor: study.color, zIndex: i + 1 }}
          >
            <img loading="lazy" decoding="async" src={study.image} alt={study.title} className="w-full h-44 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-center gap-3">
                <h2 className="text-xl font-gellix font-semibold uppercase">{study.title}</h2>
                <img loading="lazy" decoding="async" src={study.logo} alt="" className="h-6 max-w-[96px] object-contain brightness-0 invert shrink-0" />
              </div>
              <div className="mt-3">
                <p className="text-xs text-white/90 leading-relaxed font-secondary line-clamp-4">
                  {study.description.split('\n')[0]}
                </p>
              </div>
              <div className="mt-5 flex justify-between items-end">
                <a href={study.link} className="inline-flex items-center border border-white px-4 py-2 text-xs font-medium hover:bg-white hover:text-[#194F97] transition-colors rounded-none font-secondary">
                  View Case Study
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </a>
                <img loading="lazy" decoding="async" src={study.icon} alt="" className="w-10 h-10 opacity-90 pointer-events-none" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Desktop: pinned scroll-driven accordion ---------- */}
      <div data-rv="fade" className="hidden lg:flex sticky top-[calc(50vh-200px)] xl:top-[calc(50vh-225px)] 2xl:top-[calc(50vh-250px)] w-full h-[400px] xl:h-[450px] 2xl:h-[500px] text-white font-inter mt-10 shadow-xl overflow-hidden rounded-sm">
        {caseStudies.map((study) => {
          const isActive = activeId === study.id;
          return (
            <div
              key={study.id}
              className={`transition-all duration-700 ease-in-out relative flex overflow-hidden ${
                isActive ? 'w-[75%]' : 'w-[8.33%]'
              }`}
              style={{ backgroundColor: study.color }}
            >
              {/* Active State Content */}
              <div
                id={`case-study-panel-${study.id}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex flex-row transition-opacity duration-500 delay-200 ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Left Image Side */}
                <div className="w-[45%] h-full relative overflow-hidden">
                  <img loading="lazy" decoding="async" src={study.image} alt={study.title} className="w-full h-full object-cover" />
                </div>

                {/* Right Content Side */}
                <div className="w-[55%] h-full p-10 xl:p-12 flex flex-col relative" style={{ backgroundColor: study.color }}>
                  {/* Logo and Title */}
                  <div className="flex justify-between items-center pr-44">
                    <h2 className="text-3xl font-gellix font-semibold uppercase">{study.title}</h2>
                  </div>
                  <img loading="lazy" decoding="async" src={study.logo} alt={`${study.title} Logo`} className="absolute top-4 right-4 xl:top-5 xl:right-5 h-12 xl:h-14 max-w-[160px] object-contain brightness-0 invert" />

                  {/* Description */}
                  <div className="mt-6 flex-grow space-y-4 overflow-hidden">
                    {study.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-sm text-white/90 leading-relaxed font-secondary">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Button and Icon */}
                  <div className="mt-8 flex justify-between items-end relative">
                    <a href={study.link} tabIndex={isActive ? undefined : -1} className="inline-flex items-center border border-white px-5 py-2.5 text-sm font-medium hover:bg-white hover:text-[#194F97] transition-colors rounded-none z-20 font-secondary">
                      View Case Study
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </a>

                    <img loading="lazy" decoding="async" src={study.icon} alt="" className="w-14 h-14 xl:w-16 xl:h-16 absolute -bottom-2 -right-2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Collapsed State Content: vertical rail */}
              <button
                type="button"
                onClick={() => setActiveId(study.id)}
                aria-controls={`case-study-panel-${study.id}`}
                aria-expanded={isActive}
                aria-label={`Show ${study.title} case study`}
                tabIndex={isActive ? -1 : 0}
                className={`absolute inset-0 flex w-full cursor-pointer flex-col items-center justify-between py-6 text-white transition-opacity duration-300 ${
                  !isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Top Logo */}
                <div className="h-10 flex items-center justify-center w-full px-2">
                  <img loading="lazy" decoding="async" src={study.logo} alt="" className="h-6 xl:h-7 max-w-[65px] object-contain brightness-0 invert" />
                </div>

                {/* Center Rotated Text */}
                <div className="flex-grow flex items-center justify-center relative w-full h-full min-h-[100px]">
                  <h3 className="-rotate-90 text-lg xl:text-xl font-gellix font-semibold uppercase whitespace-nowrap tracking-wider text-white absolute">
                    {study.title}
                  </h3>
                </div>

                {/* Bottom Icon */}
                <img loading="lazy" decoding="async" src={study.icon} alt="" className="w-6 h-6 xl:w-7 xl:h-7 flex-shrink-0" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
