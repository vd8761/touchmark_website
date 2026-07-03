'use client';

import { useState } from 'react';

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
    link: '/case-study?id=4',
    icon: '/images/home/case-studies/globe-icon.svg'
  }
];

export default function CaseStudiesAccordion() {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="w-full flex h-[500px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px] text-white font-inter mt-10 shadow-xl overflow-hidden rounded-sm">
      {caseStudies.map((study) => {
        const isActive = activeId === study.id;
        return (
          <div
            key={study.id}
            onClick={() => setActiveId(study.id)}
            className={`cursor-pointer transition-all duration-700 ease-in-out relative flex overflow-hidden ${
              isActive ? 'w-full lg:w-[75%]' : 'w-[80px] lg:w-[8.33%]'
            }`}
            style={{ backgroundColor: study.color }}
          >
            {/* Active State Content */}
            <div
              className={`absolute inset-0 flex flex-col lg:flex-row transition-opacity duration-500 delay-200 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Left Image Side */}
              <div className="w-full lg:w-[45%] h-[40%] lg:h-full relative overflow-hidden">
                 <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Right Content Side */}
              <div className="w-full lg:w-[55%] h-[60%] lg:h-full p-6 lg:p-10 xl:p-12 flex flex-col relative" style={{ backgroundColor: study.color }}>
                {/* Logo and Title */}
                <div className="flex justify-between items-center pr-36 lg:pr-44">
                   <h2 className="text-2xl lg:text-3xl font-gellix font-semibold uppercase">{study.title}</h2>
                </div>
                <img src={study.logo} alt={`${study.title} Logo`} className="absolute top-3 right-3 lg:top-4 lg:right-4 xl:top-5 xl:right-5 h-8 lg:h-12 xl:h-14 max-w-[160px] object-contain brightness-0 invert" />
                
                {/* Description */}
                <div className="mt-4 lg:mt-6 flex-grow space-y-2 lg:space-y-4">
                  {study.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-xs lg:text-sm text-white/90 leading-relaxed font-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Button and Icon */}
                <div className="mt-4 lg:mt-8 flex justify-between items-end relative pb-2 lg:pb-0">
                  <a href={study.link} className="inline-flex items-center border border-white px-4 py-2 lg:px-5 lg:py-2.5 text-xs lg:text-sm font-medium hover:bg-white hover:text-[#194F97] transition-colors rounded-none z-20 font-secondary">
                    View Case Study 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </a>
                  
                  <img src={study.icon} alt="" className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Collapsed State Content */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-between py-6 transition-opacity duration-300 ${
                !isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Top Logo */}
              <div className="h-10 flex items-center justify-center w-full px-2">
                <img src={study.logo} alt="" className="h-5 lg:h-6 xl:h-7 max-w-[65px] object-contain brightness-0 invert" />
              </div>
              
              {/* Center Rotated Text */}
              <div className="flex-grow flex items-center justify-center relative w-full h-full min-h-[100px]">
                <h3 className="transform -rotate-90 text-sm lg:text-lg xl:text-xl font-gellix font-semibold uppercase whitespace-nowrap tracking-wider text-white absolute">
                  {study.title}
                </h3>
              </div>
              
              {/* Bottom Icon */}
              <img src={study.icon} alt="" className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 flex-shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
