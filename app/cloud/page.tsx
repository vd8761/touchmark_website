'use client';

import Script from "next/script";

export default function Page() {
  return (
    <>
      <title>Cloud</title>
      <meta name="description" content="" />

      {/* Page JSX Content */}
      ﻿




    <link rel="Touchmark" href="cloud.html#" />
    
    
    
    


    
    <link rel="touchmark-des-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    

    
    


    






    <div className="overflow-x-hidden lg:overflow-x-auto">

        
        




    <link rel="Touchmark" href="cloud.html#" />
    
    
    
    
    
    <link rel="apple-touch-icon" sizes="180x180" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png" />
    
    
    
    
    

    










<div id="modelConfirm" className="fixed hidden z-50 inset-0 bg-black/70 overflow-y-auto h-full w-full px-4">
    <div className="flex justify-center items-center h-full">
        <div className="relative mx-auto shadow-xl bg-white max-w-[500px]">

            
            <div className="flex items-end justify-between p-2">
                <a href="cloud.html#" id="goBack" className="flex justify-start items-center text-[#194F97] hover:underline text-sm hidden">
                    <svg id="fi_2985161" height="20" viewBox="0 0 128 128" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path id="Left_Arrow_4_" d="m84 108c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656l40-40c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-37.172 37.172 37.172 37.172c1.563 1.563 1.563 4.094 0 5.656-.781.781-1.805 1.172-2.828 1.172z" fill="#194F97"></path>
                    </svg>
                    Go Back
                </a>
                <button onClick={() => (window as any).closeModal?.('modelConfirm')} type="button" className="text-gray-400 bg-transparent hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
            

            
            <div id="step1" className="px-5 pb-5 pt-5">
                <h1 className="2xl:text-2xl xl:text-xl lg:text-xl text-lg font-gellix">Sign in or Create an account</h1>
                <h3 className="mt-2 text-base">If you have an account, your password will be requested.</h3>
                <div className="mt-5 space-y-4 text-left">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="lg:col-span-6 col-span-6 space-y-2">
                            <form id="subscribedForm">
                                <div>
                                    <input type="email" id="email" className="px-3 py-2 border focus:outline-none focus:border-blue-400 w-full" placeholder="username@email.com" required={true} autoComplete="off" />
                                    <span className="text-sm text-red-500">
                                        <div id="emailError" className="pt-2"></div>
                                    </span>
                                </div>
                                <button id="continueButton1" type="submit" className="w-full mt-3">
                                    <div className="relative overflow-hidden bg-[#194F97] px-3 py-2 inline-flex justify-center items-center group w-full">
                                        <span className="relative z-10 text-white transition-colors text-sm uppercase">Continue</span>
                                        <span className="absolute inset-0 bg-blue-700 transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="step3" className="p-5 hidden">
                <h1 className="2xl:text-2xl xl:text-xl lg:text-xl text-lg font-gellix">Enter your Password</h1>
                <h3 className="mt-2 text-base">If you have an account, your password will be requested.</h3>
                <div className="mt-5 space-y-4 text-left">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="lg:col-span-6 col-span-6 space-y-2 mt-2.5 lg:mt-0">
                            <form id="loginForm">
                                <div>
                                    <h3 className="font-inter font-medium text-sm">Email*</h3>
                                    <input type="email" id="email-2" className="mt-2 px-3 py-2 border focus:outline-none focus:border-blue-400 w-full" placeholder="username@email.com" required={true} />
                                </div>
                                <div className="relative">
                                            <h3 className="font-inter font-medium text-sm mt-6">Password*</h3>
                                            <input type="password" id="password" className="py-3 w-full border text-base" placeholder="Enter new password" required={true} />
                                            <span id="togglePassword" className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" style={{ "paddingLeft": "20px" }}>
                                                <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 3C5.673 3 2.034 6.062.38 10c1.654 3.938 5.293 7 9.62 7 4.327 0 7.966-3.062 9.62-7-1.654-3.938-5.293-7-9.62-7zM10 5c3.035 0 5.652 2.051 6.8 5-.088.234-.188.464-.3.682l-.01.018-.003.006-.01.02-.018.035C14.563 13.101 12.426 15 10 15c-2.426 0-4.563-1.9-6.457-4.239l-.019-.036-.01-.02-.003-.006-.01-.018c-.111-.218-.211-.448-.299-.682 1.148-2.949 3.765-5 6.8-5zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM10 9c.276 0 .5.224.5.5a.5.5 0 01-1 0 .5.5 0 01.5-.5z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button id="signInButton" type="submit" className="w-full mt-5">
                                        <div className="relative overflow-hidden bg-[#194F97] px-3 py-2 inline-flex justify-center items-center group w-full">
                                            <span className="relative z-10 text-white transition-colors text-sm uppercase">Sign In</span>
                                            <span className="absolute inset-0 bg-blue-700 transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                                        </div>
                                    </button>
                                    <button id="sendCodeButton" type="button" className="w-full mt-5 ml-4">
                                        <div className="relative overflow-hidden px-3 py-2 inline-flex justify-center items-center group w-full border border-[#194F97]">
                                            <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors text-sm uppercase">Send One-Time Code</span>
                                            <span className="absolute inset-0 bg-[#194F97] transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                                        </div>
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>



            <div id="step4" className="p-5 hidden">
                <h1 className="2xl:text-2xl xl:text-xl lg:text-xl text-lg font-gellix">Enter your sign-in code</h1>
                <h3 className="mt-2 text-base">Check your email for your temporary sign-in code and enter it below. It will be valid for 15 minutes.</h3>

                <div id="message-container-2" className="p-5 bg-[#F1FBFF] inline-flex justify-start items-start gap-4 mt-3 hidden">
                    <div>
                        <svg version="1.1" width="24" height="24" id="fi_1176" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23.625 23.625" style={{  }} xmlSpace="preserve">
                            <g>
                                <path style={{ "fill": "#194F97" }} d="M11.812,0C5.289,0,0,5.289,0,11.812s5.289,11.813,11.812,11.813s11.813-5.29,11.813-11.813 S18.335,0,11.812,0z M14.271,18.307c-0.608,0.24-1.092,0.422-1.455,0.548c-0.362,0.126-0.783,0.189-1.262,0.189 c-0.736,0-1.309-0.18-1.717-0.539s-0.611-0.814-0.611-1.367c0-0.215,0.015-0.435,0.045-0.659c0.031-0.224,0.08-0.476,0.147-0.759 l0.761-2.688c0.067-0.258,0.125-0.503,0.171-0.731c0.046-0.23,0.068-0.441,0.068-0.633c0-0.342-0.071-0.582-0.212-0.717 c-0.143-0.135-0.412-0.201-0.813-0.201c-0.196,0-0.398,0.029-0.605,0.09c-0.205,0.063-0.383,0.12-0.529,0.176l0.201-0.828 c0.498-0.203,0.975-0.377,1.43-0.521c0.455-0.146,0.885-0.218,1.29-0.218c0.731,0,1.295,0.178,1.692,0.53 c0.395,0.353,0.594,0.812,0.594,1.376c0,0.117-0.014,0.323-0.041,0.617c-0.027,0.295-0.078,0.564-0.152,0.811l-0.757,2.68 c-0.062,0.215-0.117,0.461-0.167,0.736c-0.049,0.275-0.073,0.485-0.073,0.626c0,0.356,0.079,0.599,0.239,0.728 c0.158,0.129,0.435,0.194,0.827,0.194c0.185,0,0.392-0.033,0.626-0.097c0.232-0.064,0.4-0.121,0.506-0.17L14.271,18.307z M14.137,7.429c-0.353,0.328-0.778,0.492-1.275,0.492c-0.496,0-0.924-0.164-1.28-0.492c-0.354-0.328-0.533-0.727-0.533-1.193 c0-0.465,0.18-0.865,0.533-1.196c0.356-0.332,0.784-0.497,1.28-0.497c0.497,0,0.923,0.165,1.275,0.497 c0.353,0.331,0.53,0.731,0.53,1.196C14.667,6.703,14.49,7.101,14.137,7.429z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <p id="time" className="text-sm font-inter">
                        A new sign-in code was sent to your email. If you didn’t receive it, you can request a new one after <span id="countdown-2">30</span> seconds.
                    </p>
                </div>

                <div className="mt-5 space-y-4 text-left">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="lg:col-span-6 col-span-6 space-y-2 mt-2.5 lg:mt-0">
                            <div>
                            <form id="verifyCodeForm">
                                            <div>
                                                <h3 className="font-inter font-medium text-sm">Email*</h3>
                                                <input type="email" id="email" defaultValue="" className="mt-2 px-3 py-2 border focus:outline-none focus:border-blue-400 w-full" placeholder="username@email.com" />
                                            </div>
                                            <h3 className="font-inter font-medium text-sm mt-6">Sign-in code*</h3>
                                            <input type="text" id="code" className="mt-2 px-3 py-2 border focus:outline-none focus:border-blue-400 w-full" placeholder="Enter the code here" maxLength={6} inputMode="numeric" pattern="\d{0,6}" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} />
                                            <span className="text-sm text-red-500">
                                                <div id="validationMessage" className="pt-2"></div>
                                            </span>
                                            <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded" style={{ "backgroundColor": "#194F97" }}>Submit</button>
                                        </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






























































        


        
                <section className="relative 2xl:h-[720px] lg:h-[620px] h-[400px] w-full flex items-center justify-center text-center bg-cover bg-center lg:mt-0 mt-10" style={{ "backgroundImage": "url('assets/front/home/cd_banner_1721811052.PNG')" }}>
            <div className="xl:max-w-screen-2xl 2xl:max-w-screen-2xl lg:max-w-screen-lg px-4 md:px-6 lg:px-8 mx-auto py-10 lg:py-24">
                <div className="grid grid-cols-12 lg:gap-4">
                    <div className="lg:col-span-7 col-span-12 text-white text-left lg:pt-5">
                        <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base mt-4 font-inter lg:block hidden">Home / Service / Cloud                        </p>
                        <h1 className="mt-4 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-gellix">
                        Transform your business with scalable cloud solutions</h1>
                    </div>
                    <div className="col-span-5 lg:block hidden">
                    </div>
                </div>
            </div>
        </section>
         
        


        
                <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
            <div className="grid grid-cols-12 lg:gap-4">
                <div className="lg:col-span-4 2xl:col-span-5 col-span-12">
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Our Clients</h3>
                    <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Elevate your experience with us</h1>
                </div>
                <div className="lg:col-span-2 2xl:col-span-1 col-span-0"></div>
                <div className="lg:col-span-6 2xl:col-span-6 col-span-12 flex justify-start items-end">
                    <div className="lg:mt-0 mt-3">
                        <p className="text-[14px] lg:text-sm xl:text-sm 2xl:text-base font-inter">Touchmark Descience may help you improve your job and personal success by providing cutting-edge tools and skilled coaching.                        </p>
                        <a href="/client-partner" className="lg:block hidden">
                            <div className="relative overflow-hidden border border-[#194F97] px-3 py-2 inline-flex justify-center items-center group mt-7 lg:mt-8 xl:mt-8 2xl:mt-10">
                                <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors duration-300 text-sm uppercase">
                                    View all</span>
                                <svg fill="none" height="24" className="relative z-10 ml-2 text-[#194F97] -rotate-90 group-hover:text-white transition-colors" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" id="fi_10486492">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                                <span className="absolute inset-0 bg-[#194F97] transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="lg:block hidden">
<div className="grid grid-cols-4 mt-16">
<div className="flex justify-center items-center border border-t-0 border-l-0 border-r-1 border-b-1 p-5 lg:p-7 xl:p-14 2xl:p-10"><img style={{ "height": "40px" }} src="src/assets/img/home/colcola-icons.svg" /></div>
<div className="flex justify-center items-center border border-t-0 p-5 lg:p-7 xl:p-14 2xl:p-10"><img style={{ "height": "50px" }} src="src/assets/img/home/sidbi-icons.svg" /></div>
<div className="flex justify-center items-center border border-t-0 p-5 lg:p-7 xl:p-14 2xl:p-10"><img style={{ "height": "40px" }} src="src/assets/img/home/rupinis-icons.svg" /></div>
<div className="flex justify-center items-center border border-t-0 border-r-0 border-l-1 border-b-1 p-5 lg:p-7 xl:p-14 2xl:p-10"><img style={{ "height": "45px" }} src="src/assets/img/home/expleo-icon.svg" /></div>
<div className="flex justify-center items-center border border-b-0 border-l-0 border-r-1 border-t-1 p-5 lg:p-7 xl:p-10 2xl:p-8"><img style={{ "height": "80px" }} src="src/assets/img/home/dvi-icons.svg" /></div>
<div className="flex justify-center items-center border border-b-0 p-5 lg:p-7 xl:p-14 2xl:p-10"><img style={{ "height": "50px" }} src="src/assets/img/home/rbl-icons.svg" /></div>
<div className="flex justify-center items-center border border-b-0 p-5 lg:p-7 xl:p-14 2xl:p-10"><img style={{ "height": "50px" }} src="src/assets/img/home/hayakawa-icons.svg" /></div>
<div className="flex justify-center items-center border border-b-0 border-l-1 border-r-0 border-t-1 p-5 lg:p-7 xl:p-14 2xl:p-10"><img style={{ "height": "50px" }} src="src/assets/img/home/tag-icons.svg" /></div>
</div>
</div>
<div className="lg:hidden block">
<div className="grid grid-cols-2 pt-5 lg:pt-32 xl:pt-40 2xl:pt-24">
<div className="flex justify-center items-center border border-t-0 border-l-0 border-r-1 border-b-1 p-7"><img style={{ "height": "35px" }} src="src/assets/img/home/colcola-icons.svg" /></div>
<div className="flex justify-center items-center border border-t-0 border-r-0 p-7"><img style={{ "height": "35px" }} src="src/assets/img/home/sidbi-icons.svg" /></div>
<div className="flex justify-center items-center border border-t-0 border-l-0 p-7"><img style={{ "height": "35px" }} src="src/assets/img/home/rupinis-icons.svg" /></div>
<div className="flex justify-center items-center border border-t-0 border-r-0 border-l-1 border-b-1 p-7"><img style={{ "height": "35px" }} src="src/assets/img/home/expleo-icon.svg" /></div>
<div className="flex justify-center items-center border border-b-0 border-l-0 border-r-1 border-t-1 p-5"><img style={{ "height": "35px" }} src="src/assets/img/home/dvi-icons.svg" /></div>
<div className="flex justify-center items-center border border-b-0 border-r-0 p-5"><img style={{ "height": "35px" }} src="src/assets/img/home/rbl-icons.svg" /></div>
<div className="flex justify-center items-center border border-b-0 border-l-0 p-5"><img style={{ "height": "35px" }} src="src/assets/img/home/hayakawa-icons.svg" /></div>
<div className="flex justify-center items-center border border-b-0 border-l-1 border-r-0 border-t-1 p-5"><img style={{ "height": "35px" }} src="src/assets/img/home/tag-icons.svg" /></div>
</div>
<a className="lg:hidden block relative overflow-hidden border border-[#194F97] px-3 py-2 inline-flex justify-center items-center group mt-7" href="cloud.html#"> <span className="relative z-10 text-[#194F97] group-hover:text-white transition-colors text-sm uppercase"> View all</span> </a></div>        </section>
                


        
        <section className="2xl:max-w-screen-2xl xl:max-w-screen-[100rem] lg:max-w-screen-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8 pt-14 lg:pt-24 xl:pt-24 2xl:pt-32">
            <div className="grid grid-cols-12 lg:gap-4">
                <div className="lg:col-span-9 col-span-12">
                    <h3 className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-[#194F97] font-medium">Enhance Your Cloud Strategy with Expert Guidance</h3>
                    <h2 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl font-gellix">
                        Comprehensive Cloud Consulting &amp; Advisory Services</h2>
                </div>
                <div className="lg:col-span-3 lg:block hidden">
                </div>
            </div>
            <div>
            <div className="2xl:pt-16 xl:pt-12 lg:pt-8 pt-4 relative">
        
        <div className="border-b-[1px] border-black/30"></div>
    </div>

    <div className="mt-10">
        
                    <div id="content-1" role="tabpanel" aria-labelledby="tab-1" className="block">
                
            </div>
                    <div id="content-2" role="tabpanel" aria-labelledby="tab-2" className="hidden">
                
            </div>
                    <div id="content-3" role="tabpanel" aria-labelledby="tab-3" className="hidden">
                
            </div>
                    <div id="content-4" role="tabpanel" aria-labelledby="tab-4" className="hidden">
                
            </div>
            </div>

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
                <a href="/case-study%3Fid=1" className="relative overflow-hidden group block cursor-pointer">
                    <img src="assets/front/home/tc_project_1722505852.PNG" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
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
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg" id="fi_10486492">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                        <div className="lg:col-span-4 col-span-12">
                <a href="/case-study%3Fid=2" className="relative overflow-hidden group block cursor-pointer">
                    <img src="assets/front/home/tc_project_1722505900.PNG" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
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
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg" id="fi_10486492">
                                    <path d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
                        <div className="lg:col-span-4 col-span-12">
                <a href="/case-study%3Fid=3" className="relative overflow-hidden group block cursor-pointer">
                    <img src="assets/front/home/tc_project_1722505935.PNG" className="transition-transform group-hover:scale-110 duration-500 h-full lg:w-auto w-full" />
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
                                <svg fill="none" height="40" className="-rotate-90 text-[#FFFF] transition-colors duration-300" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg" id="fi_10486492">
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
        


        
        






    <link rel="Touchmark" href="cloud.html#" />
    
    
    
    
    
    











        
        
    </div>





































      

      {/* Page Inline Script Initializers */}
      <Script id="page-script-0" strategy="lazyOnload">{`
        try {
          document.addEventListener('DOMContentLoaded', function() {
        const searchButton = document.getElementById('btn-search');
        const searchInput = document.getElementById('input-search');
        const suggestionsDropdown = document.getElementById('suggestions-dropdown');
        const suggestionsList = document.getElementById('suggestions-list');
        let isExpanded = false;

        const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

        function toggleInput() {
            if (isExpanded) {
                searchInput.classList.remove('w-72');
                isExpanded = false;
                suggestionsDropdown.classList.add('hidden');
            } else {
                searchInput.classList.add('w-72');
                searchInput.focus();
                isExpanded = true;
            }
        }

        searchButton.addEventListener('click', toggleInput);

        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase();
            if (query.length > 0) {
                const filteredSuggestions = suggestions.filter(item => item.toLowerCase().includes(query));
                suggestionsList.innerHTML = filteredSuggestions.map(item => \`<li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">\${item}</li>\`).join('');
                suggestionsDropdown.classList.remove('hidden');
            } else {
                suggestionsDropdown.classList.add('hidden');
            }
        });

        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                suggestionsDropdown.classList.add('hidden');
                searchInput.classList.remove('w-72');
                isExpanded = false;
            }, 100);
        });

        suggestionsList.addEventListener('click', function(e) {
            if (e.target.tagName === 'LI') {
                searchInput.value = e.target.textContent;
                suggestionsDropdown.classList.add('hidden');
            }
        });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-1" strategy="lazyOnload">{`
        try {
          // Function to open the modal and disable body scrolling
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden');
    }

    // Function to close the modal and enable body scrolling
    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden');
    }

    // Event listener for closing the modal with the "Escape" key
    document.onkeydown = function(event) {
        event = event || window.event;
        if (event.keyCode === 27) { // 27 is the keycode for the Escape key
            document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden');
            let modals = document.getElementsByClassName('modal');
            Array.prototype.slice.call(modals).forEach(i => {
                i.style.display = 'none';
            });
        }
    };

    // Event listener for the first "Continue" button (from Step 1 to Step 2)
    document.getElementById('continueButton1').addEventListener('click', function() {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
        document.getElementById('goBack').classList.remove('hidden'); // Show "Go Back" button
    });

    // Event listener for the second "Continue" button (from Step 2 to Step 3)
    document.getElementById('continueButton2').addEventListener('click', function() {
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step3').classList.remove('hidden');
    });

    // Event listener for the "Submit" button (from Step 3 to Step 4)
    document.getElementById('submitButton').addEventListener('click', function() {
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step4').classList.remove('hidden');
    });

    // Event listener for the "Go Back" button
    document.getElementById('goBack').addEventListener('click', function(event) {
        event.preventDefault();
        if (!document.getElementById('step2').classList.contains('hidden')) {
            // If step 2 is visible, go back to step 1
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step1').classList.remove('hidden');
            document.getElementById('goBack').classList.add('hidden'); // Hide "Go Back" button
        } else if (!document.getElementById('step3').classList.contains('hidden')) {
            // If step 3 is visible, go back to step 2
            document.getElementById('step3').classList.add('hidden');
            document.getElementById('step2').classList.remove('hidden');
        } else if (!document.getElementById('step4').classList.contains('hidden')) {
            // If step 4 is visible, go back to step 3
            document.getElementById('step4').classList.add('hidden');
            document.getElementById('step3').classList.remove('hidden');
        }
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-2" strategy="lazyOnload">{`
        try {
          document.addEventListener("DOMContentLoaded", function() {
        fetch('./components/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-3" strategy="lazyOnload">{`
        try {
          document.getElementById('resend-button').addEventListener('click', function() {
        var messageContainer = document.getElementById('message-container');
        var countdownElement = document.getElementById('countdown');
        var resendButton = document.getElementById('resend-button');
        var countdown = 30;

        // Show the hidden message
        messageContainer.classList.remove('hidden');

        // Disable the resend button, change its color, and set cursor to not-allowed
        resendButton.disabled = true;
        resendButton.classList.add('text-[#CECECE]');
        resendButton.classList.remove('text-[#194f97]');
        resendButton.style.cursor = 'not-allowed';

        // Start the countdown
        var interval = setInterval(function() {
            countdown--;
            countdownElement.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                // Enable the resend button, revert color, and reset cursor
                resendButton.disabled = false;
                resendButton.classList.remove('text-[#CECECE]');
                resendButton.classList.add('text-[#194f97]');
                resendButton.style.cursor = 'pointer';
            }
        }, 1000);
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-4" strategy="lazyOnload">{`
        try {
          document.getElementById('resend-button-2').addEventListener('click', function() {
        var messageContainer = document.getElementById('message-container-2');
        var countdownElement = document.getElementById('countdown-2');
        var resendButton = document.getElementById('resend-button-2');
        var countdown = 30;

        // Show the hidden message
        messageContainer.classList.remove('hidden');

        // Disable the resend button, change its color, and set cursor to not-allowed
        resendButton.disabled = true;
        resendButton.classList.add('text-[#CECECE]');
        resendButton.classList.remove('text-[#194f97]');
        resendButton.style.cursor = 'not-allowed';

        // Start the countdown
        var interval = setInterval(function() {
            countdown--;
            countdownElement.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                // Enable the resend button, revert color, and reset cursor
                resendButton.disabled = false;
                resendButton.classList.remove('text-[#CECECE]');
                resendButton.classList.add('text-[#194f97]');
                resendButton.style.cursor = 'pointer';
            }
        }, 1000);
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-5" strategy="lazyOnload">{`
        try {
          document.getElementById('continueButton1').addEventListener('click', function(event) {
        var emailInput = document.getElementById('email');
        var warningMessage = document.getElementById('email-warning');

        if (!emailInput.validity.valid) {
            // Show the warning message if email is invalid
            warningMessage.classList.remove('hidden');
        } else {
            // Hide the warning message if the email is valid
            warningMessage.classList.add('hidden');
            // Proceed with form submission or other actions
        }
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-6" strategy="lazyOnload">{`
        try {
          document.getElementById('submitButton').addEventListener('click', function(event) {
        var emailInput = document.getElementById('email-2');
        var warningMessage = document.querySelector('[x-text="validation.email.message"]');

        if (emailInput.value === '' || !emailInput.checkValidity()) {
            // Show the warning message if email is invalid
            warningMessage.classList.remove('hidden');
        } else {
            // Hide the warning message if the email is valid
            warningMessage.classList.add('hidden');
            // Proceed with form submission or other actions
        }
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-7" strategy="lazyOnload">{`
        try {
          function emailValidation() {
        return {
            email: '',
            validation: {
                email: {
                    message: ''
                }
            },
            showStep2: false,
            validateEmail() {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}\$/;
                if (this.email === '') {
                    this.validation.email.message = 'Email is required.';
                } else if (!emailPattern.test(this.email)) {
                    this.validation.email.message = 'Please enter a valid email address.';
                } else {
                    this.validation.email.message = '';
                }
            },
            submitEmail() {
                this.validateEmail();
                console.log("Validation message: ", this.validation.email.message); // Debug line
                if (this.validation.email.message === '') {
                    console.log("Making AJAX request..."); // Debug line
                    // Make an AJAX request to send the code to the email
                    \$.ajax({
                        url: 'send_code.php',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            email: this.email
                        }),
                        success: (data) => {
                            console.log("AJAX success: ", data); // Debug line
                            const response = JSON.parse(data);
                            if (response.success) {
                                this.showStep2 = true;
                                document.getElementById("step1").style.display = "none";
                                document.getElementById("step2").style.display = "block";
                            } else {
                                this.validation.email.message = response.message;
                            }
                        },
                        error: (error) => {
                            console.error('AJAX error:', error);
                        }
                    });
                }
            }
        }
    }

    function codeValidation() {
        return {
            code: '',
            validation: {
                code: {
                    message: ''
                }
            },
            validateCode() {
                const codePattern = /^\\d{6}\$/;
                if (this.code === '') {
                    this.validation.code.message = 'Please enter a valid 6-digit code.';
                } else if (!codePattern.test(this.code)) {
                    this.validation.code.message = 'Please enter a valid 6-digit code.';
                } else {
                    this.validation.code.message = '';
                }
            },
            submitCode() {
                this.validateCode();
                console.log("Validation message: ", this.validation.code.message); // Debug line
                if (this.validation.code.message === '') {
                    console.log("Making AJAX request..."); // Debug line
                    // Make an AJAX request to verify the code
                    \$.ajax({
                        url: 'verify_code.php',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            code: this.code
                        }),
                        success: (data) => {
                            console.log("AJAX success: ", data); // Debug line
                            const response = JSON.parse(data);
                            if (response.success) {
                                alert('Code verified successfully!');
                            } else {
                                this.validation.code.message = response.message;
                            }
                        },
                        error: (error) => {
                            console.error('AJAX error:', error);
                        }
                    });
                }
            }
        }
    }
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-8" strategy="lazyOnload">{`
        try {
          document.getElementById('subscribedForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        var form = event.target;
        var formData = new FormData(form);

        fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message); // Show response message
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-9" strategy="lazyOnload">{`
        try {
          document.getElementById('subscribedForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const emailError = document.getElementById('emailError');

        // Clear any previous error message
        emailError.textContent = '';

        fetch('check-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'reg_email': email
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    // If email exists, show password entry form
                    document.getElementById('step1').classList.add('hidden');
                    document.getElementById('step3').classList.remove('hidden');
                    document.getElementById('emailInStep3').value = email; // Prefill the email in step 3
                } else {
                    // Redirect to registration page if email is new
                    window.location.href = 'registration.php?email=' + encodeURIComponent(email);
                }
            })
            .catch(error => {
                emailError.textContent = 'An error occurred. Please try again later.';
                console.error('Error:', error);
            });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-10" strategy="lazyOnload">{`
        try {
          document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email-2').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        fetch('check-login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'reg_email': email,
                    'reg_password': password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displaySuccessAlert('Login successful!');
                    document.getElementById('step3').classList.add('hidden'); // Close the popup
                    setTimeout(() => {
                        window.location.reload(); // Refresh the page after 1 second
                    }, 1000);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    function displaySuccessAlert(message) {
        // Remove any existing success alert
        const existingAlert = document.getElementById('success-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create a new success alert element
        const alertDiv = document.createElement('div');
        alertDiv.id = 'success-alert';
        alertDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded';
        alertDiv.role = 'alert';
        alertDiv.innerHTML = \`
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline">\${message}</span>
        \`;

        // Append the alert to the body
        document.body.appendChild(alertDiv);

        // Automatically remove the alert after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    document.getElementById('sendCodeButton').addEventListener('click', function() {
        // Handle the "Send One-Time Code" button click here
        // You may need to implement \`sendCode\` function to handle this action
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-11" strategy="lazyOnload">{`
        try {
          document.getElementById('sendCodeButton').addEventListener('click', function() {
        // Immediately switch forms for testing purposes
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step4').classList.remove('hidden');

        // Continue with AJAX request
        const email = document.getElementById('email-2').value;
        if (email) {
            \$.ajax({
                url: 'send-code.php',
                type: 'POST',
                data: {
                    email: email
                },
                success: function(response) {
                    const data = JSON.parse(response);
                    if (data.success) {
                        console.log("Email sent successfully.");
                    } else {
                        alert(data.message);
                    }
                },
                error: function() {
                    alert('Failed to send code. Please try again.');
                }
            });
        } else {
            alert('Please enter your email.');
        }
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-12" strategy="lazyOnload">{`
        try {
          document.getElementById('verifyCodeForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value.trim();
        const code = document.getElementById('code').value.trim();
        const validationMessage = document.getElementById('validationMessage');

        // Clear any previous validation message
        validationMessage.textContent = '';

        if (!email || !code) {
            validationMessage.textContent = 'Please enter both email and code.';
            return;
        }

        fetch('verify-code.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'email': email,
                    'code': code
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displaySuccessAlert('Code verified successfully!');
                    updateSignInButton(); // Change the sign-in button to profile icon

                    // Reload the page after updating the button
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000); // Adjust the timeout as needed

                } else {
                    validationMessage.textContent = data.message;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                validationMessage.textContent = 'An error occurred. Please try again later.';
            });
    });

    function updateSignInButton() {
        const signInButton = document.getElementById('signInButton');

        // Update button to show profile icon
        signInButton.innerHTML = \`
            <div class="relative overflow-hidden bg-gray-500 px-3 py-2 inline-flex justify-center items-center group w-full">
                <span class="relative z-10 text-white transition-colors text-sm uppercase">Profile</span>
                <span class="absolute inset-0 bg-gray-700 transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
            </div>
        \`;
    }

    function displaySuccessAlert(message) {
        // Remove any existing success alert
        const existingAlert = document.getElementById('success-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create a new success alert element
        const alertDiv = document.createElement('div');
        alertDiv.id = 'success-alert';
        alertDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded';
        alertDiv.role = 'alert';
        alertDiv.innerHTML = \`
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline">\${message}</span>
        \`;

        // Append the alert to the body
        document.body.appendChild(alertDiv);

        // Automatically remove the alert after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-13" strategy="lazyOnload">{`
        try {
          document.getElementById('resend-button-2').addEventListener('click', function() {
        const email = document.getElementById('email-2').value; // Assuming email field ID in step 3 is 'email-2'

        if (email) {
            fetch('resend-code.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'email': email
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        // Handle success response
                        document.getElementById('message-container-2').classList.remove('hidden');
                        startCountdown();
                    } else {
                        // Handle error response
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
        } else {
            alert('Please enter your email address.');
        }
    });

    // Function to start a countdown timer (example)
    function startCountdown() {
        let countdownElement = document.getElementById('countdown-2');
        let timeLeft = 30; // Time in seconds
        let countdown;

        // Clear any existing countdown interval
        if (countdown) {
            clearInterval(countdown);
        }

        countdown = setInterval(function() {
            if (timeLeft <= 0) {
                clearInterval(countdown);
                countdownElement.textContent = '30'; // Reset the countdown text
            } else {
                countdownElement.textContent = timeLeft;
                timeLeft--;
            }
        }, 1000);
    }
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-14" strategy="lazyOnload">{`
        try {
          document.addEventListener('DOMContentLoaded', () => {
        // Assuming you have a way to check if the user is signed in
        // Example: check session storage or an API call to set the isSignedIn value
        let userSignedIn = true; // Set this based on your actual logic

        // Update the Alpine.js data
        Alpine.store('auth', {
            isSignedIn: userSignedIn,
        });
    });
    document.getElementById('subscribedForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the email value from the subscribedForm
    var emailValue = document.getElementById('email').value;

    // Set the email value in the loginForm
    document.getElementById('email-2').value = emailValue;

    // Optionally, you can now submit the subscribedForm if needed
    // this.submit();
});
const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const eyeIcon = document.querySelector('#eyeIcon');

    togglePassword.addEventListener('click', function() {
        // Toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Toggle the eye icon
        eyeIcon.classList.toggle('text-gray-500');
        eyeIcon.classList.toggle('text-blue-500');
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-15" strategy="lazyOnload">{`
        try {
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Y8WSH8YVSZ');
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-16" strategy="lazyOnload">{`
        try {
          function closeAlert() {
    \$('#successAlert').addClass('hidden');
}

\$(document).ready(function() {
    \$('#nextButton').on('click', function() {
        // Hide email step and show name step
        \$('#emailStep').addClass('hidden');
        \$('#nameStep').removeClass('hidden');
    });

    \$('#subscribeForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        var formData = \$(this).serialize(); // Serialize the form data

        \$.ajax({
            type: 'POST',
            url: 'https://touchmarkdes.com/head/engine/ajax/__ajax_subscribe_form.php', // Replace with your server URL
            data: formData,
            success: function(response) {
                // Hide the form and show the success message
                \$('#subscribeForm').addClass('hidden');
                \$('#successAlert').removeClass('hidden');
            },
            error: function(xhr, status, error) {
                // Handle the error response
                alert('Subscription failed: ' + error);
            }
        });
    });
});
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-17" strategy="lazyOnload">{`
        try {
          window.addEventListener('scroll', function () {
        var header = document.querySelector('#navbar');
        var logo = document.querySelector('#logo');
        var desktopLogo = 'https://touchmarkdes.com/src/assets/img/tds-color-logo.png';
        var mobileLogo = 'https://touchmarkdes.com/src/assets/img/tds-color-logo.png';

        if (header) {
            header.classList.toggle('bg-scroll-white', window.scrollY > 0);
        }

        if (logo) {
            if (window.innerWidth <= 768) {
                logo.src = mobileLogo;
            } else {
                logo.src = window.scrollY > 0 ? mobileLogo : desktopLogo;
            }
        }

        var navLinks = document.querySelectorAll('#navbar-collapse-columns .hs-dropdown button');
        navLinks.forEach(function (link) {
            link.classList.remove('text-white');
            link.classList.add('text-black');
        });

        var contactUsButton = document.querySelector('#navbar-collapse-columns .hs-dropdown button.contact-us');
        if (contactUsButton) {
            contactUsButton.classList.remove('text-black');
            contactUsButton.classList.add('text-white');
        }

        var border = document.querySelector('.border-white');
        if (border) {
            border.classList.toggle('border-white', window.scrollY <= 0);
            border.classList.toggle('border-blue', window.scrollY > 0);
        }
    });

    window.dispatchEvent(new Event('scroll'));
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-18" strategy="lazyOnload">{`
        try {
          \$(document).ready(function () {
        var owlOptions = {
            loop: true,
            nav: false,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1.25,
                    margin: 20  // No margin on mobile devices
                },
                600: {
                    items: 1.5,
                    margin: 20  // Margin for devices with width 600px and above
                },
                1000: {
                    items: 4,
                    margin: 20  // Margin for devices with width 1000px and above
                }
            }
        };

        if (window.innerWidth <= 767) {
            owlOptions.dots = true;
        } else {
            owlOptions.dots = false;
        }

        \$("#cc-a").owlCarousel(owlOptions);

        \$(window).resize(function () {
            var newOwlOptions = owlOptions;
            if (window.innerWidth <= 767) {
                newOwlOptions.dots = true;
            } else {
                newOwlOptions.dots = false;
            }
            \$('#cc-a').trigger('destroy.owl.carousel');
            \$('#cc-a').owlCarousel(newOwlOptions);
        });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-19" strategy="lazyOnload">{`
        try {
          \$(document).ready(function () {
        var owlOptions = {
            loop: true,
            nav: false,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1.25,
                    margin: 20  // No margin on mobile devices
                },
                600: {
                    items: 1.5,
                    margin: 20  // Margin for devices with width 600px and above
                },
                1000: {
                    items: 4,
                    margin: 20  // Margin for devices with width 1000px and above
                }
            }
        };

        if (window.innerWidth <= 767) {
            owlOptions.dots = true;
        } else {
            owlOptions.dots = false;
        }

        \$("#ci-e").owlCarousel(owlOptions);

        \$(window).resize(function () {
            var newOwlOptions = owlOptions;
            if (window.innerWidth <= 767) {
                newOwlOptions.dots = true;
            } else {
                newOwlOptions.dots = false;
            }
            \$('#ci-e').trigger('destroy.owl.carousel');
            \$('#ci-e').owlCarousel(newOwlOptions);
        });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-20" strategy="lazyOnload">{`
        try {
          \$(document).ready(function () {
        var owlOptions = {
            loop: true,
            nav: false,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1.25,
                    margin: 20  // No margin on mobile devices
                },
                600: {
                    items: 1.5,
                    margin: 20  // Margin for devices with width 600px and above
                },
                1000: {
                    items: 4,
                    margin: 20  // Margin for devices with width 1000px and above
                }
            }
        };

        if (window.innerWidth <= 767) {
            owlOptions.dots = true;
        } else {
            owlOptions.dots = false;
        }

        \$("#cl-a").owlCarousel(owlOptions);

        \$(window).resize(function () {
            var newOwlOptions = owlOptions;
            if (window.innerWidth <= 767) {
                newOwlOptions.dots = true;
            } else {
                newOwlOptions.dots = false;
            }
            \$('#cl-a').trigger('destroy.owl.carousel');
            \$('#cl-a').owlCarousel(newOwlOptions);
        });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-21" strategy="lazyOnload">{`
        try {
          \$(document).ready(function () {
        var owlOptions = {
            loop: true,
            nav: false,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1.25,
                    margin: 20  // No margin on mobile devices
                },
                600: {
                    items: 1.5,
                    margin: 20  // Margin for devices with width 600px and above
                },
                1000: {
                    items: 4,
                    margin: 20  // Margin for devices with width 1000px and above
                }
            }
        };

        if (window.innerWidth <= 767) {
            owlOptions.dots = true;
        } else {
            owlOptions.dots = false;
        }

        \$("#ms").owlCarousel(owlOptions);

        \$(window).resize(function () {
            var newOwlOptions = owlOptions;
            if (window.innerWidth <= 767) {
                newOwlOptions.dots = true;
            } else {
                newOwlOptions.dots = false;
            }
            \$('#ms').trigger('destroy.owl.carousel');
            \$('#ms').owlCarousel(newOwlOptions);
        });
    });
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
      <Script id="page-script-22" strategy="lazyOnload">{`
        try {
          document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabContents = document.querySelectorAll('[role="tabpanel"]');

    function showTab(tabId) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.add('hidden'));

        document.querySelector(\`#tab-\${tabId}\`).classList.add('active');
        document.querySelector(\`#content-\${tabId}\`).classList.remove('hidden');

        fetchTabContent(tabId);
    }

    function fetchTabContent(tabId) {
        const contentContainer = document.querySelector(\`#content-\${tabId}\`);
        fetch('head/engine/ajax/__ajax_cd_fetch_tab_content.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: \`tab_id=\${tabId}\`
        })
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;

            \$(contentContainer).find('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                items: 1
            });
        })
        .catch(error => {
            console.error('Error fetching tab content:', error);
        });
    }

    const defaultTabId = 1;
    showTab(defaultTabId);

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-hs-tab').replace('#content-', '');
            showTab(tabId);
        });
    });
});
        } catch (e) {
          // Safe catch for conditional page elements
        }
      `}</Script>
    </>
  );
}
