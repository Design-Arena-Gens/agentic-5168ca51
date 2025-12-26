import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.nanobanana.pro',
      },
      {
        protocol: 'https',
        hostname: 'api.nanobanana.pro',
      },
    ],
  },
};

export default nextConfig;
