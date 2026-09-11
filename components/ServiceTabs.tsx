'use client';

import { useState } from 'react';

export type CardData = { title: string; description: string; watermark: string };

export type TabData = {
  id: string;
  title: string;
  cards: CardData[];
};

export default function ServiceTabs({ tabsData }: { tabsData: TabData[] }) {
  const [activeTab, setActiveTab] = useState(tabsData[0]?.id || 'content-1');

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-nowrap border-b-[1px] border-gray-300 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer relative whitespace-nowrap py-4 mr-8 lg:mr-12 px-0 text-[13px] lg:text-[14px] font-gellix font-semibold tracking-wide transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-[#194F97]'
                : 'text-[#9ca3af] hover:text-[#194F97]'
            }`}
          >
            {tab.title}
            {/* Active Underline matching text width exactly */}
            {activeTab === tab.id && (
              <div className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#194F97]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8 lg:mt-10">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {tab.cards.map((card, index) => (
                <div
                  key={index}
                  className="relative w-full h-[320px] lg:h-[340px] min-h-[320px] lg:min-h-[340px] max-h-[320px] lg:max-h-[340px] bg-[#D3ECFF] bg-opacity-30 pt-5 pl-5 overflow-hidden group hover:bg-[#194F97] transition-colors duration-300 flex flex-col justify-start"
                >
                  <h3 className="relative z-10 text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-gellix text-black group-hover:text-white transition-colors duration-300 pr-5">
                    {card.title}
                  </h3>
                  
                  <p className="relative z-10 mt-[10px] lg:mt-[10px] xl:mt-[10px] 2xl:mt-[20px] text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[14px] font-inter text-transparent group-hover:text-white transition-colors duration-300 leading-[1.6] pr-5">
                    {card.description}
                  </p>
                  
                  {/* Watermark Default */}
                  <div className="absolute -bottom-1 lg:-bottom-1 left-5 lg:left-[20px] z-0 pointer-events-none select-none group-hover:opacity-0 transition-opacity duration-300 flex w-full">
                    <span className="text-[120px] lg:text-[150px] font-gellix font-bold text-transparent tracking-normal leading-none" style={{ WebkitTextStroke: '1px #b1d6f2' }}>
                      {card.watermark}
                    </span>
                  </div>
                  
                  {/* Watermark Hover */}
                  <div className="absolute -bottom-1 lg:-bottom-1 left-5 lg:left-[20px] z-0 opacity-0 group-hover:opacity-[0.25] pointer-events-none select-none transition-opacity duration-300 flex w-full">
                    <span className="text-[120px] lg:text-[150px] font-gellix font-bold text-transparent tracking-normal leading-none" style={{ WebkitTextStroke: '1px #ffffff' }}>
                      {card.watermark}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
