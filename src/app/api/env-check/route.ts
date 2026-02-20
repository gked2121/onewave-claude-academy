import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Environment diagnostics endpoint
 * Checks which environment variables are set (not their values)
 */
export async function GET() {
  // List all environment variables we care about
  const requiredVars = [
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_STRIPE_PRICE_FULL',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_APP_ORIGIN',
  ];

  const optionalVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ];

  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      VERCEL: process.env.VERCEL === '1',
      VERCEL_ENV: process.env.VERCEL_ENV || 'not set',
      isProduction: process.env.NODE_ENV === 'production',
    },
    required: {} as Record<string, boolean>,
    optional: {} as Record<string, boolean>,
    summary: {
      allRequiredSet: false,
      missingRequired: [] as string[],
    },
  };

  // Check required variables
  requiredVars.forEach(varName => {
    const isSet = !!process.env[varName];
    diagnostics.required[varName] = isSet;
    if (!isSet) {
      diagnostics.summary.missingRequired.push(varName);
    }
  });

  // Check optional variables
  optionalVars.forEach(varName => {
    diagnostics.optional[varName] = !!process.env[varName];
  });

  diagnostics.summary.allRequiredSet = diagnostics.summary.missingRequired.length === 0;

  // Log to server console for debugging
  if (!diagnostics.summary.allRequiredSet) {
    console.error('Missing required environment variables:', diagnostics.summary.missingRequired);
  }

  return NextResponse.json(diagnostics);
}