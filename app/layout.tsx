import type { Metadata } from "next";
import "./globals.css";
import "./custom.css";
import "./motion.css";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegacyScripts from "@/components/LegacyScripts";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SubsidiaryUX from "@/components/SubsidiaryUX";

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
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <MotionProvider />
        <SubsidiaryUX />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          {children}
        </main>
        <Footer />

        <GoogleAnalytics />
        <LegacyScripts />
      </body>
    </html>
  );
}
