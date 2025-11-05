import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true,
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
