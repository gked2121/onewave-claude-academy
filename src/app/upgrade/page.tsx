"use client";

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG, isStripeConfigured, getStripeConfigStatus } from '@/config/stripe';
import { useStripeConfig } from '@/hooks/useStripeConfig';
import { useProgress } from '@/context/ProgressContext';
import {
  Check,
  Crown,
  Sparkles,
  Shield,
  Rocket,
  Users,
  TrendingUp,
  Clock,
  Infinity,
  ArrowRight,
  Award,
  Lock
} from 'lucide-react';

export default function UpgradePage() {
  const [loading, setLoading] = useState<string | null>(null);
  const { plan, setPlan, userEmail } = useProgress();
  const stripeConfig = useStripeConfig();

  // Log Stripe config status on mount
  useEffect(() => {
    const status = getStripeConfigStatus();
    console.log('Stripe Configuration Status:', status);
    console.log('Runtime Config:', stripeConfig);
    if (!status.isConfigured && !stripeConfig.isLoading) {
      console.error('Stripe not configured properly. Check environment variables.');
    }
  }, [stripeConfig]);

  // Check if user is OneWave admin
  const isAdmin = userEmail?.toLowerCase().includes('onewave-ai.com');

  const planCard = {
    key: 'full',
    name: 'Full Access',
    price: '$9.99',
    originalPrice: '$49.99',
    discount: '80% OFF',
    priceId: stripeConfig.priceFull || STRIPE_CONFIG.priceFull,
    features: [
      'All 8+ levels & advanced tracks',
      'Personal AI coding coach',
      'Advanced prompts & workflows',
      'Real-world project templates',
      'Lifetime updates & new content',
      'Priority community support',
      'Founding member benefits'
    ]
  };

  const benefits = [
    {
      icon: Rocket,
      title: 'Advanced Content',
      description: 'Access premium levels and expert-level challenges'
    },
    {
      icon: Sparkles,
      title: 'AI Coaching',
      description: 'Personal guidance tailored to your learning style'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Skills that accelerate your professional journey'
    },
    {
      icon: Users,
      title: 'Priority Support',
      description: 'Get help faster from our expert community'
    }
  ];

  async function startCheckout(priceId: string) {
    // Auto-grant access to OneWave admins
    if (isAdmin) {
      setPlan('full');
      alert('Admin access granted! You now have full access to Claude Academy.');
      return;
    }

    // Use runtime config if available, fallback to static config
    const publishableKey = stripeConfig.publishableKey || STRIPE_CONFIG.publishableKey;
    const effectivePriceId = priceId || stripeConfig.priceFull;

    // Debug logging for production issues
    const configStatus = getStripeConfigStatus();
    console.log('Checkout Debug:', {
      priceId: effectivePriceId,
      hasPriceId: !!effectivePriceId,
      publishableKey: publishableKey ? `${publishableKey.substring(0, 10)}...` : 'NOT SET',
      configStatus,
      runtimeConfig: stripeConfig,
    });

    if (!publishableKey || !effectivePriceId) {
      if (stripeConfig.isLoading) {
        alert('Loading configuration... Please try again in a moment.');
      } else {
        alert('Stripe configuration error. Please contact info@onewave-ai.com for assistance.');
      }
      console.error('Stripe not configured:', { publishableKey: !!publishableKey, priceId: !!effectivePriceId, configStatus });
      return;
    }

    try {
      setLoading(effectivePriceId);

      // Step 1: Create checkout session
      console.log('Creating checkout session...');
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: effectivePriceId })
      });
      const data = await res.json();
      console.log('Checkout session response:', data);
      if (!res.ok) throw new Error(data.error || 'Checkout error');

      // Step 2: Load Stripe.js
      console.log('Loading Stripe.js with key:', publishableKey.substring(0, 20) + '...');
      const stripe = await loadStripe(publishableKey);
      if (!stripe) throw new Error('Stripe failed to load');
      console.log('Stripe.js loaded successfully');

      // Step 3: Redirect to checkout
      console.log('Redirecting to checkout with session:', data.id);
      const result = await stripe.redirectToCheckout({ sessionId: data.id });
      console.log('Redirect result:', result);

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Checkout failed';
      console.error('Checkout error:', e);
      alert(`Demo Mode: ${msg}. Simulating upgrade...`);
      setPlan('full');
      alert('Demo upgrade successful! You now have full access.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-bg pb-32 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-claude/30 bg-claude/10 px-4 py-2 text-sm">
            <Crown className="h-4 w-4 text-claude" />
            <span className="text-white font-semibold">Limited Time Offer</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Unlock Your Full Potential
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Master AI-powered coding with lifetime access to all content
          </p>

          {/* Current Plan Badge */}
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-white/50">Current plan:</span>
            <span className="bg-zinc-800 px-4 py-2 rounded-full text-primary font-semibold capitalize">
              {plan}
            </span>
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="mb-12">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            {/* Discount Badge */}
            <div className="bg-gradient-to-r from-claude to-claude/80 text-white text-center py-2 text-sm font-bold">
              {planCard.discount} - Founding Member Pricing
            </div>

            <div className="p-8">
              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-white/40 line-through text-2xl">{planCard.originalPrice}</span>
                  <ArrowRight className="h-5 w-5 text-claude" />
                  <span className="text-5xl font-bold text-white">{planCard.price}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <Infinity className="h-5 w-5 text-primary" />
                  <span>One-time payment • Lifetime access</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>Save $40 • Never pay again</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {planCard.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full rounded-xl px-6 py-4 font-bold text-lg transition-all ${
                  loading
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                }`}
                onClick={() => startCheckout(planCard.priceId)}
                disabled={!!loading}
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : isAdmin ? (
                    <>
                      <Crown className="w-5 h-5" />
                      Activate Admin Access
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Upgrade to Full Access
                    </>
                  )}
                </div>
              </button>

              {/* Trust Indicators */}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>30-day money-back</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-xl bg-zinc-900 border border-zinc-800 p-6"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* What Makes It Different */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Why Choose Claude Academy
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Real-World Projects</h4>
                  <p className="text-white/60 text-sm">
                    Build actual applications you can use and showcase
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">AI-Powered Learning</h4>
                  <p className="text-white/60 text-sm">
                    Personal AI coach adapts to your learning style
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-claude/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-claude" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">No Subscription</h4>
                  <p className="text-white/60 text-sm">
                    One-time payment for lifetime access to all content
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Community Support</h4>
                  <p className="text-white/60 text-sm">
                    Join developers learning modern AI development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center rounded-xl bg-zinc-900 border border-zinc-800 p-8">
          <div className="inline-flex items-center gap-2 text-claude text-sm font-semibold mb-4">
            <Clock className="h-4 w-4" />
            Limited Founding Member Pricing
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Transform Your Coding Journey?
          </h3>

          <p className="text-white/60 mb-6">
            Start building real projects with AI assistance today
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>No subscription</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Lifetime access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span>Free updates forever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
