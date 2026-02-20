export const BILLING = {
  // Single plan: Full Access
  priceFull: (process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL || '').trim(),
  stripePublishableKey: (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '').trim(),
};
