'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Site-wide motion engine (no dependencies):
 *  - auto-tags headings/copy/images with scroll reveals (IntersectionObserver)
 *  - word-by-word masked rises for short display headlines
 *  - scroll progress bar + subtle parallax on decorative images
 * Skips: nav, forms, modals, carousels (they animate themselves),
 * anything inside [data-motion-skip], and reduced-motion visitors.
 */

const SKIP_ZONES =
  'nav, form, #loader-wrapper, .swiper-container, .owl-carousel, [data-motion-skip], .mo-progress';

const CANDIDATES =
  'h1, h2, h3, h4, p, li, blockquote, figure, table, a.group, a[class*="inline-flex"], img';

const isLongformRoute = (pathname: string) =>
  pathname.startsWith('/blog/articles/') ||
  pathname === '/privacy-policy' ||
  pathname === '/terms-condition';

export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactScreen = window.matchMedia('(max-width: 767px)').matches;
    const homeRoute = pathname === '/';
    const skipWordSplitting = !homeRoute && isLongformRoute(pathname);

    // Avoid the broad DOM enhancement pass on small screens. The content stays
    // identical, but scrolling does not compete with observers and text rewrites.
    if (compactScreen) {
      root.classList.remove('mo');
      return;
    }

    const scopes = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    const trackedReveals = new Set<HTMLElement>();
    const activeAnimations = new Set<Animation>();

    let motionEnabled = false;
    let started = false;
    let enhancing = false;
    let moTimer: number | undefined;
    let enhanceSettleTimer: number | undefined;
    let init: number | undefined;
    let raf = 0;
    let parallaxElements: HTMLElement[] = [];

    const finishReveal = (el: HTMLElement) => {
      el.classList.add('rv-done');
      el.style.removeProperty('--rv-d');
      el.style.removeProperty('will-change');
      el.querySelectorAll<HTMLElement>('.mo-wi').forEach((word) => {
        word.style.setProperty('will-change', 'auto');
        word.style.removeProperty('--wd');
      });
    };

    const finishTrackedReveals = () => {
      activeAnimations.forEach((animation) => animation.cancel());
      activeAnimations.clear();
      trackedReveals.forEach((el) => {
        el.classList.add('in');
        finishReveal(el);
      });
    };

    const runLightReveal = (el: HTMLElement, delay: number) => {
      const animation = el.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: 820,
          delay,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'both',
        }
      );

      activeAnimations.add(animation);
      animation.finished
        .then(() => {
          activeAnimations.delete(animation);
          animation.cancel();
          finishReveal(el);
        })
        .catch(() => {
          activeAnimations.delete(animation);
        });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!motionEnabled) return;

        let batch = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const el = entry.target as HTMLElement;
          const delay = Math.min(batch++ * 80, 480);
          const revealType = el.dataset.rv;

          if (revealType === 'words') {
            el.style.setProperty('--rv-d', `${delay}ms`);
            const words = Array.from(el.querySelectorAll<HTMLElement>('.mo-wi'));
            const lastWord = words.at(-1);
            if (lastWord) {
              lastWord.addEventListener('transitionend', () => finishReveal(el), { once: true });
            }
            el.classList.add('in');
            if (!lastWord) finishReveal(el);
          } else if (revealType === 'lift') {
            el.classList.add('in');
            runLightReveal(el, delay);
          } else {
            el.style.setProperty('--rv-d', `${delay}ms`);
            const onAnimationEnd = (event: AnimationEvent) => {
              if (event.target !== el) return;
              el.removeEventListener('animationend', onAnimationEnd);
              finishReveal(el);
            };
            el.addEventListener('animationend', onAnimationEnd);
            el.classList.add('in');
          }

          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    const splitWords = (el: HTMLElement) => {
      const words = (el.textContent || '').trim().split(/\s+/);
      if (words.length === 0 || words.length > 18) return false;
      if (el.querySelector('img, svg, button, input, iframe')) return false;

      let idx = 0;
      const wrap = (node: Node) => {
        [...node.childNodes].forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent || '';
            if (!text.trim()) return;
            const frag = document.createDocumentFragment();
            text.split(/(\s+)/).forEach((tok) => {
              if (!tok) return;
              if (/^\s+$/.test(tok)) {
                frag.appendChild(document.createTextNode(' '));
                return;
              }
              const mask = document.createElement('span');
              mask.className = 'mo-w';
              const inner = document.createElement('span');
              inner.className = 'mo-wi';
              inner.textContent = tok;
              inner.style.setProperty('--wd', `${Math.min(idx++, 14) * 45}ms`);
              mask.appendChild(inner);
              frag.appendChild(mask);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
            wrap(child);
          }
        });
      };
      wrap(el);
      return true;
    };

    const enhance = () => {
      if (!motionEnabled) return;
      enhancing = true;

      scopes.forEach((scope) => {
        // Carousels reveal as a single block; their innards are skipped.
        scope.querySelectorAll<HTMLElement>('.owl-carousel').forEach((el) => {
          if (!el.dataset.rv) el.dataset.rv = homeRoute ? 'fade' : 'lift';
        });

        scope.querySelectorAll<HTMLElement>(CANDIDATES).forEach((el) => {
          if (el.dataset.rv || el.dataset.rvSeen) return;
          if (el.closest(SKIP_ZONES)) return;
          const tag = el.tagName;

          if (tag === 'IMG') {
            const style = getComputedStyle(el);
            if (style.position === 'absolute' || style.position === 'fixed') return;
            if (el.getBoundingClientRect().width < 120) return;
            el.dataset.rv = 'img';
            return;
          }

          // Small brand-colored section kickers get the eyebrow treatment.
          if (
            (tag === 'H3' || tag === 'P') &&
            (el.classList.contains('font-medium') || el.className.includes('tracking-widest')) &&
            (el.textContent || '').trim().length <= 32
          ) {
            el.classList.add('mo-eyebrow');
          }

          if (
            !skipWordSplitting &&
            (tag === 'H1' || tag === 'H2') &&
            !el.className.includes('line-clamp') &&
            !el.closest('.blog_desc')
          ) {
            if (splitWords(el)) {
              el.dataset.rv = 'words';
              return;
            }
          }

          // Non-home pages use an opacity/translate reveal without the large
          // blur-filter paint cost. Home keeps its existing CSS choreography.
          el.dataset.rv = homeRoute ? 'fade' : 'lift';
        });
      });

      // Observe everything tagged, including hand-tagged JSX nodes. Re-observe
      // unrevealed ones so a remount never strands them hidden.
      scopes.forEach((scope) => {
        scope.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => {
          if (!homeRoute && el.dataset.rv === 'fade') el.dataset.rv = 'lift';
          trackedReveals.add(el);
          if (el.dataset.rvSeen && el.classList.contains('in')) return;
          el.dataset.rvSeen = '1';
          io.observe(el);
        });
      });

      // Decorative drifters are cached here instead of queried on every scroll.
      scopes.forEach((scope) => {
        scope.querySelectorAll<HTMLElement>('img[src*="ripple"]').forEach((el) => {
          if (!el.dataset.plx) el.dataset.plx = '0.1';
        });
      });
      parallaxElements = scopes.flatMap((scope) =>
        Array.from(scope.querySelectorAll<HTMLElement>('[data-plx]'))
      );

      window.clearTimeout(enhanceSettleTimer);
      enhanceSettleTimer = window.setTimeout(() => {
        enhancing = false;
      }, 0);
    };

    /* ---------- progress bar + parallax (one rAF loop) ---------- */
    const bar = document.querySelector<HTMLElement>('.mo-progress-fill');

    const paint = () => {
      raf = 0;
      if (!motionEnabled) return;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;

      const updates: Array<[HTMLElement, number]> = [];
      parallaxElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
        const offset =
          (rect.top + rect.height / 2 - window.innerHeight / 2) *
          Number.parseFloat(el.dataset.plx || '0');
        updates.push([el, offset]);
      });
      updates.forEach(([el, offset]) => {
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };

    const onScroll = () => {
      if (motionEnabled && !raf) raf = requestAnimationFrame(paint);
    };

    const onLoad = () => {
      if (!started || !motionEnabled) return;
      enhance();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('load', onLoad);

    // Re-enhance content injected later, but observe only owned page regions.
    const mo = new MutationObserver(() => {
      if (enhancing || !started || !motionEnabled) return;
      window.clearTimeout(moTimer);
      moTimer = window.setTimeout(enhance, 120);
    });
    scopes.forEach((scope) => mo.observe(scope, { childList: true, subtree: true }));

    const enableMotion = () => {
      if (motionEnabled || reducedMotionQuery.matches) return;
      motionEnabled = true;
      root.classList.add('mo');
      enhance();
      paint();
    };

    const disableMotion = () => {
      motionEnabled = false;
      root.classList.remove('mo');
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      finishTrackedReveals();
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        disableMotion();
      } else if (started) {
        enableMotion();
      }
    };
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);

    // Kick off in sync with the splash curtain. Non-home pages start on the
    // next task because they never mount the landing-page splash.
    const kickoff = () => {
      if (started) return;
      started = true;
      enableMotion();
    };

    const splashUp =
      document.getElementById('loader-wrapper') &&
      !document.documentElement.classList.contains('splash-out');
    if (splashUp) {
      window.addEventListener('tm:splash-exit', kickoff, { once: true });
      init = window.setTimeout(kickoff, 3500);
    } else {
      init = window.setTimeout(kickoff, 0);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      activeAnimations.forEach((animation) => animation.cancel());
      activeAnimations.clear();
      window.clearTimeout(moTimer);
      window.clearTimeout(enhanceSettleTimer);
      window.clearTimeout(init);
      if (raf) cancelAnimationFrame(raf);
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
      window.removeEventListener('tm:splash-exit', kickoff);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onLoad);
      root.classList.remove('mo');
    };
  }, [pathname]);

  return (
    <div className="mo-progress" aria-hidden="true">
      <div className="mo-progress-fill" />
    </div>
  );
}
