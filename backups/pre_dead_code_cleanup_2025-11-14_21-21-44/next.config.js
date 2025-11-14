/**
 * Next.js Configuration
 * 
 * This file configures Next.js for the Pawthenticate app.
 * Currently using default settings with React strict mode enabled.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yzpbcjxpnflxehybndko.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;

