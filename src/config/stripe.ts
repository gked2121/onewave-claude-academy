// Stripe configuration - NEXT_PUBLIC_ variables are replaced at build time
// IMPORTANT: These values are embedded into the JavaScript bundle during the build process
// If they're not set at build time, they'll be empty strings in production
export const STRIPE_CONFIG = {
  // Build-time replacement - these become literal strings after build
  publishableKey: (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '').trim(),
  priceFull: (process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL || '').trim(),
  appOrigin: (process.env.NEXT_PUBLIC_APP_ORIGIN || 'https://claude-academy.onewave.ai').trim(),
};

// Helper to check if Stripe is properly configured
export const isStripeConfigured = () => {
  return !!(STRIPE_CONFIG.publishableKey && STRIPE_CONFIG.priceFull &&
           STRIPE_CONFIG.publishableKey.startsWith('pk_'));
};

// Helper to get config status for debugging
export const getStripeConfigStatus = () => {
  return {
    hasPublishableKey: !!STRIPE_CONFIG.publishableKey,
    hasPriceFull: !!STRIPE_CONFIG.priceFull,
    hasAppOrigin: !!STRIPE_CONFIG.appOrigin,
    isLiveMode: STRIPE_CONFIG.publishableKey?.startsWith('pk_live_'),
    isTestMode: STRIPE_CONFIG.publishableKey?.startsWith('pk_test_'),
    isConfigured: isStripeConfigured(),
  };
};