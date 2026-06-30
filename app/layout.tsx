import type { Metadata } from "next";
import "./globals.css";
import "./custom.css";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Touchmark Descience",
  description: "Innovative Solutions Connecting Brands and Customers. We provide full-service IT consulting, digital marketing, and software development.",
  icons: {
    icon: "https://touchmarkwf.com/timesheet/front_assets/images/logo/logoT.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Swiper & Owl Carousel CSS assets */}
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <script dangerouslySetInnerHTML={{ __html: `
          if (typeof window !== 'undefined') {
            window.addEventListener('error', function(e) {
              if (e.filename && (e.filename.includes('preline') || e.filename.includes('jquery') || e.filename.includes('alpine'))) {
                e.stopImmediatePropagation();
              }
              if (e.message && (e.message.includes('preline') || e.message.includes('length') || e.message.includes('undefined'))) {
                e.stopImmediatePropagation();
              }
            });
          }
        ` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />

        {/* Third-party JavaScript assets */}
        <Script 
          src="/js/jquery-3.7.1.min.js" 
          strategy="beforeInteractive" 
        />
        <Script 
          src="https://unpkg.com/swiper/swiper-bundle.min.js" 
          strategy="afterInteractive" 
        />
        <Script 
          src="/js/owl.carousel.min.js" 
          strategy="afterInteractive" 
        />
        <Script 
          src="/js/flowbite.js" 
          strategy="afterInteractive" 
        />
        <Script 
          src="/js/preline.min.js" 
          strategy="afterInteractive" 
        />
        <Script 
          src="/js/alpine-v2.8.2.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
