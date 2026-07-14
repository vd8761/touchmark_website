import styles from './HomeAboutSection.module.css';

export default function HomeAboutSection() {
  return (
    <section className={styles.section} aria-labelledby="home-about-title">
      <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto">
        <div className={styles.grid}>
          <div className={styles.copyPanel}>
            <div className={styles.copy}>
              <p className="text-xs lg:text-sm text-[#194F97] font-medium tracking-[0.12em] uppercase">
                About us
              </p>
              <h2
                id="home-about-title"
                className="mt-2.5 lg:mt-3 text-3xl md:text-3xl lg:text-4xl xl:text-[2.65rem] font-gellix"
              >
                Empowering businesses through collaborative digital excellence
              </h2>
              <p className="mt-4 lg:mt-5 font-inter text-sm lg:text-[15px] leading-7 text-slate-700">
                Touchmark is a forward-thinking digital partner delivering IT consulting,
                digital marketing, and software development. We dig into complex business
                challenges, collaborate closely, and create practical solutions that produce
                meaningful outcomes.
              </p>
              <a
                href="/about-us"
                className="relative overflow-hidden border border-primary px-3 py-2 inline-flex justify-center items-center group mt-5 lg:mt-7"
              >
                <span className="relative z-10 text-primary group-hover:text-white transition-colors duration-300 text-sm uppercase">
                  Learn More
                </span>
                <svg
                  fill="none"
                  height="24"
                  className="relative z-10 ml-2 text-primary -rotate-90 group-hover:text-white group-hover:rotate-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  viewBox="0 0 24 24"
                  width="24"
                  aria-hidden="true"
                >
                  <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor" />
                </svg>
                <span className="absolute inset-0 bg-primary transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0" />
              </a>
            </div>
          </div>

          <div className={styles.statsPanel}>
            <span className={styles.swirl} aria-hidden="true" />
            <picture className={styles.picture}>
              <img
                src="/images/home/about-us-15+year-image.webp"
                width="697"
                height="344"
                loading="lazy"
                decoding="async"
                alt="14 years, more than 300 projects, and a team of over 50 people"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
