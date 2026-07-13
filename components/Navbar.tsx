'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

type MenuName = 'services' | 'industries';

type NavigationItem = {
  label: string;
  href: string;
  detail: string;
};

const serviceItems: NavigationItem[] = [
  { label: 'Technology & Consulting', href: '/technology-consulting-service', detail: 'Digital strategy and transformation' },
  { label: 'Cloud', href: '/cloud', detail: 'Secure, scalable cloud foundations' },
  { label: 'Sales & Commerce', href: '/sales-commerce-service', detail: 'Connected customer journeys' },
  { label: 'Metaverse', href: '/metaverse-service', detail: 'Immersive spatial experiences' },
  { label: 'Data & Analytics', href: '/data-analytics-service', detail: 'Decisions powered by useful data' },
  { label: 'AI & ML', href: '/ai-ml-service', detail: 'Practical intelligent automation' },
  { label: 'Robotic Process Automation', href: '/robotic-process-automation-service', detail: 'Faster, reliable business operations' },
];

const industryItems: NavigationItem[] = [
  { label: 'BFSI', href: '/bfsi-industry', detail: 'Banking and financial services' },
  { label: 'Aerospace & Defense', href: '/aerospace-industry', detail: 'Mission-ready digital systems' },
  { label: 'Engineering & R&D', href: '/engineering-industry', detail: 'Product and process innovation' },
  { label: 'ESG', href: '/esg-industry', detail: 'Responsible, measurable growth' },
  { label: 'FMCG & Retail', href: '/fmcg-industry', detail: 'Modern consumer experiences' },
  { label: 'Geospatial Tech', href: '/green-tech-industry', detail: 'Location-powered intelligence' },
  { label: 'Healthcare & Life Sciences', href: '/healthcare-industry', detail: 'Human-centred health technology' },
  { label: 'Media & Entertainment', href: '/media-entertainment-industry', detail: 'Engaging digital content' },
  { label: 'Mining', href: '/mining-industry', detail: 'Safer, smarter operations' },
  { label: 'Real Estate', href: '/real-estate-industry', detail: 'Connected property ecosystems' },
  { label: 'Travel & Tourism', href: '/travel-tourism-industry', detail: 'Memorable traveller journeys' },
];

