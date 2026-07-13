'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

const INTRO_DURATION = 600;
const EXIT_DURATION = 320;

/**
 * A short brand intro used by the landing page only.
 *
 * This is intentionally not a load-progress indicator: the application is
 * already rendered behind it, so the animation has a predictable duration and
 * never waits on unrelated images or third-party scripts.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<'intro' | 'exit' | 'hidden'>('intro');

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const introDuration = reducedMotion ? 80 : INTRO_DURATION;
    const exitDuration = reducedMotion ? 80 : EXIT_DURATION;

    root.classList.remove('splash-out');
    root.classList.add('splash-active');
    window.dispatchEvent(new Event('tm:splash-start'));

    const exitTimer = window.setTimeout(() => {
      root.classList.remove('splash-active');
      root.classList.add('splash-out');
      setPhase('exit');
      window.dispatchEvent(new Event('tm:splash-exit'));
    }, introDuration);

    const hideTimer = window.setTimeout(() => {
      setPhase('hidden');
    }, introDuration + exitDuration);

    const settleTimer = window.setTimeout(() => {
      root.classList.remove('splash-out');
    }, introDuration + exitDuration + 700);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(settleTimer);
      root.classList.remove('splash-active', 'splash-out');
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      id="loader-wrapper"
      className={styles.overlay}
      data-phase={phase}
      aria-hidden="true"
    >
      <div className={styles.brand}>
        <Image
          src="/images/touchmark-logowhite.svg"
          alt=""
          width={176}
          height={37}
          priority
          className={styles.logo}
        />
        <span className={styles.accent} />
      </div>
    </div>
  );
}
