import EbookForm from "@/components/EbookForm";

interface PageProps {
  searchParams: Promise<{ ebook_content_id?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams.ebook_content_id || "1";

  return (
    <>
      <title>E-Book - 01</title>
      <meta name="description" content="" />
      {id === "1" && (
        <>
          {/* Ebook 1 Styles */}
          {/* Ebook 1 Content */}
    <link rel="touchmark-des-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    

    
    

    
    

    





    <div className="overflow-x-hidden lg:overflow-x-auto">
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    









































































        

                
        <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('/images/ebooks/hero-banner-img-e-book.webp')" }}>
            <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
                <div className="grid grid-cols-12 lg:gap-4">
                    <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                        <a href="https://touchmarkdes.com/index.html">
                            <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home
                                / E-Book
                            </p>
                        </a>
                       
                        <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                           Advancing Aerospace Innovations And Future Directions In The Industry</h1>
                        <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                            Lorem ipsum dolor sit amet kebuyeha consectetur Tristique consectetur sit tellus ut in in                        </p>
                     
                    </div>
                    <div className="col-span-5 lg:block hidden">
                    </div>
                </div>
            </div>
        </section>
                


        
               <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:pt-24 xl:py-24 2xl:py-32">
            <div className="grid grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 col-span-12">
                  <h2 className="text-2xl lg:text-3xl font-primary text-gray-950 mb-4 font-bold">What you can learn</h2>
                  <p className="text-sm font-secondary text-gray-600 mb-4 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. Aliquam malesuada eu magna volutpat amet. Lectus aliquam morbi suspendisse mauris et eget in volutpat tortor. Sit amet risus justo pellentesque diam nisi fringilla fusce purus. Ipsum dictum velit porta elementum enim neque.
                  </p>
                  <p className="text-sm font-secondary text-gray-600 mb-6 leading-relaxed">
                    Our commitment to holistic beauty ensures that every client experiences a transformative journey towards inner and outer radiance."
                  </p>
                  
                  <div className="py-5 lg:py-6 flex justify-start items-center">
                    <img decoding="async" src="assets/front/home/ebook_thumb_1721628330.webp" className="max-w-[200px] shadow-sm border border-gray-100 rounded" alt="Ebook Cover" />
                  </div>

                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                  </ul>

                  <p className="italic text-base font-secondary text-gray-600 border-l-4 border-primary pl-4 py-1 leading-relaxed">
                    “Lorem ipsum dolor sit amet consectetur. Nibh ipsum condimentum ac semper id non. Eget nibh nibh dolor auctor. Turpis sed donec eu tincidunt in.”
                  </p>
                </div>
                <div className="lg:col-span-6 col-span-12 lg:mt-0 mt-8">
                  <EbookForm ebookId="1" />
                </div>
            </div>
        </section></div>
          {/* Ebook 1 Scripts */}
        </>
      )}
      {id === "2" && (
        <>
          {/* Ebook 2 Styles */}
          {/* Ebook 2 Content */}
    <link rel="touchmark-des-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    

    
    

    
    

    





    <div className="overflow-x-hidden lg:overflow-x-auto">
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    









































































        

                
        <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('/images/ebooks/hero-banner-img-e-book.webp')" }}>
            <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
                <div className="grid grid-cols-12 lg:gap-4">
                    <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                        <a href="https://touchmarkdes.com/index.html">
                            <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home
                                / E-Book
                            </p>
                        </a>
                       
                        <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                           Design and Technological Strategies Shaping the Future of UX/UI</h1>
                        <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                            Lorem ipsum dolor sit amet kebuyeha consectetur Tristique consectetur sit tellus ut in in                        </p>
                     
                    </div>
                    <div className="col-span-5 lg:block hidden">
                    </div>
                </div>
            </div>
        </section>
                


         <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:pt-24 xl:py-24 2xl:py-32">
            <div className="grid grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 col-span-12">
                  <div className="py-5 lg:py-6 flex justify-start items-center">
                    <img decoding="async" loading="lazy" src="assets/front/home/ebook_thumb_1721628762.webp" className="max-w-[200px] shadow-sm border border-gray-100 rounded" alt="Ebook Cover" />
                  </div>

                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-6 col-span-12 lg:mt-0 mt-8">
                  <EbookForm ebookId="2" />
                </div>
            </div>
        </section></div>
          {/* Ebook 2 Scripts */}
        </>
      )}
      {id === "3" && (
        <>
          {/* Ebook 3 Styles */}
          {/* Ebook 3 Content */}
    <link rel="touchmark-des-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    

    
    

    
    

    





    <div className="overflow-x-hidden lg:overflow-x-auto">
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    









































































        

                
        <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('/images/ebooks/hero-banner-img-e-book.webp')" }}>
            <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
                <div className="grid grid-cols-12 lg:gap-4">
                    <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                        <a href="https://touchmarkdes.com/index.html">
                            <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home
                                / E-Book
                            </p>
                        </a>
                       
                        <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                           Unleashing Business Potential through Open-Source Collaboration and Development</h1>
                        <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                            Lorem ipsum dolor sit amet kebuyeha consectetur Tristique consectetur sit tellus ut in in                        </p>
                     
                    </div>
                    <div className="col-span-5 lg:block hidden">
                    </div>
                </div>
            </div>
        </section>
                


        
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:pt-24 xl:py-24 2xl:py-32">
            <div className="grid grid-cols-12 gap-4">
                <div className="lg:col-span-5 col-span-12">
                       <div className="py-5 lg:py-6 flex justify-start items-center">
                        <img decoding="async" loading="lazy" src="assets/front/home/ebook_thumb_1721628861.webp" className="max-w-[200px] shadow-sm border border-gray-100 rounded" alt="Ebook Cover" />
                    </div>


                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img decoding="async" loading="lazy" src="/images/ebooks/tick.svg" className="w-5 h-5 flex-shrink-0 mt-0.5" alt="tick" />
                      <span className="text-sm font-secondary text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Ut ultrices ac id arcu quis. Vitae nibh consequat tempor penatibus et pharetra condimentum. Et laoreet ullamcorpe.
                      </span>
                    </li>
                  </ul>

                </div>
                <div className="lg:col-span-6 col-span-12 lg:mt-0 mt-8">
                  <EbookForm ebookId="3" />
                </div>
            </div>
        </section></div>
          {/* Ebook 3 Scripts */}
        </>
      )}
    </>
  );
}
