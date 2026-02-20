// Server-side Stripe configuration
// This file should only be imported in server components and API routes

// Server-side environment variables (available at runtime)
export const STRIPE_SERVER_CONFIG = {
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  priceFull: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL || '',
  appOrigin: process.env.NEXT_PUBLIC_APP_ORIGIN || 'https://claude-academy.onewave.ai',
};

// Validate server configuration
export function validateServerConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!STRIPE_SERVER_CONFIG.secretKey) {
    errors.push('STRIPE_SECRET_KEY is not set');
  }

  if (!STRIPE_SERVER_CONFIG.publishableKey) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
  }

  if (!STRIPE_SERVER_CONFIG.priceFull) {
    errors.push('NEXT_PUBLIC_STRIPE_PRICE_FULL is not set');
  }

  // Validate key formats
  if (STRIPE_SERVER_CONFIG.secretKey && !STRIPE_SERVER_CONFIG.secretKey.startsWith('sk_')) {
    errors.push('STRIPE_SECRET_KEY should start with sk_');
  }

  if (STRIPE_SERVER_CONFIG.publishableKey && !STRIPE_SERVER_CONFIG.publishableKey.startsWith('pk_')) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY should start with pk_');
  }

  if (STRIPE_SERVER_CONFIG.priceFull && !STRIPE_SERVER_CONFIG.priceFull.startsWith('price_')) {
    errors.push('NEXT_PUBLIC_STRIPE_PRICE_FULL should start with price_');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}