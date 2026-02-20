import { useState, useEffect } from 'react';
import { STRIPE_CONFIG, isStripeConfigured } from '@/config/stripe';

interface StripeConfigState {
  publishableKey: string;
  priceFull: string;
  isLoading: boolean;
  isConfigured: boolean;
  error: string | null;
}

export function useStripeConfig(): StripeConfigState {
  const [config, setConfig] = useState<StripeConfigState>({
    publishableKey: STRIPE_CONFIG.publishableKey,
    priceFull: STRIPE_CONFIG.priceFull,
    isLoading: false,
    isConfigured: isStripeConfigured(),
    error: null,
  });

  useEffect(() => {
    // Log initial state for debugging
    console.log('Initial Stripe config from build:', {
      hasPublishableKey: !!STRIPE_CONFIG.publishableKey,
      hasPriceFull: !!STRIPE_CONFIG.priceFull,
      isConfigured: isStripeConfigured(),
    });

    // If config is already available from build time, no need to fetch
    if (isStripeConfigured()) {
      console.log('Stripe config loaded from build-time environment variables');
      return;
    }

    // Fetch config from API as fallback
    console.log('Stripe config not found in build, fetching from API...');
    const fetchConfig = async () => {
      setConfig(prev => ({ ...prev, isLoading: true }));
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error(`Config API returned ${response.status}`);
        }
        const data = await response.json();

        console.log('Config API response:', {
          hasPublishableKey: !!data.stripe.publishableKey,
          hasPriceFull: !!data.stripe.priceFull,
          isConfigured: data.stripe.isConfigured,
          debug: data.debug,
        });

        // Update global config for other components
        if (data.stripe.publishableKey) {
          STRIPE_CONFIG.publishableKey = data.stripe.publishableKey;
        }
        if (data.stripe.priceFull) {
          STRIPE_CONFIG.priceFull = data.stripe.priceFull;
        }

        setConfig({
          publishableKey: data.stripe.publishableKey || '',
          priceFull: data.stripe.priceFull || '',
          isLoading: false,
          isConfigured: data.stripe.isConfigured,
          error: data.stripe.isConfigured ? null : 'Stripe configuration incomplete',
        });

        // In production, also check the env diagnostics
        if (!data.stripe.isConfigured && process.env.NODE_ENV === 'production') {
          fetch('/api/env-check')
            .then(r => r.json())
            .then(diagnostics => {
              console.error('Environment diagnostics:', diagnostics);
            })
            .catch(e => console.error('Failed to fetch diagnostics:', e));
        }
      } catch (error) {
        console.error('Failed to fetch config:', error);
        setConfig(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load configuration. Please check environment variables.',
        }));
      }
    };

    fetchConfig();
  }, []);

  return config;
}