import { NextResponse } from 'next/server';
import { STRIPE_SERVER_CONFIG, validateServerConfig } from '@/config/stripe.server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure Node.js runtime for env var access

export async function GET() {
  // Validate configuration on server
  const validation = validateServerConfig();

  // Log for debugging in production
  if (!validation.isValid) {
    console.error('Stripe configuration errors:', validation.errors);
  }

  // Only return public environment variables to client
  const config = {
    stripe: {
      publishableKey: STRIPE_SERVER_CONFIG.publishableKey,
      priceFull: STRIPE_SERVER_CONFIG.priceFull,
      isConfigured: validation.isValid,
      // Include validation errors in development only
      ...(process.env.NODE_ENV !== 'production' && !validation.isValid ? {
        errors: validation.errors
      } : {})
    },
    app: {
      origin: STRIPE_SERVER_CONFIG.appOrigin,
    },
    // Debug info for production issues (safe to expose)
    debug: {
      hasPublishableKey: !!STRIPE_SERVER_CONFIG.publishableKey,
      hasPriceFull: !!STRIPE_SERVER_CONFIG.priceFull,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    }
  };

  return NextResponse.json(config);
}