
import { notFound } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams.id || "1";
  if (!['1', '2', '3'].includes(id)) notFound();

  return (
    <>
      <title>Rupini’s Case Study</title>
      <meta name="description" content="" />
      {id === "1" && (
        <>
          {/* Case Study 1 Styles */}
          {/* Case Study 1 Content */}
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    

    
    

    





    <div className="overflow-x-hidden lg:overflow-x-auto">
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    









































































    

        
    <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('assets/front/home/case_banner_1722575034.webp')" }}>
    <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
        <div className="grid grid-cols-12 lg:gap-4">
            <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home / Case study/ Rupinis                </p>
                <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                Rupini's</h1>
                <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                    Only a structured approach can help to build a system, placing proper system will increase the productivity, this energy will convert into proven results</p>
            </div>
            <div className="col-span-5 lg:block hidden">
            </div>
        </div>
    </div>
    </section>  
        

        
    <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12">
            <div className="lg:col-span-6 col-span-12">
                <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold">Client Overview</h1>
                <ul className="space-y-5 mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 2xl:text-base xl:text-sm lg:text-sm text-xs font-inter">
                   <ul className="space-y-5 mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 2xl:text-base xl:text-sm lg:text-sm text-xs font-inter">
<li>Established on October 2nd, 1994, Rupini’s began as a sole proprietorship and later evolved into a private limited company in 1997. With a rich history spanning over 25 years, Rupini’s has been dedicated to offering an extensive array of bridal and beauty services.</li>
<li>At the heart of Rupini’s ethos lies holistic beauty care, a philosophy that encompasses the comprehensive grooming of individuals, addressing both their physical and mental well-being. As a pioneer and trendsetter among Indian beauty salons in Singapore, Rupini’s sets itself apart by prioritizing the use of herbal and fruit-based products in a serene and rejuvenating environment</li>
<li>Our commitment to holistic beauty ensures that every client experiences a transformative journey towards inner and outer radiance."</li>
</ul>                </ul>
                <a href="https://touchmarkdes.com/#">
                    <div className="relative overflow-hidden border border-[#194F97] px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                        <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors duration-300 text-sm uppercase">
                            Go to website</span>
                        <svg fill="none" height="24" className="relative z-10 ml-2 text-[#194F97] -rotate-90 group-hover:text-white transition-colors" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                        </svg>
                        <span className="absolute inset-0 bg-[#194F97] transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                    </div>
                </a>
            </div>
            <div className="lg:col-span-1 lg:block hidden">
            </div>
            <div className="lg:col-span-5 col-span-12 lg:mt-0 mt-5 h-full">
                <img decoding="async" src="assets/front/home/case_overview_1722578366.webp" />
            </div>
        </div>
    </section>
        

        
    <section className="pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="bg-[#FEF5FF] px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">

            <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto">

                <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto grid grid-cols-12 gap-4 font-inter 2xl:ml-10 xl:ml-5">
                    <div className="lg:col-span-5 col-span-12">
                        <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Problem</h2>
                        <div className="mt-10">
                        <ul className="space-y-5 list-disc ml-5">
<li>Chain of Saloon launched in 1994 in Singapore.</li>
<li>Having 30,000 customers across the island, the only Indian brand which upholds customer loyalty with the presence of more than 28 years in the beauty and wellness industry.</li>
<li>Faced a lot of issues in handling customer relationships, Accounts, Bookings, packages etc.</li>
<li>End to end business operations were handled manually.</li>
</ul>                        </div>
                    </div>
                    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
                    <div className="lg:col-span-5 col-span-12 lg:mt-0 mt-10">
                        <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Solution                        </h2>
                        <div className="mt-10">
                        <ul className="space-y-5 list-disc ml-5">
<li>We build solutions merging their CRM, POS, Inventory, Staff management system, Appointment booking system, Purchase, Supplier management in a single window application.</li>
</ul>                        </div>
                    </div>
                    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
                </div>

            </div>

        </div>
    </section>
        


    
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12">
            <div className="lg:col-span-6 col-span-12 space-y-6">
                <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold"> Value Addition</h1>
            </div>
            <div className="lg:col-span-6 col-span-12"></div>
        </div>
       
            
           <div className="grid grid-cols-12 lg:gap-12 gap-4 mt-10 font-inter text-base">
<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">01</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">POS, Inventory, Resource management, Appointments, Stock movement, Membership, CRM, Ecommerce – All these applications were deployed in a different environment and developed using different technologies.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">04</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">Around 30,000 customers data with their behaviours were monitored now, based on the available data, social media campaigns and ads campaign were launched.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">02</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">We did a complete study of their USB and business process, based on which we had developed an extensive plan to merge all the solutions into a single window system using API’s, Data migration.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">05</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">Increase in sales, 12% Pilferage loss was controlled, Increase in customer appointment bookings.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">03</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">We were working on the entire solution for 2 years, out of which 12 months of dedication in developing the solution.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">06</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">Orders were on track; Supplier payments were tracked properly.</p>
</div>
</div>
</div>       
    </section>

    




    
    <section>
        <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto pt-14 lg:pt-24 xl:pt-24 2xl:pt-32 bg-no-repeat">
            
             <img decoding="async" loading="lazy" src="assets/front/home/case_value_1722589911.webp" />
        </div>
    </section>
        




    
    <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">
    <div className="relative">
        <div className="grid grid-cols-12 gap-4 lg:gap-0">
            <div className="lg:col-span-4 col-span-12">
                <div>
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Projects
                    </h3>
                    <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Check out Our Case Studies</h1>
                </div>
            </div>
            <div className="col-span-9 lg:block hidden"></div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-5 lg:mt-10">
                    <div className="lg:col-span-4 col-span-12">
                <a href="/case-study?id=2" className="relative overflow-hidden group block cursor-pointer">
                    <img decoding="async" loading="lazy" src="assets/front/home/tc_project_1722505900.webp" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
                    <div className="absolute top-0 right-0">
                        <div className="inline-flex justify-start items-center space-x-3 p-5">
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">SCHOOL</h3>
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">ACADAMIC</h3>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-end items-end">
                        <div className="w-full bg-gradient-to-t from-[#9152a8b6] to-transparent p-5 transition-opacity duration-300 group-hover:from-[#9152A8] group-hover:to-transparent">
                            <p className="2xl:text-base xl:text-base lg:text-xs text-base text-white font-inter">
                            School Management System</p>
                            <div className="flex justify-start items-end">
                                <h1 className="text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2">
                                A Comprehensive School Management System                                </h1>
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                        <div className="lg:col-span-4 col-span-12">
                <a href="/case-study?id=3" className="relative overflow-hidden group block cursor-pointer">
                    <img decoding="async" loading="lazy" src="assets/front/home/tc_project_1722505935.webp" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
                    <div className="absolute top-0 right-0">
                        <div className="inline-flex justify-start items-center space-x-3 p-5">
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">BANKING</h3>
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">FINANCE</h3>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-end items-end">
                        <div className="w-full bg-gradient-to-t from-[#9152a8b6] to-transparent p-5 transition-opacity duration-300 group-hover:from-[#9152A8] group-hover:to-transparent">
                            <p className="2xl:text-base xl:text-base lg:text-xs text-base text-white font-inter">
                            SIDBI</p>
                            <div className="flex justify-start items-end">
                                <h1 className="text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2">
                                SIDBI's Digital Transformation: Boosting User Engagement, Operational Efficiency, and Customer Satisfaction                                </h1>
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                    </div>
        
    </div>
</section>
    </div>






















          {/* Case Study 1 Scripts */}
        </>
      )}
      {id === "2" && (
        <>
          {/* Case Study 2 Styles */}
          {/* Case Study 2 Content */}
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    

    
    

    





    <div className="overflow-x-hidden lg:overflow-x-auto">
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    









































































    

        
    <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('assets/front/home/Olympiad%20case%20study%20banner.webp')" }}>
    <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
        <div className="grid grid-cols-12 lg:gap-4">
            <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home / Case study/ School Management System                </p>
                <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                School Management System</h1>
                <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                    This school management system designed to streamline administrative tasks by maintaining student details, grades, fees, and teacher information.</p>
            </div>
            <div className="col-span-5 lg:block hidden">
            </div>
        </div>
    </div>
    </section>  
        

        
    <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12">
            <div className="lg:col-span-6 col-span-12">
                <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold">Client Overview</h1>
                <ul className="space-y-5 mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 2xl:text-base xl:text-sm lg:text-sm text-xs font-inter">
                   <ul>
<li>
<p>&nbsp;</p>
<ul>
<li>School Management System integrates all the needs related to school management into one platform: student records, fee management, and academic performance. The integration ensures ease of administration, minimizes errors, and presents no room for losing any critical information.</li>
</ul>
</li>
<li>
<p>&nbsp;</p>
<ul>
<li>The system embeds tools for effective communication among teachers, students, and parents. By increasing interaction and making timely updates possible, School Management System lifts levels of engagement and collaboration within the school environment.</li>
</ul>
</li>
</ul>                </ul>
                <a href="https://touchmarkdes.com/#">
                    <div className="relative overflow-hidden border border-[#194F97] px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                        <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors duration-300 text-sm uppercase">
                            Go to website</span>
                        <svg fill="none" height="24" className="relative z-10 ml-2 text-[#194F97] -rotate-90 group-hover:text-white transition-colors" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                        </svg>
                        <span className="absolute inset-0 bg-[#194F97] transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                    </div>
                </a>
            </div>
            <div className="lg:col-span-1 lg:block hidden">
            </div>
            <div className="lg:col-span-5 col-span-12 lg:mt-0 mt-5 h-full">
                    <img decoding="async" loading="lazy" src="/assets/front/home/School%20management%20software%20inner%20image%20for%20casestudy%20(1)%20(1)%20(1).webp" />
            </div>
        </div>
    </section>
        

        
    <section className="pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="bg-[#FEF5FF] px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">

            <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto">

                <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto grid grid-cols-12 gap-4 font-inter 2xl:ml-10 xl:ml-5">
                    <div className="lg:col-span-5 col-span-12">
                        <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Problem</h2>
                        <div className="mt-10">
                        <p>The School Management System was finding it very cumbersome to manage the school efficiently and hence were failing to maintain proper records or to run administrative procedures smoothly and thereby establish proper channels of communication with the members of the school community. Problems underlying the system were:</p>
<ol>
<li>
<p>&nbsp;</p>
<p><strong>Unable to manage the data of students properly:</strong></p>
<ul>
<li>There was an inability to maintain properly updated, correct records about students' personal information, academic performance, and attendance</li>
</ul>
</li>
<li>
<p>&nbsp;</p>
<p><strong>Lack of Fee Management System: </strong></p>
<ul>
<li>It was difficult to track records of payments of tuition fees, billing thereof, and sending notices, as the prerequisite recordkeeping was inefficient, which used to cause losses in the form of missed payments and financial misappropriation.</li>
</ul>
</li>
<li>
<p>&nbsp;</p>
<p><strong>Difficulty in Monitoring Academic Performance: </strong></p>
<ul>
<li>Incapability of proper and periodic monitoring of the progress of students; hence, delays in feedback and loss of opportunities to intervene on time.</li>
</ul>
</li>
<li>
<p>&nbsp;</p>
<p><strong>Poor Communication Between Stakeholders: </strong></p>
<ul>
<li>Lack of proper communication techniques among teachers, students, and parents results in misunderstandings and disengagement.</li>
</ul>
</li>
</ol>                        </div>
                    </div>
                    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
                    <div className="lg:col-span-5 col-span-12 lg:mt-0 mt-10">
                        <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Solution                        </h2>
                        <div className="mt-10">
                        <p>To address these challenges, School management system was developed as a comprehensive school management system that offers the following solutions:</p>
<ol>
<li>
<p>&nbsp;</p>
<p><strong>Centralized Student Data Management:</strong></p>
<ul>
<li>Implemented a digital platform that centralizes all student information, ensuring accurate and up-to-date records.</li>
</ul>
</li>
<li>
<p>&nbsp;</p>
<p><strong>Automated Fee Management:</strong></p>
<ul>
<li>Automated the processes of fee tracking, invoicing, and reminders to ensure timely payments and reduce discrepancies.</li>
</ul>
</li>
<li>
<p>&nbsp;</p>
<p><strong>Real-Time Academic Monitoring:</strong></p>
<ul>
<li>Introduced a system for real-time tracking of student performance, enabling timely feedback and intervention.</li>
</ul>
</li>
<li>
<p>&nbsp;</p>
<p><strong>Enhanced Communication Tools:</strong></p>
<ul>
<li>Integrated a communication platform to improve interaction between teachers, students, and parents, enhancing engagement and reducing misunderstandings.</li>
</ul>
</li>
</ol>                        </div>
                    </div>
                    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
                </div>

            </div>

        </div>
    </section>
        


    
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12">
            <div className="lg:col-span-6 col-span-12 space-y-6">
                <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold"> Value Addition</h1>
            </div>
            <div className="lg:col-span-6 col-span-12"></div>
        </div>
       
            
           <div className="grid grid-cols-12 lg:gap-12 gap-4 mt-10 font-inter text-base">
<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">01</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs"><strong>Centralized Data Management:</strong> By consolidating student and teacher information into a single platform, School management system reduces the time spent on manual record-keeping and minimizes errors, enhancing administrative efficiency.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">04</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs"><strong>Immediate Feedback:</strong> Teachers can input and track student performance in real-time, allowing for timely interventions and support, which enhances academic outcomes.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">02</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs"><strong>Intuitive Interface:</strong> A user-friendly design ensures that administrators, teachers, students, and parents can easily navigate the system, improving accessibility and satisfaction.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">05</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs"><strong>Integrated Communication Tools:</strong> A built-in platform facilitates effective communication between teachers, students, and parents, leading to better engagement and collaboration.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">03</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs"><strong>Efficient Billing and Reminders:</strong> Automation of fee tracking, invoicing, and payment reminders ensures timely fee collection and reduces the administrative burden on school staff.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">06</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs"><strong>Secure Information Handling:</strong> The system ensures the protection of sensitive data and adheres to regulatory standards, safeguarding against unauthorized access and ensuring legal compliance.</p>
</div>
</div>
</div>       
    </section>

    




    
    <section>
        <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto pt-14 lg:pt-24 xl:pt-24 2xl:pt-32 bg-no-repeat">
            
                    <img decoding="async" loading="lazy" src="/assets/front/home/Olympiad%20case%20study%20mockup%20(1)%20(1).webp" />
        </div>
    </section>
        




    
    <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">
    <div className="relative">
        <div className="grid grid-cols-12 gap-4 lg:gap-0">
            <div className="lg:col-span-4 col-span-12">
                <div>
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Projects
                    </h3>
                    <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Check out Our Case Studies</h1>
                </div>
            </div>
            <div className="col-span-9 lg:block hidden"></div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-5 lg:mt-10">
                    <div className="lg:col-span-4 col-span-12">
                <a href="/case-study?id=1" className="relative overflow-hidden group block cursor-pointer">
                    <img decoding="async" loading="lazy" src="assets/front/home/tc_project_1722505852.webp" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
                    <div className="absolute top-0 right-0">
                        <div className="inline-flex justify-start items-center space-x-3 p-5">
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">BEAUTY</h3>
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">SALOON</h3>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-end items-end">
                        <div className="w-full bg-gradient-to-t from-[#9152a8b6] to-transparent p-5 transition-opacity duration-300 group-hover:from-[#9152A8] group-hover:to-transparent">
                            <p className="2xl:text-base xl:text-base lg:text-xs text-base text-white font-inter">
                            RUPINIS</p>
                            <div className="flex justify-start items-end">
                                <h1 className="text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2">
                                 Revolutionizing Customer Relationship Management...                                </h1>
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                        <div className="lg:col-span-4 col-span-12">
                <a href="/case-study?id=3" className="relative overflow-hidden group block cursor-pointer">
                    <img decoding="async" loading="lazy" src="assets/front/home/tc_project_1722505935.webp" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
                    <div className="absolute top-0 right-0">
                        <div className="inline-flex justify-start items-center space-x-3 p-5">
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">BANKING</h3>
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">FINANCE</h3>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-end items-end">
                        <div className="w-full bg-gradient-to-t from-[#9152a8b6] to-transparent p-5 transition-opacity duration-300 group-hover:from-[#9152A8] group-hover:to-transparent">
                            <p className="2xl:text-base xl:text-base lg:text-xs text-base text-white font-inter">
                            SIDBI</p>
                            <div className="flex justify-start items-end">
                                <h1 className="text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2">
                                SIDBI's Digital Transformation: Boosting User Engagement, Operational Efficiency, and Customer Satisfaction                                </h1>
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                    </div>
        
    </div>
</section>
    </div>






















          {/* Case Study 2 Scripts */}
        </>
      )}
      {id === "3" && (
        <>
          {/* Case Study 3 Styles */}
          {/* Case Study 3 Content */}
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    

    
    

    





    <div className="overflow-x-hidden lg:overflow-x-auto">
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    









































































    

        
    <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('assets/front/home/case_banner_1722575137.webp')" }}>
    <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
        <div className="grid grid-cols-12 lg:gap-4">
            <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home / Case study/ Sidbi                </p>
                <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                Small Industries Development Bank of India (SIDBI)</h1>
                <p className="mt-4 lg:mt-4 xl:mt-7 2xl:mt-10 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-inter">
                    Only a structured approach can help to build a system, placing proper system will increase the productivity, this energy will convert into proven results</p>
            </div>
            <div className="col-span-5 lg:block hidden">
            </div>
        </div>
    </div>
    </section>  
        

        
    <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12">
            <div className="lg:col-span-6 col-span-12">
                <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold">Client Overview</h1>
                <ul className="space-y-5 mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 2xl:text-base xl:text-sm lg:text-sm text-xs font-inter">
                   <ul className="space-y-5 mt-5 lg:mt-10 xl:mt-5 2xl:mt-10 2xl:text-base xl:text-sm lg:text-sm text-xs font-inter">
<li>The Small Industries Development Bank of India (SIDBI) is a premier financial institution in India dedicated to supporting micro, small, and medium enterprises (MSMEs). SIDBI plays a crucial role in promoting economic growth and development by providing comprehensive financial and non-financial services to small businesses across the country.</li>
<li>With a mission to promote, finance, and develop MSMEs, SIDBI's initiatives and programs are designed to facilitate the growth and sustainability of small enterprises, contributing significantly to the broader economy.</li>
</ul>                </ul>
                <a href="https://touchmarkdes.com/#">
                    <div className="relative overflow-hidden border border-[#194F97] px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                        <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors duration-300 text-sm uppercase">
                            Go to website</span>
                        <svg fill="none" height="24" className="relative z-10 ml-2 text-[#194F97] -rotate-90 group-hover:text-white transition-colors" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                        </svg>
                        <span className="absolute inset-0 bg-[#194F97] transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                    </div>
                </a>
            </div>
            <div className="lg:col-span-1 lg:block hidden">
            </div>
            <div className="lg:col-span-5 col-span-12 lg:mt-0 mt-5 h-full">
                <img decoding="async" loading="lazy" src="assets/front/home/case_overview_1722578481.webp" />
            </div>
        </div>
    </section>
        

        
    <section className="pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="bg-[#FEF5FF] px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">

            <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto">

                <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto grid grid-cols-12 gap-4 font-inter 2xl:ml-10 xl:ml-5">
                    <div className="lg:col-span-5 col-span-12">
                        <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Problem</h2>
                        <div className="mt-10">
                        <p className="font-inter 2xl:text-base xl:text-sm lg:text-sm text-xs">SIDBI faced several challenges in maintaining an efficient online presence, which impacted their ability to engage with stakeholders, disseminate information, and provide services effectively. The key issues included:</p>
<ul className="space-y-5 list-disc ml-5">
<li>An outdated website with poor user experience.</li>
<li>Difficulty in managing content and updates.</li>
<li>Lack of integration with their internal systems and databases.</li>
<li>Inefficient handling of online applications and service requests.</li>
<li>Security concerns and compliance with government regulations.</li>
<li>Ineffective grievance handling system, leading to delayed resolutions and dissatisfaction.</li>
</ul>                        </div>
                    </div>
                    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
                    <div className="lg:col-span-5 col-span-12 lg:mt-0 mt-10">
                        <h2 className="font-gellix font-semibold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Solution                        </h2>
                        <div className="mt-10">
                        <p className="font-inter 2xl:text-base xl:text-sm lg:text-sm text-sm">We provided a comprehensive solution to overhaul SIDBI’s online platform, ensuring it meets modern standards of usability, functionality, and security. The key elements of the solution included:</p>
<ul className="font-inter font-regular space-y-5 2xl:mt-10 xl:mt-7 lg:mt-5 mt-5 2xl:text-base xl:text-sm lg:text-sm text-sm">
<li><span className="font-inter font-semibold">Website Redesign and Development:</span> We redesigned the website with a user-centric approach, ensuring intuitive navigation, responsive design, and a modern aesthetic.</li>
<li><span className="font-inter font-semibold">Content Management System (CMS): </span> Implemented a robust CMS to enable easy content updates and management by SIDBI’s team.</li>
<li><span className="font-inter font-semibold">Integration with Internal Systems: </span> Integrated the website with SIDBI’s internal systems, including their CRM, loan processing systems, and databases, ensuring seamless data flow and processing.</li>
<li><span className="font-inter font-semibold">Online Application Processing:</span> &nbsp;Developed a secure online application system for various services, enabling users to apply for loans and other services directly through the website.</li>
<li><span className="font-inter font-semibold">Grievance Handling System:</span> We redesigned the website with a user-centric approach, ensuring intuitive navigation, responsive design, and a modern aesthetic.</li>
</ul>                        </div>
                    </div>
                    <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 lg:block hidden"></div>
                </div>

            </div>

        </div>
    </section>
        


    
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
        <div className="grid grid-cols-12">
            <div className="lg:col-span-6 col-span-12 space-y-6">
                <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-gellix font-semibold"> Value Addition</h1>
            </div>
            <div className="lg:col-span-6 col-span-12"></div>
        </div>
       
            
           <div className="grid grid-cols-12 lg:gap-12 gap-4 mt-10 font-inter text-base">
<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">01</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">POS, Inventory, Resource management, Appointments, Stock movement, Membership, CRM, Ecommerce – All these applications were deployed in a different environment and developed using different technologies.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">04</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">Around 30,000 customers data with their behaviours were monitored now, based on the available data, social media campaigns and ads campaign were launched.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">02</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">We did a complete study of their USB and business process, based on which we had developed an extensive plan to merge all the solutions into a single window system using API’s, Data migration.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">05</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">Increase in sales, 12% Pilferage loss was controlled, Increase in customer appointment bookings.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">03</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">We were working on the entire solution for 2 years, out of which 12 months of dedication in developing the solution.</p>
</div>
</div>

<div className="lg:col-span-6 col-span-12 flex justify-start items-center">
<div>
<div className="flex items-center justify-center w-12 h-12 bg-transparent border border-fuchsia-200 rounded-full font-medium 2xl:text-xl xl:text-lg lg:text-lg text-base text-black">06</div>
</div>
<div>
<p className="ml-2 2xl:text-base xl:text-sm lg:text-sm text-xs">Orders were on track; Supplier payments were tracked properly.</p>
</div>
</div>
</div>       
    </section>

    




    
    <section>
        <div className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto pt-14 lg:pt-24 xl:pt-24 2xl:pt-32 bg-no-repeat">
            
             <img decoding="async" loading="lazy" src="assets/front/home/case_value_1722590179.webp" />
        </div>
    </section>
        




    
    <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-24 xl:py-24 2xl:py-32">
    <div className="relative">
        <div className="grid grid-cols-12 gap-4 lg:gap-0">
            <div className="lg:col-span-4 col-span-12">
                <div>
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Projects
                    </h3>
                    <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Check out Our Case Studies</h1>
                </div>
            </div>
            <div className="col-span-9 lg:block hidden"></div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-5 lg:mt-10">
                    <div className="lg:col-span-4 col-span-12">
                <a href="/case-study?id=1" className="relative overflow-hidden group block cursor-pointer">
                    <img decoding="async" loading="lazy" src="assets/front/home/tc_project_1722505852.webp" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
                    <div className="absolute top-0 right-0">
                        <div className="inline-flex justify-start items-center space-x-3 p-5">
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">BEAUTY</h3>
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">SALOON</h3>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-end items-end">
                        <div className="w-full bg-gradient-to-t from-[#9152a8b6] to-transparent p-5 transition-opacity duration-300 group-hover:from-[#9152A8] group-hover:to-transparent">
                            <p className="2xl:text-base xl:text-base lg:text-xs text-base text-white font-inter">
                            RUPINIS</p>
                            <div className="flex justify-start items-end">
                                <h1 className="text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2">
                                 Revolutionizing Customer Relationship Management...                                </h1>
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                        <div className="lg:col-span-4 col-span-12">
                <a href="/case-study?id=2" className="relative overflow-hidden group block cursor-pointer">
                    <img decoding="async" loading="lazy" src="assets/front/home/tc_project_1722505900.webp" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
                    <div className="absolute top-0 right-0">
                        <div className="inline-flex justify-start items-center space-x-3 p-5">
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">SCHOOL</h3>
                            <h3 className="bg-white px-3 py-1 rounded-3xl text-black text-xs uppercase">ACADAMIC</h3>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-end items-end">
                        <div className="w-full bg-gradient-to-t from-[#9152a8b6] to-transparent p-5 transition-opacity duration-300 group-hover:from-[#9152A8] group-hover:to-transparent">
                            <p className="2xl:text-base xl:text-base lg:text-xs text-base text-white font-inter">
                            School Management System</p>
                            <div className="flex justify-start items-end">
                                <h1 className="text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-gellix pt-2">
                                A Comprehensive School Management System                                </h1>
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                    </div>
        
    </div>
</section>
    </div>






















          {/* Case Study 3 Scripts */}
        </>
      )}
    </>
  );
}
