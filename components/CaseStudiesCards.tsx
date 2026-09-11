import React from 'react';
import Link from 'next/link';
import { caseStudies } from '@/data/case-studies';

interface Props {
  excludeSlug?: string;
}

export default function CaseStudiesCards({ excludeSlug }: Props) {
  const filteredStudies = excludeSlug 
    ? caseStudies.filter(s => s.slug !== excludeSlug) 
    : caseStudies;

  return (
    <div className="grid grid-cols-12 gap-4 mt-5 lg:mt-10">
      {filteredStudies.map((study) => (
        <div key={study.id} className="lg:col-span-4 col-span-12">
          <Link href={study.link} className="relative overflow-hidden group block cursor-pointer h-full">
            <img 
              decoding="async" 
              loading="lazy" 
              src={study.accordionImage} 
              alt={study.accordionTitle}
              className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full object-cover aspect-[4/5] lg:aspect-auto min-h-[400px]" 
            />
            <div className="absolute top-0 right-0">
              <div className="inline-flex justify-start items-center space-x-3 p-5">
                {study.cardTags?.map((tag, idx) => (
                  <h3 key={idx} className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase shadow-sm">
                    {tag}
                  </h3>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex justify-end items-end">
              <div className="w-full bg-gradient-to-t from-[#9152a8b6] to-transparent p-5 transition-opacity duration-300 group-hover:from-[#9152A8] group-hover:to-transparent">
                <p className="2xl:text-base xl:text-base lg:text-xs text-base text-white font-inter">
                  {study.accordionTitle}
                </p>
                <div className="flex justify-between items-end gap-2">
                  <h1 className="text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2 flex-1">
                    {study.cardTitle}
                  </h1>
                  <svg fill="none" height="40" className="-rotate-90 text-white transition-colors duration-300 flex-shrink-0" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
