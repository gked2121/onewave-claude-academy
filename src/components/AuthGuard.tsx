"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { LogIn, UserPlus, Lock, Sparkles } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
  message?: string;
  showSignup?: boolean;
}

export default function AuthGuard({
  children,
  fallback,
  requireAuth = true,
  message = "Sign in to access this feature",
  showSignup = true
}: AuthGuardProps) {
  const { userEmail } = useProgress();
  const isAuthenticated = !!userEmail;

  // If auth is not required or user is authenticated, show children
  if (!requireAuth || isAuthenticated) {
    return <>{children}</>;
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default auth prompt
  return (
    <motion.div
      className="flex items-center justify-center min-h-[60vh] p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
        <p className="text-white/70 mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showSignup && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          )}

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/10 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-white/50">
            New to OneWave? <Link href="/why" className="text-primary hover:text-primary/80 transition-colors">Learn more about our platform</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Convenience component for inline auth prompts
export function InlineAuthPrompt({
  message = "Sign in to unlock this feature",
  compact = false
}: {
  message?: string;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-xl bg-primary/5 border border-primary/20 backdrop-blur text-center ${compact ? 'p-4' : 'p-6'}`}>
      <div className={`${compact ? 'w-8 h-8' : 'w-12 h-12'} mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center`}>
        <Sparkles className={`${compact ? 'w-4 h-4' : 'w-6 h-6'} text-primary`} />
      </div>

      <h3 className={`font-semibold text-white mb-2 ${compact ? 'text-sm' : 'text-base'}`}>
        {message}
      </h3>

      <div className="flex gap-2 justify-center">
        <Link
          href="/login"
          className={`inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-white font-medium hover:bg-primary/80 transition-colors ${compact ? 'text-xs' : 'text-sm'}`}
        >
          <UserPlus className="w-3 h-3" />
          Sign Up
        </Link>
        <Link
          href="/login"
          className={`inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-white font-medium hover:bg-white/10 transition-colors ${compact ? 'text-xs' : 'text-sm'}`}
        >
          <LogIn className="w-3 h-3" />
          Sign In
        </Link>
      </div>
    </div>
  );
}