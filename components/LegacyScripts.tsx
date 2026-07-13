'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const OWL_ROUTES = new Set([
  '/',
  '/aerospace-industry',
  '/bfsi-industry',
  '/engineering-industry',
  '/esg-industry',
  '/fmcg-industry',
  '/green-tech-industry',
  '/healthcare-industry',
  '/media-entertainment-industry',
  '/mining-industry',
  '/real-estate-industry',
  '/travel-tourism-industry',
]);

/**
 * Loads the few legacy libraries still used by converted page scripts.
 * Heavy carousel bundles are route-scoped instead of being parsed on every
 * blog, policy, and content page.
 */
export default function LegacyScripts() {
  const pathname = usePathname();
  const needsOwl = OWL_ROUTES.has(pathname);
  const [jqueryReady, setJqueryReady] = useState(false);

  const announceOwlReady = () => {
    window.dispatchEvent(new Event('tm:owl-ready'));
  };

  return (
    <>
      {pathname === '/' && <link rel="stylesheet" href="/css/swiper-bundle.min.css" />}
      {needsOwl && (
        <>
          <link rel="stylesheet" href="/css/owl.carousel.min.css" />
          <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        </>
      )}
      {needsOwl && (
        <Script
          src="/js/jquery-3.7.1.min.js"
          strategy="afterInteractive"
          onLoad={() => setJqueryReady(true)}
          onReady={() => setJqueryReady(true)}
        />
      )}
      {pathname === '/' && (
        <Script
          src="https://unpkg.com/swiper@11.1.7/swiper-bundle.min.js"
          strategy="afterInteractive"
        />
      )}
      {needsOwl && jqueryReady && (
        <Script
          src="/js/owl.carousel.min.js"
          strategy="afterInteractive"
          onLoad={announceOwlReady}
          onReady={announceOwlReady}
        />
      )}
    </>
  );
}
