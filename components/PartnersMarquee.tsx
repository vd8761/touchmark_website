'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import styles from './PartnersMarquee.module.css';

const PARTNERS = {
  cocaCola: { name: 'Coca-Cola', src: '/images/about/coca-cola-logo.webp' },
  tag: { name: 'TAG', src: '/images/about/tag-logo.webp' },
  sidbi: { name: 'SIDBI', src: '/images/about/sidbi-logo.webp' },
  rupinis: { name: 'Rupinis', src: '/images/about/rupinis-logo.webp' },
  rare: { name: 'Rare', src: '/images/about/rare-logo.webp' },
  expleo: { name: 'Expleo', src: '/images/about/expleo-logo.webp' },
  rblBank: { name: 'RBL Bank', src: '/images/about/rbl-bank-logo.webp' },
  cii: { name: 'Confederation of Indian Industry', src: '/images/about/coii-logo.webp' },
  swachhBharat: { name: 'Swachh Bharat', src: '/images/about/switch-barath-logo.webp' },
} as const;

type PartnerKey = keyof typeof PARTNERS;

const COLUMN_ORDERS: readonly (readonly PartnerKey[])[] = [
  ['cocaCola', 'tag', 'sidbi', 'rupinis', 'rare', 'expleo', 'rblBank', 'cii', 'swachhBharat'],
  ['tag', 'cii', 'expleo', 'sidbi', 'swachhBharat', 'rare', 'rblBank', 'rupinis', 'cocaCola'],
  ['cocaCola', 'tag', 'swachhBharat', 'rupinis', 'expleo', 'rare', 'rblBank', 'sidbi', 'cii'],
] as const;

const PARTNER_NAMES = Object.values(PARTNERS).map(({ name }) => name).join(', ');

function LogoGroup({ order, duplicate }: { order: readonly PartnerKey[]; duplicate: boolean }) {
  return (
    <div className={styles.logoGroup} aria-hidden={duplicate || undefined}>
      {order.map((partnerKey) => {
        const partner = PARTNERS[partnerKey];

        return (
          <Image
            key={`${partnerKey}-${duplicate ? 'duplicate' : 'original'}`}
            src={partner.src}
            alt=""
            width={285}
            height={165}
            unoptimized
            sizes="(min-width: 1024px) 14vw, 28vw"
            className={styles.logo}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

export default function PartnersMarquee() {
  const logoGridRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const logoGrid = logoGridRef.current;
    if (!logoGrid) return;

    const syncPlayback = () => {
      logoGrid.dataset.running = inViewRef.current && !document.hidden ? 'true' : 'false';
    };

    document.addEventListener('visibilitychange', syncPlayback);

    if (!('IntersectionObserver' in window)) {
      inViewRef.current = true;
      syncPlayback();
      return () => document.removeEventListener('visibilitychange', syncPlayback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: '160px 0px' },
    );

    observer.observe(logoGrid);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <section aria-labelledby="partners-heading">
      <div
        className="relative lg:h-[686px] h-full lg:w-full flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about/bg-scroll-logo.webp')" }}
      >
        <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-16 xl:py-16 2xl:py-24">
          <div className="grid grid-cols-12 lg:gap-8 lg:mt-0 mt-4">
            <div className="lg:col-span-5 col-span-12 text-white text-left flex justify-start items-center">
              <div>
                <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-white font-medium">
                  Our Partners
                </p>
                <h1
                  id="partners-heading"
                  className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-3xl text-3xl font-gellix"
                >
                  Elevate your experience with us
                </h1>
                <p className="text-[14px] lg:text-sm xl:text-sm 2xl:text-base mt-3 lg:mt-5 xl:mt-7 2xl:mt-10 font-inter">
                  Touchmark Descience may help you improve your job and personal success by providing
                  cutting-edge tools and skilled coaching. We can do incredible things and reach new
                  heights when we work together!
                </p>
                <p className={styles.visuallyHidden} data-motion-skip>
                  Our partners include {PARTNER_NAMES}.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 col-span-12">
              <div
                ref={logoGridRef}
                className={`${styles.logoGrid} lg:h-96 h-72 lg:mt-0 mt-8`}
                data-running="false"
                data-motion-skip
                aria-hidden="true"
              >
                {COLUMN_ORDERS.map((order, columnIndex) => (
                  <div className={styles.logoColumn} key={columnIndex}>
                    <div
                      className={`${styles.logoTrack} ${
                        columnIndex === 1 ? styles.reverse : styles.forward
                      }`}
                    >
                      <LogoGroup order={order} duplicate={false} />
                      <LogoGroup order={order} duplicate />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
