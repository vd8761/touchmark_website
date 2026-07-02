'use client';

import { useState } from 'react';

export default function Footer() {
  const [step, setStep] = useState(1); // 1 = Email, 2 = Name, 3 = Success
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setStep(2);
    }
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep(3);
      // Optional: Post the data to an endpoint or console log
      console.log('Subscribed:', { email, name });
    }
  };

  return (
    <footer className="bg-primary">
      <div className="space-y-8 py-16 lg:space-y-16 2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 font-inter">
        
        {/* Top Footer: Social Links & Newsletter Subscription */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Socials */}
          <div className="lg:col-span-4 col-span-12">
            <div className="block lg:flex justify-start items-center gap-2 -mt-5 lg:mt-0">
              <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl text-xl font-gellix font-semibold text-white">
                Follow Our Social Networks
              </h1>
              <div className="flex justify-start lg:justify-center items-center space-x-2 lg:mt-0 mt-4">
                <a href="https://in.linkedin.com/company/touchmarkdes" target="_blank" rel="noopener noreferrer">
                  <img src="/images/home/icons/linkedin-icon.svg" className="h-10 transition-all duration-300 hover:scale-110 hover:-translate-y-1" alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com/touchmarkdes/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/home/icons/instagram-icon.svg" className="h-10 transition-all duration-300 hover:scale-110 hover:-translate-y-1" alt="Instagram" />
                </a>
                <a href="https://www.facebook.com/touchmarkdes/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/home/icons/fb-icon.svg" className="h-10 transition-all duration-300 hover:scale-110 hover:-translate-y-1" alt="Facebook" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:block hidden" />

          {/* Subscription Headline */}
          <div className="lg:col-span-3 col-span-12 lg:mt-0 mt-5">
            <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl text-xl font-gellix font-semibold text-white">
              Be the First one to hear About Updates
            </h1>
          </div>

          {/* Interactive Form Steps */}
          <div className="lg:col-span-4 col-span-12">
            <div className="max-w-md mx-auto overflow-hidden md:max-w-xl -ml-3 lg:ml-0">
              <div className="md:flex">
                <div className="w-full lg:p-0 p-3">
                  <div id="formContainer" className="relative max-w-md mx-auto mt-10">
                    
                    {step === 1 && (
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="relative">
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white h-14 w-full px-4 pr-32 focus:outline-none placeholder:text-black text-black" 
                            placeholder="Enter Your Email" 
                            required 
                          />
                          <button 
                            type="submit" 
                            className="absolute top-2 right-2 bg-primary text-white px-4 h-10 inline-flex items-center justify-center uppercase text-xs font-semibold group transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-primary/90 hover:shadow-md"
                          >
                            Subscribe
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleConfirmSubmit} className="space-y-4">
                        <div className="relative">
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white h-14 w-full px-4 pr-32 focus:outline-none placeholder:text-black text-black" 
                            placeholder="Enter Your Name" 
                            required 
                          />
                          <button 
                            type="submit" 
                            className="absolute top-2 right-2 bg-primary text-white px-4 h-10 inline-flex items-center justify-center uppercase text-xs font-semibold group transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-primary/90 hover:shadow-md"
                          >
                            Confirm
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div id="successAlert" className="text-white mx-auto flex items-center gap-4 py-2">
                        <img 
                          src="/assets/front/home/correct.png" 
                          className="w-12 h-12 rounded-full" 
                          alt="Success" 
                        />
                        <div>
                          <h1 className="text-2xl font-gellix font-semibold">Thank you!</h1>
                          <p className="text-white/80 text-sm">Subscribed Successfully</p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30" />

        {/* Middle Footer: Links Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6 -mt-14">
          
          {/* About Column */}
          <div className="text-white w-full col-span-2">
            <a href="/">
              <img src="/images/touchmark-logowhite.svg" className="h-10" alt="Touchmark" />
            </a>
            <p className="mt-7 lg:mt-10 xl:mt-10 2xl:mt-10 text-sm lg:text-[14px] xl:text-[14px] 2xl:text-base text-white/80 font-inter leading-relaxed">
              Innovative Solutions Connecting Brands and Customers. We provide full-service IT consulting, digital marketing, and software development. Our objective is to use automation and rich media to close the gap that exists between brands and consumers.
            </p>
            <div className="mt-7 lg:mt-10 flex items-center space-x-3">
              <img src="/images/home/icons/phone-icon.svg" alt="Phone" />
              <h3 className="font-semibold text-sm">+91 44 4065 2648</h3>
            </div>
            <div className="mt-5 flex items-center space-x-3">
              <img src="/images/home/icons/mail-icon.svg" alt="Mail" />
              <h3 className="font-semibold text-sm">info@touchmarkdes.com</h3>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-3 mt-5 lg:mt-0">
            
            {/* Quick Links */}
            <div className="flex justify-start lg:justify-end">
              <div>
                <p className="font-semibold font-gellix text-white text-lg xl:text-xl">Quick Links</p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  <li><a href="/about-us" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Who we are</a></li>
                  <li><a href="/technology-consulting-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">What we do</a></li>
                  <li><a href="/case-study?id=1" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Case Studies</a></li>
                  <li><a href="/blog" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Blogs</a></li>
                  <li><a href="/#ebook" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">E-Books</a></li>
                  <li><a href="/client-partner" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Clients and Partners</a></li>
                  <li><a href="/contact-us" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Contact us</a></li>
                </ul>
              </div>
            </div>

            {/* Services Links */}
            <div className="flex justify-start lg:justify-center">
              <div>
                <p className="font-semibold font-gellix text-white text-lg xl:text-xl">Services</p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  <li><a href="/technology-consulting-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Technology Consulting</a></li>
                  <li><a href="/cloud" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Cloud</a></li>
                  <li><a href="/sales-commerce-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Sales & Commerce</a></li>
                  <li><a href="/metaverse-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Metaverse</a></li>
                  <li><a href="/data-analytics-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Data & Analytics</a></li>
                  <li><a href="/ai-ml-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">AI & ML</a></li>
                  <li><a href="/robotic-process-automation-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Robotic Process Automation</a></li>
                </ul>
              </div>
            </div>

            {/* Industries Links */}
            <div className="flex justify-start lg:justify-end">
              <div>
                <p className="font-semibold font-gellix text-white text-lg xl:text-xl">Industries</p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  <li><a href="/aerospace-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Aerospace & Defence</a></li>
                  <li><a href="/bfsi-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">BFSI</a></li>
                  <li><a href="/esg-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Environmental, social, & governance</a></li>
                  <li><a href="/fmcg-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Fast-Moving Consumer Goods</a></li>
                  <li><a href="/healthcare-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Healthcare</a></li>
                  <li><a href="/mining-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Mining</a></li>
                  <li><a href="/green-tech-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Geospatial Tech</a></li>
                  <li><a href="/media-entertainment-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Media and Entertainment</a></li>
                  <li><a href="/real-estate-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Real Estate</a></li>
                  <li><a href="/travel-tourism-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Travel and Tourism</a></li>
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div>
          <div className="border-t border-white/30" />
          <div className="text-white block lg:flex justify-center items-center text-center lg:space-y-0 space-y-3 lg:space-x-5 pt-10">
            <h3 className="text-xs">&copy; 2010-2026 Touchmark Descience Pvt. Ltd</h3>
            <div className="flex justify-center items-center space-x-3 text-xs">
              <a href="/terms-condition" className="hover:underline">Terms of Use</a>
              <span>┃</span>
              <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
