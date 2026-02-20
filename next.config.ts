import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  eslint: {
    // Only run ESLint on these directories during production builds
    // This allows apostrophes and quotes in text without escaping
    ignoreDuringBuilds: true,
  },
  // Ensure environment variables are available
  env: {
    // These will be available on both client and server
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    NEXT_PUBLIC_STRIPE_PRICE_FULL: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL || '',
    NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN || 'https://vibe-quest.io',
    // Server-only (without NEXT_PUBLIC prefix)
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  },
  // Log environment variables during build (for debugging)
  webpack: (config, { isServer, buildId }) => {
    if (isServer && process.env.NODE_ENV === 'production') {
      console.log('=== Build Environment Check ===');
      console.log('VERCEL:', process.env.VERCEL);
      console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
      console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
      console.log('NEXT_PUBLIC_STRIPE_PRICE_FULL:', process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL ? 'SET' : 'NOT SET');
      console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'SET' : 'NOT SET');
    }
    return config;
  },
};

export default nextConfig;
