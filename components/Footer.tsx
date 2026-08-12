import Link from 'next/link';

const quickLinks = [
  { href: '/about-us', label: 'Who we are' },
  { href: '/technology-consulting-service', label: 'What we do' },
  { href: '/case-study?id=1', label: 'Case Studies' },
  { href: '/blog', label: 'Blogs' },
  { href: '/#ebook', label: 'E-Books' },
  { href: '/client-partner', label: 'Clients and Partners' },
  { href: '/contact-us', label: 'Contact us' },
];

const serviceLinks = [
  { href: '/technology-consulting-service', label: 'Technology Consulting' },
  { href: '/cloud', label: 'Cloud' },
  { href: '/sales-commerce-service', label: 'Sales & Commerce' },
  { href: '/metaverse-service', label: 'Metaverse' },
  { href: '/data-analytics-service', label: 'Data & Analytics' },
  { href: '/ai-ml-service', label: 'AI & ML' },
  { href: '/robotic-process-automation-service', label: 'Robotic Process Automation' },
];

const industryLinks = [
  { href: '/aerospace-industry', label: 'Aerospace & Defence' },
  { href: '/bfsi-industry', label: 'BFSI' },
  { href: '/esg-industry', label: 'Environmental, social, & governance' },
  { href: '/fmcg-industry', label: 'Fast-Moving Consumer Goods' },
  { href: '/healthcare-industry', label: 'Healthcare' },
  { href: '/mining-industry', label: 'Mining' },
  { href: '/green-tech-industry', label: 'Geospatial Tech' },
  { href: '/media-entertainment-industry', label: 'Media and Entertainment' },
  { href: '/real-estate-industry', label: 'Real Estate' },
  { href: '/travel-tourism-industry', label: 'Travel and Tourism' },
];

const socials = [
  { href: 'https://in.linkedin.com/company/touchmarkdes', icon: '/images/home/icons/linkedin-icon.svg', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/touchmarkdes/', icon: '/images/home/icons/instagram-icon.svg', label: 'Instagram' },
  { href: 'https://www.facebook.com/touchmarkdes/', icon: '/images/home/icons/fb-icon.svg', label: 'Facebook' },
];

function FooterLinkColumn({
  title,
  links,
  listClassName = 'mt-3 space-y-2 text-sm text-white/70',
}: {
  title: string;
  links: { href: string; label: string }[];
  listClassName?: string;
}) {
  return (
    <div>
      <p className="font-gellix text-sm font-semibold text-white xl:text-base">{title}</p>
      <ul className={listClassName}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="inline-block transition-all duration-300 ease-out hover:translate-x-1.5 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white font-inter">
      {/* Hairline accent that separates the footer from the page above it */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">

        {/* Brand + Contact band */}
        <div className="grid grid-cols-1 gap-8 pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-12">

          {/* Brand block */}
          <div className="lg:col-span-7">
            <Link href="/" aria-label="Touchmark Descience home" className="inline-block">
              <img loading="lazy" decoding="async" src="/images/touchmark-logowhite.svg" className="h-8 w-auto" alt="Touchmark" />
            </Link>
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-white/70 lg:text-sm">
              Innovative Solutions Connecting Brands and Customers. We provide full-service IT consulting, digital marketing, and software development — using automation and rich media to close the gap between brands and consumers.
            </p>
          </div>

          {/* Contact block */}
          <div className="lg:col-span-5 lg:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Get in touch</p>
            <div className="mt-3 space-y-2.5">
              <a href="tel:+914440652648" className="group flex items-center gap-2.5 text-sm font-semibold text-white/90 transition-colors hover:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-white/20">
                  <img loading="lazy" decoding="async" src="/images/home/icons/phone-icon.svg" alt="" className="h-3.5 w-3.5" />
                </span>
                +91 44 4065 2648
              </a>
              <a href="mailto:info@touchmarkdes.com" className="group flex items-center gap-2.5 text-sm font-semibold text-white/90 transition-colors hover:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-white/20">
                  <img loading="lazy" decoding="async" src="/images/home/icons/mail-icon.svg" alt="" className="h-3.5 w-3.5" />
                </span>
                info@touchmarkdes.com
              </a>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Follow us</p>
              <div className="mt-2 flex items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={social.icon}
                      className="h-8 w-8 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                      alt={social.label}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-3 lg:gap-10 lg:pt-9">
          <FooterLinkColumn title="Quick Links" links={quickLinks} />
          <FooterLinkColumn title="Services" links={serviceLinks} />
          <div className="col-span-2 md:col-span-1">
            <FooterLinkColumn
              title="Industries"
              links={industryLinks}
              listClassName="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/70 md:grid-cols-1"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 py-5 text-xs text-white/60 sm:flex-row">
          <p>&copy; 2010-2026 Touchmark Descience Pvt. Ltd</p>
          <div className="flex items-center gap-4">
            <Link href="/terms-condition" className="transition-colors hover:text-white">Terms of Use</Link>
            <span className="text-white/25">|</span>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
