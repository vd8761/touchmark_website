import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
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
