import { NextResponse } from 'next/server';
import { STRIPE_SERVER_CONFIG, validateServerConfig } from '@/config/stripe.server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Debug endpoint to check environment variable configuration
 * This helps diagnose issues with Vercel environment variables
 * DISABLED IN PRODUCTION for security
 */
export async function GET() {
  // Disable in production
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const validation = validateServerConfig();

  // Get safe values for debugging
  const safeValues = {
    // Show partial values for public keys (safe to expose)
    publishableKey: STRIPE_SERVER_CONFIG.publishableKey
      ? `${STRIPE_SERVER_CONFIG.publishableKey.substring(0, 10)}...${STRIPE_SERVER_CONFIG.publishableKey.slice(-4)}`
      : 'NOT SET',

    priceFull: STRIPE_SERVER_CONFIG.priceFull
      ? `${STRIPE_SERVER_CONFIG.priceFull.substring(0, 15)}...`
      : 'NOT SET',

    // Never expose secret key value, just show if it's set
    secretKey: STRIPE_SERVER_CONFIG.secretKey ? 'SET' : 'NOT SET',

    appOrigin: STRIPE_SERVER_CONFIG.appOrigin,
  };

  // Check key formats and modes
  const keyInfo = {
    publishableKeyMode: STRIPE_SERVER_CONFIG.publishableKey?.includes('_live_') ? 'LIVE' :
                        STRIPE_SERVER_CONFIG.publishableKey?.includes('_test_') ? 'TEST' : 'UNKNOWN',
    secretKeyMode: STRIPE_SERVER_CONFIG.secretKey?.includes('_live_') ? 'LIVE' :
                   STRIPE_SERVER_CONFIG.secretKey?.includes('_test_') ? 'TEST' : 'UNKNOWN',
    priceIdValid: STRIPE_SERVER_CONFIG.priceFull?.startsWith('price_') || false,
  };

  // Environment context
  const context = {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    VERCEL: process.env.VERCEL || 'not set',
    VERCEL_ENV: process.env.VERCEL_ENV || 'not set',
    VERCEL_URL: process.env.VERCEL_URL || 'not set',
    CI: process.env.CI || 'not set',
  };

  // Check all environment variables (for debugging)
  const envVarStatus = {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_FULL: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_APP_ORIGIN: !!process.env.NEXT_PUBLIC_APP_ORIGIN,
  };

  const response = {
    timestamp: new Date().toISOString(),
    validation,
    configValues: safeValues,
    keyInfo,
    context,
    envVarStatus,

    // Summary
    summary: {
      allRequiredVarsSet: validation.isValid,
      stripeMode: keyInfo.publishableKeyMode === keyInfo.secretKeyMode ? keyInfo.publishableKeyMode : 'MISMATCH',
      environment: context.VERCEL_ENV || context.NODE_ENV,
    },
  };

  // Log for server-side debugging
  console.log('Debug endpoint called:', {
    ...response,
    // Add raw env var check (for server logs only)
    rawEnvCheck: {
      hasStripePublishable: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      hasStripePriceFull: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL,
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    },
  });

  return NextResponse.json(response);
}