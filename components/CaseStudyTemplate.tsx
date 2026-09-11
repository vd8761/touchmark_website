import React from 'react';
import { CaseStudyData } from '../data/case-studies';
import CaseStudiesCards from './CaseStudiesCards';

interface Props {
  data: CaseStudyData;
}

export default function CaseStudyTemplate({ data }: Props) {
  return (
    <div className="overflow-x-hidden lg:overflow-x-auto">
      {/* Start: Hero Banner */}
      <section
        className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10"
        style={{ backgroundImage: `url('${data.heroImage}')` }}
      >
        <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
          <div className="grid grid-cols-12 lg:gap-4">
            <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
              <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">
                Home / Case study / {data.title}
              </p>
              <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                {data.title}
              </h1>
              <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                {data.heroSubtitle}
              </p>
            </div>
            <div className="col-span-5 lg:block hidden"></div>
          </div>
        </div>
      </section>
      {/* End: Hero Banner */}

      {/* Start: Client Overview */}
      {data.clientOverview && (
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">
          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-6 col-span-12">
              <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold">
                Client Overview
              </h1>
              <div className="space-y-5 mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 2xl:text-lg xl:text-base lg:text-base text-sm font-inter leading-relaxed">
                {data.clientOverview.paragraphs.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>
              {data.clientOverview.websiteUrl && (
                <a href={data.clientOverview.websiteUrl}>
                  <div className="relative overflow-hidden border border-[#194F97] px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                    <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors duration-300 text-sm uppercase">
                      Go to website
                    </span>
                    <svg
                      fill="none"
                      height="24"
                      className="relative z-10 ml-2 text-[#194F97] -rotate-90 group-hover:text-white transition-colors"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="absolute inset-0 bg-[#194F97] transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                  </div>
                </a>
              )}
            </div>
            <div className="lg:col-span-1 lg:block hidden"></div>
            <div className="lg:col-span-5 col-span-12 lg:mt-0 mt-5 h-full">
              <img src={data.clientOverview.image} alt="Client Overview" />
            </div>
          </div>
        </section>
      )}
      {/* End: Client Overview */}

      {/* Start: Problem & Solution */}
      {data.problemAndSolution && (
        <section className="pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
          <div style={{ backgroundColor: data.problemAndSolution.bgColor }} className="px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">
            <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto">
              <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto grid grid-cols-12 gap-4 font-inter 2xl:ml-10 xl:ml-5">
                <div className="lg:col-span-5 col-span-12">
                  <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">
                    Problem
                  </h2>
                  <div className="mt-10">
                    {data.problemAndSolution.problemIntro && (
                      <p className="font-inter 2xl:text-lg xl:text-base lg:text-base text-sm mb-5 leading-relaxed">
                        {data.problemAndSolution.problemIntro}
                      </p>
                    )}
                    <div className="space-y-5 font-inter 2xl:text-lg xl:text-base lg:text-base text-sm leading-relaxed">
                      {data.problemAndSolution.problemList.map((item, idx) => {
                        if (typeof item === 'string') {
                          return (
                            <div key={idx} className="flex gap-3 items-start">
                              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
                              <span>{item}</span>
                            </div>
                          );
                        }
                        return (
                          <div key={idx} className="flex flex-col gap-1">
                            <span className="font-inter font-semibold">{item.title}:</span>
                            <span>{item.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
                <div className="lg:col-span-5 col-span-12 mt-10 lg:mt-0">
                  <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">
                    Solution
                  </h2>
                  <div className="mt-10">
                    {data.problemAndSolution.solutionIntro && (
                      <p className="font-inter 2xl:text-lg xl:text-base lg:text-base text-sm mb-5 leading-relaxed">
                        {data.problemAndSolution.solutionIntro}
                      </p>
                    )}
                    {data.problemAndSolution.solutionList && (
                      <div className="font-inter font-regular space-y-5 2xl:mt-10 xl:mt-7 lg:mt-5 mt-5 2xl:text-lg xl:text-base lg:text-base text-sm leading-relaxed">
                        {data.problemAndSolution.solutionList.map((item, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <span className="font-inter font-semibold">{item.title}:</span>
                            <span>{item.description}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* End: Problem & Solution */}

      {/* Start: Value Addition */}
      {data.valueAdditions && data.valueAdditions.length > 0 && (
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
          <div className="grid grid-cols-12">
            <div className="lg:col-span-6 col-span-12 space-y-6">
              <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold">
                Value Addition
              </h1>
            </div>
            <div className="lg:col-span-6 col-span-12"></div>
          </div>
          <div className="grid grid-cols-12 lg:gap-12 gap-4 mt-10 font-inter text-base">
            {data.valueAdditions.map((item) => {
              const colonIndex = item.description.indexOf(':');
              const hasColon = colonIndex !== -1;
              const title = hasColon ? item.description.substring(0, colonIndex + 1) : '';
              const rest = hasColon ? item.description.substring(colonIndex + 1) : item.description;
              
              return (
                <div key={item.id} className="lg:col-span-6 col-span-12 flex justify-start items-start lg:items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-transparent border border-[#DBF6FF] rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">
                      {item.id}
                    </div>
                  </div>
                  <div>
                    <p className="ml-4 2xl:text-lg xl:text-base lg:text-base text-sm leading-relaxed">
                      {hasColon ? (
                        <>
                          <strong className="font-semibold">{title}</strong>{rest}
                        </>
                      ) : (
                        item.description
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
      {/* End: Value Addition */}

      {/* Start: Result & Conclusion */}
      {data.resultAndConclusion && (
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
          <div className="grid grid-cols-12 gap-4 font-inter">
            <div className="lg:col-span-5 col-span-12">
              <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Result</h2>
              <p className="font-inter 2xl:text-base xl:text-sm lg:text-sm text-xs mt-3 lg:mt-5 xl:mt-7 2xl:mt-10">
                {data.resultAndConclusion.resultText}
              </p>
              {data.resultAndConclusion.stats && data.resultAndConclusion.stats.length > 0 && (
                <div className="inline-flex justify-start items-center 2xl:mt-14 xl:mt-10 lg:mt-7 mt-5 2xl:space-x-4 xl:space-x-3 lg:space-x-2 space-x-2">
                  {data.resultAndConclusion.stats.map((stat, index) => (
                    <div key={index} className="2xl:space-y-5 xl:space-y-2.5 lg:space-y-2 space-y-2">
                      <h1 className="font-gellix font-semibold text-black 2xl:text-3xl xl:text-2xl lg:text-lg text-base">
                        {stat.value}
                      </h1>
                      <p className="text-[#194F97] font-inter font-regular 2xl:text-lg xl:text-base lg:text-sm text-sm">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
            <div className="lg:col-span-5 col-span-12">
              <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Conclusion</h2>
              <p className="font-inter 2xl:text-base xl:text-sm lg:text-sm text-xs mt-3 lg:mt-5 xl:mt-7 2xl:mt-10">
                {data.resultAndConclusion.conclusionText}
              </p>
            </div>
            <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
          </div>
        </section>
      )}
      {/* End: Result & Conclusion */}

      {/* Start: Mockup Full Image */}
      {data.mockupFullImage && (
        <section>
          <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto pt-14 lg:pt-24 xl:pt-24 2xl:pt-32 pb-14 lg:pb-24 bg-no-repeat">
            <img src={data.mockupFullImage} alt="Full Screen Mockup" className="w-full" />
          </div>
        </section>
      )}
      {/* End: Mockup Full Image */}

      {/* Start: Remaining Case Studies List */}
      <section className="bg-white">
        <div className="mx-auto 2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] px-4 md:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-12 lg:gap-4 font-inter">
            <div className="col-span-12">
              <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Projects</h3>
              <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                Check out Our Case Studies
              </h1>
            </div>
          </div>
          <CaseStudiesCards excludeSlug={data.slug} />
        </div>
      </section>
      {/* End: Remaining Case Studies List */}
    </div>
  );
}