const menuContent = {
  services: {
    eyebrow: 'Our capabilities',
    title: 'Build what comes next',
    description: 'Strategy, engineering and experience design brought together to solve complex business challenges.',
    header: 'Explore our end-to-end digital capabilities.',
  },
  industries: {
    eyebrow: 'Industry expertise',
    title: 'Context changes everything',
    description: 'Sector knowledge paired with modern technology, so every solution fits the people and systems around it.',
    header: 'See how we apply technology across industries.',
  },
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={['ml-1 size-4 flex-none transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MegaMenu({
  activeMenu,
  currentPath,
  onClose,
}: {
  activeMenu: MenuName;
  currentPath: string;
  onClose: (restoreTriggerFocus?: boolean) => void;
}) {
  const content = menuContent[activeMenu];
  const items = activeMenu === 'services' ? serviceItems : industryItems;

  return (
    <>
      <button
        type="button"
        className={styles.scrim}
        aria-label="Close navigation panel"
        tabIndex={-1}
        onClick={() => onClose(true)}
      />
      <section
        id={activeMenu + '-menu'}
        className={styles.megaMenu}
        aria-labelledby={activeMenu + '-menu-trigger'}
        data-motion-skip
      >
        <div className={styles.megaGrid}>
          <div className={styles.megaIntro}>
            <div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h2 className={styles.megaTitle}>{content.title}</h2>
              <p className={styles.megaDescription}>{content.description}</p>
            </div>
            <span className={styles.introNote}>Touchmark Descience</span>
          </div>

          <div className={styles.megaBody}>
            <div className={styles.megaHeader}>
              <p>{content.header}</p>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close navigation panel"
                onClick={() => onClose(true)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className={[styles.linkGrid, activeMenu === 'industries' ? styles.industryGrid : ''].join(' ')}>
              {items.map((item, index) => (
                <Link
                  className={styles.megaLink}
                  href={item.href}
                  key={item.href}
                  aria-current={currentPath === item.href ? 'page' : undefined}
                  data-mega-link
                  onClick={() => onClose()}
                >
                  <span className={styles.linkIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span>
                    <span className={styles.linkLabel}>{item.label}</span>
                    <span className={styles.linkDetail}>{item.detail}</span>
                  </span>
                  <ArrowIcon className={styles.linkArrow} />
                </Link>
              ))}
            </div>

            <div className={styles.megaFooter}>
              <span>Not sure where to begin? Tell us what you are trying to solve.</span>
              <Link className={styles.footerLink} href="/contact-us" onClick={() => onClose()}>
                Start a conversation
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NavbarContent({ pathname }: { pathname: string }) {
  const isHome = pathname === '/';
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => setScrolled(window.scrollY > 0);
    const initialFrame = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (!activeMenu) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const triggerId = activeMenu + '-menu-trigger';
      setActiveMenu(null);
      requestAnimationFrame(() => document.getElementById(triggerId)?.focus());
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = mobileMenuPanelRef.current;
      const toggle = mobileMenuButtonRef.current;
      if (!panel || !toggle) return;

      const panelItems = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const focusableItems = [toggle, ...panelItems];
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];
      const activeElement = document.activeElement;

      if (!(activeElement instanceof HTMLElement) || !focusableItems.includes(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastItem : firstItem).focus();
        return;
      }

      if (event.shiftKey && activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const desktopViewport = window.matchMedia('(min-width: 1024px)');
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
      else setActiveMenu(null);
    };

    desktopViewport.addEventListener('change', handleViewportChange);
    return () => desktopViewport.removeEventListener('change', handleViewportChange);
  }, []);

  const cancelScheduledClose = () => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const openMenu = (menu: MenuName) => {
    cancelScheduledClose();
    setActiveMenu(menu);
    setMobileMenuOpen(false);
  };

  const focusFirstMenuLink = (menu: MenuName) => {
    requestAnimationFrame(() => {
      document.querySelector<HTMLAnchorElement>(`#${menu}-menu [data-mega-link]`)?.focus();
    });
  };

  const openMenuFromKeyboard = (menu: MenuName) => {
    openMenu(menu);
    focusFirstMenuLink(menu);
  };

  const scheduleMenuClose = () => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 160);
  };

  const toggleMenu = (menu: MenuName) => {
    cancelScheduledClose();
    setActiveMenu((current) => current === menu ? null : menu);
  };

  const closeActiveMenu = (restoreTriggerFocus = false) => {
    const menuToRestore = activeMenu;
    setActiveMenu(null);
    if (restoreTriggerFocus && menuToRestore) {
      requestAnimationFrame(() => {
        document.getElementById(`${menuToRestore}-menu-trigger`)?.focus();
      });
    }
  };

  const handleMenuTriggerClick = (menu: MenuName, event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.detail !== 0) {
      openMenu(menu);
      return;
    }

    const willOpen = activeMenu !== menu;
    toggleMenu(menu);
    if (willOpen) focusFirstMenuLink(menu);
  };

  const handleMenuTriggerKeyDown = (menu: MenuName, event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || (event.key === 'Enter' && activeMenu !== menu)) {
      event.preventDefault();
      openMenuFromKeyboard(menu);
    }
  };

  const solidNav = scrolled || !isHome || activeMenu !== null;
  const navClass = solidNav
    ? 'lg:bg-white/95 lg:backdrop-blur-xl lg:shadow-[0_8px_30px_rgba(15,40,80,0.08)] lg:text-slate-950 bg-white text-slate-950'
    : 'lg:bg-transparent lg:text-white bg-white text-slate-950';
  const indicatorColor = solidNav ? 'bg-primary' : 'bg-white';
  const topLinkClass = 'relative flex h-14 items-center px-3 font-inter text-sm font-medium';

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className={[styles.nav, 'fixed left-0 top-0 z-50 w-full transition-colors duration-300', navClass].join(' ')}
      onMouseEnter={cancelScheduledClose}
      onMouseLeave={scheduleMenuClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActiveMenu(null);
        }
      }}
    >
      <div className={[styles.barContent, '2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] mx-auto w-full px-4 md:px-6 lg:px-8'].join(' ')}>
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Touchmark Descience home"
            aria-current={pathname === '/' ? 'page' : undefined}
            onFocus={() => setActiveMenu(null)}
          >
            <Image
              src={solidNav ? '/images/tds-color-logo.webp' : '/images/touchmark-logowhite.svg'}
              width={151}
              height={28}
              unoptimized
              loading="eager"
              className="hidden h-7 w-auto lg:block"
              alt="Touchmark Descience"
            />
            <Image
              src="/images/tds-color-logo.webp"
              width={151}
              height={28}
              unoptimized
              loading="eager"
              className="block h-7 w-auto lg:hidden"
              alt="Touchmark Descience"
            />
          </Link>

          <div className="hidden items-center lg:flex">
            <Link
              href="/about-us"
              className={['group', topLinkClass].join(' ')}
              aria-current={pathname === '/about-us' ? 'page' : undefined}
              onFocus={() => setActiveMenu(null)}
            >
              Who we are
              <span className={['absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-200 group-hover:scale-x-100', indicatorColor].join(' ')} />
            </Link>

            <div className="relative" onMouseEnter={() => openMenu('services')}>
              <button
                id="services-menu-trigger"
                type="button"
                className={topLinkClass}
                aria-expanded={activeMenu === 'services'}
                aria-controls="services-menu"
                aria-haspopup="true"
                onClick={(event) => handleMenuTriggerClick('services', event)}
                onKeyDown={(event) => handleMenuTriggerKeyDown('services', event)}
              >
                What we do
                <ChevronIcon open={activeMenu === 'services'} />
                <span className={['absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full transition-transform duration-200', activeMenu === 'services' ? 'scale-x-100' : 'scale-x-0', indicatorColor].join(' ')} />
              </button>
            </div>

            <div className="relative" onMouseEnter={() => openMenu('industries')}>
              <button
                id="industries-menu-trigger"
                type="button"
                className={topLinkClass}
                aria-expanded={activeMenu === 'industries'}
                aria-controls="industries-menu"
                aria-haspopup="true"
                onClick={(event) => handleMenuTriggerClick('industries', event)}
                onKeyDown={(event) => handleMenuTriggerKeyDown('industries', event)}
              >
                Industries
                <ChevronIcon open={activeMenu === 'industries'} />
                <span className={['absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full transition-transform duration-200', activeMenu === 'industries' ? 'scale-x-100' : 'scale-x-0', indicatorColor].join(' ')} />
              </button>
            </div>

            <Link
              href="/blog"
              className={['group', topLinkClass].join(' ')}
              aria-current={pathname === '/blog' ? 'page' : undefined}
              onFocus={() => setActiveMenu(null)}
            >
              Blog
              <span className={['absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-200 group-hover:scale-x-100', indicatorColor].join(' ')} />
            </Link>
            <Link
              href="/contact-us"
              className={['group', topLinkClass].join(' ')}
              aria-current={pathname === '/contact-us' ? 'page' : undefined}
              onFocus={() => setActiveMenu(null)}
            >
              Contact Us
              <span className={['absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-200 group-hover:scale-x-100', indicatorColor].join(' ')} />
            </Link>
          </div>

          <Link
            href="/contact-us"
            className={[
              'hidden items-center px-4 py-2 font-inter text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 lg:inline-flex',
              solidNav ? 'bg-primary text-white hover:shadow-lg hover:shadow-primary/20' : 'bg-white text-primary hover:shadow-lg hover:shadow-white/10',
            ].join(' ')}
            onFocus={() => setActiveMenu(null)}
          >
            Work With Us
          </Link>

          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="inline-flex size-10 items-center justify-center border border-slate-200 bg-white text-slate-800 shadow-sm lg:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setActiveMenu(null);
            }}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {activeMenu && (
        <MegaMenu
          activeMenu={activeMenu}
          currentPath={pathname}
          onClose={closeActiveMenu}
        />
      )}

      {mobileMenuOpen && (
        <div
          ref={mobileMenuPanelRef}
          id="mobile-navigation"
          className="max-h-[calc(100dvh-56px)] overflow-y-auto border-t border-slate-100 bg-white px-4 py-5 text-slate-900 shadow-xl lg:hidden"
        >
          <div className="mx-auto max-w-xl">
            <Link
              href="/about-us"
              className="block border-b border-slate-100 py-3 font-semibold"
              aria-current={pathname === '/about-us' ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              Who we are
            </Link>

            <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">What we do</p>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-slate-100 py-2.5 text-sm text-slate-700 hover:text-primary"
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Industries</p>
            <div className="grid grid-cols-2 gap-x-6">
              {industryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-slate-100 py-2.5 text-sm text-slate-700 hover:text-primary"
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                href="/blog"
                className="border border-slate-200 px-3 py-3 text-center text-sm font-semibold"
                aria-current={pathname === '/blog' ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                className="bg-primary px-3 py-3 text-center text-sm font-semibold text-white"
                aria-current={pathname === '/contact-us' ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return <NavbarContent key={pathname} pathname={pathname} />;
}
