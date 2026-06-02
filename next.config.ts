import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "teal-rabbit-163520.hostingersite.com",
      },
      // LoremFlickr — keyword-based photo placeholders
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      // Flickr CDN (LoremFlickr redirects here)
      {
        protocol: "https",
        hostname: "*.staticflickr.com",
      },
      // Picsum (fallback)
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
};

export default nextConfig;
