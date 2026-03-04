export const BILLING = {
  // Legacy single plan (kept for backwards compat)
  priceFull: (process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL || '').trim(),
  stripePublishableKey: (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '').trim(),

  // B2B pricing tiers
  plans: {
    team: {
      name: 'Team',
      priceMonthly: 14.99,
      priceLabel: '$14.99',
      interval: 'per user / month',
      stripePriceId: (process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM || '').trim(),
    },
    individual: {
      name: 'Individual',
      priceMonthly: 19.99,
      priceLabel: '$19.99',
      interval: 'per month',
      stripePriceId: (process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIVIDUAL || '').trim(),
    },
    client: {
      name: 'OneWave AI Client',
      priceMonthly: 0,
      priceLabel: 'Free',
      interval: 'included with your plan',
      stripePriceId: '',
    },
  },
};
