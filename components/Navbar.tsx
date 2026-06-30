'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    setScrolled(window.scrollY > 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navClass = scrolled || !isHome
    ? 'lg:bg-white lg:shadow-md lg:text-black bg-white text-black'
    : 'lg:bg-transparent lg:text-white bg-white text-black';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navClass}`}>
      {/* Desktop & Mobile Navbar Container */}
      <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="lg:block hidden">
              {scrolled || !isHome ? (
                <img src="/images/tds-color-logo.png" className="h-7" alt="Logo" />
              ) : (
                <img src="/images/touchmark-logowhite.svg" className="h-7" alt="Logo" />
              )}
            </a>
            <a href="/" className="lg:hidden block">
              <img src="/images/tds-color-logo.png" className="h-7" alt="Logo" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <div className="flex justify-start items-center">
              
              {/* Who We Are */}
              <div className="hs-dropdown group [--strategy:static] lg:h-14 sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] flex lg:justify-center items-center">
                <div className="h-10">
                  <a href="/about-us">
                    <button type="button" className="font-inter font-semibold lg:font-normal sm:p-3 flex items-center w-full text-lg lg:text-sm">
                      Who we are
                    </button>
                  </a>
                  <div className={`group-hover:border-t-2 mx-3 rounded-[100px] lg:block hidden -mt-1.5 transition-colors duration-300 ${scrolled || !isHome ? 'border-[#0A3B7C]' : 'border-white'}`} />
                </div>
              </div>

              {/* What We Do */}
              <div className="hs-dropdown group lg:h-14 [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] lg:flex lg:justify-center items-center">
                <div className="h-10">
                  <button type="button" className="font-inter font-semibold lg:font-normal sm:p-3 flex justify-between items-center w-full text-lg lg:text-sm">
                    What we do
                    <svg className="ms-1 flex-shrink-0 size-4 group-hover:-rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div className={`group-hover:border-t-2 mx-3 rounded-[100px] lg:block hidden -mt-1.5 transition-colors duration-300 ${scrolled || !isHome ? 'border-[#0A3B7C]' : 'border-white'}`} />
                </div>
                
                {/* Mega Dropdown for What We Do */}
                <div className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[150ms] group-hover:opacity-100 group-hover:block hidden absolute z-10 top-full left-0 w-full bg-white sm:shadow-md py-3 sm:px-2">
                  <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
                    <div className="ml-5">
                      <h1 className="font-gellix text-xl py-2 lg:block hidden text-gray-950">What We Do</h1>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 px-5 lg:px-2 lg:p-7 text-gray-900">
                      <div className="flex flex-col space-y-5 lg:text-sm text-base lg:pt-0 pt-2">
                        <a className="hover:text-[#0A3B7C]" href="/technology-consulting-service">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Technology & Consulting</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/cloud">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Cloud</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/sales-commerce-service">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Sales & Commerce</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/metaverse-service">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Metaverse</span>
                        </a>
                      </div>
                      <div className="flex flex-col space-y-5 lg:pt-0 pt-5 lg:text-sm text-base">
                        <a className="hover:text-[#0A3B7C]" href="/data-analytics-service">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Data & Analytics</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/ai-ml-service">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">AI & ML</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/robotic-process-automation-service">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Robotic Process Automation</span>
                        </a>
                      </div>
                      <div className="lg:block hidden">
                        <div className="flex space-x-5">
                          <div className="border-gray-300 border-l" />
                          <div className="space-y-4 px-5">
                            <h1 className="uppercase text-gray-500 text-xs font-gellix font-semibold">Featured</h1>
                            <h3 className="mt-3 text-sm font-gellix font-semibold">Touchmark Quarterly</h3>
                            <p className="mt-2 text-xs font-inter text-gray-500 leading-relaxed">Silicon Valley pioneer Reid Hoffman explains why we should view AI as a colleague rather than a competitor.</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:block hidden p-3">
                        <img src="/images/navbar-img-service.jpg" className="w-64 h-36 object-cover rounded shadow" alt="Featured Services" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industries */}
              <div className="hs-dropdown group lg:h-14 [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] lg:flex lg:justify-center items-center">
                <div className="h-10">
                  <button type="button" className="font-inter font-semibold lg:font-normal sm:p-3 flex justify-between items-center w-full text-lg lg:text-sm">
                    Industries
                    <svg className="ms-1 flex-shrink-0 size-4 group-hover:-rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div className={`group-hover:border-t-2 mx-3 rounded-[100px] lg:block hidden -mt-1.5 transition-colors duration-300 ${scrolled || !isHome ? 'border-[#0A3B7C]' : 'border-white'}`} />
                </div>

                {/* Mega Dropdown for Industries */}
                <div className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[150ms] group-hover:opacity-100 group-hover:block hidden absolute z-10 top-full left-0 w-full bg-white sm:shadow-md py-3 sm:px-2">
                  <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
                    <div className="ml-5">
                      <h1 className="font-gellix text-xl py-2 lg:block hidden text-gray-950">Industries</h1>
                    </div>
                    <div className="sm:grid sm:grid-cols-4 px-5 lg:px-2 lg:p-7 text-gray-900">
                      <div className="flex flex-col space-y-5 lg:text-sm text-base lg:pt-0 pt-2">
                        <a className="hover:text-[#0A3B7C]" href="/bfsi-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">BFSI</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/aerospace-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Aerospace & Defense</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/engineering-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Engineering & R&D</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/esg-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">ESG</span>
                        </a>
                      </div>
                      <div className="flex flex-col space-y-5 lg:pt-0 pt-5 lg:text-sm text-base">
                        <a className="hover:text-[#0A3B7C]" href="/fmcg-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">FMCG & Retail</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/green-tech-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Geospatial Tech</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/healthcare-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Healthcare & Life Sciences</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/media-entertainment-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Media & Entertainment</span>
                        </a>
                      </div>
                      <div className="flex flex-col space-y-5 lg:pt-0 pt-5 lg:text-sm text-base">
                        <a className="hover:text-[#0A3B7C]" href="/mining-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Mining</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/real-estate-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Real Estate</span>
                        </a>
                        <a className="hover:text-[#0A3B7C]" href="/travel-tourism-industry">
                          <span className="lg:ml-3 gap-x-3.5 py-2 relative after:bg-[#0A3B7C] after:absolute after:h-0.5 after:w-0 after:bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Travel & Tourism</span>
                        </a>
                      </div>
                      <div className="lg:block hidden p-3">
                        <img src="/images/navbar-img-industry.jpg" className="w-64 h-36 object-cover rounded shadow" alt="Featured Industries" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog */}
              <div className="hs-dropdown group [--strategy:static] lg:h-14 sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] flex lg:justify-center items-center">
                <div className="h-10">
                  <a href="/blog">
                    <button type="button" className="font-inter font-semibold lg:font-normal sm:p-3 flex items-center w-full text-lg lg:text-sm">
                      Blog
                    </button>
                  </a>
                  <div className={`group-hover:border-t-2 mx-3 rounded-[100px] lg:block hidden -mt-1.5 transition-colors duration-300 ${scrolled || !isHome ? 'border-[#0A3B7C]' : 'border-white'}`} />
                </div>
              </div>

              {/* Contact Us */}
              <div className="hs-dropdown group [--strategy:static] lg:h-14 sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] flex lg:justify-center items-center">
                <div className="h-10">
                  <a href="/contact-us">
                    <button type="button" className="font-inter font-semibold lg:font-normal sm:p-3 flex items-center w-full text-lg lg:text-sm">
                      Contact Us
                    </button>
                  </a>
                  <div className={`group-hover:border-t-2 mx-3 rounded-[100px] lg:block hidden -mt-1.5 transition-colors duration-300 ${scrolled || !isHome ? 'border-[#0A3B7C]' : 'border-white'}`} />
                </div>
              </div>

            </div>
          </div>

          {/* Right Action Button (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="/contact-us">
              <button className={`px-4 py-2 font-inter text-xs font-semibold rounded transition-colors duration-300 ${
                scrolled || !isHome 
                  ? 'bg-[#194F97] text-white hover:bg-blue-700' 
                  : 'bg-white text-[#194F97] hover:bg-gray-100'
              }`}>
                Work With Us
              </button>
            </a>
          </div>

          {/* Mobile Menu Toggle (Hamburger) */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button" 
              className="p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              <svg className={`hs-collapse-open:hidden ${mobileMenuOpen ? 'hidden' : 'block'} size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg className={`hs-collapse-open:block ${mobileMenuOpen ? 'block' : 'hidden'} size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <div className={`lg:hidden w-full bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[100vh] py-4' : 'max-h-0'}`}>
        <div className="px-4 space-y-4">
          <a href="/about-us" className="block text-gray-800 hover:text-[#194F97] font-medium py-2">Who we are</a>
          
          <div className="border-t border-gray-100 my-2" />
          <h4 className="text-gray-400 font-semibold text-xs uppercase tracking-wider">What We Do</h4>
          <div className="pl-3 space-y-2">
            <a href="/technology-consulting-service" className="block text-gray-600 hover:text-[#194F97] text-sm py-1">Technology & Consulting</a>
            <a href="/cloud" className="block text-gray-600 hover:text-[#194F97] text-sm py-1">Cloud</a>
            <a href="/sales-commerce-service" className="block text-gray-600 hover:text-[#194F97] text-sm py-1">Sales & Commerce</a>
            <a href="/metaverse-service" className="block text-gray-600 hover:text-[#194F97] text-sm py-1">Metaverse</a>
            <a href="/data-analytics-service" className="block text-gray-600 hover:text-[#194F97] text-sm py-1">Data & Analytics</a>
            <a href="/ai-ml-service" className="block text-gray-600 hover:text-[#194F97] text-sm py-1">AI & ML</a>
            <a href="/robotic-process-automation-service" className="block text-gray-600 hover:text-[#194F97] text-sm py-1">Robotic Process Automation</a>
          </div>

          <div className="border-t border-gray-100 my-2" />
          <h4 className="text-gray-400 font-semibold text-xs uppercase tracking-wider">Industries</h4>
          <div className="pl-3 grid grid-cols-2 gap-2 text-sm">
            <a href="/bfsi-industry" className="block text-gray-600 hover:text-[#194F97] py-1">BFSI</a>
            <a href="/aerospace-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Aerospace</a>
            <a href="/engineering-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Engineering</a>
            <a href="/esg-industry" className="block text-gray-600 hover:text-[#194F97] py-1">ESG</a>
            <a href="/fmcg-industry" className="block text-gray-600 hover:text-[#194F97] py-1">FMCG & Retail</a>
            <a href="/green-tech-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Geospatial</a>
            <a href="/healthcare-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Healthcare</a>
            <a href="/media-entertainment-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Media & Ent.</a>
            <a href="/mining-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Mining</a>
            <a href="/real-estate-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Real Estate</a>
            <a href="/travel-tourism-industry" className="block text-gray-600 hover:text-[#194F97] py-1">Travel & Tourism</a>
          </div>

          <div className="border-t border-gray-100 my-2" />
          <a href="/blog" className="block text-gray-800 hover:text-[#194F97] font-medium py-2">Blog</a>
          <a href="/contact-us" className="block text-gray-800 hover:text-[#194F97] font-medium py-2">Contact Us</a>

          <div className="pt-2">
            <a href="/contact-us">
              <button className="w-full bg-[#194F97] text-white py-3 font-semibold rounded text-sm shadow">
                Work With Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
