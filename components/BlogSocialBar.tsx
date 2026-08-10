/**
 * Social links plus the search box that heads both blog listings.
 *
 * `showSearch` is off for tag listings, matching the original hardcoded pages —
 * SubsidiaryUX only wires the filter up on /blog.
 */
export default function BlogSocialBar({
  heading,
  showSearch = false,
}: {
  heading: string;
  showSearch?: boolean;
}) {
  return (
    <div className="block lg:flex justify-between items-end">
      <div className="lg:space-y-6">
        <div className="flex justify-start items-center space-x-2">
          <a href="https://in.linkedin.com/company/touchmarkdes" className="group" target="_blank" rel="noopener noreferrer" aria-label="Touchmark on LinkedIn">
            <img decoding="async" src="/images/home/icons/linkedin-black-fill.svg" alt="" className="h-8 group-hover:hidden" />
            <img decoding="async" loading="lazy" src="/images/home/icons/linkedin-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
          </a>
          <a href="https://www.facebook.com/touchmarkdes/" className="group" target="_blank" rel="noopener noreferrer" aria-label="Touchmark on Facebook">
            <img decoding="async" loading="lazy" src="/images/home/icons/facebook-black-fill.svg" alt="" className="h-8 group-hover:hidden" />
            <img decoding="async" loading="lazy" src="/images/home/icons/facebook-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
          </a>
          <a href="https://www.instagram.com/touchmarkdes/" className="group" target="_blank" rel="noopener noreferrer" aria-label="Touchmark on Instagram">
            <img decoding="async" loading="lazy" src="/images/home/icons/insta-black-fill.svg" alt="" className="h-8 group-hover:hidden" />
            <img decoding="async" loading="lazy" src="/images/home/icons/insta-blue-fill.svg" alt="" className="h-8 hidden group-hover:block" />
          </a>
        </div>
        <h3 className="2xl:text-lg xl:text-base lg:text-base text-sm font-inter font-bold mt-5">{heading}</h3>
      </div>
      {showSearch && (
        <div>
          <div className="flex justify-center items-center relative">
            <div className="search-icon bg-transparent px-4 py-3.5 relative z-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="#194F97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            {/* SubsidiaryUX rewrites this form to filter the grid client-side on /blog. */}
            <form action="https://touchmarkdes.com/search.php" method="get" className="flex">
              <input className="search-input text-sm text-black h-12" type="search" name="query" autoComplete="off" spellCheck="false" aria-live="polite" placeholder="Search..." />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
