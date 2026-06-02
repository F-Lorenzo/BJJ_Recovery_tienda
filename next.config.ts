import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "teal-rabbit-163520.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;
