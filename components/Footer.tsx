'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Footer() {
  const [step, setStep] = useState(1); // 1 = Email, 2 = Name, 3 = Success
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setStep(2);
      requestAnimationFrame(() => nameInputRef.current?.focus());
    }
  };

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      nameInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/head/engine/ajax/__ajax_subscribe_form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: new URLSearchParams({
          subscribe_email: email.trim(),
          subscribe_name: name.trim(),
        }).toString(),
      });
      const responseText = await response.text();
      let responseData: { success?: boolean; message?: string } | null = null;

      try {
        responseData = JSON.parse(responseText) as { success?: boolean; message?: string };
      } catch {
        // The legacy endpoint may return plain text. A successful HTTP response is authoritative.
      }

      if (!response.ok || responseData?.success === false) {
        throw new Error(responseData?.message || 'We could not complete your subscription. Please try again.');
      }

      setStep(3);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not complete your subscription. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary">
      <div className="space-y-8 py-16 lg:space-y-16 2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 font-inter">
        
        {/* Top Footer: Social Links & Newsletter Subscription */}
        <div className="grid grid-cols-12 gap-4 items-center">
          
          {/* Socials */}
          <div className="lg:col-span-4 col-span-12">
            <div className="block lg:flex justify-start items-center gap-2 -mt-5 lg:mt-0">
              <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl text-xl font-gellix font-semibold text-white">
                Follow Our Social Networks
              </h1>
              <div className="flex justify-start lg:justify-center items-center space-x-2 lg:mt-0 mt-4">
                <a href="https://in.linkedin.com/company/touchmarkdes" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" decoding="async" src="/images/home/icons/linkedin-icon.svg" className="h-10 transition-all duration-300 hover:scale-110 hover:-translate-y-1" alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com/touchmarkdes/" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" decoding="async" src="/images/home/icons/instagram-icon.svg" className="h-10 transition-all duration-300 hover:scale-110 hover:-translate-y-1" alt="Instagram" />
                </a>
                <a href="https://www.facebook.com/touchmarkdes/" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" decoding="async" src="/images/home/icons/fb-icon.svg" className="h-10 transition-all duration-300 hover:scale-110 hover:-translate-y-1" alt="Facebook" />
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
                  <div id="footer-subscribe-container" className="relative max-w-md mx-auto lg:mt-0 mt-4">
                    
                    {step === 1 && (
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="relative">
                          <label htmlFor="footer-subscribe-email" className="sr-only">
                            Email address
                          </label>
                          <input 
                            type="email" 
                            id="footer-subscribe-email"
                            name="subscribe_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white h-14 w-full px-4 pr-32 focus:outline-none placeholder:text-black text-black" 
                            placeholder="Enter Your Email" 
                            autoComplete="email"
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
                      <form
                        onSubmit={handleConfirmSubmit}
                        className="space-y-4"
                        aria-busy={isSubmitting}
                        aria-describedby={submitError ? 'footer-subscribe-error' : undefined}
                      >
                        <div className="relative">
                          <label htmlFor="footer-subscribe-name" className="sr-only">
                            Name
                          </label>
                          <input 
                            ref={nameInputRef}
                            type="text" 
                            id="footer-subscribe-name"
                            name="subscribe_name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setSubmitError('');
                            }}
                            className="bg-white h-14 w-full px-4 pr-32 focus:outline-none placeholder:text-black text-black" 
                            placeholder="Enter Your Name" 
                            autoComplete="name"
                            required 
                          />
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="absolute top-2 right-2 bg-primary text-white px-4 h-10 inline-flex items-center justify-center uppercase text-xs font-semibold group transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-primary/90 hover:shadow-md"
                          >
                            {isSubmitting ? 'Submitting...' : 'Confirm'}
                          </button>
                        </div>
                        {submitError && (
                          <p
                            id="footer-subscribe-error"
                            className="text-sm text-white"
                            role="alert"
                            aria-live="assertive"
                          >
                            {submitError}
                          </p>
                        )}
                      </form>
                    )}

                    {step === 3 && (
                      <div
                        ref={successRef}
                        id="footer-subscribe-success"
                        className="text-white mx-auto flex items-center gap-4 py-2"
                        role="status"
                        aria-live="polite"
                        tabIndex={-1}
                      >
                        <img loading="lazy" decoding="async"
                          src="/assets/front/home/correct.webp" 
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
            <Link href="/">
              <img loading="lazy" decoding="async" src="/images/touchmark-logowhite.svg" className="h-10" alt="Touchmark" />
            </Link>
            <p className="mt-7 lg:mt-10 xl:mt-10 2xl:mt-10 text-sm lg:text-[14px] xl:text-[14px] 2xl:text-base text-white/80 font-inter leading-relaxed">
              Innovative Solutions Connecting Brands and Customers. We provide full-service IT consulting, digital marketing, and software development. Our objective is to use automation and rich media to close the gap that exists between brands and consumers.
            </p>
            <div className="mt-7 lg:mt-10 flex items-center space-x-3">
              <img loading="lazy" decoding="async" src="/images/home/icons/phone-icon.svg" alt="Phone" />
              <h3 className="font-semibold text-sm">+91 44 4065 2648</h3>
            </div>
            <div className="mt-5 flex items-center space-x-3">
              <img loading="lazy" decoding="async" src="/images/home/icons/mail-icon.svg" alt="Mail" />
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
                  <li><Link href="/about-us" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Who we are</Link></li>
                  <li><Link href="/technology-consulting-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">What we do</Link></li>
                  <li><Link href="/case-study?id=1" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Case Studies</Link></li>
                  <li><Link href="/blog" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Blogs</Link></li>
                  <li><Link href="/#ebook" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">E-Books</Link></li>
                  <li><Link href="/client-partner" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Clients and Partners</Link></li>
                  <li><Link href="/contact-us" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Contact us</Link></li>
                </ul>
              </div>
            </div>

            {/* Services Links */}
            <div className="flex justify-start lg:justify-center">
              <div>
                <p className="font-semibold font-gellix text-white text-lg xl:text-xl">Services</p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  <li><Link href="/technology-consulting-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Technology Consulting</Link></li>
                  <li><Link href="/cloud" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Cloud</Link></li>
                  <li><Link href="/sales-commerce-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Sales & Commerce</Link></li>
                  <li><Link href="/metaverse-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Metaverse</Link></li>
                  <li><Link href="/data-analytics-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Data & Analytics</Link></li>
                  <li><Link href="/ai-ml-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">AI & ML</Link></li>
                  <li><Link href="/robotic-process-automation-service" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Robotic Process Automation</Link></li>
                </ul>
              </div>
            </div>

            {/* Industries Links */}
            <div className="flex justify-start lg:justify-end">
              <div>
                <p className="font-semibold font-gellix text-white text-lg xl:text-xl">Industries</p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  <li><Link href="/aerospace-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Aerospace & Defence</Link></li>
                  <li><Link href="/bfsi-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">BFSI</Link></li>
                  <li><Link href="/esg-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Environmental, social, & governance</Link></li>
                  <li><Link href="/fmcg-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Fast-Moving Consumer Goods</Link></li>
                  <li><Link href="/healthcare-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Healthcare</Link></li>
                  <li><Link href="/mining-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Mining</Link></li>
                  <li><Link href="/green-tech-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Geospatial Tech</Link></li>
                  <li><Link href="/media-entertainment-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Media and Entertainment</Link></li>
                  <li><Link href="/real-estate-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Real Estate</Link></li>
                  <li><Link href="/travel-tourism-industry" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out inline-block">Travel and Tourism</Link></li>
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
              <Link href="/terms-condition" className="hover:underline">Terms of Use</Link>
              <span>┃</span>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
