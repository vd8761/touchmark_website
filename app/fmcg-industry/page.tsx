import RelatedBlogsSection from '@/components/RelatedBlogsSection';
import { listBlogPosts, tryCms, type BlogPost } from '@/services/cms';


export default async function Page() {

  const { data: allPosts } = await tryCms(() => listBlogPosts(), [] as BlogPost[]);
  const posts = [...allPosts].sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <>
      <title>Fast-Moving Consumer Goods</title>
      <meta name="description" content="" />

      <div className="overflow-x-hidden lg:overflow-x-auto">
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    









































































        


        
                <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('assets/front/home/fm_banner_1721883690.webp')" }}>
            <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
                <div className="grid grid-cols-12 lg:gap-4">
                    <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                        <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home / Industries/ Fast-Moving Consumer Goods                        </p>
                        <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                        Discover the dynamic world of consumer products</h1>
                    </div>
                    <div className="col-span-5 lg:block hidden">
                    </div>
                </div>
            </div>
        </section>
         
        


        
                <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32 relative">
            <div className="grid grid-cols-12 lg:gap-4">
                <div className="lg:col-span-9 col-span-12">
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Overview</h3>
                    <h2 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Delivering excellence in FMCG with a commitment to quality and customer satisfaction</h2>
                </div>
                <div className="lg:col-span-3 lg:block hidden">
                </div>
            </div>
            <div className="grid grid-cols-12 mt-10">
                <div className="2xl:col-span-5 lg:col-span-5 col-span-12 flex justify-center items-center">
                    <img decoding="async" src="assets/front/home/fm_overview_1721883748.webp" className="" />
                </div>
                <div className="2xl:col-span-1 xl:col-span-1 lg:block hidden"></div>
                <div className="lg:col-span-6 col-span-12 flex justify-center items-center lg:mt-0 mt-5">
                    <div>
                        <ul className="2xl:text-base xl:text-sm lg:text-sm text-xs space-y-3 lg:space-y-2.5 xl:space-y-2.5 2xl:space-y-5 font-inter">
                            <ul className="2xl:text-base xl:text-sm lg:text-sm text-xs space-y-3 lg:space-y-2.5 xl:space-y-2.5 2xl:space-y-5 font-inter" style={{ "boxSizing": "border-box", "listStyle": "none", "margin": "0px", "padding": "0px", "fontSize": "medium", "lineHeight": "1.5rem", "fontFamily": "Inter", "border": "0px solid #e5e7eb" }}>
<li style={{ "boxSizing": "border-box", "border": "0px solid #e5e7eb", "fontSize": "16px" }}>Our program arrangements are planned to move forward supply chain straightforwardness, customer engagement, and operational effectiveness in the Fast-Moving Shopper Products industry. In order to encourage real-time stock administration, successful conveyance strategies, and effective coordinations, we construct frameworks that are effectively connected with current foundations. This ensures that the FMCG companies we work with can rapidly fulfill client demands and proficiently handle regular variations.</li>
<li style={{ "boxSizing": "border-box", "border": "0px solid #e5e7eb", "marginTop": "calc(1.25rem * calc(1 - var(--tw-space-y-reverse)))", "marginBottom": "calc(1.25rem * var(--tw-space-y-reverse))", "fontSize": "16px" }}>With the offer assistance of our analytics apparatuses, FMCG businesses can way better get its buyer acquiring propensities and make items and promoting campaigns that are custom fitted to the requests of the advertiser. Businesses can optimize their item offerings and limited time procedures to maximize advertised entrance and client maintenance by utilizing data-driven decision-making.</li>
<li style={{ "boxSizing": "border-box", "border": "0px solid #e5e7eb", "marginTop": "calc(1.25rem * calc(1 - var(--tw-space-y-reverse)))", "marginBottom": "calc(1.25rem * var(--tw-space-y-reverse))", "fontSize": "16px" }}>Through advanced engagement instruments like portable applications and customized web entries, we moreover concentrate on moving forward client encounters. These stages permit businesses to communicate straightforwardly with clients, which advances brand dependability and makes a difference to get quick input for future item developments.</li>
</ul>                        </ul>
                        <a href="#is-p" className="relative overflow-hidden border border-[#194F97] px-3 py-2 inline-flex justify-center items-center group mt-3 md:mt-3 lg:mt-8 xl:mt-8 2xl:mt-10">
                            <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors duration-300 text-sm uppercase">Learn
                                More</span>
                            <svg fill="none" height="24" className="relative z-10 ml-2 text-[#194F97] -rotate-90 group-hover:text-white transition-colors" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                            </svg>
                            <span className="absolute inset-0 bg-[#194F97] transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
                


        
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
            <div className="grid grid-cols-12 lg:gap-4">
                <div className="lg:col-span-9 col-span-12">
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Utilize data-driven insights to refine products and marketing</h3>
                    <h2 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Enhance supply chain visibility and efficiency, manage inventory in real-time, and streamline logistics</h2>
                </div>
                <div className="lg:col-span-3 lg:block hidden">
                </div>
            </div>
            <div className="mt-10">
            <div className="owl-carousel owl-theme" id="is-p">
                    
                                        <div className="flex h-full">
                        <div className="group flex flex-col justify-between h-full">
                   
                            <div className="bg-[#D3ECFF] bg-opacity-30 pt-5 pl-5 text-black relative overflow-hidden group-hover:text-white group-hover:bg-[#194F97] h-full flex flex-col">
                               
                                <h1 className="pr-5 text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-gellix">
                                    Supply Chain</h1>
                                <p className="text-transparent group-hover:text-white pr-5 text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[14px] mt-[10px] lg:mt-[10px] xl:mt-[10px] 2xl:mt-[20px] font-inter font-regular flex-grow">
                                    Boost logistics integration, delivery tactics, and real-time inventory management for effective operations and prompt client response while guaranteeing seasonal variation adaptability.                                </p>
                                <div className="flex justify-end items-end mt-auto">
                                    <div className="group mt-[12px] xl:mt-[0px] 2xl:mt-[20px] xl:h-36 2xl:h-auto">
                                        
                                        <div className="block group-hover:hidden">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_1721883949.webp" />
                                        </div>

                                        
                                        <div className="hidden group-hover:block">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_hover_1721883949.webp" />
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                          
                        </div>
                    </div>
                                        <div className="flex h-full">
                        <div className="group flex flex-col justify-between h-full">
                   
                            <div className="bg-[#D3ECFF] bg-opacity-30 pt-5 pl-5 text-black relative overflow-hidden group-hover:text-white group-hover:bg-[#194F97] h-full flex flex-col">
                               
                                <h1 className="pr-5 text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-gellix">
                                    Consumer analytics</h1>
                                <p className="text-transparent group-hover:text-white pr-5 text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[14px] mt-[10px] lg:mt-[10px] xl:mt-[10px] 2xl:mt-[20px] font-inter font-regular flex-grow">
                                    Make data-driven decisions by using analytics tools to study consumer purchasing patterns. This will allow you to create customized product offerings and marketing campaigns that will improve market penetration and customer retention.                                </p>
                                <div className="flex justify-end items-end mt-auto">
                                    <div className="group mt-[12px] xl:mt-[0px] 2xl:mt-[20px] xl:h-36 2xl:h-auto">
                                        
                                        <div className="block group-hover:hidden">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_1721883974.webp" />
                                        </div>

                                        
                                        <div className="hidden group-hover:block">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_hover_1721883974.webp" />
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                          
                        </div>
                    </div>
                                        <div className="flex h-full">
                        <div className="group flex flex-col justify-between h-full">
                   
                            <div className="bg-[#D3ECFF] bg-opacity-30 pt-5 pl-5 text-black relative overflow-hidden group-hover:text-white group-hover:bg-[#194F97] h-full flex flex-col">
                               
                                <h1 className="pr-5 text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-gellix">
                                    Customer Engagement:</h1>
                                <p className="text-transparent group-hover:text-white pr-5 text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[14px] mt-[10px] lg:mt-[10px] xl:mt-[10px] 2xl:mt-[20px] font-inter font-regular flex-grow">
                                    Enhance brand loyalty and customer experiences by providing direct feedback for upcoming product improvements and prompt issue resolution through mobile apps and personalized online portals.                                </p>
                                <div className="flex justify-end items-end mt-auto">
                                    <div className="group mt-[12px] xl:mt-[0px] 2xl:mt-[20px] xl:h-36 2xl:h-auto">
                                        
                                        <div className="block group-hover:hidden">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_1721883995.webp" />
                                        </div>

                                        
                                        <div className="hidden group-hover:block">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_hover_1721883995.webp" />
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                          
                        </div>
                    </div>
                                        <div className="flex h-full">
                        <div className="group flex flex-col justify-between h-full">
                   
                            <div className="bg-[#D3ECFF] bg-opacity-30 pt-5 pl-5 text-black relative overflow-hidden group-hover:text-white group-hover:bg-[#194F97] h-full flex flex-col">
                               
                                <h1 className="pr-5 text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-gellix">
                                    Sustainability Practices:</h1>
                                <p className="text-transparent group-hover:text-white pr-5 text-[14px] lg:text-[12px] xl:text-[12px] 2xl:text-[14px] mt-[10px] lg:mt-[10px] xl:mt-[10px] 2xl:mt-[20px] font-inter font-regular flex-grow">
                                    To support industry sustainability goals and profitability, optimize resource utilization and minimize waste through precise demand forecasts and effective supply chain management.                                </p>
                                <div className="flex justify-end items-end mt-auto">
                                    <div className="group mt-[12px] xl:mt-[0px] 2xl:mt-[20px] xl:h-36 2xl:h-auto">
                                        
                                        <div className="block group-hover:hidden">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_1721884025.webp" />
                                        </div>

                                        
                                        <div className="hidden group-hover:block">
                                            <img decoding="async" loading="lazy" src="assets/front/home/fm_service_hover_1721884025.webp" />
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                          
                        </div>
                    </div>
                                        
                </div>
            </div>
        </section>
        

 
 <RelatedBlogsSection posts={posts} />
    </div>

























      

    </>
  );
}
