import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', // Allow images from pinimg
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // Allow images from GitHub avatars
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow images from any hostname (use with caution)
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true, // Uncomment if you want strict mode
};

export default nextConfig;
