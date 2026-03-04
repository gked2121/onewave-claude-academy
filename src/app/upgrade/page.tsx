"use client";

import { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import useOrgRole from '@/hooks/useOrgRole';
import {
  Check,
  Crown,
  Sparkles,
  Shield,
  Rocket,
  Users,
  TrendingUp,
  ArrowRight,
  Award,
  Lock,
  Building2,
  Zap,
  Star,
} from 'lucide-react';

const TEAM_FEATURES = [
  'All 8+ levels & advanced tracks',
  'Admin dashboard & analytics',
  'Bulk invite via CSV',
  'Department-level reporting',
  'Team progress tracking',
  'CSV & PDF export',
  'Manager role with scoped access',
  'Priority support',
];

const INDIVIDUAL_FEATURES = [
  'All 8+ levels & advanced tracks',
  'Personal AI coding coach',
  'Advanced prompts & workflows',
  'Real-world project templates',
  'Lifetime updates & new content',
  'Community support',
];

const CLIENT_FEATURES = [
  'Everything in Team plan',
  'Included with your OneWave AI subscription',
  'Dedicated account manager',
  'Custom onboarding for your team',
  'Priority feature requests',
];

export default function UpgradePage() {
  const [mounted, setMounted] = useState(false);
  const { plan, setPlan, userEmail } = useProgress();
  const { role: orgRole, orgId } = useOrgRole();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOneWaveClient = userEmail?.toLowerCase().endsWith('@onewave-ai.com');
  const hasOrg = !!orgId;

  function handleUpgradeClick(tier: 'team' | 'individual' | 'client') {
    if (tier === 'client' && isOneWaveClient) {
      setPlan('full');
      return;
    }
    // Stripe not set up yet — show coming soon message
    window.open('mailto:gabe@onewave-ai.com?subject=Claude Academy Upgrade&body=I am interested in the ' + tier + ' plan.', '_blank');
  }

  return (
    <div className="min-h-screen bg-bg pb-32 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-claude/30 bg-claude/10 px-4 py-2 text-sm">
            <Crown className="h-4 w-4 text-claude" />
            <span className="text-white font-semibold">Upskill Your Team on Claude</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Scale your team's AI skills with Claude Academy.
          </p>

          {mounted && plan === 'full' && (
            <div className="flex items-center justify-center gap-3 text-sm">
              <span className="text-white/50">Current plan:</span>
              <span className="bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold border border-primary/20">
                Full Access
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Individual Plan */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col">
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">Individual</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$19.99</span>
                  <span className="text-white/50 text-sm">/month</span>
                </div>
                <p className="text-sm text-white/50 mt-1">For solo learners</p>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {INDIVIDUAL_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgradeClick('individual')}
                className="w-full rounded-xl px-6 py-3.5 font-semibold text-sm transition-all border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Team Plan — Featured */}
          <div className="rounded-2xl bg-zinc-900 border-2 border-primary overflow-hidden flex flex-col relative">
            <div className="bg-primary text-white text-center py-2 text-sm font-bold">
              Most Popular
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">Team</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$14.99</span>
                  <span className="text-white/50 text-sm">/user/month</span>
                </div>
                <p className="text-sm text-white/50 mt-1">For teams & organizations</p>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {TEAM_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgradeClick('team')}
                className="w-full rounded-xl px-6 py-3.5 font-bold text-sm transition-all bg-primary text-white hover:bg-primary/90"
              >
                Start Your Team
              </button>
            </div>
          </div>

          {/* OneWave AI Client Plan */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col">
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-claude/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-claude" />
                </div>
                <h3 className="text-xl font-bold text-white">OneWave Client</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">Free</span>
                </div>
                <p className="text-sm text-white/50 mt-1">Included with OneWave AI</p>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {CLIENT_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-claude/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-claude" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {isOneWaveClient ? (
                <button
                  onClick={() => handleUpgradeClick('client')}
                  className="w-full rounded-xl px-6 py-3.5 font-semibold text-sm transition-all bg-claude/10 border border-claude/30 text-claude hover:bg-claude/20"
                >
                  Activate Access
                </button>
              ) : (
                <a
                  href="https://onewave-ai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl px-6 py-3.5 font-semibold text-sm transition-all border border-zinc-700 text-white/60 hover:bg-zinc-800 text-center block"
                >
                  Learn About OneWave AI
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Why Choose Claude Academy
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-white mb-2">Real-World Projects</h4>
              <p className="text-white/60 text-sm">Build actual applications you can use and showcase</p>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10 mb-4">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <h4 className="font-bold text-white mb-2">AI-Powered Learning</h4>
              <p className="text-white/60 text-sm">Personal AI coach adapts to your learning style</p>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-claude/10 mb-4">
                <TrendingUp className="w-5 h-5 text-claude" />
              </div>
              <h4 className="font-bold text-white mb-2">Team Analytics</h4>
              <p className="text-white/60 text-sm">Track progress and engagement across your organization</p>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-white mb-2">Enterprise Ready</h4>
              <p className="text-white/60 text-sm">Role-based access, department scoping, CSV/PDF reports</p>
            </div>
          </div>
        </div>

        {/* FAQ / Contact */}
        <div className="text-center rounded-xl bg-zinc-900 border border-zinc-800 p-8">
          <h3 className="text-2xl font-bold text-white mb-3">
            Questions? Let's talk.
          </h3>
          <p className="text-white/60 mb-6">
            Need a custom plan for your organization or have questions about volume pricing?
          </p>
          <a
            href="mailto:gabe@onewave-ai.com?subject=Claude Academy Pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}
