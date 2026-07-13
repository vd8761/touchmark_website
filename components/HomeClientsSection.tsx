import Image from "next/image";
import type { CSSProperties } from "react";

import styles from "./HomeClientsSection.module.css";

type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  desktopHeight: number;
};

const CLIENT_LOGOS: readonly ClientLogo[] = [
  {
    name: "Coca-Cola",
    src: "/images/home/colcola-icons.svg",
    width: 207,
    height: 65,
    desktopHeight: 40,
  },
  {
    name: "SIDBI",
    src: "/images/home/sidbi-icons.svg",
    width: 199,
    height: 73,
    desktopHeight: 50,
  },
  {
    name: "Rupinis",
    src: "/images/home/rupinis-icons.svg",
    width: 188,
    height: 56,
    desktopHeight: 40,
  },
  {
    name: "Expleo",
    src: "/images/home/expleo-icon.svg",
    width: 283,
    height: 55,
    desktopHeight: 45,
  },
  {
    name: "DVI",
    src: "/images/home/dvi-icons.svg",
    width: 143,
    height: 130,
    desktopHeight: 80,
  },
  {
    name: "RBL Bank",
    src: "/images/home/rbl-icons.svg",
    width: 209,
    height: 61,
    desktopHeight: 50,
  },
  {
    name: "Hayakawa",
    src: "/images/home/hayakawa-icons.svg",
    width: 188,
    height: 59,
    desktopHeight: 50,
  },
  {
    name: "TAG",
    src: "/images/home/tag-icons.svg",
    width: 196,
    height: 97,
    desktopHeight: 50,
  },
] as const;

export default function HomeClientsSection() {
  return (
    <section className={styles.section} aria-labelledby="home-clients-title">
      <div className={styles.layout}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Our Clients</p>
          <h2 id="home-clients-title" className={`font-gellix ${styles.title}`}>
            Elevate your experience with us
          </h2>
        </div>

        <p className={`font-inter ${styles.copy}`}>
          Your Team to Realize Success; in life and at work. We believe in the
          strength of partnership and are committed to equipping you with the
          resources you need to realize your full potential. We are here to
          motivate and inspire people like you to achieve extraordinary results
          in your professional and personal lives.
        </p>

        <div className={styles.logoGrid}>
          {CLIENT_LOGOS.map((logo) => (
            <div className={styles.logoCell} key={logo.src}>
              <Image
                alt={`${logo.name} logo`}
                className={styles.logo}
                decoding="async"
                height={logo.height}
                loading="lazy"
                sizes="(min-width: 1024px) 20vw, 40vw"
                src={logo.src}
                style={
                  {
                    "--client-logo-height": `${logo.desktopHeight}px`,
                  } as CSSProperties
                }
                unoptimized
                width={logo.width}
              />
            </div>
          ))}
        </div>

        <a
          className={styles.viewAll}
          href="/client-partner#client-partner"
        >
          <span>View all</span>
          <svg
            aria-hidden="true"
            className={styles.arrow}
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
