import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Descriptive route redirects mapping MNC standard descriptive routes
      { source: "/areo-industry", destination: "/aerospace-industry", permanent: true },
      { source: "/da-service", destination: "/data-analytics-service", permanent: true },
      { source: "/engg-industry", destination: "/engineering-industry", permanent: true },
      { source: "/gt-industry", destination: "/green-tech-industry", permanent: true },
      { source: "/hc-industry", destination: "/healthcare-industry", permanent: true },
      { source: "/me-industry", destination: "/media-entertainment-industry", permanent: true },
      { source: "/mv-service", destination: "/metaverse-service", permanent: true },
      { source: "/rpa-service", destination: "/robotic-process-automation-service", permanent: true },
      { source: "/sc-service", destination: "/sales-commerce-service", permanent: true },
      { source: "/tc-service", destination: "/technology-consulting-service", permanent: true },
      { source: "/tt-industry", destination: "/travel-tourism-industry", permanent: true },
      { source: "/e-book-01", destination: "/ebook-01", permanent: true },

      // Redirect any path ending in .html to its extensionless counterpart
      {
        source: "/:path*\\.html",
        destination: "/:path*",
        permanent: true,
      },
      // Redirect any path ending in .php to its extensionless counterpart
      {
        source: "/:path*\\.php",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
