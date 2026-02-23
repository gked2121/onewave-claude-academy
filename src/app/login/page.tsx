"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getTestEmails } from '@/config/auth';
import { useProgress } from '@/context/ProgressContext';
import { Mail, ArrowRight, Sparkles, Shield, User, Users, Lock, Play } from 'lucide-react';
import { signUp, signIn } from '@/lib/supabase';
import { createOrganization } from '@/lib/admin';

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'individual' | 'team'>('individual');
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setPlan, setUserEmail } = useProgress();

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setPlan('full');
    setUserEmail('demo@claude-academy.com');
    setSuccess('Welcome to the demo! Redirecting...');
    setTimeout(() => router.push('/dashboard'), 800);
  };

  const validateEmail = (email: string): string | null => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return 'Email is required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized)) return 'Please enter a valid email address';
    return null;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetMessages();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (mode === 'signup' && accountType === 'team' && teamName.trim().length < 2) {
      setError('Team name is required');
      return;
    }

    const normalized = email.trim().toLowerCase();
    setLoading(true);

    try {
      const testers = getTestEmails();
      const isTestUser = testers.includes(normalized);

      if (mode === 'login') {
        // Sign in with Supabase
        const { user, session, error: authError } = await signIn(normalized, password);

        if (authError || !user) {
          setError('Invalid email or password');
          return;
        }

        // Set plan based on user type
        if (isTestUser) {
          setPlan('full');
        } else {
          setPlan('free');
        }

        setUserEmail(normalized);
        setSuccess('Welcome back! Redirecting to your dashboard...');
        setTimeout(() => router.push('/dashboard'), 1500);

      } else {
        // Sign up with Supabase
        const { user, error: authError } = await signUp(normalized, password);

        if (authError) {
          setError((authError as any)?.message || 'Failed to create account');
          return;
        }

        if (!user) {
          setError('Failed to create account');
          return;
        }

        // Handle team signup
        if (accountType === 'team' && user) {
          const org = await createOrganization(teamName.trim(), user.id);
          if (org) {
            setPlan('pro');
            setUserEmail(normalized);
            setSuccess('Team created! Redirecting to admin dashboard...');
            setTimeout(() => router.push('/admin'), 1500);
            return;
          }
        }

        // Set plan based on user type (individual flow)
        if (isTestUser) {
          setPlan('full');
        } else {
          setPlan('free');
        }

        setUserEmail(normalized);
        setSuccess('Account created! Check your email to verify. Redirecting...');
        setTimeout(() => router.push('/onboarding'), 1500);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-center p-6 min-h-screen">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(218,119,86,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50rem_45rem_at_bottom,rgba(37,99,235,0.15),transparent)]" />
      </div>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="rounded-2xl bg-zinc-900/70 p-8 ring-1 ring-white/10 backdrop-blur">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-claude/30 to-claude/10 flex items-center justify-center border border-claude/30">
              <span className="text-3xl font-bold text-claude">C</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-claude">
              {mode === 'signup' ? 'Join Claude Academy' : 'Welcome Back'}
            </h1>
            <p className="text-white/70">
              {mode === 'signup'
                ? 'Master the complete Anthropic ecosystem'
                : 'Continue your learning journey'
              }
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-zinc-800/50 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => { setMode('signup'); resetMessages(); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-claude text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); resetMessages(); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-claude text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Sign In
            </button>
          </div>

          {/* Account Type Selector (signup only) */}
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => { setAccountType('individual'); resetMessages(); }}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all ${
                  accountType === 'individual'
                    ? 'border-blue-600 bg-blue-600/10'
                    : 'border-white/10 bg-zinc-800/50 hover:border-white/20'
                }`}
              >
                <User className={`w-5 h-5 ${accountType === 'individual' ? 'text-blue-500' : 'text-white/60'}`} />
                <span className={`text-sm font-medium ${accountType === 'individual' ? 'text-white' : 'text-white/70'}`}>Individual</span>
                <span className="text-xs text-white/50">Learn on your own</span>
              </button>
              <button
                type="button"
                onClick={() => { setAccountType('team'); resetMessages(); }}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all ${
                  accountType === 'team'
                    ? 'border-blue-600 bg-blue-600/10'
                    : 'border-white/10 bg-zinc-800/50 hover:border-white/20'
                }`}
              >
                <Users className={`w-5 h-5 ${accountType === 'team' ? 'text-blue-500' : 'text-white/60'}`} />
                <span className={`text-sm font-medium ${accountType === 'team' ? 'text-white' : 'text-white/70'}`}>Team</span>
                <span className="text-xs text-white/50">Learn with your team</span>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Team Name (team signup only) */}
            {mode === 'signup' && accountType === 'team' && (
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Team Name
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => { setTeamName(e.target.value); resetMessages(); }}
                    className="w-full bg-black/30 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-claude/50 focus:border-claude/50 transition-all"
                    placeholder="Your company or team name"
                    required
                    minLength={2}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); resetMessages(); }}
                  className="w-full bg-black/30 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-claude/50 focus:border-claude/50 transition-all"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); resetMessages(); }}
                  className="w-full bg-black/30 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-claude/50 focus:border-claude/50 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-white/50 mt-1">Minimum 6 characters</p>
            </div>

            {/* Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"
              >
                <p className="text-green-400 text-sm">{success}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-claude to-claude-dark px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                  {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {mode === 'signup' ? 'Start Learning' : 'Continue Learning'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Demo Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-zinc-900 px-3 text-white/40">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full border border-white/20 bg-white/5 px-6 py-3 rounded-lg text-white/80 font-medium hover:bg-white/10 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Try Demo -- No Account Needed
            </button>

            {/* Footer Info */}
            <div className="text-center space-y-3 pt-4 border-t border-white/10">
              <p className="text-sm text-white/60">
                {mode === 'signup' ? 'Free tier includes Claude Chat basics' : 'Welcome back to Claude Academy!'}
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-white/50">
                <Link href="/tracks" className="hover:text-white/70 transition-colors">
                  Browse Tracks
                </Link>
                <span>•</span>
                <Link href="/upgrade" className="hover:text-white/70 transition-colors">
                  Pricing
                </Link>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
