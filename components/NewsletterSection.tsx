/**
 * "Never miss a story" subscribe block that sits at the foot of every blog article.
 *
 * Extracted verbatim from the hardcoded article pages so the CMS-driven
 * `app/blog/articles/[slug]` route keeps the same design. The multi-step behaviour
 * (email → name → success) is driven by the legacy scripts mounted in the root
 * layout, which key off these element ids — do not rename them.
 */
export default function NewsletterSection() {
  return (
    <section className="bg-[#F1FBFF] mt-7 lg:mt-12 xl:mt-12 2xl:mt-16 ">
      <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-7 lg:py-12 xl:py-12 2xl:py-16 text-center">
        <h1 className="font-gellix text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Never miss a story</h1>
        <h3 className="mt-5 font-inter 2xl:text-sm xl:text-sm lg:text-sm md:text-sm text-sm">
          Stay updated about Touchmark news as it happens</h3>
        <div className="grid grid-cols-12 mt-5">
          <div className="lg:col-span-4 lg:block hidden"></div>
          <div className="lg:col-span-4 col-span-12">
            <div className="relative flex justify-start items-end">
              <div id="formContainer" className="relative max-w-md mx-auto mt-10">
                <form id="subscribeFormed" method="post" className="space-y-4">

                  <div id="emailStep1" className="relative">
                    <input type="email" id="subscribe_email" name="subscribe_email" className="bg-white h-14 w-full px-4 focus:outline-none placeholder:black" placeholder="Enter Your Email" required={true} style={{ "paddingRight": "180px" }} />
                    <button type="button" id="nextButton" className="absolute top-2 right-2 bg-[#194F97] text-white px-3 py-2 inline-flex items-center group">
                      <span className="relative z-10 text-sm uppercase">Subscribe</span>
                      <svg fill="none" height="24" className="relative z-10 ml-2 -rotate-90 text-white transition-colors" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                      </svg>
                      <span className="absolute inset-0 transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                    </button>
                  </div>

                  <div id="nameStep1" className="hidden">
                    <div className="relative flex items-center">
                      <input type="text" id="subscribe_name" name="subscribe_name" className="bg-white h-14 w-full px-4  focus:outline-none placeholder-black" placeholder="Enter Your Name" required={true} style={{ "paddingRight": "180px" }} />
                      <button type="submit" id="subscribeButton" className="absolute top-2 right-2 flex items-center justify-center bg-[#194F97] text-white px-3 py-2 inline-flex group">
                        <span className="relative z-10 text-sm uppercase">Confirm</span>
                        <svg fill="none" height="24" className="relative z-10 ml-2 -rotate-90 text-white transition-colors" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                        </svg>
                        <span className="absolute inset-0 transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                      </button>
                    </div>
                  </div>
                </form>

                <div id="successAlert" className="text-dark mx-auto hidden" style={{ "width": "100%" }}>
                  <div style={{ "display": "flex" }}>
                    <img decoding="async" loading="lazy" src="/assets/front/home/correct.webp" alt="" style={{ "width": "64px", "height": "64px", "borderRadius": "50%", "marginRight": "24px", "marginTop": "8px" }} />
                    <span>
                      <h1 style={{ "fontSize": "32px" }} className="font-gellix">Thank you!</h1>
                      <p className="text-dark/80" style={{ "fontSize": "16px" }}>Subscribed Successfully</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 lg:block hidden"></div>
        </div>
      </div>
    </section>
  );
}
