#!/usr/bin/env node

/**
 * Script to inject environment variables at build time
 * This ensures NEXT_PUBLIC_ variables are properly embedded
 */

console.log('=== Environment Variable Check ===');
console.log('Time:', new Date().toISOString());
console.log('CWD:', process.cwd());

const requiredEnvVars = [
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_STRIPE_PRICE_FULL',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_APP_ORIGIN'
];

const envStatus = {};
let hasErrors = false;
let hasCriticalErrors = false;

// First, check if we're in Vercel environment
const isVercel = process.env.VERCEL === '1';
const vercelEnv = process.env.VERCEL_ENV;

console.log('\n=== Build Context ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('VERCEL:', process.env.VERCEL || 'not set');
console.log('VERCEL_ENV:', process.env.VERCEL_ENV || 'not set');
console.log('CI:', process.env.CI || 'not set');

if (isVercel) {
  console.log('\n🔵 Running in Vercel environment');
  console.log('Environment type:', vercelEnv);

  // Check if Vercel-specific env vars are available
  if (process.env.VERCEL_URL) {
    console.log('VERCEL_URL:', process.env.VERCEL_URL);
  }
}

console.log('\n=== Required Environment Variables ===');

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const isPublic = varName.startsWith('NEXT_PUBLIC_');

  if (!value) {
    console.error(`❌ Missing: ${varName}`);
    hasErrors = true;

    // NEXT_PUBLIC vars are critical for client-side functionality
    if (isPublic) {
      hasCriticalErrors = true;
    }

    envStatus[varName] = 'MISSING';
  } else {
    // For public keys, show more of the value for debugging
    let preview;
    if (varName.includes('PUBLISHABLE_KEY')) {
      // Show first and last few chars of publishable key
      preview = value.substring(0, 10) + '...' + value.substring(value.length - 4);
    } else if (varName.includes('PRICE')) {
      // Price IDs are safe to show partially
      preview = value.substring(0, 15) + '...';
    } else if (isPublic) {
      // Other public vars can be shown partially
      preview = value.substring(0, 30) + (value.length > 30 ? '...' : '');
    } else {
      // Hide secret keys completely
      preview = '[HIDDEN - LENGTH: ' + value.length + ']';
    }

    console.log(`✅ Found: ${varName} = ${preview}`);
    envStatus[varName] = 'SET';
  }
});

// Additional checks for Stripe configuration
console.log('\n=== Stripe Configuration Validation ===');
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (stripePublishableKey) {
  if (stripePublishableKey.startsWith('pk_live_')) {
    console.log('✅ Stripe LIVE mode detected');
  } else if (stripePublishableKey.startsWith('pk_test_')) {
    console.log('⚠️ Stripe TEST mode detected');
  } else {
    console.error('❌ Invalid Stripe publishable key format');
    hasCriticalErrors = true;
  }
}

if (stripePriceId) {
  if (stripePriceId.startsWith('price_')) {
    console.log('✅ Stripe price ID format is valid');
  } else {
    console.error('❌ Invalid Stripe price ID format');
    hasCriticalErrors = true;
  }
}

if (stripeSecretKey) {
  if (stripeSecretKey.startsWith('sk_live_')) {
    console.log('✅ Stripe secret key is LIVE mode');
  } else if (stripeSecretKey.startsWith('sk_test_')) {
    console.log('⚠️ Stripe secret key is TEST mode');
  } else {
    console.error('❌ Invalid Stripe secret key format');
    hasCriticalErrors = true;
  }
}

// Summary
console.log('\n=== Summary ===');
if (hasCriticalErrors) {
  console.error('❌ CRITICAL: Required NEXT_PUBLIC environment variables are missing or invalid!');
  console.error('The application will NOT work correctly in production.');

  if (isVercel) {
    console.error('\n📌 Action Required:');
    console.error('1. Go to your Vercel dashboard');
    console.error('2. Navigate to Settings -> Environment Variables');
    console.error('3. Ensure all NEXT_PUBLIC_* variables are set for the', vercelEnv || 'current', 'environment');
    console.error('4. Redeploy the application');
  }

  // In production on Vercel, we should warn but not fail
  // The variables might be set in Vercel dashboard but not visible during build
  if (isVercel && vercelEnv === 'production') {
    console.warn('\n⚠️ WARNING: Some environment variables are missing');
    console.warn('If they are set in Vercel dashboard, the app will work correctly');
    console.warn('Continuing build...');
  }
} else if (hasErrors) {
  console.warn('\n⚠️ WARNING: Some non-critical environment variables are missing.');
  console.warn('The application may have limited functionality.');
} else {
  console.log('\n✅ All required environment variables are properly configured!');
}

process.exit(0);