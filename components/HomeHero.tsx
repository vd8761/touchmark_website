import Image from 'next/image';
import styles from './HomeHero.module.css';

const slides = [
  {
    title: 'Offering travel experiences, from exotic destinations to cultural adventures',
    href: '/travel-tourism-industry',
    image: '/images/home/hero-banner-vector-01.webp',
    imageAlt: 'Travel experiences and cultural adventures',
    tab: 'Discover the World with Us',
  },
  {
    title: 'Immersive AR and VR Experiences Await You',
    href: '/metaverse-service',
    image: '/images/home/hero-banner-vector-02.webp',
    imageAlt: 'People exploring an immersive virtual reality experience',
    tab: 'Immersive Experiences',
  },
  {
    title: 'Enhance Your Health and Happiness',
    href: '/healthcare-industry',
    image: '/images/home/hero-banner-vector-03.webp',
    imageAlt: 'Digital healthcare and wellbeing experience',
    tab: 'Empowering Your Wellbeing',
  },
] as const;

const connectorPath =
  'M430 184 C520 184 565 181 620 162 C700 135 724 68 806 48 C896 26 968 91 1040 158 L1040 184 Z';

function CodeBasedBackdrop() {
  const rings = Array.from({ length: 10 });

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <svg
        className={styles.mesh}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g className={styles.ringField}>
          {rings.map((_, index) => (
            <ellipse
              key={`ring-${index}`}
              cx="1120"
              cy="320"
              rx={170 + index * 64}
              ry={72 + index * 36}
              transform={`rotate(${18 + index * 1.3} 1120 320)`}
              className={styles.swirlLine}
              opacity={Math.max(0.34, 0.72 - index * 0.035)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section
      className={`swiper-container relative ${styles.hero}`}
      data-hero-autoplay="running"
      data-hero-motion="running"
      aria-label="Featured services"
    >
      <CodeBasedBackdrop />

      <div className="swiper-wrapper relative z-[1]">
        {slides.map((slide, index) => (
          <div className={`swiper-slide ${styles.slide}`} key={slide.href}>
            <div className={`grid grid-cols-12 2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 ${styles.slideShell}`}>
              <div className={`lg:col-span-5 col-span-12 flex items-center ${styles.copyColumn}`}>
                <div className={styles.copy}>
                  <h1 className="font-gellix text-white text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                    {slide.title}
                  </h1>
                  <a
                    href={slide.href}
                    className={`relative overflow-hidden border border-white/70 px-3 py-2 inline-flex justify-center items-center group mt-6 lg:mt-8 ${styles.cta}`}
                  >
                    <span className="relative z-10 text-white group-hover:text-[#12365f] transition-colors duration-300 text-sm uppercase">
                      Learn More
                    </span>
                    <svg
                      fill="none"
                      height="24"
                      className="relative z-10 ml-2 text-white -rotate-90 group-hover:text-[#12365f] group-hover:rotate-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      viewBox="0 0 24 24"
                      width="24"
                      aria-hidden="true"
                    >
                      <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor" />
                    </svg>
                    <span className="absolute inset-0 bg-white transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0" />
                  </a>
                </div>
              </div>

              <div className={`lg:col-span-7 col-span-12 flex items-end justify-center min-h-0 ${styles.visualColumn}`}>
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  width={920}
                  height={746}
                  unoptimized
                  priority={index === 0}
                  sizes="(max-width: 1023px) 94vw, 58vw"
                  className={styles.figure}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.imageMask} data-hero-curve aria-hidden="true">
        <svg
          className={styles.curveSvg}
          viewBox="0 0 1000 184"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient
              id="home-hero-connector"
              x1="0"
              y1="0"
              x2="1000"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop className={styles.curveCopyStop} offset="0" />
              <stop className={styles.curveCopyStop} offset="0.499" />
              <stop className={styles.curveStatsStop} offset="0.5" />
              <stop className={styles.curveStatsStop} offset="1" />
            </linearGradient>
            <clipPath id="home-hero-connector-clip">
              <path d={connectorPath} data-hero-curve-path />
            </clipPath>
          </defs>
          <g clipPath="url(#home-hero-connector-clip)">
            <rect className={styles.curveShape} x="0" y="0" width="1040" height="184" />
          </g>
        </svg>
      </div>

      <div className={`2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto md:px-6 lg:px-8 ${styles.tabsWrap}`}>
        <div className={`tab-navigation ${styles.tabs}`} role="group" aria-label="Featured slides">
          {slides.map((slide, index) => (
            <button
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Show ${slide.tab}`}
              className={styles.tab}
              data-hero-selector
              type="button"
              key={slide.href}
            >
              <span className={styles.timer} aria-hidden="true">
                <svg className={styles.timerSvg} viewBox="0 0 32 32">
                  <circle className={styles.timerTrack} cx="16" cy="16" r="13.5" pathLength="100" />
                  <circle
                    className={styles.timerProgress}
                    data-timer-progress
                    cx="16"
                    cy="16"
                    r="13.5"
                    pathLength="100"
                  />
                </svg>
                <span className={styles.timerNumber}>{String(index + 1).padStart(2, '0')}</span>
              </span>
              <span className={styles.tabLabel}>{slide.tab}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
